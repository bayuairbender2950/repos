const Transaction = require('../models/transaction');
const item = require('../models/item');
const User = require('../models/user');


exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: [item, User], 
    });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error occurred.' });
  }
};


exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id, {
      include: [item, User],
    });
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found.' });
    }
    res.json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error occurred.' });
  }
};


exports.createTransaction = async (req, res) => {
    try {
      const { type, itemId, quantity, locationId, userId, notes } = req.body;
  
      
      if (!type || !itemId || !quantity || !userId) {
        return res.status(400).json({ message: 'Fields type, itemId, quantity, and userId must be filled.' });
      }
  
      
      const item = await item.findByPk(itemId);
      if (!item) {
        return res.status(404).json({ message: 'item not found.' });
      }
  
      
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      
      if (type === 'Out') {
        if (item.stock < quantity) {
          return res.status(400).json({ message: 'Insufficient stock.' });
        }
        
      } else if (type === 'In') {
        
      }
  
      const transaction = await Transaction.create(req.body);
      res.status(201).json(transaction);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error occurred.' });
    }
  };
