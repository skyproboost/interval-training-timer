const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    login: {
        type: String,
        required: true,
        index: { unique: true }
    },
    sex: {
      type: String,
      required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    sound: {
        type: String,
        default: null
    },
    templates: [
        {type: Schema.Types.ObjectId, ref: 'Template'}
    ],
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', User)
