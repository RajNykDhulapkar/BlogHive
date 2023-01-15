const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const Logger = require("../../utils/logger");
const logger = new Logger("EMAIL SERVICE");
const jwt = require("jsonwebtoken");

const BadRequestException = require("../../exceptions/badRequest.exception");

let transporter = nodeMailer.createTransport({
    host: 'smtppro.zoho.in',
    secure: true,
    port: 465,
    auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_PASS
    },
});

async function sendEmail(email, content, subject) {
    // console.log(process.env.ZOHO_EMAIL, process.env.ZOHO_PASS);

    const mailOptions = {
        from: "hello@muneem.live", // sender address
        to: email,
        subject: subject, // Subject line
        html: content, // plain text body
    };

    await transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            logger.error(err);
            console.log(err);
        } else {
            logger.log("Email sent: " + info.accepted);
            // console.log(info);
        }
    })
}

async function sendVerifyEmail(email, url) {
    const content = `
    <div style="text-align: center;">
        <h1>Verify your email</h1>
        <p>Click the button below to verify your email</p>
        <a href="${url}" style="padding: 10px 20px; background-color: #000; color: #fff; text-decoration: none; border-radius: 5px;">Verify Email</a>
    </div>
    `
    await sendEmail(email, content, "Verify your email");
}

// todo move this to auth.util.js
async function decodeConfirmationToken(token) {
    try {
        const payload = await jwt.verify(token, process.env.JWT_EMAIL_VERIFICATION_TOKEN_SECRET);

        if (typeof payload === "object" && "email" in payload) {
            return payload.email;
        }
        throw new BadRequestException();
    } catch (error) {
        throw error
    }
}


module.exports = {
    sendEmail,
    sendVerifyEmail,
    decodeConfirmationToken
};