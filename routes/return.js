const express = require('express');
const router = express.Router();
const returnController = require('../controllers/returnController');
const { authorize } = require('../middleware/authMiddleware');
const { ROLES } = require('../config/constants');


router.post('/', authorize([ROLES.ADMINISTRATOR, ROLES.WAREHOUSE_ADMIN]), returnController.createReturn);

module.exports = router;