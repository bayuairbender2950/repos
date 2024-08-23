const Barang = require('../models/barang');
const Lokasi = require('../models/lokasi');
require('../models/associations');

const { generateRandomBarcode } = require('../utils/barcodeUtils');


exports.getAllBarang = async (req, res) => {
    try {
      /* 
        Note: usahakan untuk memberikan limit ketika mengambil seluruh data agar database tidak berkerja lebih banyak dan menyesuaikan pengambilan data.
              bisa menggunakan pagination jika di inginkan (optional)
      */
      const barang = await Barang.findAll({
        include: Lokasi, 
      });
      res.json(barang);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
  };
  


exports.getBarangById = async (req, res) => {
  try {
    const barang = await Barang.findByPk(req.params.id, {
      include: Lokasi,
    });
    if (!barang) {
      return res.status(404).json({ message: 'Barang tidak ditemukan.' });
    }
    res.json(barang);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
};


exports.createBarang = async (req, res) => {
    try {
      
      // Note: UID jika tidak digunakan tidak perlu harus ada inputan dari req.body.
      
      /*
      Note: Jangan lupa memakai tambahan library seperti Joi untuk implementasi validator agar lebih mudah 
            dan tidak manual menggunakan if statement karena akan memperkotor dan mempersulit kodingan.
      */
      const { nama, kategori, uid, barcode, status, lokasiRakId } = req.body;
      if (!nama || !kategori || !uid || !barcode || !status || !lokasiRakId || !harga) {
        return res.status(400).json({ message: 'Semua field harus diisi.' });
      }
  
      
      const existingBarang = await Barang.findOne({
        where: {
          [Op.or]: [{ uid }, { barcode }] 
        }
      });
      if (existingBarang) {
        return res.status(400).json({ message: 'UID atau barcode sudah ada.' });
      }
  
      
      const lokasi = await Lokasi.findByPk(lokasiRakId);
      if (!lokasi) {
        return res.status(400).json({ message: 'Lokasi rak tidak valid.' });
      }
  
      if (!req.body.barcode) {
        req.body.barcode = generateRandomBarcode();
      }

      let harga = req.body.harga; 
      switch (req.body.status) {
        case 'Bagus':
          harga *= 0.9; 
          break;
        case 'Buruk':
          harga *= 0.7; 
          break;
        case 'Sangat Buruk':
          harga *= 0.5; 
          break;
      }
      req.body.harga = harga;
  
      const barang = await Barang.create(req.body);
      res.status(201).json(barang);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
  };
  


exports.updateBarang = async (req, res) => {
  try {
    if (req.body.status) {
        let harga = req.body.harga || (await Barang.findByPk(req.params.id)).harga; 
        switch (req.body.status) {
          case 'Bagus':
            harga *= 0.9; 
            break;
          case 'Buruk':
            harga *= 0.7; 
            break;
          case 'Sangat Buruk':
            harga *= 0.5; 
            break;
        }
        req.body.harga = harga; 
      }
      const [updated] = await Barang.update(req.body, {
        where: { id: req.params.id },
      });
  
      if (updated) {
        const updatedBarang = await Barang.findByPk(req.params.id);
        return res.json(updatedBarang);
      }
      throw new Error('Barang tidak ditemukan');
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
};


exports.deleteBarang = async (req, res) => {
  try {
    const deleted = await Barang.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      return res.status(204).send(); 
    }
    throw new Error('Barang tidak ditemukan');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
};