'use strict';
const { hash } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model {
    static associate(models) {
      User.hasOne(models.Cart)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Username cannot be empty'
        },
        notEmpty: {
          msg: 'Username cannot be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email is already used'
      },
      validate: {
        notNull: {
          msg: 'Email cannot be empty'
        },
        isEmail: {
          msg: 'Wrong email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password cannot be empty'
        },
        len: {
          args: [3],
          msg: 'Password minimum 3 characters'
      }
    }
  },
    role: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, opt) => {
        let hashed = hash(user.password)
        user.password = hashed
      }
    }
  });

  return User;
};