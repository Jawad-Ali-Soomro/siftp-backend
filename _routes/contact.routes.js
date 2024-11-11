const express =  require('express')
const { createContact } = require('../_controllers')
const contactRoute = express.Router()

contactRoute.post('/new', createContact)

module.exports = contactRoute