import { Schema, model } from "mongoose";

const GamesaveSchema = new Schema({
    guildId: String,
    userId: String,
    money: Number,
    transactionHistory: [
        {
            Date: Date,
            itemName: String,
            Amount: String
        }
    ]
})

export default model('Gamesaves', GamesaveSchema)