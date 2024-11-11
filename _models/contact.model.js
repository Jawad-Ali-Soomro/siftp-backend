const mongoose = require('mongoose')
const contactSchema = new mongoose.Schema({
    username: String,
    email: String,
    query: String,
    message: String
})

const Contact  = mongoose.model("Contact", contactSchema)
module.exports = Contact