import { Schema, model } from "mongoose";

const gameSchema = new Schema({
    guildId: String,
    currency: String,
    emoji: String,
    name: String,
    color: String,
    store: [{
        name: String,
        description: String,
        price: Number,
        isCustomRole: Boolean,
        roleId: String,
        emoji: String
    }]
})

export default model('Games', gameSchema)