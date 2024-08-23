
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Lokasi = sequelize.define('Lokasi', {
  namaRak: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  kategoriBarang: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  kapasitas: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
});


module.exports = Lokasi;
require('./associations');