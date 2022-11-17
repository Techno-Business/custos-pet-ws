import { db } from "../../db";
import { DataTypes } from "sequelize";

const Address = db.define('addresses', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    postal_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    neighbourhood: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
    tableName: 'addresses',
});

export default Address;