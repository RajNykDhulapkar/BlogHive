const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const Logger = require("../../utils/logger");
const logger = new Logger("EMAIL SERVICE");

const mail = require("@sendgrid/mail");

mail.setApiKey(process.env.SENDGRID_API_KEY);


// var API_KEY = 'Your_Api_Key';
// var DOMAIN = 'Your_Domain';
// var mailgun = require('mailgun-js')
//     ({ apiKey: API_KEY, domain: DOMAIN });


// let transporter = nodeMailer.createTransport({
//     host: 'smtppro.zoho.in',
//     secure: true,
//     port: 465,
//     auth: {
//         user: process.env.ZOHO_EMAIL,
//         pass: process.env.ZOHO_PASS
//     },
// });

// for bitnaysh mail
let transporter = nodeMailer.createTransport({
    host: process.env.MAILGUN_EMAIL_HOST,
    secure: false,
    port: parseInt(process.env.MAILGUN_EMAIL_PORT || 587),
    auth: {
        user: process.env.MAILGUN_EMAIL,
        pass: process.env.MAILGUN_EMAIL_PASS
    },
});

async function sendEmail(email, content, subject) {
    const mailOptions = {
        from: "hello@muneem.live", // sender address
        to: email,
        subject: subject, // Subject line
        html: content, // plain text body
    };

    // await mailgun.messages().send(mailOptions, (error, body) => {
    //     if (error) console.log(error)
    //     else console.log(body);
    // });

    // mail.send(mailOptions).then(() => {
    //     logger.log("Email sent: " + email);
    // }).catch((err) => {
    //     logger.error(err);
    //     console.log(err);
    // })


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
    // console.log(process.env.ZOHO_EMAIL, process.env.ZOHO_PASS);
    const content = `
    <div style="text-align: center;">
        <h1>Verify your email</h1>
        <p>Click the button below to verify your email</p>
        <a href="${url}" style="padding: 10px 20px; background-color: #000; color: #fff; text-decoration: none; border-radius: 5px;">Verify Email</a>
    </div>
    `
    await sendEmail(email, content, "Verify your email");
}


module.exports = {
    sendEmail,
    sendVerifyEmail
};