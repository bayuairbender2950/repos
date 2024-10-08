const express = require('express');
const router = express.Router();
const barangController = require('../controllers/barangController');

// GET /barang - Mendapatkan semua barang
router.get('/', barangController.getAllBarang);

// GET /barang/:id - Mendapatkan satu barang berdasarkan ID
router.get('/:id', barangController.getBarangById);

// POST /barang - Menambahkan barang baru
router.post('/', barangController.createBarang);

// PUT /barang/:id - Mengupdate barang berdasarkan ID
router.put('/:id', barangController.updateBarang);

// DELETE /barang/:id - Menghapus barang berdasarkan ID
router.delete('/:id', barangController.deleteBarang);

module.exports = router;