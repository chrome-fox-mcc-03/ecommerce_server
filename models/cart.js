'use strict';
module.exports = (sequelize, DataTypes) => {
  class Cart extends sequelize.Sequelize.Model {}

  Cart.init({
    product_qty: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          msg: 'Product quantity should not be less then 1'
        }
      }
    },
    paid: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart'
  })
  
  Cart.associate = function(models) {
    Cart.belongsTo(models.User)
    Cart.belongsTo(models.Product)
  };
  return Cart;
};