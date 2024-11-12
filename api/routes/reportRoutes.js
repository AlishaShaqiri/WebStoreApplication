const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authenticateToken = require('../middleware/authMiddleware')
router.get('/daily', authenticateToken.authenticateToken, authenticateToken.authorizeRole(['Admin']), reportController.generateDailyReport);
router.get('/monthly', authenticateToken.authenticateToken, authenticateToken.authorizeRole(['Admin']), reportController.generateMonthlyReport);
router.get('/top-selling', authenticateToken.authenticateToken, authenticateToken.authorizeRole(['Admin', 'Advanced User']), reportController.getTopSellingProducts);

module.exports = router;
