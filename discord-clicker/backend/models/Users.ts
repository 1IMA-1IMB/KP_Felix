import { Schema, model } from "mongoose";

const userSchema = new Schema({
    id: String,
    username: String,
    refresh_token: String,
    old_tokens: Array,
})

export default model('Users', userSchema)