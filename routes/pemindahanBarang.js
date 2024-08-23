const express = require('express');
const router = express.Router();
const pemindahanBarangController = require('../controllers/pemindahanBarangController');
const { authorize } = require('../middleware/authMiddleware');
const { ROLES } = require('../config/constants');

// POST /pemindahan-barang - Melakukan pemindahan barang
router.post('/', authorize([ROLES.ADMINISTRATOR, ROLES.ADMIN_GUDANG]), pemindahanBarangController.pindahkanBarang);

module.exports = router;