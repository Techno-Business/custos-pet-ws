import { db } from "../../db";
import { DataTypes } from "sequelize";
import Details from "./Details";

const Cost = db.define('costs', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    type: {
        type: DataTypes.STRING(21),
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    details_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'details',
            key: 'id',
        }
    },
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
    tableName: 'costs',
});

Details.hasOne(Cost, {
    foreignKey: 'details_id',
});
Cost.belongsTo(Details, {
    foreignKey: 'details_id',
    as: 'details',
});

export default Cost;