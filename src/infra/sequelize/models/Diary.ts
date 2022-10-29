import { db } from "../../db";
import { DataTypes } from "sequelize";
import Address from "./Address";

const Diary = db.define('diaries', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    address_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'addresses',
            key: 'id',
        },
    },
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
    tableName: 'diaries',
});

Address.hasMany(Diary);
Diary.belongsTo(Address);

export default Diary;