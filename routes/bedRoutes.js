const express = require('express');
const { createBed, getBeds, getBedById, updateBed, deleteBed } = require('../controllers/bedController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Beds
 *   description: API para gerenciamento de leitos
 */

/**
 * @swagger
 * /api/beds:
 *   post:
 *     summary: Cria um novo leito
 *     tags: [Beds]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ward:
 *                 type: string
 *               number:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [available, occupied]
 *               patient:
 *                 type: string
 *     responses:
 *       201:
 *         description: Leito criado com sucesso
 */
router.post('/', authMiddleware(['admin']), createBed);

/**
 * @swagger
 * /api/beds:
 *   get:
 *     summary: Retorna uma lista de leitos
 *     tags: [Beds]
 *     responses:
 *       200:
 *         description: Lista de leitos
 */
router.get('/', authMiddleware(['admin', 'doctor']), getBeds);

/**
 * @swagger
 * /api/beds/{id}:
 *   get:
 *     summary: Retorna um leito pelo ID
 *     tags: [Beds]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do leito
 *     responses:
 *       200:
 *         description: Leito encontrado
 *       404:
 *         description: Leito não encontrado
 */
router.get('/:id', authMiddleware(['admin', 'doctor']), getBedById);

/**
 * @swagger
 * /api/beds/{id}:
 *   put:
 *     summary: Atualiza um leito pelo ID
 *     tags: [Beds]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do leito
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ward:
 *                 type: string
 *               number:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [available, occupied]
 *               patient:
 *                 type: string
 *     responses:
 *       200:
 *         description: Leito atualizado com sucesso
 *       404:
 *         description: Leito não encontrado
 */
router.put('/:id', authMiddleware(['admin']), updateBed);

/**
 * @swagger
 * /api/beds/{id}:
 *   delete:
 *     summary: Deleta um leito pelo ID
 *     tags: [Beds]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do leito
 *     responses:
 *       200:
 *         description: Leito deletado com sucesso
 *       404:
 *         description: Leito não encontrado
 */
router.delete('/:id', authMiddleware(['admin']), deleteBed);

module.exports = router;
