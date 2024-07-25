const express = require('express');
const { getAppointmentReport } = require('../controllers/reportController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: API para relatórios de atendimento
 */

/**
 * @swagger
 * /api/reports/appointments:
 *   get:
 *     summary: Gera um relatório de consultas por período
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data de início do período
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data de fim do período
 *     responses:
 *       200:
 *         description: Relatório de consultas
 *       500:
 *         description: Erro do servidor
 */
router.get('/appointments', authMiddleware(['admin', 'doctor']), getAppointmentReport);

module.exports = router;
