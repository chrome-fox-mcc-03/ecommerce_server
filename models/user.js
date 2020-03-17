'use strict';
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model {}
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Email is Required'
        },
        isEmail: {
          args: true,
          msg: 'Invalid Email Format'
        }
      },
      unique: {
        args: true,
        msg: 'Email Has Been Registered'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password is Required'
        },
        len: {
          args: [6],
          msg: 'Password At least 6 characters'
        }
      }

    },
    role: {
      type: DataTypes.BOOLEAN
    }
  }, {
    hooks: {
      beforeCreate: (User, options) => {
        User.password = hashPassword(User.password)
      }
    },
    sequelize
  })
  User.associate = function(models) {
    User.belongsToMany(models.Product, { through: models.ProductUser })
    User.hasMany(models.ProductUser)
  };
  return User;
};