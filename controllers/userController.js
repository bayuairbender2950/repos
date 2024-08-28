const User = require('../models/user');
const bcrypt = require('bcrypt');


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error occurred.' });
  }
};


exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error occurred.' });
  }
};


exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields must be filled.' });
    }

    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error occurred.' });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const userId = req.params.id;

    
    

    
    let hashedPassword = null;
    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    const [updated] = await User.update({
      name,
      email,
      password: hashedPassword, 
      role
    }, {
      where: { id: userId },
    });

    if (updated) {
      const updatedUser = await User.findByPk(userId);
      return res.json(updatedUser);
    }
    throw new Error('User not found');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error occurred.' });
  }
};



exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      return res.status(204).send(); 
    }
    throw new Error('User not found');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error occurred.' });
  }
};