'use strict';

const { hashPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  
  class User extends sequelize.Sequelize.Model{}
  User.init({
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        isEmail : {
          args : true,
          msg : `invalid email format`
        },
        notNull : {
          args : true,
          msg : `email is required`
        },
        notEmpty : {
          args : true,
          msg : `email is required`
        },
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        len : {
          args : [5, 100],
          msg : 'minimum password length is 5 characters'
        },
        notEmpty : {
          args : true,
          msg : `password is required`
        }
      }
    },
    role : {
      type : DataTypes.STRING,
      allowNull : false,
    }
  },{
    hooks : {
      beforeCreate : (user) => {
        user.password = hashPassword(user.password)
      }
    },
    sequelize
  })

  User.associate = function(models) {
    // associations can be defined here
    User.hasOne(models.Cart)
  };
  return User;
};