const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const modelsPath = path.join(__dirname, 'models');
const models = {};

dotenv.config();  

fs.readdirSync(modelsPath)
  .filter(file => file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(modelsPath, file));
    models[model.name] = model;
  });

module.exports = models;


const sequelizeServer = new Sequelize('', process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false, 
});

async function createDatabaseAndConnect() {
  try {
    await sequelizeServer.authenticate();
    console.log('Connected to MySQL server.');

    
    await sequelizeServer.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log(`Database ${process.env.DB_NAME} created or already exists.`);

    
    const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      logging: false, 
    });

    
    await sequelize.authenticate();
    console.log(`Connected to the ${process.env.DB_NAME} database.`);

    
    Object.keys(models).forEach(modelName => {
      if ('associate' in models[modelName]) {
        models[modelName].associate(models);
      }
    });

    
    await sequelize.sync({ force: false }); 
    console.log('Models synced to the database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

createDatabaseAndConnect();
