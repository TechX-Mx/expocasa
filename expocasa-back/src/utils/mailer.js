require('dotenv').config({ path: './.env' });
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAILER_MAIL,
        pass: process.env.MAILER_PASS,
    }
});

module.exports = transporter;