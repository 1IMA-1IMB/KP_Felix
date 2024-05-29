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

app.get('/botservers', async (req: Request, res: Response) =>{

	const guildId = '976479259768004608'

	const guilds = await client.guilds.fetch()

	const inGuild = guilds.filter((guild: any) => {
		return guild.id === guildId 
	})

	if(inGuild.size === 0) return res.status(404).send('Not in guild')

	res.json({ message: 'Bot in guild'})

	
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



