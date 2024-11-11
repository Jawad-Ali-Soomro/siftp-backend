const express = require("express");
const { createUser, loginUser, verify2FA, getProfile } = require("../_controllers");
const userRoute = express.Router();
userRoute.post("/new", createUser);
userRoute.post("/login", loginUser);
userRoute.post("/verify", verify2FA);
userRoute.post("/profile/:userId", getProfile);
module.exports = userRoute;
