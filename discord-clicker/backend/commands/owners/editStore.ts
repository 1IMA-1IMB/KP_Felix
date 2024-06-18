import { SlashCommandBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonInteraction, StringSelectMenuOptionBuilder, StringSelectMenuInteraction, CommandInteraction, PermissionFlagsBits, ActionRowBuilder, ActionRow, ComponentType, ButtonStyle, Message, User, Role, EmbedBuilder, roleMention } from "discord.js";
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

        let item: object

        let page = 0

        const itemCheck = (object: any) => {
            if (object.isCustomRole === true) {

                try {
                    return new EmbedBuilder()
                        .setTitle('Custom Role')
                        .setDescription('A fully customisable role that you can define and create yourself.')
                        .addFields(
                            { name: 'Price', value: `${object.price}` }
                        )
                        .setColor('#3b82f6')

                } catch (error: Error | unknown) {
                    console.log(error)
                }
            } else if (object.roleId) {
                try {

                    const role: any = guild?.roles.cache.get(object.roleId)


                    return new EmbedBuilder()
                        .setDescription(`# <@&${object.roleId}> \n\n ${object.description}`)
                        .addFields(
                            { name: 'Price', value: `${object.price}` }
                        )
                        .setColor('#3b82f6')

                } catch (error: Error | unknown) {
                    console.log(error)
                }
            } else {

                try {
                    return new EmbedBuilder()
                        .setTitle(`${object.emoji}${object.name}`)
                        .setDescription(`${object.description}`)
                        .addFields(
                            { name: 'Price', value: `${object.price}` }
                        )

                } catch (error: Error | unknown) {
                    console.log(error)
                }
            }
        }

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
                    .setLabel('Edit/Delete Item')
                    .setDescription('Edit an item in the store')
                    .setValue('edit'),
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

        const customRoleRow: any = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Accept')
                    .setCustomId('set-customrole-accept')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setLabel('Decline')
                    .setCustomId('set-customrole-decline')
                    .setStyle(ButtonStyle.Danger)
            )

        const game = await Games.findOne({ guildId: guild?.id })


        const editRow = () => {

            if (store[page].isCustomRole) {
                return new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel('Change price')
                            .setCustomId('edit-price')
                            .setStyle(ButtonStyle.Success),
                        new ButtonBuilder()
                            .setLabel('Delete')
                            .setCustomId('edit-delete')
                            .setStyle(ButtonStyle.Danger),
                    )
            } else if (store[page].roleId) {
                return new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel('Change price')
                            .setCustomId('edit-price')
                            .setStyle(ButtonStyle.Success),
                        new ButtonBuilder()
                            .setLabel('Change Description')
                            .setCustomId('edit-description')
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel('Delete')
                            .setCustomId('edit-delete')
                            .setStyle(ButtonStyle.Danger)
                    )
            } else {

                return new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel('Change price')
                            .setCustomId('edit-price')
                            .setStyle(ButtonStyle.Success),
                        new ButtonBuilder()
                            .setLabel('Change Description')
                            .setCustomId('edit-description')
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel('Change Icon')
                            .setCustomId('edit-icon')
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setLabel('Delete')
                            .setCustomId('edit-delete')
                            .setStyle(ButtonStyle.Danger)
                    )
            }
        }




        const pagesRow = () => {
            if (page === maxPage && page === 0) {
                return (
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('Previous Page')
                                .setDisabled(true)
                                .setCustomId('previous')
                                .setStyle(ButtonStyle.Primary),
                            new ButtonBuilder()
                                .setLabel('Next Page')
                                .setDisabled(true)
                                .setCustomId('next')
                                .setStyle(ButtonStyle.Primary)
                        )
                )
            } else if (page === maxPage) {
                return (
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('Previous Page')
                                .setCustomId('previous')
                                .setStyle(ButtonStyle.Primary),
                            new ButtonBuilder()
                                .setLabel('Next Page')
                                .setDisabled(true)
                                .setCustomId('next')
                                .setStyle(ButtonStyle.Primary)
                        )
                )
            } else if (page === 0) {
                return (
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('Previous Page')
                                .setDisabled(true)
                                .setCustomId('previous')
                                .setStyle(ButtonStyle.Primary),
                            new ButtonBuilder()
                                .setLabel('Next Page')
                                .setCustomId('next')
                                .setStyle(ButtonStyle.Primary)
                        )
                )
            } else {
                return (
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('Previous Page')
                                .setCustomId('previous')
                                .setStyle(ButtonStyle.Primary),
                            new ButtonBuilder()
                                .setLabel('Next Page')
                                .setCustomId('next')
                                .setStyle(ButtonStyle.Primary)
                        )
                )
            }
        }




        if (!game) return await interaction.editReply('Game not set up run the </setup:1249609686811021393> command to get started!')


        const store = game.store

        const maxPage = store.length - 1

        let currentGame = store[page]



        const response = await interaction.editReply({ content: 'Edit your guild store', components: [row] })

        const collectorFilter = (i: any) => i.user.id === interaction.user.id

        const embed = (title: string, description: string, color: any) => {

            if (!color || !title || !description) return console.log('Error, could not get all fields... ')

            return (
                new EmbedBuilder()
                    .setTitle(title)
                    .setDescription(description)
                    .setColor(color)
            )
        }



        const collector = await response.createMessageComponentCollector({ filter: collectorFilter, time: 60_000, componentType: ComponentType.StringSelect })


        collector.on('collect', async (i: any) => {
            const selection = i.values[0]

            if (selection === 'add') {



                await i.deferUpdate()

                interaction.editReply({ components: [addRow], content: '# Add\n\n## What do you want to add to your guild store?\n\n### 🔵 - A set item whch can be sold on the marketplace\n\n### 🟢 - A set role created by you that can be sold on the market place\n\n### 🔴 - A custom role that can be defined by the user themselves, can only be bought once and can not be sold.' })

            } else if (selection === 'edit') {

                i.deferUpdate()


                if (store.length < 1) return await interaction.editReply({ content: 'You do not have any items in your guild store yet, add one to gain access to this command!', components: [] })


                // const embed2 = embed('Edit Store', '')

                const row: any = pagesRow()

                const rowedit = editRow()

                const element = store[page]


                const embed2: any = itemCheck(element)

                await interaction.editReply({ components: [row, rowedit], embeds: [embed2] })
            }
        })


        const buttonCollector = await response.createMessageComponentCollector({ filter: collectorFilter, time: 60_000, componentType: ComponentType.Button })

        buttonCollector.on('collect', async (i: any) => {

            try {

                if (i.customId === 'next') {
                    page++

                    const element = store[page]

                    i.deferUpdate()

                    const embed2: any = itemCheck(element)

                    const row: any = pagesRow()

                    const rowedit = editRow()

                    await interaction.editReply({ embeds: [embed2], components: [row, rowedit] })
                }

                if (i.customId === 'add-item') {

                    await i.deferUpdate()

                    isCustomRole = false

                    const gameStore = game.store

                    const length = gameStore.length

                    if (length < 1) {
                        itemId = 0
                    } else {
                        const item: any = gameStore[length - 1]

                        console.log(item)

                        const olditemid = parseInt(item.itemId)

                        itemId = olditemid + 1

                        console.log(olditemid, itemId)
                    }

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

                        if (!name || !price || !description || !emoji) return await interaction.editReply({ content: 'Pleace fill out all the fields!', components: [] })

                        if (isNaN(price)) return await interaction.editReply({ content: 'Price has to be a number!', components: [] })

                        const storeObj = {
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

                    try {

                        let index = 0

                        const game2 = await Games.findOne({
                            guildId: interaction.guild?.id, store: {
                                $in: {
                                    isCustomRole: true
                                }
                            }
                        })

                        if (!game2) {

                            const collector2 = interaction.channel?.createMessageCollector({ filter: m => m.author.id === interaction.user.id, time: 60_000 * 2, max: 1 })

                            await interaction.editReply({ content: '# Create a custom role\n\n### Enter the price of a custom role for your server.', components: [] })

                            collector2?.on('collect', async m => {

                                if (index == 0) {

                                    const messageNumber = parseInt(m.content)


                                    if (m.content.length === 0) {

                                        await m.delete()

                                        return await interaction.editReply({ content: 'A price is required!', components: [] })
                                    }

                                    if (isNaN(messageNumber)) {

                                        m.delete()

                                        return await interaction.editReply({ content: 'Price has to be a number!', components: [] })
                                    }

                                    console.log(messageNumber)

                                    price = messageNumber

                                    console.log(price)

                                    await m.delete()

                                    await interaction.editReply({
                                        content: `# Custom role:\n\n## Are you sure you want to add custom roles to your guild store.\n\n **Price**: ${price}`, components: [customRoleRow]
                                    })

                                }
                            })

                        } else return await interaction.editReply({ content: 'You already have a custom role in your guild store, each guild store can only have one custom role. Please atempt to edit or remove the role to add another one.', components: [] })
                    } catch (error: Error | unknown) {
                        console.log(error)
                    }
                } else if (i.customId === 'set-customrole-accept') {

                    try {

                        console.log('Price: ' + price)

                        const object = {
                            itemId: itemId,
                            isCustomRole: true,
                            price: price
                        }

                        game.store.push(object)

                        game.save()

                        await interaction.editReply({ content: 'Successfully added custom role to the guild store!', components: [] })
                    } catch (error: Error | unknown) {
                        console.log(error)
                    }
                } else if (i.customId === 'set-customrole-decline') {

                    await interaction.editReply({ content: 'Cancelled', components: [] })
                }

            } catch (error: Error | unknown) {
                console.log(error)
            }
        })
    }
}