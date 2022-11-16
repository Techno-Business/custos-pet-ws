'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('pets_diaries', {
      pet_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'pets',
          key: 'id',
        },
        primaryKey: true,
      },
      diary_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'diaries',
          key: 'id',
        },
        primaryKey: true,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    },{
      uniqueKeys: {
        petdiary_unique: {
          fields: ['pet_id', 'diary_id'],
        }
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('pets_diaries')
  }
};
