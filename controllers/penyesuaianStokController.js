const Barang = require('../models/barang');
const Transaksi = require('../models/transaksi');

exports.adjustStok = async (req, res) => {
  try {
    const { barangId, jumlah, alasan } = req.body;

    
    if (!barangId || !jumlah || !alasan) {
      return res.status(400).json({ message: 'Field barangId, jumlah, dan alasan harus diisi.' });
    }

    
    const barang = await Barang.findByPk(barangId);
    if (!barang) {
      return res.status(404).json({ message: 'Barang tidak ditemukan.' });
    }

    
    barang.stok += jumlah; 
    await barang.save();

    
    const transaksiPenyesuaian = await Transaksi.create({
      jenis: jumlah > 0 ? 'Masuk' : 'Keluar',
      barangId,
      jumlah: Math.abs(jumlah), 
      penggunaId: req.user.id, 
      catatan: `Penyesuaian Stok: ${alasan}`,
    });

    res.status(201).json(transaksiPenyesuaian);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
};