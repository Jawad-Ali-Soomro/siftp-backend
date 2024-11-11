const {
  hashPassword,
  descryptPassword,
  generateToken,
} = require("../_middlewares");
const { User } = require("../_models");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const createUser = async (req, res) => {
  try {
    const findUser = await User.findOne({
      $or: [{ email: req.body.email }, { phone_number: req.body.email }],
    });
    if (findUser) {
      return res.status(200).json({ msg: "This Account Already Exists!" });
    }

    const hashedPassword = await hashPassword({ password: req.body.password });

    const secret = speakeasy.generateSecret({ name: "Sindh Institute Of Freelance Training Program" });

    const referenceId = Math.random().toString(36).substr(2, 9);  

    

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
      twoFactorSecret: secret.base32,
      referenceId: referenceId,
    });

    if (!newUser) {
      return res.status(300).json({ msg: "Error While Creating User!" });
    }
   

    const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);

    return res.status(201).json({
      newUser,
      msg: "User Created Successfully! Scan the QR code with an authenticator app to enable 2FA.",
      qrCodeUrl,
      referenceId: newUser.referenceId, 
    });
  } catch (error) {
    return res.status(500).json({ msg: "Error During Process. Please Try Again!" });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.email }, { phone_number: req.body.email }],
    });

    if (!user) {
      return res.status(400).json({ msg: "User Not Found!" });
    }

    // Check if the password is correct
    const isPasswordValid = await descryptPassword({
      password: req.body.password,
      encryptedPassword: user.password,
    });

    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Incorrect Password!" });
    }

    // If user has 2FA enabled, send the QR code for validation
    if (user.twoFactorSecret) {
      const secret = user.twoFactorSecret;  // Get the 2FA secret from the user's record
      const qrCodeUrl = await qrcode.toDataURL(speakeasy.otpauthURL({
        secret: secret,
        label: 'Sindh Institute Of Freelance Training Program',
        algorithm: 'sha1'
      }));

      return res.status(206).json({
        msg: "2FA Validation Required",
        qrCodeUrl,  // Send the QR code URL to the frontend
        user
      });
    }

    const generatedToken = await generateToken(user);
    return res.status(200).json({
      msg: "Logged In Successfully!",
      token: generatedToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Login Error. Please Try Again!" });
  }
};

const verify2FA = async (req, res) => {
  try {

    const user = await User.findOne({ _id: req.body.userId });
    const { token } = req.body;

    const isVerified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
      window: 1,
    });

    if (isVerified) {
      const generatedToken = await generateToken(user);
      return res.status(200).json({
        msg: "2FA Verified. Logged In Successfully!",
        token: generatedToken,
      });
    } else {
      return res.status(201).json({ msg: "Invalid 2FA Code!" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "2FA Verification Error. Please Try Again!" });
  }
};

module.exports = {
  createUser,
  loginUser,
  verify2FA,
};
