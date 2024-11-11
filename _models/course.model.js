const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Enter Course Name!"],
    },
    description: {
      type: String,
      required: [true, "Please Enter Description Of Course!"],
    },
    image: {
      type: String
    },
    price: {
      type: Number
    },
    outline: [{
      type: String
    }],
    created_at: {
      type: Date,
      default: Date.now,
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
      },
    ],
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
