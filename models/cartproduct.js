'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class CartProduct extends Model {
    static associate(models) {

    }
  }

  CartProduct.init({
    CartId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    isCheckout: DataTypes.BOOLEAN
  },{
    sequelize
  })
  
  return CartProduct;
};