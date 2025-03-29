const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "shafiquebughio153@gmail.com", // Your Gmail address
        pass: process.env.EMAIL_PASSWORD || "mtnv nqdt zhju xjlw"     // App password (Not your Gmail password)
    }
});

const sendEmailNotification = async (senderEmail,receiverEmail, senderName, messageText, receiverName) => {
    const mailOptions = {
        from: senderEmail,
        to: receiverEmail,
        subject: "New Message Notification",
        html: `
        <div style="font-family: Arial, sans-serif; padding: 15px; background-color: #f4f4f4;">
            <div style="max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
                <h2 style="color: #333; text-align: center;">📩 New Message Notification</h2>
                <p style="font-size: 16px; color: #555;">
                    <strong style="color: #000;">${receiverName}</strong>, you have received a new message from 
                    <strong style="color: #007bff;">${senderName}</strong>.
                </p>
                <div style="background-color: #f8f9fa; padding: 10px; border-left: 4px solid #007bff; margin-top: 15px; font-size: 15px; color: #333;">
                    <strong>Message:</strong><br>
                    <em>${messageText}</em>
                </div>
                <p style="margin-top: 20px; font-size: 14px; color: #777;">Please check your inbox to reply.</p>
                <hr style="border: none; border-top: 1px solid #ddd; margin-top: 20px;">
                <p style="text-align: center; font-size: 12px; color: #888;">
                    This is an automated email. Please do not reply.
                </p>
            </div>
        </div>
    `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = sendEmailNotification;
