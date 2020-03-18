'use strict';

const bcrypt = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {

  class User extends sequelize.Sequelize.Model { }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter name'
        },
        notEmpty: {
          msg: 'Please enter name'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email address already in use!'
      },
      validate: {
        notNull: {
          msg: 'Please enter email'
        },
        notEmpty: {
          msg: 'Please enter email'
        },
        isEmail: {
          msg: "please enter valid email address"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter password'
        },
        notEmpty: {
          msg: 'Please enter password'
        },
        len: {
          args: [6],
          msg: "password at least 6 characters!"
        }
      }
    },
    role: DataTypes.BOOLEAN
  }, {
    hooks: {
      beforeCreate(user, options) {
        user.password = bcrypt.hash(user.password);
        if (!user.role) {
          user.role = false
        }
      }
    },
    sequelize
  })
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};