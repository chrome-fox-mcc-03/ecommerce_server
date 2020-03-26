'use strict';
module.exports = (sequelize, DataTypes) => {
  class Cart extends sequelize.Sequelize.Model {}

  Cart.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'please insert user id'
        },
        notEmpty: {
          msg: 'please insert user id'
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'please insert user id'
        },
        notEmpty: {
          msg: 'please insert user id'
        }
      }
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'please insert user id'
        },
        notEmpty: {
          msg: 'please insert user id'
        }
      }
    },
    isPaid: DataTypes.BOOLEAN
  }, {
    hooks: {
      beforeCreate(cart, options) {
        if (!cart.isPaid) {
          cart.isPaid = false
        }
      }
    },
    sequelize
  })
  
  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.Product);
    Cart.belongsTo(models.User);
  };
  return Cart;
};