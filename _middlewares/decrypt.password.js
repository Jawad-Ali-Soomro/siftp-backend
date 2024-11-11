const bcrypt = require("bcryptjs");
const descryptPassword = async ({ password, encryptedPassword }) => {
  const isDecrypted = await bcrypt.compare(password, encryptedPassword);
  if (isDecrypted) {
    return isDecrypted;
  } else {
    return console.log("Password Decryption Couldn't Be Done!");
  }
};

module.exports = {
  descryptPassword,
};
