module.exports = (models) => {
  
  if (models.Item) {
    models.Item.belongsTo(models.Location, { foreignKey: 'locationShelfId' });
  }

  
  if (models.Transaction) {
    models.Transaction.belongsTo(models.Item, { foreignKey: 'itemId' }); 
    models.Transaction.belongsTo(models.User, { foreignKey: 'userId' }); 
  }

  
  if (models.User) {  
    models.User.hasMany(models.Transaction, { foreignKey: 'userId' }); 
  }

  
  if (models.Location) {
    models.Location.hasMany(models.Item, { foreignKey: 'locationShelfId' });
  }
};
