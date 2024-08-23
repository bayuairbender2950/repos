const express = require('express');
const router = express.Router();
const laporanController = require('../controllers/laporanController');
const { authorize } = require('../middleware/authMiddleware');
const { ROLES } = require('../config/constants');

// GET /laporan/stok - Mendapatkan laporan stok
router.get('/stok', authorize([ROLES.ADMINISTRATOR, ROLES.GEOLOGISTIK]), laporanController.getLaporanStok);

// GET /laporan/barang-masuk - Mendapatkan laporan barang masuk
router.get('/barang-masuk', authorize([ROLES.ADMINISTRATOR, ROLES.GEOLOGISTIK]), laporanController.getLaporanBarangMasuk);

// GET /laporan/barang-keluar - Mendapatkan laporan barang keluar
router.get('/barang-keluar', authorize([ROLES.ADMINISTRATOR, ROLES.GEOLOGISTIK]), laporanController.getLaporanBarangKeluar);

// POST /laporan/kustom - Mendapatkan laporan kustom (opsional, jika diperlukan)
// router.post('/kustom', authorize([ROLES.ADMINISTRATOR, ROLES.GEOLOGISTIK]), laporanController.getLaporanKustom);

module.exports = router;