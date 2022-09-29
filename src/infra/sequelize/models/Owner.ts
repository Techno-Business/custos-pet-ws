import { db } from '../../db';
import { DataTypes } from 'sequelize';

const Owner = db.define('owners', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    first_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
            len: [8, 64],
        },
    },
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
    tableName: 'owners',
    indexes: [
        { unique: true, fields: ['email'] },
    ]
});

export default Owner;