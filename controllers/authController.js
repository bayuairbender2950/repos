const User = require('../models/user');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Email or password is incorrect.' });
    }

    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Email or password is incorrect.' });
    }

    
    const token = jwt.sign({   
 id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h', 
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'A server error occurred.' });
  }
};