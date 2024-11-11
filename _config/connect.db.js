const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("database connected");
    });
  } catch (error) {
    return console.log("error", error);
  }
};

module.exports = {
  connectDatabase,
};
