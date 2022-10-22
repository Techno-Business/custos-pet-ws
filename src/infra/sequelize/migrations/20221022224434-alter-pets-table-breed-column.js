'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('pets', 'breed');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('pets', 'breed', {
      type: Sequelize.STRING(255),
      allowNull: false,
    })
  }
};
