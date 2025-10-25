const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config(); // Add dotenv package

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/", router);

// Environment variable check
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("❌ Error: EMAIL_USER and EMAIL_PASS must be set in .env file");
  process.exit(1);
}

// Create email transporter
const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // This should be an App Password, not your regular password
  },
});

// Verify email configuration
contactEmail.verify((error) => {
  if (error) {
    console.error("❌ Email configuration error:", error);
  } else {
    console.log("✅ Email service is ready to send messages");
  }
});

// Contact form endpoint
router.post("/contact", (req, res) => {
  const { firstName, lastName, email, message, phone } = req.body;

  // Validation
  if (!firstName || !email || !message) {
    return res.status(400).json({ 
      code: 400, 
      status: "Missing required fields" 
    });
  }

  const name = `${firstName} ${lastName || ""}`.trim();
  
  const mail = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Fixed typo: mithrasiliver -> mithrasiliveru
    subject: "Contact Form Submission - Portfolio",
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
    replyTo: email,
  };

  contactEmail.sendMail(mail, (error) => {
    if (error) {
      console.error("❌ Error sending email:", error);
      res.status(500).json({ 
        code: 500, 
        status: "Message failed to send" 
      });
    } else {
      console.log("✅ Email sent successfully!");
      res.json({ 
        code: 200, 
        status: "Message sent successfully" 
      });
    }
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
