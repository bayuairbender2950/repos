const Transaksi = require('../models/transaksi');
const Barang = require('../models/barang');


exports.createRetur = async (req, res) => {
  try {
    const { barangId, jumlah, alasan } = req.body;

    
    if (!barangId || !jumlah || !alasan) {
      return res.status(400).json({ message: 'Field barangId, jumlah, dan alasan harus diisi.' });
    }

    
    const barang = await Barang.findByPk(barangId);
    if (!barang) {
      return res.status(404).json({ message: 'Barang tidak ditemukan.' });
    }

    
    const transaksiRetur = await Transaksi.create({
      jenis: 'Masuk',
      barangId,
      jumlah,
      penggunaId: req.user.id, 
      catatan: `Retur: ${alasan}`,
    });

    
    barang.stok += jumlah;
    await barang.save();

    res.status(201).json(transaksiRetur);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
};