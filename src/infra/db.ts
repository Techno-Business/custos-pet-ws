import { Sequelize } from 'sequelize';
require('dotenv').config();

const env = process.env.NODE_ENV;

let db: Sequelize;

if (env === 'production') {
    db = new Sequelize(
        process.env.DATABASE_URL as string, {
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                }
            }
        }
    )
} else {
    db = new Sequelize(
        process.env.DATABASE_NAME as string,
        process.env.DATABASE_USER as string,
        process.env.DATABASE_PASS as string, {
            dialect: "postgres",
            host: process.env.DATABASE_HOST,
            port: +process.env.DATABASE_PORT!,
        }
    )
}

db.authenticate()
    .then(() => console.log("[Database]: successful connection."))
    .catch((error) => console.log("[Database]: connection has failed. Error: ", error))

export { db };