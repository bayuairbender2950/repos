const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const database = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false, 
});

const models = {};
const modelsDirectory = path.join(__dirname, '.'); 


fs.readdirSync(modelsDirectory)
  .filter(file => file.endsWith('.js') && file !== 'index.js' && file !== 'associations.js')
  .forEach(file => {
    const model = require(path.join(modelsDirectory, file))(database);
    models[model.name] = model;
  });


const associationsFile = path.join(modelsDirectory, 'associations.js');
if (fs.existsSync(associationsFile)) {
  require(associationsFile)(models);
}

module.exports = { database, models };
