'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('pets_costs', {
      pet_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'pets',
          key: 'id',
        },
        primaryKey: true,
      },
      cost_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'costs',
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
        petcost_unique: {
          fields: ['pet_id', 'cost_id'],
        }
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('pets_costs')
  }
};
