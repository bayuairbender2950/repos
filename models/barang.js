const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Barang = sequelize.define('Barang', {
  // Note: define id 1 per satu di setiap model dengan tipe data unsignedBigInt(20) karena range bit yang besar dan bisa handle sampai jutaan id, contoh nya seperti di bawah ini
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true, // If the id is auto-incremented
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  kategori: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Note: Di hapus aja jika sudah ada id sebagai primary key biar tidak bingung untuk foreign key nya
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