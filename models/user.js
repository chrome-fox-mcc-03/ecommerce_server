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
        notEmpty: {
          args: true,
          msg: 'email is required'
        },
        isEmail: {
          args: true,
          msg: `You must enter an valid email address!`
        },
        isUnique(value, next) {
          User.findOne({ where: { email: value } })
            .then(result => {
              if (result) {
                next('User already exist!')
              } else {
                next()
              }
            })
            .catch(err => {
              next(err)
            })
        }
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
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Role can't be blank`
        }
      }
    }
  }, {
    sequelize, hooks: {
      beforeCreate(user, options) {
        user.password = encryptPassword(user.password)
      }
    }
  })

  User.associate = function (models) {
    // associations can be defined here
    User.hasOne(models.Cart)
    User.hasMany(models.Transaction)
  };
  return User;
};