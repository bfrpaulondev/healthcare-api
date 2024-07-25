const Appointment = require('../models/Appointment');

exports.getAppointmentReport = async (req, res, next) => {
    const { startDate, endDate } = req.query;
    try {
        const appointments = await Appointment.find({
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }).populate('patient doctor');
        res.json(appointments);
    } catch (error) {
        next(error);
    }
};
