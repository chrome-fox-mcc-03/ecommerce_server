'use strict';
const { hashpw } = require('../helper/bcypt')
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model{
    static associate(models) {
      User.belongsTo(models.Role)
    }
  }

  User.init({
    email : {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        isEmail : {
          args : true,
          msg : "Please Insert Email Correctly"
        },
        notNull : {
          args: true,
          msg : "please insert Email"
        }
      }
    },
    password : {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        len : {
          args : [6],
          msg : "Please insert Password minimum 6"
        },
        notNull : {
          args : true,
          msg : "Please insert Password"
        }
      }
    }
  },{
    sequelize,
    hooks: {
      beforeCreate : (user,option) => {
        user.password = hashpw(user.password)
      }
    }
  })
  return User;
};