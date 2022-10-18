import { db } from "../../db";
import { DataTypes } from "sequelize";
import Pet from "./Pet";
import Cost from "./Cost";

const PetCost = db.define('pets_costs', {
    pet_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Pet,
            key: 'id',
        },
        primaryKey: true,
    },
    cost_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Cost,
            key: 'id',
        },
        primaryKey: true,
    },
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
    tableName: 'pets_costs',
    indexes: [
        {
            unique: true,
            fields: ['pet_id', 'cost_id'],
        }
    ],
});

Pet.belongsToMany(Cost, {
    foreignKey: 'pet_id',
    through: {
        model: PetCost
    }
});
Cost.belongsToMany(Pet, {
    foreignKey: 'cost_id',
    through: {
        model: PetCost
    }
});

PetCost.belongsTo(Pet, {
    foreignKey: 'pet_id',
    as: 'pets',
});
PetCost.belongsTo(Cost, {
    foreignKey: 'cost_id',
    as: 'costs',
})

export default PetCost;