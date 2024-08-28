const express = require('express');
const router = express.Router();
const itemTransferController = require('../controllers/itemTransferController');
const { authorize } = require('../middleware/authMiddleware');
const { ROLES } = require('../config/constants');


router.post('/', authorize([ROLES.ADMINISTRATOR, ROLES.WAREHOUSE_ADMIN]), itemTransferController.transferitem);

module.exports = router;