"use strict";
const { hashPassword } = require("../helpers/bcrypt");
const fs = require("fs");
let data = JSON.parse(fs.readFileSync("seeders/data/admins.json", "utf8"));
data = data.map(el => {
  el.createdAt = new Date();
  el.updatedAt = new Date();
  el.password = hashPassword(el.password);
  return el;
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", data);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null);
  }
};
