const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { authorize } = require('../middleware/authMiddleware');
const { ROLES } = require('../config/constants');


router.get('/', authorize([ROLES.ADMINISTRATOR, ROLES.GEOLOGIST]), transactionController.getAllTransactions);


router.get('/:id', authorize([ROLES.ADMINISTRATOR, ROLES.GEOLOGIST]), transactionController.getTransactionById);


router.post('/', authorize([ROLES.ADMINISTRATOR, ROLES.WAREHOUSE_ADMIN]), transactionController.createTransaction);







module.exports = router;