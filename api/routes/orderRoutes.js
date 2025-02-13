const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *               quantities:
 *                 type: array
 *                 items:
 *                   type: integer
 *               user_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Order successfully created
 *       400:
 *         description: Invalid input or order details
 *       500:
 *         description: Internal server error
 */
router.post('/', orderController.createOrder);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Update the status of an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Order ID to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - Pending
 *                   - Shipped
 *                   - Delivered
 *                   - Cancelled
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       404:
 *         description: Order not found
 *       400:
 *         description: Invalid order status
 *       500:
 *         description: Internal server error
 */
router.put('/:id/status', orderController.updateOrderStatus);

module.exports = router;
