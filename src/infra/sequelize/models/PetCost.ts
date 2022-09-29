import { db } from "../../db";
import { DataTypes } from "sequelize";
import Pet from "./Pet";
import Cost from "./Cost";

const PetCost = db.define('pets_costs', {
    pet_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'pets',
            key: 'id',
        },
        primaryKey: true,
    },
    cost_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'costs',
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
    through: PetCost
});
Cost.belongsToMany(Pet, {
    through: PetCost
})

export default PetCost;