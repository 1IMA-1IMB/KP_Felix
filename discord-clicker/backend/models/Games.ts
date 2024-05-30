import { Schema, model } from "mongoose";

const gameSchema = new Schema({
    guildId: String,
    currency: String,
    emoji: String,
    name: String,
})

export default model('Games', gameSchema)