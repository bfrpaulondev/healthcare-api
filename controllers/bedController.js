const Bed = require('../models/Bed');

exports.createBed = async (req, res, next) => {
    const { ward, number, status, patient } = req.body;
    try {
        const bed = new Bed({ ward, number, status, patient });
        await bed.save();
        res.status(201).json({ message: 'Bed created successfully', bed });
    } catch (error) {
        next(error);
    }
};

exports.getBeds = async (req, res, next) => {
    try {
        const beds = await Bed.find().populate('patient');
        res.json(beds);
    } catch (error) {
        next(error);
    }
};

exports.getBedById = async (req, res, next) => {
    try {
        const bed = await Bed.findById(req.params.id).populate('patient');
        if (!bed) {
            return res.status(404).json({ message: 'Bed not found' });
        }
        res.json(bed);
    } catch (error) {
        next(error);
    }
};

exports.updateBed = async (req, res, next) => {
    try {
        const bed = await Bed.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!bed) {
            return res.status(404).json({ message: 'Bed not found' });
        }
        res.json(bed);
    } catch (error) {
        next(error);
    }
};

exports.deleteBed = async (req, res, next) => {
    try {
        await Bed.findByIdAndDelete(req.params.id);
        res.json({ message: 'Bed deleted successfully' });
    } catch (error) {
        next(error);
    }
};
