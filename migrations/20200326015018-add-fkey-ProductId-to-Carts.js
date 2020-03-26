"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("Carts", ["ProductId"], {
      type: "foreign key",
      name: "fkey_ProductId_Carts",
      references: {
        //Required field
        table: "Products",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("Carts", "fkey_ProductId_Carts");
  }
};
