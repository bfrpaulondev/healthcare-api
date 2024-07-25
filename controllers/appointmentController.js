const Appointment = require('../models/Appointment');
const emailService = require('../services/emailService');

exports.createAppointment = async (req, res, next) => {
    const { patient, doctor, date } = req.body;
    try {
        const appointment = new Appointment({ patient, doctor, date });
        await appointment.save();
        // Enviar notificação para o médico
        emailService.sendAppointmentNotification(doctor, patient, date);
        // Enviar notificação para o paciente
        emailService.sendAppointmentNotification(patient, doctor, date);
        res.status(201).json(appointment);
    } catch (error) {
        next(error);
    }
};

exports.getAppointments = async (req, res, next) => {
    try {
        const appointments = await Appointment.find().populate('patient doctor');
        res.json(appointments);
    } catch (error) {
        next(error);
    }
};

exports.getAppointmentById = async (req, res, next) => {
    try {
        const appointment = await Appointment.findById(req.params.id).populate('patient doctor');
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.json(appointment);
    } catch (error) {
        next(error);
    }
};

exports.updateAppointment = async (req, res, next) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('patient doctor');
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.json(appointment);
    } catch (error) {
        next(error);
    }
};

exports.deleteAppointment = async (req, res, next) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        next(error);
    }
};
