'use strict';
const { encryptPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model

  class User extends Model { }

  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'email is required'
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Password can't be blank`
        },
        len: {
          args: [6],
          msg: `Password must at least 6 characters`
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize, hooks: {
      beforeCreate(user, options) {
        user.password = encryptPassword(user.password)
      }
    }
  })

  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};