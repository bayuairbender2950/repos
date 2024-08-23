const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { ROLES } = require('../config/constants');

const Pengguna = sequelize.define('Pengguna', {
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('Administrator', 'Admin Gudang', 'Geologistik', 'Staff'), 
    allowNull: false,
  },
});

module.exports = Pengguna;
require('./associations');