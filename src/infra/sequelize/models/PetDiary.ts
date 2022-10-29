import { db } from "../../db";
import { DataTypes } from "sequelize";
import Pet from './Pet';
import Diary from './Diary';

const PetDiary = db.define('pets_diaries', {
    pet_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'pets',
            key: 'id',
        },
        primaryKey: true,
    },
    diary_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'diaries',
            key: 'id',
        },
        primaryKey: true,
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
    tableName: 'pets_diaries',
    indexes: [
        {
            unique: true,
            fields: ['pet_id', 'diary_id'],
        }
    ],
});

Pet.belongsToMany(Diary, {
    foreignKey: 'pet_id',
    through: {
        model: PetDiary
    }
});
Diary.belongsToMany(Pet, {
    foreignKey: 'diary_id',
    through: {
        model: PetDiary
    }
});

PetDiary.belongsTo(Pet, {
    foreignKey: 'pet_id',
    as: 'pets',
});
PetDiary.belongsTo(Diary, {
    foreignKey: 'diary_id',
    as: 'diaries',
})

export default PetDiary;