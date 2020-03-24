'use strict';
const Helper = require('../helpers/helper');

module.exports = (sequelize, DataTypes) => {

  class User extends sequelize.Sequelize.Model {
    static associate(models) {
      User.hasMany(models.Cart);
    }
  }

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { args: true, msg: 'Invalid Email Address' },
        notNull: { args: true, msg: 'Email Cannot Null' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Password Cannot Null' },
        len: { args: [5, 20], msg: 'Password Length Should Be 5-20 Length' }
      }
    },
    role: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Role Cannot Null' },
        isIn: { args: [['true', 'false']], msg: 'Only Accept true or false' }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate(user, options) {
        user.password = Helper.hashPassword(user.password);
      }
    }
  });


  return User;
};