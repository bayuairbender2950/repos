const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Barang = sequelize.define('Barang', {
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  kategori: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uid: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  barcode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  status: {
    type: DataTypes.ENUM('Normal', 'Bagus', 'Buruk', 'Sangat Buruk'),
    allowNull: false,
  },
  lokasiRakId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  harga: {
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false,
  },
  ukuran: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  berat: {
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: true, 
  },
  tanggalKedaluwarsa: {
    type: DataTypes.DATE,
    allowNull: true, 
  },
  nomorSeri: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  stokMinimum: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0, 
  },
  stokMaksimum: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1000, 
  },
});

module.exports = Barang;
require('./associations');