import { db } from "../../db";
import { DataTypes } from "sequelize";
import Owner from "./Owner";

const Pet = db.define('pets', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    photo: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            len: [1, 3]
        }
    },
    sex: {
        type: DataTypes.STRING(6),
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    breed: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    owner_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'owners',
            key: 'id',
        },
    },
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
    tableName: 'pets',
});

Owner.hasMany(Pet);
Pet.belongsTo(Owner);

export default Pet;