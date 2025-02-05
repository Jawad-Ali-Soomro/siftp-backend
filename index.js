const express = require("express");
const { connectDatabase } = require("./_config/connect.db");
const cors = require("cors");
const { userRoute, courseRoute, enrollmentRoute } = require("./_routes");
const contactRoute = require("./_routes/contact.routes");
const sendEmail = require("./sendMail");

require("dotenv").config({ path: "./_config/.env" });

const app = express();

// Connect to Database
connectDatabase();

// Enable CORS with Preflight Support
app.use(cors({
  origin: "*",
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Content-Type, Authorization"
}));
app.options("*", cors()); // Handle preflight requests

// Middleware
app.use(express.json());

// API Routes
app.use("/v1/user", userRoute);
app.use("/v1/course", courseRoute);
app.use("/v1/contact", contactRoute);
app.use("/v1/enrollment", enrollmentRoute);

// Send Email Route
app.post("/send-mail", async (req, res) => {
  try {
    const { email, username, query, message } = req.body;

    if (!email || !username || !query || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const mailSend = await sendEmail({ email, username, query, message });

    console.log("Mail Send Response:", mailSend); // Debugging
    return res.json({ success: true, mailSend });

  } catch (error) {
    console.error("Error sending mail:", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

// Root Route
app.get("/", (req, res) => {
  res.send("Hello, Server is Running!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
