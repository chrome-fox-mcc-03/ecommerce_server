'use strict';
const { hashPassword } = require('../helpers/bcrypt')
const email = require('../helpers/email')
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
      },
      afterCreate: (User, options) => {
        const body = {
          form: '"hacktiv8 shop" <hacktiv8shop@gmail.com',
          to: User.email,
          subject: 'H8 Shop',
          text: 'Thanks For Registering on H8 Shop!!'
        }
        email.sendMail(body, (error, info) => {
          if(error) throw new Error(error)
        })
      }
    },
    sequelize
  })
  User.associate = function(models) {
    User.hasOne(models.Cart)
  };
  return User;
};