import {Options, Sequelize} from 'sequelize';

const options: Options = {
    host: 'ec2-44-198-196-169.compute-1.amazonaws.com',
    database: 'dcg1vj6dvfo965',
    username: 'ofcrjnadjkdkpv',
    port: 5432,
    password: '96139416aac0158787015707d6c799b2b33cde059c88d8b04a5807440d0adc9c',
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

