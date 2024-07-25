// services/emailService.js
const nodemailer = require('nodemailer');
const config = require('../config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.emailUser,
        pass: config.emailPass,
    },
});

exports.sendAppointmentNotification = (doctor, patient, date) => {
    const mailOptions = {
        from: config.emailUser,
        to: doctor.email,
        subject: 'Nova Consulta Agendada',
        text: `Você tem uma nova consulta agendada com ${patient.name} para o dia ${date}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};
