const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const cors = require("cors");
const brevo = require('@getbrevo/brevo');
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Initialize Brevo API
let apiInstance = null;
if (process.env.BREVO_API_KEY) {
  apiInstance = new brevo.TransactionalEmailsApi();
  apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey, 
    process.env.BREVO_API_KEY
  );
  console.log("✅ Brevo API initialized successfully");
} else {
  console.warn("⚠️  Warning: BREVO_API_KEY not set. Email functionality will not work.");
}

// Contact form endpoint
app.post("/api/contact", async (req, res) => {
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

  // If Brevo API is configured, send email
  if (apiInstance) {
    let sendSmtpEmail = new brevo.SendSmtpEmail();
    
    sendSmtpEmail.subject = `Portfolio Contact from ${fullName}`;
    sendSmtpEmail.htmlContent = `
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
    `;
    
    sendSmtpEmail.sender = { 
      name: "Portfolio Contact Form", 
      email: "9a165e001@smtp-brevo.com" 
    };
    
    sendSmtpEmail.to = [{ 
      email: process.env.YOUR_EMAIL, 
      name: "Portfolio Owner" 
    }];
    
    sendSmtpEmail.replyTo = { 
      email: email, 
      name: fullName 
    };

    try {
      const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log("✅ Email sent successfully:", data);
      return res.json({ 
        code: 200, 
        message: "Message sent successfully!" 
      });
    } catch (error) {
      console.error("❌ Email send failed:", error);
      return res.status(500).json({ 
        code: 500, 
        message: "Failed to send message. Please try again." 
      });
    }
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
