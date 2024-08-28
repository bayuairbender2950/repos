const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const itemRoutes = require('./routes/item');
const locationRoutes = require('./routes/location');
const transactionRoutes = require('./routes/transaction');
const authRoutes = require('./routes/auth');
const reportRoutes = require('./routes/report');
const stockAdjustmentRoutes = require('./routes/stockAdjustment');
const returnRoutes = require('./routes/return');
const userRoutes = require('./routes/user');
const itemTransferRoutes = require('./routes/itemTransfer');
const app = express();
const PORT = process.env.PORT || 3000;

const cron = require('node-cron');
const Item = require('./models/item');

cron.schedule('0 0 * * *', async () => {
  try {
    const currentDate = new Date();
    const expirationThreshold = 7; 

    const expiringItems = await Item.findAll({
      where: {
        expirationDate: {
          [Op.between]: [
            currentDate,
            new Date(currentDate.getTime() + expirationThreshold * 24 * 60 * 60 * 1000)
          ]
        }
      }
    });

    if (expiringItems.length > 0) {
      console.log('Items that will expire:', expiringItems);
    }
  } catch (err) {
    console.error('Error while checking expiration:', err);
  }
});

cron.schedule('0 7 * * *', async () => {
  try {
    const allItems = await Item.findAll();
  
    const warningItems = allItems.filter(item => {
      return item.stock < item.minimumStock || item.stock > item.maximumStock;
    });
  
    if (warningItems.length > 0) {
      console.log('Items with stock outside limits:', warningItems);
    }
  } catch (err) {
    console.error('Error while checking stock:', err);
  }
});


app.use(cors());
app.use(express.json());


sequelize.authenticate()
  .then(() => console.log('Database connection successful.'))
  .catch(err => console.error('Failed to connect to database:', err));

app.use('/transaction', transactionRoutes);
app.use('/item', itemRoutes);
app.use('/return', returnRoutes);
app.use('/report', reportRoutes);
app.use('/stock-adjustment', stockAdjustmentRoutes);
app.use('/location', locationRoutes);
app.use('/auth', authRoutes);
app.use('/item-transfer', itemTransferRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});