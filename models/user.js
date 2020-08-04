'use strict';
const Bcrypt = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  // const User = sequelize.define('User', {
    
  // }, {});

  class User extends sequelize.Sequelize.Model{}
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Please use another mail"
      },
      validate: {
        isEmail: {
          args: true,
          msg: "Please use Email format"
        },
        notNull: {
          args: true,
          msg: "Please fill this email"
        },
        notEmpty: {
          args: true,
          msg: "Please fill this email"
        },
        notContains: {
          args: ' ',
          msg: 'Please use Email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Please fill this password field"
        },
        notEmpty: {
          args: true,
          msg: "Please fill this password field"
        },
        len: {
          args: [5],
          msg: "Minimum length is 5"
        },
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Please fill this role"
        },
        notEmpty: {
          args: true,
          msg: "Please fill this role"
        },
      }
    }
  }, {
    hooks: {
      beforeCreate: (User, options) => {
        User.password = Bcrypt.hash(User.password)
      }
    },
    sequelize, modelName: "User"
  })
  User.associate = function(models) {
    // associations can be defined here
    // User.hasOne(models.Cart)
  };
  return User;
};