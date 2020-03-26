'use strict';
module.exports = (sequelize, DataTypes) => {
  class Cart extends sequelize.Sequelize.Model {}
  Cart.init({
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart'
  });
  Cart.associate = function(models) {
    Cart.belongsTo(models.User, { foreignKey: 'user_id' })
    Cart.belongsToMany(models.Product, {
      through: {
        model: models.CartProduct
      },
      foreignKey: 'cart_id'
    })
  };
  return Cart;
};