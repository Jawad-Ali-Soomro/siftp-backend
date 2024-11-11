const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'mail.siftp.com',
    port: 465,
    secure: true,
    auth: {
        user: 'info@siftp.com',
        pass: '=&+}#H?L*6ye'
    }
});

const sendEmail = ({ email, username, query, message }) => {
    const mailOptions = {
        from: 'info@siftp.com',
        to: 'info@siftp.com',
        subject: `New Query from ${username}`,
        text: `You have a new message from ${username} (${email})\n\nQuery: ${query}\n\nMessage: ${message}`  // Email body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error: ', error);
        } else {
            return
        }
    });
};

module.exports = sendEmail;
