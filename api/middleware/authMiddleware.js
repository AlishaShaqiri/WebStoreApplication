const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(403).json({ message: 'Access denied' });
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
}

function authorizeRole(roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
}
module.exports = { authenticateToken, authorizeRole };
