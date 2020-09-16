const mongoose = require('mongoose')

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'Connection error:'))
db.once('open', () => {
    console.log('MongoDB has been connected...')
})

module.exports = db
