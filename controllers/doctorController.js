const Doctor = require('../models/Doctor');

exports.createDoctor = async (req, res, next) => {
    const { name, email, specialty, phone } = req.body;
    try {
        const doctor = new Doctor({ name, email, specialty, phone });
        await doctor.save();
        res.status(201).json({ message: 'Doctor registered successfully', doctor });
    } catch (error) {
        next(error);
    }
};

exports.getDoctors = async (req, res, next) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (error) {
        next(error);
    }
};

exports.getDoctorById = async (req, res, next) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json(doctor);
    } catch (error) {
        next(error);
    }
};

exports.updateDoctor = async (req, res, next) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json(doctor);
    } catch (error) {
        next(error);
    }
};

exports.deleteDoctor = async (req, res, next) => {
    try {
        await Doctor.findByIdAndDelete(req.params.id);
        res.json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        next(error);
    }
};
