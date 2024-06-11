import { SlashCommandBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonInteraction, StringSelectMenuOptionBuilder, StringSelectMenuInteraction, CommandInteraction, PermissionFlagsBits, ActionRowBuilder, ActionRow, ComponentType, ButtonStyle } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('edit-guild-store')
        .setDescription('edit your guildstore')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction: CommandInteraction) {

        const { guild, user } = interaction

        await interaction.deferReply({ ephemeral: true })



        if (guild?.ownerId !== user.id) return await interaction.editReply('Only the guild owner can use this command')


        const select = new StringSelectMenuBuilder()
            .setCustomId('options')
            .setPlaceholder('What do you want to edit')
            .setMaxValues(1)
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Add item')
                    .setDescription('Add an item to the store')
                    .setValue('add'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Edit Item')
                    .setDescription('Edit an item in the store')
                    .setValue('edit'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Delete Item')
                    .setDescription('Delete an item from the store')
                    .setValue('delete')
            )

        const row: any = new ActionRowBuilder()
            .addComponents(select)


        const itemButton = new ButtonBuilder()
            .setLabel('Item')
            .setStyle(ButtonStyle.Primary)
            .setCustomId('item')

        const setRoleButton = new ButtonBuilder()
            .setLabel('Set-Role')
            .setCustomId('setrole')
            .setStyle(ButtonStyle.Success)

        const customRoleButton = new ButtonBuilder()
            .setLabel('Custom-Role')
            .setCustomId('customrole')
            .setStyle(ButtonStyle.Danger)

        const addRow: any = new ActionRowBuilder()
            .addComponents(itemButton, setRoleButton, customRoleButton)

        const response = await interaction.editReply({ content: 'Edit your guild store', components: [row] })

        const collectorFilter = (i: any) => i.user.id === interaction.user.id

        const collector = await response.createMessageComponentCollector({ filter: collectorFilter, time: 60_000, componentType: ComponentType.StringSelect })


        collector.on('collect', async (i) => {
            const selection = i.values[0]

            if (selection === 'add') {

                interaction.deleteReply()

                const response2 = await interaction.followUp({ components: [addRow], content: '', ephemeral: true })


                const collector2 = await response2.createMessageComponentCollector({ filter: collectorFilter, time: 60_000, componentType: ComponentType.StringSelect })

                collector2.on('collect', async (i: any) => {

                    const selection2 = i.values[0]

                    if (selection2 === 'item') {

                    } else if (selection2 === 'setrole') {

                    } else if (selection2 === 'customrole') {

                    }
                })

            } else if (selection === 'edit') {
                await interaction.editReply({ content: 'Edit selected', components: [] })
            } else if (selection === 'delete') {
                await interaction.editReply({ content: 'Delete selected', components: [] })
            }
        })
    }
}