'use strict';
module.exports = (sequelize, DataTypes) => {
  class Production extends sequelize.Sequelize.Model{
    static associate(models) {
      Production.belongsToMany(models.User,{through : models.Cart})
      Production.belongsTo(models.Category)
    }
  }

  Production.init({
    name  : {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull : {
          args : true,
          msg : "Please insert Name for the Porduct"
        },
        notEmpty : {
          args : true,
          msg : "Please insert Name for the Porduct"
        }
      }
    },
    stock : {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notNull: {
          args : true,
          msg : "Please insert The Quanty Product"
        },
        min : {
          args : 1,
          msg : "Please insert Minimum quanty 1"
        }
      }
    },
    description : {
      type : DataTypes.STRING,
      allowNull :false,
      validate : {
        notNull: {
          args : true,
          msg : "Plese insert description to give infomation to the customer"
        },
        notEmpty : {
          args : true,
          msg : "Please Insert description to give infomation to the customer"
        }
      }
    },
    price : {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : "Please insert Price"
        },
        min : {
          args : 100 ,
          msg : 'Please insert Price minimum 100 '
        }
      }
    },
    url : {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : "Please insert Url_image"
        },
        notEmpty : {
          args : true,
          msg : "Please Insert Url_image"
        }
      }
    },
    CategoryId : {
      type : DataTypes.INTEGER
    }
  },{sequelize})
  return Production;
};