  const { DataTypes } = require('sequelize');
  const sequelize = require('../config/database');

  const Location = sequelize.define('Location', {
    shelfName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    itemCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    },
  });


  module.exports = Location;
  require('./associations');