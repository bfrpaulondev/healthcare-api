const Patient = require('../models/Patient');

exports.createPatient = async (req, res, next) => {
    const { name, email, dateOfBirth, address, phone, medicalHistory } = req.body;
    try {
        const patient = new Patient({ name, email, dateOfBirth, address, phone, medicalHistory });
        await patient.save();
        res.status(201).json({ message: 'Patient registered successfully', patient });
    } catch (error) {
        next(error);
    }
};

exports.getPatients = async (req, res, next) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (error) {
        next(error);
    }
};

exports.getPatientById = async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.id).populate('prescriptions');
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json(patient);
    } catch (error) {
        next(error);
    }
};

exports.updatePatient = async (req, res, next) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json(patient);
    } catch (error) {
        next(error);
    }
};

exports.deletePatient = async (req, res, next) => {
    try {
        await Patient.findByIdAndDelete(req.params.id);
        res.json({ message: 'Patient deleted successfully' });
    } catch (error) {
        next(error);
    }
};
