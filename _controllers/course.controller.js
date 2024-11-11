const { Course } = require("../_models");

const createCourse = async (req, res) => {
  const newCourse = await Course.create(req.body);
  if (!newCourse) {
    return res.status(300).json({
      msg: "Error While Creating Course!",
    });
  } else {
    return res.json({
      newCourse,
    });
  }
};

const getAll = async (req,res) => {
  const foundCourses = await Course.find()
  return res.json({
    foundCourses
  })
}

const getSingle = async (req,res) => {
  const {id} = req.params
  const foundCourse = await Course.findById(id)
  return res.json({
    foundCourse
  })
}

module.exports = { createCourse, getAll, getSingle };
