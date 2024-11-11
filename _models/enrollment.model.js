const mongoose = require('mongoose')
const enrollmentSchema = new mongoose.Schema({
    username: String,
    fathers_name: String,
    phone_number: String,
    email: String,
    dob: String,
    link: String,
    qualifications: String,
    plan: String,
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    payment_status: {
        type: Boolean,
        default: false
    }
})

const Enrollment = mongoose.model("Enrollment", enrollmentSchema)
module.exports = Enrollment