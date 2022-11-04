'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'owners',
      'password_validation_key',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('password_validation_key');
  }
};
