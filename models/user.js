'use strict';
const { hashPassword } = require('../helper/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model{}
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        isNull: {
          msg: 'Please insert your name'
        },
        isEmpty: {
          msg: 'Please insert your name'
        },
        is: {
          args: /^[a-zA-Z]+$/i,
          msg: 'Name is not valid'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        isNull: {
          msg: 'Please insert your name'
        },
        isEmpty: {
          msg: 'Please insert your name'
        },
        isEmail: {
          msg: 'Email is not valid.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        isNull: {
          msg: 'Please insert your password'
        },
        isEmpty: {
          msg: 'Please insert your password'
        },
        len: {
          args: [5],
          msg: 'Password has the minimum characters of 5.'
        }
        
      }
    },
    img_url: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'No store.'
    },
    store_id: {
      type: DataTypes.INTEGER,
      defaultValue: -1
    },
  }, {
      hooks: {
        beforeCreate: (user, options) => {
          user.password = hashPassword(user.password)
        }
      },
      sequelize,
      modelName: 'User'
    });
  User.associate = function(models) {
    User.belongsTo(models.Store, { foreignKey: 'store_id' })
  };
  return User;
};