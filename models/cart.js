'use strict';
module.exports = (sequelize, DataTypes) => {
  class Cart extends sequelize.Sequelize.Model {}
  Cart.init({
    CustomerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          args: true,
          msg: 'userId must be an integer'
        },
        notNull: {
          args: true,
          msg: 'userId must be filled'
        }
      }
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        isIn: {
          args: [[true, false]],
          msg: 'isPaid value is either must be true or false'
        },
        notNull: {
          args: true,
          msg: 'isPaid must be filled'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Cart'
  })
  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.Customer)
    Cart.hasMany(models.CartProduct)
  };
  return Cart;
};