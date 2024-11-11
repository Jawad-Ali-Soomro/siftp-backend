const express = require("express");
const { connectDatabase } = require("./_config/connect.db");
const app = express();
const serverless = require('serverless-http')
require("dotenv").config({
  path: "./_config/.env",
});
const cors = require("cors");
const { userRoute, courseRoute, enrollmentRoute } = require("./_routes");
const contactRoute = require("./_routes/contact.routes");
const sendEmail = require("./sendMail");
connectDatabase();
app.use(cors());
app.use(express.json());
app.use("/v1/user", userRoute);
app.use("/v1/course", courseRoute);
app.use("/v1/contact", contactRoute);
app.use("/v1/enrollment",enrollmentRoute );
app.post("/send-mail", (req,res) =>{
  const {email, username, query, message} = req.body
  sendEmail({email, username, query, message})
  if(sendEmail) {
    res.json({
      msg: "Sent"
    })
  }
});
app.get('/', (req,res) => {
  res.end("Hello")
})
app.listen(process.env.PORT, () => {
  console.log("working at port.");
});

module.exports.handler = serverless(app);