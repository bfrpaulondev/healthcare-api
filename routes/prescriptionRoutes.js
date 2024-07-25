const express = require('express');
const { createPrescription, getPrescriptions, getPrescriptionById, updatePrescription, deletePrescription } = require('../controllers/prescriptionController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Prescriptions
 *   description: API para gerenciamento de receitas médicas
 */

/**
 * @swagger
 * /api/prescriptions:
 *   post:
 *     summary: Cria uma nova receita médica
 *     tags: [Prescriptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patient
 *               - doctor
 *               - medication
 *               - dosage
 *               - instructions
 *             properties:
 *               patient:
 *                 type: string
 *               doctor:
 *                 type: string
 *               medication:
 *                 type: string
 *               dosage:
 *                 type: string
 *               instructions:
 *                 type: string
 *     responses:
 *       201:
 *         description: Receita criada com sucesso
 *       500:
 *         description: Erro do servidor
 */
router.post('/', authMiddleware(['admin', 'doctor']), createPrescription);

/**
 * @swagger
 * /api/prescriptions:
 *   get:
 *     summary: Retorna uma lista de receitas médicas
 *     tags: [Prescriptions]
 *     responses:
 *       200:
 *         description: Lista de receitas médicas
 */
router.get('/', authMiddleware(['admin', 'doctor']), getPrescriptions);

/**
 * @swagger
 * /api/prescriptions/{id}:
 *   get:
 *     summary: Retorna uma receita médica pelo ID
 *     tags: [Prescriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da receita médica
 *     responses:
 *       200:
 *         description: Receita médica encontrada
 *       404:
 *         description: Receita médica não encontrada
 */
router.get('/:id', authMiddleware(['admin', 'doctor', 'patient']), getPrescriptionById);

/**
 * @swagger
 * /api/prescriptions/{id}:
 *   put:
 *     summary: Atualiza uma receita médica pelo ID
 *     tags: [Prescriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da receita médica
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               medication:
 *                 type: string
 *               dosage:
 *                 type: string
 *               instructions:
 *                 type: string
 *     responses:
 *       200:
 *         description: Receita médica atualizada com sucesso
 *       404:
 *         description: Receita médica não encontrada
 */
router.put('/:id', authMiddleware(['admin', 'doctor']), updatePrescription);

/**
 * @swagger
 * /api/prescriptions/{id}:
 *   delete:
 *     summary: Deleta uma receita médica pelo ID
 *     tags: [Prescriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da receita médica
 *     responses:
 *       200:
 *         description: Receita médica deletada com sucesso
 *       404:
 *         description: Receita médica não encontrada
 */
router.delete('/:id', authMiddleware(['admin']), deletePrescription);

module.exports = router;
