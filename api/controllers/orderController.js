const db = require('../models/db');

module.exports = {
    createOrder: (req, res) => {
        const { client_name, client_email, client_phone, products, total_amount } = req.body;

        const query = 'INSERT INTO Orders (client_name, client_email, client_phone, total_amount) VALUES (?, ?, ?, ?)';
        db.query(query, [client_name, client_email, client_phone, total_amount, 'Pending'], (err, results) => {
            if (err) return res.status(500).send(err);

            const orderId = results.insertId;
            const insertOrderItemQuery = 'INSERT INTO OrderItems (order_id, product_id, quantity) VALUES (?, ?, ?)';

            products.forEach(product => {
                db.query(insertOrderItemQuery, [orderId, product.product_id, product.quantity], (err) => {
                    if (err) console.error('Error inserting order item:', err);
                });
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
};
