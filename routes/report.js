const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authorize } = require('../middleware/authMiddleware');
const { ROLES } = require('../config/constants');


router.get('/stock', authorize([ROLES.ADMINISTRATOR, ROLES.LOGISTICS]), reportController.getStockReport);


router.get('/incoming-goods', authorize([ROLES.ADMINISTRATOR, ROLES.LOGISTICS]), reportController.getIncomingItemsReport);


router.get('/outgoing-goods', authorize([ROLES.ADMINISTRATOR, ROLES.LOGISTICS]), reportController.getOutgoingItemsReport);




module.exports = router;