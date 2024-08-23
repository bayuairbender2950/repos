const Transaksi = require('../models/transaksi');
const Barang = require('../models/barang');
const Pengguna = require('../models/pengguna');


exports.getAllTransaksi = async (req, res) => {
  try {
    const transaksi = await Transaksi.findAll({
      include: [Barang, Pengguna], 
    });
    res.json(transaksi);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
};


exports.getTransaksiById = async (req, res) => {
  try {
    const transaksi = await Transaksi.findByPk(req.params.id, {
      include: [Barang, Pengguna],
    });
    if (!transaksi) {
      return res.status(404).json({ message: 'Transaksi tidak ditemukan.' });
    }
    res.json(transaksi);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
};


exports.createTransaksi = async (req, res) => {
    try {
      const { jenis, barangId, jumlah, lokasiId, penggunaId, catatan } = req.body;
  
      
      if (!jenis || !barangId || !jumlah || !penggunaId) {
        return res.status(400).json({ message: 'Field jenis, barangId, jumlah, dan penggunaId harus diisi.' });
      }
  
      
      const barang = await Barang.findByPk(barangId);
      if (!barang) {
        return res.status(404).json({ message: 'Barang tidak ditemukan.' });
      }
  
      
      const pengguna = await Pengguna.findByPk(penggunaId);
      if (!pengguna) {
        return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
      }
  
      
      if (jenis === 'Keluar') {
        if (barang.stok < jumlah) {
          return res.status(400).json({ message: 'Stok tidak mencukupi.' });
        }
        
      } else if (jenis === 'Masuk') {
        
      }
  
      const transaksi = await Transaksi.create(req.body);
      res.status(201).json(transaksi);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
  };

