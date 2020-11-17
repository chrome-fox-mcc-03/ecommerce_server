'use strict';
//validasi kasi
module.exports = (sequelize, DataTypes) => {

  class Cart extends sequelize.Sequelize.Model {}
    Cart.init({
      UserId: DataTypes.INTEGER, // dari req.authenticated.id
      ProductId: DataTypes.INTEGER, // dari produk
      Quantity: {
        type: DataTypes.INTEGER,
        notNull: {
          args: true,
          msg: "Must Be Filled"
        },
        validate: {
          min: {
            args: '1',
            msg: "Must Have At Least 1"
          }
          
        }
      } 
    }, { sequelize, modelName: 'Cart' });

  Cart.associate = function(models) {
    Cart.belongsTo(models.User),
    Cart.belongsTo(models.Product)
    // associations can be defined here
  };
  return Cart;
};