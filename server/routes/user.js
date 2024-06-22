const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// Ensure all methods are correctly referenced
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);
router.delete('/', userController.deleteAllUsers);

module.exports = router;