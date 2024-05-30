import { Schema, model } from "mongoose";

const gameSchema = new Schema({
    guildId: String,
    currency: String,
    emoji: String,
    name: String,
    color: String,
})

export default model('Games', gameSchema)