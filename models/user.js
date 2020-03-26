'use strict';
const { hashPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model {
    static associate(models) {
      User.hasOne(models.Cart)
    }
  }

  User.init({
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your name'
        },
        notEmpty: {
          args: true,
          msg: 'Please enter your name'
        }
      }
    }, 
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your email'
        },
        notEmpty: {
          args: true,
          msg: 'Please enter your email' 
        },
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        }
      }
    }, 
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your password'
        },
        notEmpty: {
          args: true,
          msg: 'Please enter your password'
        },
        len: {
          args : [8],
          msg: 'minimum password length is 8 character'
        }
      }
    }, 
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your role'
        },
        notEmpty: {
          args: true,
          msg: 'Please enter your role'
        }
      }
    } 
  },{
    sequelize,
    hooks: {
      beforeCreate : (user, options) => {
        let password = user.password
        let hash = hashPassword(password)
        user.password = hash
      }
    }
  })

  return User;
};