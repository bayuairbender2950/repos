const item = require('../models/item');
const Transaction = require('../models/transaction');

exports.adjustStock = async (req, res) => {
  try {
    const { itemId, quantity, reason } = req.body;

    if (!itemId || !quantity || !reason) {
      return res.status(400).json({ message: 'Fields itemId, quantity, and reason must be filled.' });
    }

    const item = await item.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ message: 'item not found.' });
    }

    item.stock += quantity;
    await item.save();

    const adjustmentTransaction = await Transaction.create({
      type: quantity > 0 ? 'In' : 'Out',
      itemId,
      quantity: Math.abs(quantity),
      userId: req.user.id,
      note: `Stock Adjustment: ${reason}`,
    });

    res.status(201).json(adjustmentTransaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error occurred.' });
  }
};