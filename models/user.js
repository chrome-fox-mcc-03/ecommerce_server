'use strict';
const {encrypt} = require('../helpers/helper')

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model{}
  User.init({
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'invalid email format'
        },
        notEmpty: {
          args: true,
          msg: 'email cant empty'
        },
        notNull : {
          args: true,
          msg: 'email cant empty'
        },
        isUnique: (value,next) => {
          User.findOne({
            where:{email:value}
          })
          .then((result) => {
            if(result) {
              next({status:500,message:'email has already been used'})
            }else{
              next()
            }
          }).catch((err) => {
            next(err)
          });
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'password cant empty'
        },
        len: {
          args: [6],
          msg: 'password min 6 characters'
        }
      }
    },
    isAdmin: {
      type:DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user,option) => {
        encrypt(user)
        User.isAdmin=false
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};