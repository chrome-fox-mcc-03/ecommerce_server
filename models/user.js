'use strict';
const { hashPass } = require('./../helper/bcrypt')

module.exports = (sequelize, DataTypes) => {

  class User extends sequelize.Sequelize.Model{}
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        },
        notEmpty: {
          args: true,
          msg: 'email must be filled'
        },
        notNull: {
          args: true,
          msg: 'email must be filled'
        }
      },
        unique: {
          args: true,
          msg: 'email already in use'
        }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'password must be filled'
        },
        len: {
          args: [5],
          msg: 'password is at least 5 character'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'name must be filled'
        },
        notNull: {
          args: true,
          msg: 'name must be filled'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'role must be filled'
        },
        notNull: {
          args:true,
          msg: 'role must be filled'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      afterValidate: (user, options) => {
        const hashedPassword = hashPass(user.password)
        user.password = hashedPassword
      }
    }
  })
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};