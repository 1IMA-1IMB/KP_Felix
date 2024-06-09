import { SlashCommandBuilder, CommandInteraction } from "discord.js";

import gameSaves from "../../models/Gamesves"

import Games from "../../models/Games"


module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Shows your balance'),
    async execute(interaction: CommandInteraction) {

        await interaction.deferReply({ ephemeral: true })

        const { user, guild } = interaction

        const game = await Games.findOne({ guildId: guild?.id })

        if(!game) return interaction.editReply("No game set up for this guild")

        const usersave = await gameSaves.findOne({ userId: user.id, guildId: guild?.id })

        if(!usersave) return interaction.editReply("You have no balance")

        else return interaction.editReply(`You have ${usersave.money} ${game.currency}`)
    }
        
}