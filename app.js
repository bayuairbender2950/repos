const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const barangRoutes = require('./routes/barang');
const lokasiRoutes = require('./routes/lokasi');
const transaksiRoutes = require('./routes/transaksi');
const authRoutes = require('./routes/auth');
const laporanRoutes = require('./routes/laporan');const penyesuaianStokRoutes = require('./routes/penyesuaianStok');
const returRoutes = require('./routes/retur');
const penggunaRoutes = require('./routes/pengguna');
const pemindahanBarangRoutes = require('./routes/pemindahanBarang');
const app = express();
const PORT = process.env.PORT || 3000;

const cron = require('node-cron');
const Barang = require('./models/barang');


cron.schedule('0 0 * * *', async () => {
  try {
    const currentDate = new Date();
    const expirationThreshold = 7; 

    
    const expiringItems = await Barang.findAll({
      where: {
        tanggalKedaluwarsa: {
          [Op.between]: [
            currentDate,
            new Date(currentDate.getTime() + expirationThreshold * 24 * 60 * 60 * 1000)
          ]
        }
      }
    });

    cron.schedule('0 7 * * *', async () => {
        try {
          
          const semuaBarang = await Barang.findAll();
      
          
          const barangPeringatan = semuaBarang.filter(barang => {
            return barang.stok < barang.stokMinimum || barang.stok > barang.stokMaksimum;
          });
      
          if (barangPeringatan.length > 0) {
            console.log('Barang dengan stok di luar batas:', barangPeringatan);
            
          }
        } catch (err) {
          console.error('Error saat memeriksa stok:', err);
        }
      });

    
    if (expiringItems.length > 0) {
      console.log('Barang yang akan kedaluwarsa:', expiringItems);
      
    }
  } catch (err) {
    console.error('Error saat memeriksa kedaluwarsa:', err);
  }
});


app.use(cors());
app.use(express.json());


// Note: untuk migrasi table database di pisah mungkin pake migrate.js
sequelize.authenticate()
  .then(() => console.log('Koneksi database berhasil.'))
  .catch(err => console.error('Gagal terhubung ke database:', err));

sequelize.sync({ force: true }) 
  .then(() => {
    console.log('Tabel berhasil dibuat!');
  })
  .catch(err => {
    console.error('Gagal membuat tabel:', err);
  });

app.use('/transaksi', transaksiRoutes);
app.use('/barang', barangRoutes);
app.use('/retur', returRoutes);
app.use('/laporan', laporanRoutes);
app.use('/penyesuaian-stok', penyesuaianStokRoutes);
app.use('/lokasi', lokasiRoutes);
app.use('/auth', authRoutes);
app.use('/pemindahan-barang', pemindahanBarangRoutes);
app.use('/pengguna', penggunaRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});