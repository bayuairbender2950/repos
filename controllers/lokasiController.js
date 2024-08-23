const Lokasi = require('../models/lokasi');
const Barang = require('../models/barang');


exports.getAllLokasi = async (req, res) => {
  try {
    const lokasi = await Lokasi.findAll();
    res.json(lokasi);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
};


exports.getLokasiById = async (req, res) => {
  try {
    const lokasi = await Lokasi.findByPk(req.params.id);
    if (!lokasi) {
      return res.status(404).json({ message: 'Lokasi tidak ditemukan.' });
    }
    res.json(lokasi);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
};


exports.createLokasi = async (req, res) => {
  try {
    const lokasi = await Lokasi.create(req.body);
    res.status(201).json(lokasi);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
};


exports.updateLokasi = async (req, res) => {
  try {
    const [updated] = await Lokasi.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedLokasi = await Lokasi.findByPk(req.params.id);
      return res.json(updatedLokasi);
    }
    throw new Error('Lokasi tidak ditemukan');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
};


exports.deleteLokasi = async (req, res) => {
  try {
    const deleted = await Lokasi.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      return res.status(204).send(); 
    }
    throw new Error('Lokasi tidak ditemukan');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
};