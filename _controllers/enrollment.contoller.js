const { User, Enrollment, Course } = require("../_models");

exports.createEnrollment = async (req, res) => {
  try {
    const newEnrollment = await Enrollment.create(req.body);
    if (!newEnrollment) {
      return res.status(500).json({ msg: "Error while creating enrollment" });
    }

    if (req.body.refer) {
      const referringUser = await User.findOne({ referenceId: req.body.refer });

      if (referringUser) {
        referringUser.referredStudents.push(newEnrollment._id);

        await referringUser.save();
        return res.status(201).json({
          msg: "Enrollment created successfully with referral!",
          newEnrollment,
          referringUser
        });
      } else {
        return res.status(404).json({ msg: "Referring user not found!" });
      }
    }

    const userInfo = await User.findById(req.body.userId)
    const courseInfo = await Course.findById(req.body.courseId)
    if (userInfo) {
      userInfo.enrolledCourses.push(courseInfo?._id)
      courseInfo.enrolledStudents.push(userInfo?._id)
      await userInfo.save()
      await courseInfo.save()
    }

    return res.status(201).json({
      msg: "Enrollment created successfully!",
      newEnrollment
    });

  } catch (error) {
    console.log(error)
    // console.error(error);
    // return res.status(500).json({ msg: "Error during the enrollment process." });
  }
};
