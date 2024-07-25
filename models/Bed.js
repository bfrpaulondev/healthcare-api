const mongoose = require('mongoose');

const BedSchema = new mongoose.Schema({
    ward: { type: String, required: true },
    number: { type: Number, required: true },
    status: { type: String, enum: ['available', 'occupied'], default: 'available' },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', default: null }
});

module.exports = mongoose.model('Bed', BedSchema);
