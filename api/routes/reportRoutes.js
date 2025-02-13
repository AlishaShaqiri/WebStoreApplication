const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authenticateToken = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Generate reports for sales and products
 */

/**
 * @swagger
 * /api/reports/daily:
 *   get:
 *     summary: Generate daily sales report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daily sales report generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_sales:
 *                   type: number
 *                 total_orders:
 *                   type: integer
 *       403:
 *         description: Forbidden (User not authorized)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/reports/monthly:
 *   get:
 *     summary: Generate monthly sales report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly sales report generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_sales:
 *                   type: number
 *                 total_orders:
 *                   type: integer
 *       403:
 *         description: Forbidden (User not authorized)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/reports/top-selling:
 *   get:
 *     summary: Get top-selling products report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Top-selling products report generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   product_id:
 *                     type: integer
 *                   product_name:
 *                     type: string
 *                   sales_count:
 *                     type: integer
 *       403:
 *         description: Forbidden (User not authorized)
 *       500:
 *         description: Internal server error
 */
router.get('/daily', authenticateToken.authenticateToken, authenticateToken.authorizeRole(['Admin']), reportController.generateDailyReport);
router.get('/monthly', authenticateToken.authenticateToken, authenticateToken.authorizeRole(['Admin']), reportController.generateMonthlyReport);
router.get('/top-selling', authenticateToken.authenticateToken, authenticateToken.authorizeRole(['Admin', 'Advanced User']), reportController.getTopSellingProducts);

module.exports = router;
