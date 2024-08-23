const express = require('express');
const router = express.Router();
const transaksiController = require('../controllers/transaksiController');
const   
 { authorize } = require('../middleware/authMiddleware');
const { ROLES } = require('../config/constants');

// GET /transaksi - Mendapatkan semua transaksi (hanya Administrator dan Geologistik)
router.get('/', authorize([ROLES.ADMINISTRATOR, ROLES.GEOLOGISTIK]), transaksiController.getAllTransaksi);

// GET /transaksi/:id - Mendapatkan satu transaksi berdasarkan ID
router.get('/:id', authorize([ROLES.ADMINISTRATOR, ROLES.GEOLOGISTIK]), transaksiController.getTransaksiById);

// POST /transaksi - Menambahkan transaksi baru
router.post('/', authorize([ROLES.ADMINISTRATOR, ROLES.ADMIN_GUDANG]), transaksiController.createTransaksi);

// PUT /transaksi/:id - Mengupdate transaksi berdasarkan ID (opsional, jika diperlukan)
// router.put('/:id', transaksiController.updateTransaksi);

// DELETE /transaksi/:id - Menghapus transaksi berdasarkan ID (opsional, jika diperlukan)
// router.delete('/:id', transaksiController.deleteTransaksi);

module.exports = router;