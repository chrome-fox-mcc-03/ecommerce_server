'use strict';
module.exports = (sequelize, DataTypes) => {

  class Cart extends sequelize.Sequelize.Model {
    static associate(models) {
      Cart.belongsTo(models.User);
      Cart.belongsTo(models.Product);
    }
  }

  Cart.init({
    price: { type: DataTypes.FLOAT },
    quantity: { type: DataTypes.INTEGER },
    UserId: { type: DataTypes.INTEGER },
    ProductId: { type: DataTypes.INTEGER }
  }, {
    sequelize,
    modelName: 'Cart'
  })

  return Cart;
};