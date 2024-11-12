const db = require('../models/db');


const executeQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};


const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0];
};
const generateReport = async (type, dateCondition) => {
    const query = `
    SELECT COALESCE(SUM(o.total_amount), 0) AS total_earnings
    FROM Orders o
    WHERE ${dateCondition}`;

    const results = await executeQuery(query);
    const totalEarnings = results[0].total_earnings || 0;
    const date = getCurrentDate();

    const report = {
        report_type: type,
        total_earnings: totalEarnings,
        date: date,
    };

    const insertReportQuery = 'INSERT INTO Reports (type, date, total_sales) VALUES (?, ?, ?)';
    const insertResult = await executeQuery(insertReportQuery, [type, date, totalEarnings]);

    report.id = insertResult.insertId;
    return report;
};

module.exports = {

    generateDailyReport: async (req, res) => {
        try {
            const report = await generateReport('Daily', 'DATE(o.created_at) = CURDATE()');
            res.status(201).json(report);
        } catch (err) {
            res.status(500).send({ error: 'Error generating daily report', details: err });
        }
    },


    generateMonthlyReport: async (req, res) => {
        try {
            const report = await generateReport('Monthly', 'MONTH(o.created_at) = MONTH(CURDATE()) AND YEAR(o.created_at) = YEAR(CURDATE())');
            res.status(201).json(report);
        } catch (err) {
            res.status(500).send({ error: 'Error generating monthly report', details: err });
        }
    },


    getTopSellingProducts: async (req, res) => {
        const query = `
        SELECT p.name, 
               COALESCE(SUM(oi.quantity), 0) AS total_sold, 
               GROUP_CONCAT(DISTINCT s.size ORDER BY s.size) AS sizes_sold,
               GROUP_CONCAT(DISTINCT c.name ORDER BY c.name) AS colors_sold
        FROM Order_Items oi
        JOIN Products p ON oi.product_id = p.id
        LEFT JOIN Sizes s ON p.size_id = s.id
        LEFT JOIN Colors c ON p.color_id = c.id
        GROUP BY oi.product_id
        ORDER BY total_sold DESC
        LIMIT 10`;

        try {
            const results = await executeQuery(query);
            res.json(results);
        } catch (err) {
            res.status(500).send({ error: 'Error fetching top-selling products', details: err });
        }
    },
}