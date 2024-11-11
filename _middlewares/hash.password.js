const bcrypt = require("bcryptjs");
const hashPassword = async ({ password }) => {
  const isHashed = await bcrypt.hash(password, 10);
  if (isHashed) {
    return isHashed;
  } else {
    return console.log("Password Hashing Couldn't Be Done!");
  }
};

module.exports = {
  hashPassword,
};
