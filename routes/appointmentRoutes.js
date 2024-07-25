// routes/appointmentRoutes.js
const express = require('express');
const { createAppointment, getAppointments, getAppointmentById, updateAppointment, deleteAppointment } = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware(['admin', 'doctor']), createAppointment);
router.get('/', authMiddleware(['admin', 'doctor']), getAppointments);
router.get('/:id', authMiddleware(['admin', 'doctor', 'patient']), getAppointmentById);
router.put('/:id', authMiddleware(['admin', 'doctor']), updateAppointment);
router.delete('/:id', authMiddleware(['admin', 'doctor']), deleteAppointment);

module.exports = router;
