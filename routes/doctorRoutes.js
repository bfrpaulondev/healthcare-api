const express = require('express');
const { createDoctor, getDoctors, getDoctorById, updateDoctor, deleteDoctor } = require('../controllers/doctorController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: API para gerenciamento de médicos e especialidades
 */

/**
 * @swagger
 * /api/doctors:
 *   post:
 *     summary: Registra um novo médico
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - specialty
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               specialty:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Médico registrado com sucesso
 *       500:
 *         description: Erro do servidor
 */
router.post('/', authMiddleware(['admin']), createDoctor);

/**
 * @swagger
 * /api/doctors:
 *   get:
 *     summary: Retorna uma lista de médicos
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: Lista de médicos
 */
router.get('/', authMiddleware(['admin', 'doctor']), getDoctors);

/**
 * @swagger
 * /api/doctors/{id}:
 *   get:
 *     summary: Retorna um médico pelo ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do médico
 *     responses:
 *       200:
 *         description: Médico encontrado
 *       404:
 *         description: Médico não encontrado
 */
router.get('/:id', authMiddleware(['admin', 'doctor']), getDoctorById);

/**
 * @swagger
 * /api/doctors/{id}:
 *   put:
 *     summary: Atualiza um médico pelo ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do médico
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
 *               specialty:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Médico atualizado com sucesso
 *       404:
 *         description: Médico não encontrado
 */
router.put('/:id', authMiddleware(['admin']), updateDoctor);

/**
 * @swagger
 * /api/doctors/{id}:
 *   delete:
 *     summary: Deleta um médico pelo ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do médico
 *     responses:
 *       200:
 *         description: Médico deletado com sucesso
 *       404:
 *         description: Médico não encontrado
 */
router.delete('/:id', authMiddleware(['admin']), deleteDoctor);

module.exports = router;
