import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import Games from '../../models/Games'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Set up the bot to your guild'),

    async execute(interaction: CommandInteraction) {

        await interaction.deferReply({ ephemeral: true })

        const game: object | any = await Games.findOne({ guildId: interaction.guild?.id })

        if (!game) return await interaction.editReply('# Setup\n\n### Setting up a game is easy with our website, head over to [Our website](http://localhost:5173/) and follow these steps: \n- Click Get started \n- Find your wanted guild, \n- Enter all the fields \n- Click Create Game\n\n **Once this is done you are good to go. Have fun and enjoy clicker cord!**')

        await interaction.editReply('Game already set up in this guild, you can edit your game on [Our website](http://localhost:5173/)')

    }
}