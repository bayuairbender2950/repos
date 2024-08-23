const Barang = require('./barang');
const Transaksi = require('./transaksi');
const Pengguna = require('./pengguna');
const Lokasi = require('./lokasi');

Barang.associate = (models) => {
    Barang.belongsTo(models.Lokasi, { foreignKey: 'lokasiRakId' });
}
  
Transaksi.associate = (models) => {
    Transaksi.belongsTo(models.Barang, { foreignKey: 'barangId' }); 
    Transaksi.belongsTo(models.Pengguna, { foreignKey: 'penggunaId' }); 
}

Pengguna.associate = (models) => {
    Pengguna.hasMany(models.Transaksi, { foreignKey: 'penggunaId' }); 
}

Lokasi.associate = (models) => {
    Lokasi.hasMany(models.Barang, { foreignKey: 'lokasiRakId' });
}