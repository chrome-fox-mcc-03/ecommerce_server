"use strict";
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class Cart extends Model {}

  Cart.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Quantity must be filled"
          },
          notEmpty: {
            args: true,
            msg: "Quantity cannot be empty"
          },
          isInt: {
            args: true,
            msg: "Quantity must be a valid integer"
          },
          min: {
            args: 1,
            msg: "Quantity must be bigger than zero"
          }
        }
      },
      ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "ProductId must be filled"
          },
          isInt: {
            args: true,
            msg: "ProductId must be a valid integer"
          },
          min: {
            args: 1,
            msg: "ProductId must be bigger than zero"
          }
        }
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "UserId must be filled"
          },
          isInt: {
            args: true,
            msg: "UserId must be a valid integer"
          },
          min: {
            args: 1,
            msg: "UserId must be bigger than zero"
          }
        }
      }
    },
    {
      sequelize,
      modelName: "Cart"
    }
  );

  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.User);
    Cart.belongsTo(models.Product);
  };
  return Cart;
};
