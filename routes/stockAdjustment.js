const express = require('express');
const router = express.Router();
const stockAdjustmentController = require('../controllers/stockAdjustmentController');
const { authorize } = require('../middleware/authMiddleware');
const { ROLES } = require('../config/constants');


router.post('/', authorize([ROLES.ADMINISTRATOR, ROLES.WAREHOUSE_ADMIN]), stockAdjustmentController.adjustStock);

module.exports = router;