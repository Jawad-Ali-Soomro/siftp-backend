const { createUser, loginUser, verify2FA } = require("./user.controller");
const { createCourse, getAll, getSingle } = require("./course.controller");
const createContact = require("./contact.contoller");
const { createEnrollment } = require("./enrollment.contoller");
createEnrollment
module.exports = {
  createUser,
  loginUser,
  createCourse,
  getAll,
  getSingle,
  createContact,
  verify2FA,
  createEnrollment
};
