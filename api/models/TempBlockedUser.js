const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TempBlockedUser = new Schema({
    ip: {
        type: String,
        required: true,
        index: { unique: true }
    },
    countRequest: {
        type: Number,
        required: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    expiresAt: {
        type: Date,
        timestamp: true,
        default: 60000
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('TempBlockedUser', TempBlockedUser)
