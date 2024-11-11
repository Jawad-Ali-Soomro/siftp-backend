const jwt = require("jsonwebtoken");

const generateToken = async (data) => {
  try {
    // Generate the JWT
    const token = await jwt.sign({ data }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return token;
  } catch (error) {
    console.log("Error generating token:", error);
    return null;  // You can return null or throw an error, depending on your needs
  }
};

module.exports = generateToken;
