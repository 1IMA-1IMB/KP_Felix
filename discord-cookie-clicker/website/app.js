require('dotenv').config()

// Bot imports 

const { Client, GatewayIntentBits, Events, Collection } = require('discord.js')
const token = process.env.TOKEN
const fs = require('node:fs')
const path = require('node:path')


// Web imports

const express = require('express')
const expressLayout = require('express-ejs-layouts')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const connectDB = require('./server/config/db.js')
const MongoStore = require('connect-mongo')
const bodyParser = require('body-parser')
const axios = require('axios')

//bot


const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.commands = new Collection()

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
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

client.on(Events.InteractionCreate, async interaction => {
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

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`)
})



client.login(token)




//web

const app = express()

const port = 5000 || process.env.PORT

connectDB()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
    secret: 'discordClickerApi',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGOURL
    })
}))

app.use('*css', express.static('./public/css'))
app.use('*js', express.static('./public/js'))
app.use('*images', express.static('./public/images'))

app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

app.use('/', require('./server/routes/main'))



app.listen(port, () => {
    console.log(`Connected at http://localhost:5000/`)
})