require('dotenv/config');
import { Sequelize } from 'sequelize';

const dbName: string = process.env.PG_DB;
const dbUser: string = process.env.PG_USER;
const dbHost: string = process.env.PG_HOST;
const dbPassword: string = process.env.PG_PASSWORD;

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'postgres'
});

export default sequelizeConnection;