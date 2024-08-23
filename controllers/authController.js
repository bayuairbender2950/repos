const Pengguna = require('../models/pengguna');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const pengguna = await Pengguna.findOne({ where: { email } });
    if (!pengguna) {
      return res.status(401).json({ message: 'Email atau password salah.' });
    }

    
    const passwordMatch = await bcrypt.compare(password, pengguna.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Email atau password salah.' });
    }

    
    const token = jwt.sign({   
 id: pengguna.id, role: pengguna.role }, process.env.JWT_SECRET, {
      expiresIn: '1h', 
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
};