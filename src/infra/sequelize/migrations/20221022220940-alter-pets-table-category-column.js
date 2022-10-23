'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('pets', 'species', 'category')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('pets', 'category', 'species')
  }
};
