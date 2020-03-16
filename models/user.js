'use strict';
const {
  hashPassword
} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model {
    static associate(models) {

    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email Is Required'
        },
        isEmail: {
          args: true,
          msg: 'Invalid Email Format'
        }
      }
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (User, options) => {
        User.password = hashPassword(User.password)
      }
    },
    sequelize,
    modelName: 'User'
  })
  return User;
};