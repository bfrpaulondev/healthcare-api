const nodemailer = require('nodemailer');
const config = require('../config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.emailUser,
        pass: config.emailPass,
    },
});

exports.sendAppointmentNotification = (recipient, counterpart, date) => {
    const mailOptions = {
        from: config.emailUser,
        to: recipient.email,
        subject: 'Nova Consulta Agendada',
        text: `Você tem uma nova consulta agendada com ${counterpart.name} para o dia ${date}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};
