'use strict';
module.exports = (sequelize, DataTypes) => {
  class Cart extends sequelize.Sequelize.Model {}
  Cart.init({
    CustomerId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Cart'
  })
  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.Customer)
  };
  return Cart;
};