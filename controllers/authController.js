// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.register = async (req, res, next) => {
    console.log('Registering user:', req.body);
    const { name, email, password, role } = req.body;
    try {
        const user = new User({ name, email, password, role });
        await user.save();
        console.log('User registered successfully:', user);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        next(error);
    }
};

exports.login = async (req, res, next) => {
    console.log('Logging in user:', req.body);
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found:', email);
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            console.log('Password does not match for user:', email);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        console.log('JWT Secret:', config.jwtSecret); // Adiciona este log para verificar se o jwtSecret está sendo importado corretamente

        if (!config.jwtSecret) {
            console.error('JWT Secret is not defined');
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, { expiresIn: '1h' });
        console.log('Token generated:', token);
        res.json({ token });
    } catch (error) {
        console.error('Error logging in user:', error);
        next(error);
    }
};
