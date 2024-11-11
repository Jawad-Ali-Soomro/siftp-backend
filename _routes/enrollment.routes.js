const express = require('express') 
const { createEnrollment } = require('../_controllers')
const enrollmentRoute = express.Router()

enrollmentRoute.post('/new', createEnrollment)

module.exports = enrollmentRoute