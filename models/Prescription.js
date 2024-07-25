const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    medication: { type: String, required: true },
    dosage: { type: String, required: true },
    instructions: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Prescription', PrescriptionSchema);
