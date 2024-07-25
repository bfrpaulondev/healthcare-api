const express = require('express');
const { createAppointment, getAppointments, getAppointmentById, updateAppointment, deleteAppointment } = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: API para gerenciamento de consultas
 */

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Cria uma nova consulta
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patient:
 *                 type: string
 *               doctor:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Consulta criada com sucesso
 */
router.post('/', authMiddleware(['admin', 'doctor']), createAppointment);

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Retorna uma lista de consultas
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: Lista de consultas
 */
router.get('/', authMiddleware(['admin', 'doctor']), getAppointments);

/**
 * @swagger
 * /api/appointments/{id}:
 *   get:
 *     summary: Retorna uma consulta pelo ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da consulta
 *     responses:
 *       200:
 *         description: Consulta encontrada
 *       404:
 *         description: Consulta não encontrada
 */
router.get('/:id', authMiddleware(['admin', 'doctor', 'patient']), getAppointmentById);

/**
 * @swagger
 * /api/appointments/{id}:
 *   put:
 *     summary: Atualiza uma consulta pelo ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da consulta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patient:
 *                 type: string
 *               doctor:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Consulta atualizada com sucesso
 *       404:
 *         description: Consulta não encontrada
 */
router.put('/:id', authMiddleware(['admin', 'doctor']), updateAppointment);

/**
 * @swagger
 * /api/appointments/{id}:
 *   delete:
 *     summary: Deleta uma consulta pelo ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da consulta
 *     responses:
 *       200:
 *         description: Consulta deletada com sucesso
 *       404:
 *         description: Consulta não encontrada
 */
router.delete('/:id', authMiddleware(['admin', 'doctor']), deleteAppointment);

module.exports = router;
