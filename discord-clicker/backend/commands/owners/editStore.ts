import { SlashCommandBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonInteraction, StringSelectMenuOptionBuilder, StringSelectMenuInteraction, CommandInteraction, PermissionFlagsBits, ActionRowBuilder, ActionRow, ComponentType, ButtonStyle, Message } from "discord.js";
import Games from '../../models/Games'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('edit-guild-store')
        .setDescription('edit your guildstore')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction: CommandInteraction) {

        const { guild, user, channel } = interaction

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
            .setCustomId('add-item')

        const setRoleButton = new ButtonBuilder()
            .setLabel('Set-Role')
            .setCustomId('add-setrole')
            .setStyle(ButtonStyle.Success)

        const customRoleButton = new ButtonBuilder()
            .setLabel('Custom-Role')
            .setCustomId('add-customrole')
            .setStyle(ButtonStyle.Danger)

        const addRow: any = new ActionRowBuilder()
            .addComponents(itemButton, setRoleButton, customRoleButton)

        const response = await interaction.editReply({ content: 'Edit your guild store', components: [row] })

        const collectorFilter = (i: any) => i.user.id === interaction.user.id



        const collector = await response.createMessageComponentCollector({ filter: collectorFilter, time: 60_000, componentType: ComponentType.StringSelect })


        collector.on('collect', async (i: any) => {
            const selection = i.values[0]

            if (selection === 'add') {



                await i.deferUpdate()

                interaction.editReply({ components: [addRow], content: '# Add\n\n## What do you want to add to your guild store?\n\n### 🔵 - A set item whch can be sold on the marketplace\n\n### 🟢 - A set role created by you that can be sold on the market place\n\n### 🔴 - A custom role that can be defined by the user themselves, can only be bought once and can not be sold.' })

            } else if (selection === 'edit') {
                await interaction.editReply({ content: 'Edit selected', components: [] })
            } else if (selection === 'delete') {
                await interaction.editReply({ content: 'Delete selected', components: [] })
            }
        })


        const buttonCollector = await response.createMessageComponentCollector({ filter: collectorFilter, time: 60_000, componentType: ComponentType.Button })

        buttonCollector.on('collect', async (i: any) => {

            if (i.customId === 'add-item') {

                await i.deferUpdate()

                await interaction.editReply({ components: [], content: '# Item Name: \n\n### Enter the prefered name of your item in this channel, to cancel type "cancel"' })

                if (!interaction.channel) return await interaction.editReply({ content: 'Error', components: [] })

                const collector2 = await interaction.channel.createMessageCollector({ filter: collectorFilter, time: 60_000, max: 1 })

                collector2?.on('collect', async (m: any) => {

                    console.log(m.content)

                    if (m.content === 'cancel') return await interaction.editReply({ content: 'Cancelled', components: [] })

                })

            } else if (i.customId === 'add-setrole') {

            } else if (i.customId === 'add-customrole') {

            }
        })
    }
}