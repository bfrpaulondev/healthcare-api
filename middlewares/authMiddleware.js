// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../config');

const authMiddleware = (roles = []) => {
    return (req, res, next) => {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        try {
            const decoded = jwt.verify(token, config.jwtSecret);
            req.user = decoded;
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            next();
        } catch (error) {
            res.status(401).json({ message: 'Token is not valid' });
        }
    };
};

module.exports = authMiddleware;
