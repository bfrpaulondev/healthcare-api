const Prescription = require('../models/Prescription');

exports.createPrescription = async (req, res, next) => {
    const { patient, doctor, medication, dosage, instructions } = req.body;
    try {
        const prescription = new Prescription({ patient, doctor, medication, dosage, instructions });
        await prescription.save();
        res.status(201).json({ message: 'Prescription created successfully', prescription });
    } catch (error) {
        next(error);
    }
};

exports.getPrescriptions = async (req, res, next) => {
    try {
        const prescriptions = await Prescription.find().populate('patient doctor');
        res.json(prescriptions);
    } catch (error) {
        next(error);
    }
};

exports.getPrescriptionById = async (req, res, next) => {
    try {
        const prescription = await Prescription.findById(req.params.id).populate('patient doctor');
        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }
        res.json(prescription);
    } catch (error) {
        next(error);
    }
};

exports.updatePrescription = async (req, res, next) => {
    try {
        const prescription = await Prescription.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }
        res.json(prescription);
    } catch (error) {
        next(error);
    }
};

exports.deletePrescription = async (req, res, next) => {
    try {
        await Prescription.findByIdAndDelete(req.params.id);
        res.json({ message: 'Prescription deleted successfully' });
    } catch (error) {
        next(error);
    }
};
