// config.js
module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'Shadow12345@',
    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASS,
};
