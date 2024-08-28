const Item = require('../models/item');
const Location = require('../models/location');
require('../models/associations');
const { Op } = require('sequelize');
const { generateRandomBarcode } = require('../utils/barcodeUtils');


exports.getAllItems = async (req, res) => {
    try {
      const limit = 10; 
      const page = req.query.page || 1; 
      const offset = (page - 1) * limit;



      const { count, rows: items } = await Item.findAndCountAll({
        include: Location,
        limit,
        offset,
      });

      const totalPages = Math.ceil(count / limit);

      res.json({

        items,
        currentPage: page,
        totalPages,
        totalItems: count,
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({ message: 'Server error occurred.' });
    }
  };


exports.getItemById = async (req, res) => {
  try {


    const item = await Item.findByPk(req.params.id, {
      include: Location,
    });


    if (!item) {
      return res.status(404).json({ message: 'Item not found.' });
    }

    res.json(item);
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: 'Server error occurred.' });
  }
};


exports.createItem = async (req, res) => {
    try {

      const { name, category, barcode, condition, locationShelfId, price } = req.body;
      
      


      if (!name || !category || !condition || !locationShelfId || !price) {
        return res.status(400).json({ message: 'All fields must be filled except UID and barcode.' });
      }

      if (barcode) {

        const existingItem = await Item.findOne({
          where: { barcode }
        });


        if (existingItem) {
          return res.status(400).json({ message: 'Barcode already exists.' });
        }
      }




      const location = await Location.findByPk(locationShelfId);
      if (!location) {
        return res.status(400).json({ message: 'Invalid shelf location.' });
      }

      if (!barcode) {
        req.body.barcode = generateRandomBarcode();
      }





      let adjustedPrice = price;
      switch (condition) {
        case 'Good':
          adjustedPrice *= 0.9;
          break;


        case 'Poor':
          adjustedPrice *= 0.7;
          break;


        case 'Very Poor':
          adjustedPrice *= 0.5;
          break;
      }

      req.body.price = adjustedPrice;



      const item = await Item.create(req.body);
      res.status(201).json(item);
    } catch (err) {
      console.error(err);

      res.status(500).json({ message: 'Server error occurred.' });
    }
  };


exports.updateItem = async (req, res) => {
  try {



    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }






    if (req.body.condition) {
      let price = req.body.price || item.price;
      switch (req.body.condition) {
        case 'Good':
          price *= 0.9;
          break;


        case 'Poor':
          price *= 0.7;
          break;


        case 'Very Poor':
          price *= 0.5;
          break;
      }

      req.body.price = price;
    }




    await item.update(req.body);
    const updatedItem = await Item.findByPk(req.params.id);
    return res.json(updatedItem);
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: 'Server error occurred.' });
  }
};


exports.deleteItem = async (req, res) => {
  try {



    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await item.destroy();
    return res.status(204).send();
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: 'Server error occurred.' });
  }
};