import { SlashCommandBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonInteraction, StringSelectMenuOptionBuilder, StringSelectMenuInteraction, CommandInteraction, PermissionFlagsBits, ActionRowBuilder, ActionRow, ComponentType, ButtonStyle, Message, User, Role } from "discord.js";
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

        let itemId: number
        let name: string
        let description: string
        let price: number
        let isCustomRole: boolean
        let roleId: string
        let emoji: string

        let roleColor: any = '#FFFFFF'



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

        const setItemAcceptButton = new ButtonBuilder()
            .setLabel('Accept')
            .setCustomId('set-item-accept')
            .setStyle(ButtonStyle.Success)

        const setItemDeclineButton = new ButtonBuilder()
            .setLabel('Decline')
            .setCustomId('set-item-decline')
            .setStyle(ButtonStyle.Danger)

        const addRow: any = new ActionRowBuilder()
            .addComponents(itemButton, setRoleButton, customRoleButton)

        const setItemRow: any = new ActionRowBuilder()
            .addComponents(setItemAcceptButton, setItemDeclineButton)


        const setRoleRow: any = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Accept')
                    .setCustomId('set-role-accept')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setLabel('Decline')
                    .setCustomId('set-role-decline')
                    .setStyle(ButtonStyle.Danger)
            )


        const game = await Games.findOne({ guildId: guild?.id })

        if (!game) return await interaction.editReply('Game not set up run the </setup:1249609686811021393> command to get started!')

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

            try {

                if (i.customId === 'add-item') {

                    await i.deferUpdate()

                    isCustomRole = false

                    const gameStore = game.store

                    const length = gameStore.length

                    itemId = length + 1

                    let index = 0

                    await interaction.editReply({ components: [], content: '# Item Name: \n\n### Enter the prefered name of your item in this channel, to cancel type "cancel"' })

                    if (!interaction.channel) return await interaction.editReply({ content: 'Error', components: [] })


                    const collectorFilter2 = (m: Message) => m.author.id === interaction.user.id

                    const collector2 = interaction.channel?.createMessageCollector({ filter: collectorFilter2, time: 60_000 * 3, max: 4 })
                    collector2.on('collect', async (m: Message) => {
                        if (index == 0) {
                            const messageString = m.content.toString()

                            if (messageString.length > 20) return await interaction.editReply({ content: 'Name too long (max 20 characters)', components: [] })

                            if (m.content === 'cancel') {

                                await m.delete()

                                collector.stop()

                                return await interaction.editReply({ content: 'Cancelled', components: [] })
                            } else {
                                name = messageString

                                await interaction.editReply({ content: '# Item Description: \n\n### Enter the description of your item in this channel, to cancel type "cancel"' })

                                await m.delete()

                                index++
                            }

                        } else if (index == 1) {
                            const messageString = m.content.toString()

                            if (messageString.length > 200) return await interaction.editReply({ content: 'Description too long (max 200 characters)', components: [] })

                            if (m.content === 'cancel') {

                                await m.delete()

                                collector.stop()

                                return await interaction.editReply({ content: 'Cancelled', components: [] })
                            } else {

                                description = messageString

                                await interaction.editReply({ content: '# Item Price: \n\n### Enter the price of your item in this channel, to cancel type "cancel"' })

                                await m.delete()

                                index++
                            }

                        } else if (index == 2) {
                            const messageNumber = parseInt(m.content)

                            if (m.content === 'cancel') {

                                await m.delete()

                                collector.stop()

                                return await interaction.editReply({ content: 'Cancelled', components: [] })
                            } else {
                                price = messageNumber

                                await interaction.editReply({ content: '# Item Emoji/icon: \n\n### Enter the emoji of your item icon, to cancel type "cancel"' })

                                await m.delete()

                                index++
                            }
                        } else if (index == 3) {
                            const messageString = m.content.toString()

                            if (m.content === 'cancel') {

                                await m.delete()

                                collector.stop()

                                return await interaction.editReply({ content: 'Cancelled', components: [] })

                            } else {

                                emoji = messageString

                                await interaction.editReply({ content: `# Item Creation\n\n ## Are you sure you want to add this item to your guild store?\n\n ### Name: ${name}\n\n ### Description: ${description}\n\n ### Price: ${price}\n\n ### icon: ${emoji}`, components: [setItemRow] })

                                await m.delete()

                                index++

                                collector.stop()
                            }
                        }
                    })

                } else if (i.customId === 'set-item-accept') {

                    try {

                        if (!name || !price || !description || !emoji || !itemId) return await interaction.editReply({ content: 'Pleace fill out all the fields!', components: [] })

                        if (isNaN(price)) return await interaction.editReply({ content: 'Price has to be a number!', components: [] })

                        const storeObj = {
                            itemId: itemId,
                            name: name,
                            description: description,
                            price: price,
                            isCustomRole: isCustomRole,
                            roleId: roleId,
                            emoji: emoji
                        }

                        console.log(storeObj)



                        await game.store.push(storeObj)

                        game.save()

                        await interaction.editReply({ content: 'Item added successfully!', components: [] })

                    } catch (error: Error | unknown) {
                        console.log(error)
                        return await interaction.editReply({ content: 'Error', components: [] })
                    }

                } else if (i.customId === 'set-item-decline') {

                    collector.stop()

                    return await interaction.editReply({ content: 'Cancelled', components: [] })
                }


                else if (i.customId === 'add-setrole') {

                    await i.deferUpdate()

                    await interaction.editReply({ content: '# Role Name:\n\n## Enter the name of the role in this channel, to cancel type "cancel"', components: [] })

                    const collector2 = interaction.channel?.createMessageCollector({ filter: m => m.author.id === interaction.user.id, time: 60_000 * 5, max: 4 })

                    let index = 0

                    collector2?.on('collect', async m => {

                        if (index == 0) {

                            const messageString = m.content.toString()

                            if (messageString.length > 80) return await interaction.editReply('Name too long (max 80 characters)')

                            if (m.content === 'cancel') {

                                m.delete()

                                return await interaction.editReply({ content: 'Cancelled', components: [] })
                            }

                            name = messageString

                            m.delete()

                            await interaction.editReply({ content: '# Role Description: \n\n### Enter the description of your role in this channel, to cancel type "cancel"' })

                            index++

                        } else if (index == 1) {

                            const messageString = m.content.toString()

                            if (messageString.length > 200) return await interaction.editReply({ content: 'Description too long (max 200 characters)', components: [] })

                            if (m.content === 'cancel') {

                                m.delete();

                                return await interaction.editReply({ content: 'Cancelled', components: [] })
                            }

                            description = messageString

                            m.delete()

                            await interaction.editReply({ content: '# Role Price: \n\n### Enter the price of your role in this channel, to cancel type "cancel"' })

                            index++
                        } else if (index == 2) {

                            const messageNumber = parseInt(m.content)

                            if (m.content === 'cancel') {

                                m.delete()
                                return await interaction.editReply({ content: 'Cancelled', components: [] })
                            }

                            if (isNaN(messageNumber)) {

                                m.delete()

                                return await interaction.editReply({ content: 'Price has to be a number!', components: [] })

                            }



                            price = messageNumber


                            m.delete()

                            await interaction.editReply({ content: '# Role Color: \n\n### Enter the color of your role in **hex format**, you can find a hex color code [here](https://htmlcolorcodes.com/), to cancel type "cancel"' })

                            index++

                        } else if (index == 3) {

                            const messageString = m.content.toString()

                            let regexp: any = new RegExp(/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i);

                            if (messageString === 'cancel') {

                                m.delete()

                                return await interaction.editReply({ content: 'Cancelled', components: [] })
                            }



                            if (!regexp.test(messageString)) {

                                m.delete()

                                return await interaction.editReply({ content: 'Invalid color code, please enter a valid color code', components: [] })
                            }

                            roleColor = messageString

                            m.delete()

                            await interaction.editReply({ content: `# Add role to store:\n\n## Are you sure you want to add this role to the guild store?\n\n **Name**: ${name}\n **Description**: ${description}\n **Price**: ${price}\n **Color**: ${roleColor}`, components: [setRoleRow] })

                        }
                    })

                } else if (i.customId === 'set-role-accept') {

                    try {

                        if (!roleColor || !name || !description || !price) return await interaction.editReply({ content: 'Error', components: [] })

                        const role = await interaction.guild?.roles.create({
                            name: name,
                            color: roleColor,
                        })

                        const roleId = await role?.id



                        const object = {
                            itemId: itemId,
                            roleId: roleId,
                            description: description,
                            price: price,
                            isCustomRole: false
                        }

                        game.store.push(object)

                        game.save()

                        i.deferUpdate()

                        return await interaction.editReply({ content: `Successfully created and added ${role} to the guild store! `, components: [] })

                    } catch (error: Error | unknown) {
                        console.log(error)
                    }

                } else if (i.customId === 'set-role-decline') {

                    collector.stop()

                    return await interaction.editReply({ content: 'Cancelled', components: [] })

                } else if (i.customId === 'add-customrole') {

                }

            } catch (error: Error | unknown) {
                console.log(error)
            }
        })
    }
}