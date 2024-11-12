const db = require('../models/db');


module.exports = {
    createOrder: (req, res) => {
        const { client_id, products, total_price } = req.body;
        const query = 'INSERT INTO Orders (client_id, total_price, order_status) VALUES (?, ?, ?)';
        db.query(query, [client_id, total_price, 'Pending'], (err, results) => {
            if (err) return res.status(500).send(err);

            const orderId = results.insertId;
            products.forEach(product => {
                const insertOrderItemQuery = 'INSERT INTO OrderItems (order_id, product_id, quantity) VALUES (?, ?, ?)';
                db.query(insertOrderItemQuery, [orderId, product.product_id, product.quantity]);
            });

            res.status(201).json({ order_id: orderId, message: 'Order placed' });
        });
    },

    updateOrderStatus: (req, res) => {
        const orderId = req.params.id;
        const { status } = req.body;
        const query = 'UPDATE Orders SET order_status = ? WHERE id = ?';
        db.query(query, [status, orderId], (err, results) => {
            if (err) return res.status(500).send(err);
            res.json({ message: 'Order status updated' });
        });
    },
}