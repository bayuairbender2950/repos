const express = require('express');
const router = express.Router();
const penggunaController = require('../controllers/penggunaController');
const { authorize } = require('../middleware/authMiddleware');
const { ROLES } = require('../config/constants');

// GET /pengguna - Mendapatkan semua pengguna (hanya Administrator)
router.get('/', authorize([ROLES.ADMINISTRATOR]), penggunaController.getAllPengguna);

// GET /pengguna/:id - Mendapatkan satu pengguna berdasarkan ID (hanya Administrator)
router.get('/:id', authorize([ROLES.ADMINISTRATOR]), penggunaController.getPenggunaById);

// POST /pengguna - Menambahkan pengguna baru (hanya Administrator)
router.post('/', authorize([ROLES.ADMINISTRATOR]), penggunaController.createPengguna);

// PUT /pengguna/:id - Mengupdate pengguna berdasarkan ID (hanya Administrator)
router.put('/:id', authorize([ROLES.ADMINISTRATOR]), penggunaController.updatePengguna);

// DELETE /pengguna/:id - Menghapus pengguna berdasarkan ID (hanya Administrator)
router.delete('/:id', authorize([ROLES.ADMINISTRATOR]), penggunaController.deletePengguna);

module.exports = router;