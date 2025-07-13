const mongoose = require('mongoose')

//connect MongoDB

async function connectMongoDB(url) {
    return mongoose.connect('mongodb://127.0.0.1:27017/students')
}

module.exports = { connectMongoDB}