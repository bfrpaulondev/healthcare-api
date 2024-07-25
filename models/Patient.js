const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    medicalHistory: [{ type: String }],
    prescriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' }]
});

module.exports = mongoose.model('Patient', PatientSchema);
