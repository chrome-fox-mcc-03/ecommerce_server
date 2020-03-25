'use strict';
module.exports = (sequelize, DataTypes) => {

  class Order extends sequelize.Sequelize.Model {}
    Order.init({
      UserId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
      Quantity: DataTypes.INTEGER,
      TotalPrice: DataTypes.INTEGER 
    }, { sequelize, modelName: 'Order' });

  Order.associate = function(models) {
    Order.belongsTo(models.User),
    Order.belongsTo(models.Product)
    // associations can be defined here
  };
  return Order;
};