'use strict';
module.exports = (sequelize, DataTypes) => {

  class Cart extends sequelize.Sequelize.Model {
    static associate(models) {
      Cart.belongsTo(models.User);
      Cart.belongsTo(models.Product);
    }
  }

  Cart.init({
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Price cannot be null`
        },
        min: {
          args: '0',
          msg: `Price cannot be negative number`
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Quantity cannot be null`
        },
        min: {
          args: '0',
          msg: `Quantity cannot be negative number`
        }
      }
    },
    cart_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `UserId cannot be null`
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `ProductId cannot be null`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Cart'
  })

  return Cart;
};