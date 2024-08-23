const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
require('./associations'); 

const Transaksi = sequelize.define('Transaksi', {
  jenis: {
    type: DataTypes.ENUM('Masuk', 'Keluar'),
    allowNull: false,
  },
  barangId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  jumlah: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lokasiId: { 
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
  penggunaId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  catatan: { 
    type: DataTypes.TEXT,
    allowNull: true,
  },
  lokasiAsalId: { 
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
  lokasiTujuanId: { 
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
});

module.exports = Transaksi;