const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authorize } = require('../middleware/authMiddleware');
const { ROLES } = require('../config/constants');


router.get('/', authorize([ROLES.ADMINISTRATOR]), userController.getAllUsers);


router.get('/:id', authorize([ROLES.ADMINISTRATOR]), userController.getUserById);


router.post('/', authorize([ROLES.ADMINISTRATOR]), userController.createUser);


router.put('/:id', authorize([ROLES.ADMINISTRATOR]), userController.updateUser);


router.delete('/:id', authorize([ROLES.ADMINISTRATOR]), userController.deleteUser);

module.exports = router;