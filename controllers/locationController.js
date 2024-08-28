const Location = require('../models/location');
const item = require('../models/item');


exports.getAllLocations = async (req, res) => {
  try {
    const locations = await Location.findAll();
    res.json(locations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error occurred.' });
  }
};


exports.getLocationById = async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found.' });
    }
    res.json(location);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error occurred.' });
  }
};


exports.createLocation = async (req, res) => {
  try {
    const location = await Location.create(req.body);
    res.status(201).json(location);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error occurred.' });
  }
};


exports.updateLocation = async (req, res) => {
  try {
    const [updated] = await Location.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedLocation = await Location.findByPk(req.params.id);
      return res.json(updatedLocation);
    }
    throw new Error('Location not found');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error occurred.' });
  }
};


exports.deleteLocation = async (req, res) => {
  try {
    const deleted = await Location.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      return res.status(204).send(); 
    }
    throw new Error('Location not found');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error occurred.' });
  }
};