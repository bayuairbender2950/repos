const express = require('express');
const router = express.Router();
const lokasiController = require('../controllers/lokasiController');

// GET /lokasi - Mendapatkan semua lokasi
router.get('/', lokasiController.getAllLokasi);

// GET /lokasi/:id - Mendapatkan satu lokasi berdasarkan ID
router.get('/:id', lokasiController.getLokasiById);

// POST /lokasi - Menambahkan lokasi baru
router.post('/', lokasiController.createLokasi);

// PUT /lokasi/:id - Mengupdate lokasi berdasarkan ID
router.put('/:id', lokasiController.updateLokasi);

// DELETE /lokasi/:id - Menghapus lokasi berdasarkan ID
router.delete('/:id', lokasiController.deleteLokasi);

module.exports = router;