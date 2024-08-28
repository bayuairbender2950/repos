const Item = require('../models/item');
const Transaction = require('../models/transaction');
const Location = require('../models/location');
const User = require('../models/user');
const { Op } = require('sequelize'); 
const excel = require('exceljs'); 

exports.getIncomingItemsReport = async (req, res) => {
    try {
      const { startDate, endDate, limit } = req.query;
      console.log('Query Parameters:', { startDate, endDate, limit });
      
      const whereClause = { type: 'Incoming' };
      
      if (startDate && endDate) {
        whereClause.createdAt = { [Op.between]: [startDate, endDate] };
      } else {
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        whereClause.createdAt = { [Op.between]: [firstDayOfMonth, lastDayOfMonth] };
      }

      const incomingTransactions = await Transaction.findAll({
        where: whereClause,
        include: [Item, User, Location],
        limit: limit ? parseInt(limit) : undefined,
        order: [['createdAt', 'DESC']]
      });

      console.log('Fetched Transactions:', incomingTransactions);
  
      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet('Incoming Items Report');
  
      worksheet.columns = [
        { header: 'Transaction ID', key: 'id', width: 15 },
        { header: 'Date', key: 'createdAt', width: 20 },
        { header: 'Item', key: 'itemName', width: 30 },
        { header: 'Quantity', key: 'quantity', width: 15 },
        { header: 'Location', key: 'location', width: 20 }, 
        { header: 'User', key: 'userName', width: 20 },
        { header: 'Notes', key: 'notes', width: 30 },
      ];
  
      incomingTransactions.forEach(transaction => {
        worksheet.addRow({
          id: transaction.id,
          createdAt: transaction.createdAt,
          itemName: transaction.Item.name, 
          quantity: transaction.quantity,
          location: transaction.Location ? transaction.Location.rackName : '-', 
          userName: transaction.User.name,
          notes: transaction.notes,
        });
      });
  
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=incoming_items_report.xlsx');   
  
      await workbook.xlsx.write(res);
      res.end();
  
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ message: 'A server error occurred.' });
    }
  };
  

exports.getStockReport = async (req, res) => {
  try {
    const { limit } = req.query;
    console.log('Query Parameters:', { limit });

    const items = await Item.findAll({
      include: Location,
      limit: limit ? parseInt(limit) : undefined,
      order: [['updatedAt', 'DESC']]
    });

    console.log('Fetched Items:', items);

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Stock Report');

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Category', key: 'category', width: 20 },
      { header: 'UID', key: 'uid', width: 20 },
      { header: 'Barcode', key: 'barcode', width: 20 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Rack Location', key: 'rackLocation', width: 20 },
      { header: 'Price', key: 'price', width: 15 },
    ];

    items.forEach(item => {
      worksheet.addRow({
        id: item.id,
        name: item.name,
        category: item.category,
        uid: item.uid,
        barcode: item.barcode,
        status: item.status,
        rackLocation: item.Location ? item.Location.rackName : '-', 
        price: item.price,
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=stock_report.xlsx');
    await workbook.xlsx.write(res);
    res.end();

  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'A server error occurred.' });
  }
};


exports.getOutgoingItemsReport = async (req, res) => {
    try {
      const { startDate, endDate, limit } = req.query;
      console.log('Query Parameters:', { startDate, endDate, limit });

      const whereClause = { type: 'Outgoing' };
      
      if (startDate && endDate) {
        whereClause.createdAt = { [Op.between]: [startDate, endDate] };
      } else {
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        whereClause.createdAt = { [Op.between]: [firstDayOfMonth, lastDayOfMonth] };
      }

      const outgoingTransactions = await Transaction.findAll({
        where: whereClause,
        include: [Item, User, 
          { model: Location, as: 'SourceLocation' },
          { model: Location, as: 'DestinationLocation' }
        ],
        limit: limit ? parseInt(limit) : undefined,
        order: [['createdAt', 'DESC']]
      });

      console.log('Fetched Transactions:', outgoingTransactions);
  
      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet('Outgoing Items Report');
  
      worksheet.columns = [
        { header: 'Transaction ID', key: 'id', width: 15 },
        { header: 'Date', key: 'createdAt', width: 20 },
        { header: 'Item', key: 'itemName', width: 30 },
        { header: 'Quantity', key: 'quantity', width: 15 },
        { header: 'Source Location', key: 'sourceLocation', width: 20 }, 
        { header: 'Destination Location', key: 'destinationLocation', width: 20 }, 
        { header: 'User', key: 'userName', width: 20 },
        { header: 'Notes', key: 'notes', width: 30 },
      ];
  
      outgoingTransactions.forEach(transaction => {
        worksheet.addRow({
          id: transaction.id,
          createdAt: transaction.createdAt,
          itemName: transaction.Item.name, 
          quantity: transaction.quantity,
          sourceLocation: transaction.SourceLocation ? transaction.SourceLocation.rackName : '-', 
          destinationLocation: transaction.DestinationLocation ? transaction.DestinationLocation.rackName : '-', 
          userName: transaction.User.name,
          notes: transaction.notes,
        });
      });
  
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=outgoing_items_report.xlsx');   
  
      await workbook.xlsx.write(res);
      res.end();
  
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ message: 'A server error occurred.' });
    }
  };
  
  
  exports.getCustomReport = async (req, res) => {
    try {
      const { startDate, endDate, category, limit } = req.query;
      console.log('Query Parameters:', { startDate, endDate, category, limit });
  
      const whereClause = {};
      if (startDate && endDate) {
        whereClause.createdAt = { [Op.between]: [startDate, endDate] };
      }
      if (category) {
        whereClause['$Item.category$'] = category; 
      }
  
      const transactions = await Transaction.findAll({
        where: whereClause,
        include: [Item, User],
        limit: limit ? parseInt(limit) : undefined,
        order: [['createdAt', 'DESC']]
      });

      console.log('Fetched Transactions:', transactions);
  
      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet('Custom Report');
  
      worksheet.columns = [
        { header: 'Transaction ID', key: 'id', width: 15 },
        { header: 'Date', key: 'createdAt', width: 20 },
        { header: 'Type', key: 'type', width: 15 },
        { header: 'Item', key: 'itemName', width: 30 },
        { header: 'Quantity', key: 'quantity', width: 15 },
        { header: 'User', key: 'userName', width: 20 },
        { header: 'Notes', key: 'notes', width: 30 },
      ];
  
      transactions.forEach(transaction => {
        worksheet.addRow({
          id: transaction.id,
          createdAt: transaction.createdAt,
          type: transaction.type,
          itemName: transaction.Item.name,
          quantity: transaction.quantity,
          userName: transaction.User.name,
          notes: transaction.notes,
        });
      });
  
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=custom_report.xlsx');   
  
      await workbook.xlsx.write(res);
      res.end();
  
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ message: 'A server error occurred.' });
    }
  };