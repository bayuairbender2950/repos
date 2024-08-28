const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
require('./associations'); 

const Transaction = sequelize.define('Transaction', {
  type: {
    type: DataTypes.ENUM('In', 'Out'),
    allowNull: false,
  },
  itemId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  locationShelfId: { 
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
  userId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  notes: { 
    type: DataTypes.TEXT,
    allowNull: true,
  },
  sourceLocationId: { 
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
  destinationLocationId: { 
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
});

module.exports = Transaction;