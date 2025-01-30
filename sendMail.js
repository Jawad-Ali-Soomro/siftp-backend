const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const sendEmail = ({ email, username, query, message }) => {
    const mailOptions = {
        from: email,
        to: process.env.TO_EMAIL,
        subject: `New Query from ${username}`,
        text: `You have a new message from ${username} (${email})\n\nQuery: ${query}\n\nMessage: ${message}`
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error: ', error);
                reject(error);
            } else {
                console.log('Email sent: ' + info.response);
                resolve(info);
            }
        });
    });
};

module.exports = sendEmail;
