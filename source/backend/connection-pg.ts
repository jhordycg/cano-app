import {Options, Sequelize} from 'sequelize';

const options: Options = {
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    port: process.env.POSTGRES_PORT as number | undefined,
    password: process.env.POSTGRES_PASSWORD,

    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    define: {
        freezeTableName: true,
    },
    sync: {
        force: true,
        alter: true,
    }
}

export const sequelize = new Sequelize(options);
