const Barang = require('../models/barang');
const Transaksi = require('../models/transaksi');
const Lokasi = require('../models/lokasi');
const Pengguna = require('../models/pengguna');
const { Op } = require('sequelize'); 
const excel = require('exceljs'); 

exports.getLaporanBarangMasuk = async (req, res) => {
    try {
      const transaksiMasuk = await Transaksi.findAll({
        where: { jenis: 'Masuk' },
        include: [Barang, Pengguna],
      });
  
      
      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet('Laporan Barang Masuk');
  
      
      worksheet.columns = [
        { header: 'ID Transaksi', key: 'id', width: 15 },
        { header: 'Tanggal', key: 'createdAt', width: 20 },
        { header: 'Barang', key: 'namaBarang', width: 30 },
        { header: 'Jumlah', key: 'jumlah', width: 15 },
        { header: 'Lokasi', key: 'lokasi', width: 20 }, 
        { header: 'Pengguna', key: 'namaPengguna', width: 20 },
        { header: 'Catatan', key: 'catatan', width: 30 },
      ];
  
      
      transaksiMasuk.forEach(transaksi => {
        worksheet.addRow({
          id: transaksi.id,
          createdAt: transaksi.createdAt,
          namaBarang: transaksi.Barang.nama, 
          jumlah: transaksi.jumlah,
          lokasi: transaksi.lokasiId ? transaksi.Lokasi.namaRak : '-', 
          namaPengguna: transaksi.Pengguna.nama,
          catatan: transaksi.catatan,
        });
      });
  
      
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=laporan_barang_masuk.xlsx');   
  
      await workbook.xlsx.write(res);
      res.end();
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
  };
  


exports.getLaporanStok = async (req, res) => {
  try {
    const barang = await Barang.findAll({
      include: Lokasi,
    });

    
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Laporan Stok');

    
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Nama', key: 'nama', width: 30 },
      { header: 'Kategori', key: 'kategori', width: 20 },
      { header: 'UID', key: 'uid', width: 20 },
      { header: 'Barcode', key: 'barcode', width: 20 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Lokasi Rak', key: 'lokasiRak', width: 20 },
      { header: 'Harga', key: 'harga', width: 15 },
      
    ];

    
    barang.forEach(item => {
      worksheet.addRow({
        id: item.id,
        nama: item.nama,
        kategori: item.kategori,
        uid: item.uid,
        barcode: item.barcode,
        status: item.status,
        lokasiRak: item.Lokasi.namaRak, 
        harga: item.harga,
        
      });
    });

    
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=laporan_stok.xlsx');
    await workbook.xlsx.write(res);
    res.end();

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
};


exports.getLaporanBarangKeluar = async (req, res) => {
    try {
      const transaksiKeluar = await Transaksi.findAll({
        where: { jenis: 'Keluar' },
        include: [Barang, Pengguna],
      });
  
      
      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet('Laporan Barang Keluar');
  
      
      worksheet.columns = [
        { header: 'ID Transaksi', key: 'id', width: 15 },
        { header: 'Tanggal', key: 'createdAt', width: 20 },
        { header: 'Barang', key: 'namaBarang', width: 30 },
        { header: 'Jumlah', key: 'jumlah', width: 15 },
        { header: 'Lokasi Asal', key: 'lokasiAsal', width: 20 }, 
        { header: 'Lokasi Tujuan', key: 'lokasiTujuan', width: 20 }, 
        { header: 'Pengguna', key: 'namaPengguna', width: 20 },
        { header: 'Catatan', key: 'catatan', width: 30 },
      ];
  
      
      transaksiKeluar.forEach(transaksi => {
        worksheet.addRow({
          id: transaksi.id,
          createdAt: transaksi.createdAt,
          namaBarang: transaksi.Barang.nama, 
          jumlah: transaksi.jumlah,
          lokasiAsal: transaksi.lokasiAsalId ? transaksi.LokasiAsal.namaRak : '-', 
          lokasiTujuan: transaksi.lokasiTujuanId ? transaksi.LokasiTujuan.namaRak : '-', 
          namaPengguna: transaksi.Pengguna.nama,
          catatan: transaksi.catatan,
        });
      });
  
      
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=laporan_barang_keluar.xlsx');   
  
      await workbook.xlsx.write(res);
      res.end();
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
  };
  
  
  exports.getLaporanKustom = async (req, res) => {
    try {
      
      const { startDate, endDate, kategori } = req.query;
  
      
      const whereClause = {};
      if (startDate && endDate) {
        whereClause.createdAt = { [Op.between]: [startDate, endDate] };
      }
      if (kategori) {
        whereClause['$Barang.kategori$'] = kategori; 
      }
  
      const transaksi = await Transaksi.findAll({
        where: whereClause,
        include: [Barang, Pengguna],
      });
  
      
      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet('Laporan Kustom');
  
      
      worksheet.columns = [
        { header: 'ID Transaksi', key: 'id', width: 15 },
        { header: 'Tanggal', key: 'createdAt', width: 20 },
        { header: 'Jenis', key: 'jenis', width: 15 },
        { header: 'Barang', key: 'namaBarang', width: 30 },
        { header: 'Jumlah', key: 'jumlah', width: 15 },
        { header: 'Pengguna', key: 'namaPengguna', width: 20 },
        { header: 'Catatan', key: 'catatan', width: 30 },
        
      ];
  
      
      transaksi.forEach(transaksi => {
        worksheet.addRow({
          id: transaksi.id,
          createdAt: transaksi.createdAt,
          jenis: transaksi.jenis,
          namaBarang: transaksi.Barang.nama,
          jumlah: transaksi.jumlah,
          namaPengguna: transaksi.Pengguna.nama,
          catatan: transaksi.catatan,
          
        });
      });
  
      
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=laporan_kustom.xlsx');   
  
      await workbook.xlsx.write(res);
      res.end();
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
  };
