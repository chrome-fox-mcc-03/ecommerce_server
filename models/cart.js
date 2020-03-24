'use strict';
module.exports = (sequelize, DataTypes) => {
  // const Cart = sequelize.define('Cart', {
  //   ProductId: DataTypes.INTEGER,
  //   UserId: DataTypes.INTEGER
  // }, {});

  class Cart extends sequelize.Sequelize.Model{}
  Cart.init({
    ProductId: {
      type: DataTypes.INTEGER,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Needed UserID to bind Carts"
        },
        notEmpty: {
          args: true,
          msg: "Needed UserID to bind Carts"
        },
      }
    }
  }, {sequelize, modelName: "Cart"})

  Cart.associate = function(models) {
    // associations can be defined here
    // Cart.hasMany(models.Product)
    // Cart.belongsTo(models.User)
  };
  return Cart;
};