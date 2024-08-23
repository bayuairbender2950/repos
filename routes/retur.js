const express = require('express');
const router = express.Router();
const returController = require('../controllers/returController');
const { authorize } = require('../middleware/authMiddleware');
const { ROLES } = require('../config/constants');

// POST /retur - Menambahkan retur baru
router.post('/', authorize([ROLES.ADMINISTRATOR, ROLES.ADMIN_GUDANG]), returController.createRetur);

module.exports = router;