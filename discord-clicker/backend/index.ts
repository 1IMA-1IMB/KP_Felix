import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import axios from 'axios'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { Client, Events, GatewayIntentBits, Collection } from 'discord.js'
import fs from 'node:fs'
import path from 'node:path'
import * as registerRoute from './routes/register'
import * as users from './routes/users'
import * as guilds from './routes/guilds'
import jwt from 'jsonwebtoken'
import Games from './models/Games'
dotenv.config()


// Bot/discord stuff

const client: any = new Client({ intents: [GatewayIntentBits.Guilds]})

client.commands = new Collection()


// Command Handling:


const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}


client.on(Events.InteractionCreate, async (interaction: any) => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});



// Command Handling over: 

client.once(Events.ClientReady, (readyClient: any) => {
    console.log(`Logged in as ${readyClient.user.tag}`)
})





// Web Stuff

const app: Express = express()

app.use(cors())
app.use(express.json())

const port: unknown | number = process.env.PORT  || 3000

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})	

app.use('/register', registerRoute.default)
app.use('/users', users.default)
app.use('/guilds', guilds.default)

app.post('/botservers', async (req: Request, res: Response) =>{

	try {

	const guildId = req.body.guildId

	console.log(guildId)

	const guilds = await client.guilds.fetch()

	const inGuild = guilds.filter((guild: any) => {
		return guild.id === guildId 
	})

	console.log(inGuild.size)

	if(inGuild.size === 0) return res.status(404).send('Not in guild')

	res.json({ message: 'Bot in guild', code: 200})

	} catch (error: Error | unknown) {
		console.log(error)
	}

	
})

app.post('/game', async (req: Request, res: Response) => {

	try { 

		const guildId = req.body.guildId
		const token = req.body.token



		if(!token) return res.status(500).send('Missing token')

		const access: any = await jwt.verify(token, process.env.jwtSecret as string)

		if(!guildId) return res.status(500).send('Missing guuild ID')
	

		const clientGuilds = await client.guilds.fetch()

		const inGuild = clientGuilds.filter((guild: any) => {
			return guild.id === guildId
		})

		

		if(await inGuild.size === 0) return res.status(404).send('Not in guild')

		const guilds = await axios.get('https://discord.com/api/users/@me/guilds', {
			headers: {
				Authorization: `Bearer ${access.token}`
			}
		})

		if(guilds.data) {

			

			const ownedGuild = await guilds.data.filter((guild: any) => guild.owner === true && guild.id === guildId)


			if(!ownedGuild) {
				return res.status(404).send('Not in owned guild')
			} else {


				const game = await Games.findOne({ guildId: guildId})

				if(!game) {
					res.json({ message: 'Game not set up', code: 202, guild: ownedGuild})
				} else {
					res.json({ message: 'Bot in owned guild', code: 200, guild: ownedGuild, game: game})
				}
			}
		}

		



	} catch (error: Error | unknown) {
		console.log(error)
	}
})


app.post('/creategame', async (req: Request, res: Response) => {
	try {
	 	const { token, gameData, guildId } = req.body
		
		if (!token) return res.status(500).json({ message: 'Missing token'});

		if(!gameData) return res.status(500).json({ message: 'Missing game data'});

		const access: any = jwt.verify(token, process.env.jwtSecret as string)

		const clientGuilds = await client.guilds.fetch()

		const inGuild = clientGuilds.filter((guild: any) => {
			return guild.id === guildId
		})

		if(!inGuild) return res.status(404).send('Not in guild')

		const guilds = await axios.get('https://discord.com/api/users/@me/guilds', {
			headers: {
				Authorization: `Bearer ${access.token}`
			}
		})

		if(guilds.data) {

			const ownedGuild = await guilds.data.filter((guild: any) => guild.owner === true && guild.id === guildId)

			if(!ownedGuild) return res.status(404).send('Not in owned guild')

			const game = await Games.findOne({ guildId: guildId})

			if(!game) {

				await Games.create({
					guildId: guildId,
					currency: gameData.currencyName,
					emoji: gameData.gameEmoji,
					color: gameData.gameColor,
					name: gameData.gameName
				})

				res.json({ message: 'Created game!', code: 200 })
			} else {

				res.json({ message: 'Game already set up', code: 202 })
			}

		}

	} catch (error: Error | any) {
		console.log(error)
	}
})

mongoose
    .connect(process.env.MONGOURL as string)
        .then(() => {
            console.log('Connected to MongoDB')
            client.login(process.env.TOKEN as string)
            app.listen(port, () => {
                console.log(`Server running on port ${port}`)
            })
        }) 
        .catch((err: Error) => {
            console.log(err)
        })



