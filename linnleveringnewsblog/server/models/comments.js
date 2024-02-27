const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const commentSchema = new Schema({
    article: {
        type: String,
        require: true
    },
    user: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('comments', commentSchema)