'use strict';
const { hashPassword } =require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {}

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email is already in use."
      },
      validate: {
        isEmail: {
          args: true,
          msg: "Email is invalid."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 16],
          msg: "Password must be between 3-16 characters."
        }
      }
    },
    role: {
      type: DataTypes.STRING,
    }
  }, {
    hooks: {
      beforeCreate(user, options) {
        user.password = hashPassword(user.password)
        user.role = 'user'
      }
    },
    sequelize
  });
  User.associate = function(models) {
    User.hasMany(models.Product, { through: models.UserProduct })
    // associations can be defined here
  };
  return User;
};