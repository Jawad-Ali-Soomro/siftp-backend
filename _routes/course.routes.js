const express = require("express")
const { createCourse, getAll, getSingle } = require("../_controllers")
const courseRoute = express.Router()

courseRoute.post('/new-course', createCourse)
courseRoute.get('/get-all', getAll)
courseRoute.get('/get/:id', getSingle)

module.exports = courseRoute