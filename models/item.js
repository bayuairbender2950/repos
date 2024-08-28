const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Item = sequelize.define('Item', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  barcode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  status: {
    type: DataTypes.ENUM('Normal', 'Good', 'Bad', 'Very Bad'),
    allowNull: false,
  },
  locationShelfId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  weight: {
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: true, 
  },
  expirationDate: {
    type: DataTypes.DATE,
    allowNull: true, 
  },
  serialNumber: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  minimumStock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0, 
  },
  maximumStock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1000, 
  },
});

module.exports = Item;
require('./associations');