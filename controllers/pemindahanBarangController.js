const Barang = require('../models/barang');
const Transaksi = require('../models/transaksi');
const Lokasi = require('../models/lokasi');

exports.pindahkanBarang = async (req, res) => {
  try {
    const { barangId, lokasiTujuanId, jumlah } = req.body;

    
    if (!barangId || !lokasiTujuanId || !jumlah) {
      return res.status(400).json({ message: 'Field barangId, lokasiTujuanId, dan jumlah harus diisi.' });
    }

    
    const barang = await Barang.findByPk(barangId);
    if (!barang) {
      return res.status(404).json({ message: 'Barang tidak ditemukan.' });
    }

    
    const lokasiTujuan = await Lokasi.findByPk(lokasiTujuanId);
    if (!lokasiTujuan) {
      return res.status(404).json({ message: 'Lokasi tujuan tidak ditemukan.' });
    }

    
    if (barang.stok < jumlah) {
      return res.status(400).json({ message: 'Stok tidak mencukupi.' });
    }

    
    const transaksiPemindahan = await Transaksi.create({
      jenis: 'Pemindahan',
      barangId,
      jumlah,
      lokasiAsalId: barang.lokasiRakId, 
      lokasiTujuanId,
      penggunaId: req.user.id, 
      catatan: `Pemindahan dari ${barang.Lokasi.namaRak} ke ${lokasiTujuan.namaRak}`,
    });

    
    barang.lokasiRakId = lokasiTujuanId;
    await barang.save();

    res.status(201).json(transaksiPemindahan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
};