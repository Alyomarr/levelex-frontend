// api/contact.js

const { Resend } = require("resend");

// Initialize Resend with the API key from Vercel Environment Variables
const resend = new Resend(process.env.RESEND_API_KEY);
const contactEmailTo = process.env.CONTACT_EMAIL_TO;

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // Or your specific domain
  res.setHeader(
    "Access-Control-Allow-Headers",
    "authorization, x-client-info, apikey, content-type"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  // Handle OPTIONS preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Check if required env vars are set
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set.");
    return res.status(500).json({ error: "Server configuration error." });
  }
  if (!contactEmailTo) {
    console.error("CONTACT_EMAIL_TO is not set.");
    return res.status(500).json({ error: "Server configuration error." });
  }

  try {
    // 1. Get form data from the request body
    const { name, email, subject, message } = req.body;

    // 2. Simple validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Please fill out all fields." });
    }

    // 3. Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: "Levelex Contact Form <onboarding@resend.dev>", // Required by Resend's free tier
      to: [contactEmailTo], // Your verified personal email
      subject: `New Contact Form Submission: ${subject}`,
      reply_to: email, // Set the 'Reply-To' to the user's email
      html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2>New Message from Levelex Contact Form</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <hr>
                    <p><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap;">${message}</p>
                </div>
            `,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ error: "Error sending message." });
    }

    // 4. Send success response
    return res.status(200).json({ message: "Thanks! Message sent." });
  } catch (error) {
    console.error("General error:", error);
    return res.status(500).json({ error: "An unexpected error occurred." });
  }
};
