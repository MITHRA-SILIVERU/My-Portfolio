const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Environment variable check (optional for development)
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.warn("⚠️  Warning: EMAIL_USER and EMAIL_PASS not set. Email functionality will not work.");
}

// Create email transporter (only if credentials exist)
let contactEmail;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
const contactEmail = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT), // 465
  secure: true, // true for port 465, false for 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use Gmail App Password
    },
   tls: {
    rejectUnauthorized: false // Helps with some hosting providers
  }
  });

  // Verify email configuration
  contactEmail.verify((error) => {
  if (error) {
    console.log("❌ SMTP Connection Failed:", error);
  } else {
    console.log("✅ SMTP Ready to Send Emails");
  }
});
}

// Contact form endpoint
app.post("/api/contact", (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  // Combine first and last name
  const fullName = `${firstName || ''} ${lastName || ''}`.trim();

  // Log received data
  console.log("===== Contact Form Submission =====");
  console.log("Name:", fullName);
  console.log("Email:", email);
  console.log("Phone:", phone || "Not provided");
  console.log("Message:", message);
  console.log("===================================");

  // Validation
  if (!email || !message) {
    return res.status(400).json({ 
      code: 400, 
      message: "Email and message are required!" 
    });
  }

  // If email service is configured, send email
  if (contactEmail) {
    const mail = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `Portfolio Contact from ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <hr>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <hr>
          <h3>Message:</h3>
          <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `,
      replyTo: email, // Allow replying directly to the sender
    };

    contactEmail.sendMail(mail, (error) => {
      if (error) {
        console.error("❌ Error sending email:", error);
        return res.status(500).json({ 
          code: 500, 
          message: "Failed to send message. Please try again." 
        });
      } else {
        console.log("✅ Email sent successfully!");
        return res.json({ 
          code: 200, 
          message: "Message sent successfully!" 
        });
      }
    });
  } else {
    // If no email configured, just log and return success
    console.log("📝 Email not configured. Form data logged above.");
    return res.json({ 
      code: 200, 
      message: "Message received successfully!" 
    });
  }
});

// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from React build folder
  app.use(express.static(path.join(__dirname, '../../build')));
  
  // Handle React routing - return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

