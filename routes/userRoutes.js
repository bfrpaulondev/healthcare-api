// routes/userRoutes.js
const express = require('express');
const { getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware(['admin']), getUsers);
router.get('/:id', authMiddleware(['admin', 'doctor', 'patient']), getUserById);
router.put('/:id', authMiddleware(['admin', 'doctor', 'patient']), updateUser);
router.delete('/:id', authMiddleware(['admin']), deleteUser);

module.exports = router;
