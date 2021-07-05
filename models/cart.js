'use strict';
module.exports = (sequelize, DataTypes) => {
  class Cart extends sequelize.Sequelize.Model {}

  Cart.init({
    // attributes
    UserId: {
      type: DataTypes.INTEGER
    },
    ProductId: {
      type: DataTypes.INTEGER
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Cart'
    // options
  });

  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.Product)
    Cart.belongsTo(models.User)
  };
  return Cart;
};