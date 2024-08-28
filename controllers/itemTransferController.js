const item = require('../models/item');
const Transaction = require('../models/transaction');
const Location = require('../models/location');

exports.transferitem = async (req, res) => {
  try {
    const { itemId, destinationLocationId, quantity } = req.body;

    if (!itemId || !destinationLocationId || !quantity) {
      return res.status(400).json({ message: 'Fields itemId, destinationLocationId, and quantity must be filled.' });
    }

    const item = await item.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ message: 'item not found.' });
    }

    const destinationLocation = await Location.findByPk(destinationLocationId);
    if (!destinationLocation) {
      return res.status(404).json({ message: 'Destination location not found.' });
    }

    if (item.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock.' });
    }

    const transferTransaction = await Transaction.create({
      type: 'Transfer',
      itemId,
      quantity,
      sourceLocationId: item.shelfLocationId,
      destinationLocationId,
      userId: req.user.id,
      notes: `Transfer from ${item.Location.shelfName} to ${destinationLocation.shelfName}`,
    });

    item.shelfLocationId = destinationLocationId;
    await item.save();

    res.status(201).json(transferTransaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error occurred.' });
  }
};