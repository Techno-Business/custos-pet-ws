'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('costs', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      type: {
        type: Sequelize.CHAR(21),
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      details_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'details',
          key: 'id',
        }
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('costs')
  }
};
