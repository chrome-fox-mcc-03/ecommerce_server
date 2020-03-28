'use strict';
module.exports = (sequelize, DataTypes) => {
  class Cart extends sequelize.Sequelize.Model{}
  Cart.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'User Id cannot be null'
        },
        isNumeric: {
          args: true,
          msg: 'User Id should be number'
        }
      }
    }
  },{
    sequelize
  })
  Cart.associate = function(models) {
    // associations can be defined here
    Cart.hasMany(models.CartItem)
    Cart.belongsTo(models.User)
  };
  return Cart;
};