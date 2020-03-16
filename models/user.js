'use strict';
let {hashPassword} = require("../helpers/bcrypt.js")


module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model {}
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "EMAIL MUST BE UNIQUE"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'EMAIL REQUIRED'
        },
        notNull: {
          args: true,
          msg: 'EMAIL REQUIRED'
        },
        isEmail: {
          args: true,
          msg: 'INVALID EMAIL FORMAT'
        },
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'PASSWORD REQUIRED'
        },
        notNull: {
          args: true,
          msg: 'PASSWORD REQUIRED'
        },
        len: {
          args: [6, 16],
          msg: 'PASSWORD MUST BETWEEN 6-16 CHARACTERS'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user"
    }    
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user,opt) => {
        user.password = hashPassword(user.password);    
      },

      beforeUpdate: (user,opt) => {
        user.password = hashPassword(user.password);    
      }
    }
  })

  return User;
};