"use strict";
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class Admin extends Model {
    static associate(models) {}
  }

  Admin.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Email has already been used, try a different one"
        },
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Email must be filled"
          },
          isEmail: {
            args: true,
            msg: "Email must be a valid email format"
          },
          notEmpty: {
            args: true,
            msg: "Email cannot be empty"
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Password must be filled"
          },
          notEmpty: {
            args: true,
            msg: "Password cannot be empty"
          },
          len: {
            args: [3],
            msg: "Password must at least contains 3 characters"
          }
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Username must be filled"
          },
          notEmpty: {
            args: true,
            msg: "Username cannot be empty"
          }
        }
      }
    },
    {
      hooks: {
        beforeCreate: (admin, options) => {
          admin.password = hashPassword(admin.password);
        }
      },
      sequelize,
      modelName: "Admin"
    }
  );

  return Admin;
};
