const { Schema, model } = require('mongoose')

const userSchema = new Schema(
    {
        userId: {
            type: String,
            default: 0
        }, 
        userName: {
            type: String,
            default: 0
        },
        avatarURL: {
            type: String, 
            default: 0
        },
        refreshToken: {
            type: String,
            default: 0
        }, 
        token: {
            type: String,
            default: 0
        }
    }
)

module.exports = model('Users', userSchema)