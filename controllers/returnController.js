const Transaction = require('../models/transaction');
const item = require('../models/item');


exports.createReturn = async (req, res) => {
  try {
    const { itemId, quantity, reason } = req.body;

    
    if (!itemId || !quantity || !reason) {
      return res.status(400).json({ message: 'Fields itemId, quantity, and reason must be filled.' });
    }

    
    const item = await item.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ message: 'item not found.' });
    }

    
    const returnTransaction = await Transaction.create({
      type: 'In',
      itemId,
      quantity,
      userId: req.user.id, 
      note: `Return: ${reason}`,
    });

    
    item.stock += quantity;
    await item.save();

    res.status(201).json(returnTransaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error occurred.' });
  }
};