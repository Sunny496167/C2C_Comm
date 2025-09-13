const nodemailer = require("nodemailer");
const dotenv = require('dotenv');

dotenv.config();

const transport = nodemailer.createTransport({
    service: "Gmail",
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const sendConfirmationEmail = async (name, email, confirmationCode) => {
    console.log("Sending Email to " + email);

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Confirmation</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    background-color: #f4f4f9;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
                .email-container {
                    background-color: #ffffff;
                    padding: 2rem;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    max-width: 600px;
                    width: 100%;
                    text-align: center;
                }
                h1 {
                    color: #333333;
                    font-size: 2rem;
                    margin-bottom: 1rem;
                }
                h2 {
                    color: #555555;
                    font-size: 1.5rem;
                    margin-bottom: 1.5rem;
                }
                p {
                    color: #777777;
                    font-size: 1rem;
                    margin-bottom: 2rem;
                }
                .btn {
                    display: inline-block;
                    padding: 0.75rem 1.5rem;
                    font-size: 1rem;
                    color: #ffffff;
                    background-color: #007bff;
                    border-radius: 5px;
                    text-decoration: none;
                    transition: background-color 0.3s ease;
                }
                .btn:hover {
                    background-color: #0056b3;
                }
                .footer {
                    margin-top: 2rem;
                    font-size: 0.875rem;
                    color: #999999;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <h1>Email Confirmation</h1>
                <h2>Hello ${name}</h2>
                <p>Thank you for subscribing. Please confirm your email by clicking on the following link:</p>
                <a href="${process.env.CLIENT_URL}/verify-email/${confirmationCode}" class="btn">Confirm Email</a>
                <div class="footer">
                    <p>If you did not create an account, please ignore this email.</p>
                </div>
            </div>
        </body>
        </html>
    `;

    try {
        await transport.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: "Please confirm your account",
            html: htmlContent,
        });
        console.log("Email Sent to " + email);
    } catch (err) {
        console.error("Error sending email:", err);
        throw err;
    }
};

module.exports = sendConfirmationEmail;