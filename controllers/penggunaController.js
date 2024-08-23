const Pengguna = require('../models/pengguna');
const bcrypt = require('bcrypt');


exports.getAllPengguna = async (req, res) => {
  try {
    const pengguna = await Pengguna.findAll();
    res.json(pengguna);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
};


exports.getPenggunaById = async (req, res) => {
  try {
    const pengguna = await Pengguna.findByPk(req.params.id);
    if (!pengguna) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }
    res.json(pengguna);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
};


exports.createPengguna = async (req, res) => {
  try {
    const { nama, email, password, role } = req.body;

    
    if (!nama || !email || !password || !role) {
      return res.status(400).json({ message: 'Semua field harus diisi.' });
    }

    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const pengguna = await Pengguna.create({
      nama,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json(pengguna);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
};


exports.updatePengguna = async (req, res) => {
  try {
    const { nama, email, password, role } = req.body;
    const penggunaId = req.params.id;

    
    

    
    let hashedPassword = null;
    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    const [updated] = await Pengguna.update({
      nama,
      email,
      password: hashedPassword, 
      role
    }, {
      where: { id: penggunaId },
    });

    if (updated) {
      const updatedPengguna = await Pengguna.findByPk(penggunaId);
      return res.json(updatedPengguna);
    }
    throw new Error('Pengguna tidak ditemukan');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
};



exports.deletePengguna = async (req, res) => {
  try {
    const deleted = await Pengguna.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      return res.status(204).send(); 
    }
    throw new Error('Pengguna tidak ditemukan');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
};