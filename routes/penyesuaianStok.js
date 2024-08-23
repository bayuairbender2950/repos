const express = require('express');
const router = express.Router();
const penyesuaianStokController = require('../controllers/penyesuaianStokController');
const { authorize } = require('../middleware/authMiddleware');
const { ROLES } = require('../config/constants');

// POST /penyesuaian-stok - Melakukan penyesuaian stok manual
router.post('/', authorize([ROLES.ADMINISTRATOR, ROLES.ADMIN_GUDANG]), penyesuaianStokController.adjustStok);

module.exports = router;