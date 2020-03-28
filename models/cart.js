'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty: {
          args:true,
          msg:'quantity is required'
        },
        notNull: {
          args:true,
          msg:'quantity is required'
        }
      }
    },
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      validate:{
        notEmpty: {
          args:true,
          msg:'paid is required'
        },
        notNull: {
          args:true,
          msg:'paid is required'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty: {
          args:true,
          msg:'UserId is required'
        },
        notNull: {
          args:true,
          msg:'UserId is required'
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty: {
          args:true,
          msg:'ProductId is required'
        },
        notNull: {
          args:true,
          msg:'ProductId is required'
        }
      }
    }
  }, {
    sequelize
  });
  Cart.associate = function(models) {
    Cart.belongsTo(models.User)
    Cart.belongsTo(models.Product)
  };
  return Cart;
};