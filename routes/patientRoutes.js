const express = require('express');
const { createPatient, getPatients, getPatientById, updatePatient, deletePatient } = require('../controllers/patientController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: API para gerenciamento de pacientes
 */

/**
 * @swagger
 * /api/patients:
 *   post:
 *     summary: Registra um novo paciente
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - dateOfBirth
 *               - address
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *               medicalHistory:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Paciente registrado com sucesso
 *       500:
 *         description: Erro do servidor
 */
router.post('/', authMiddleware(['admin', 'doctor']), createPatient);

/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Retorna uma lista de pacientes
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: Lista de pacientes
 */
router.get('/', authMiddleware(['admin', 'doctor']), getPatients);

/**
 * @swagger
 * /api/patients/{id}:
 *   get:
 *     summary: Retorna um paciente pelo ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do paciente
 *     responses:
 *       200:
 *         description: Paciente encontrado
 *       404:
 *         description: Paciente não encontrado
 */
router.get('/:id', authMiddleware(['admin', 'doctor', 'patient']), getPatientById);

/**
 * @swagger
 * /api/patients/{id}:
 *   put:
 *     summary: Atualiza um paciente pelo ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do paciente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *               medicalHistory:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Paciente atualizado com sucesso
 *       404:
 *         description: Paciente não encontrado
 */
router.put('/:id', authMiddleware(['admin', 'doctor']), updatePatient);

/**
 * @swagger
 * /api/patients/{id}:
 *   delete:
 *     summary: Deleta um paciente pelo ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do paciente
 *     responses:
 *       200:
 *         description: Paciente deletado com sucesso
 *       404:
 *         description: Paciente não encontrado
 */
router.delete('/:id', authMiddleware(['admin']), deletePatient);

module.exports = router;
