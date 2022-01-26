require('dotenv/config');
import { Sequelize } from 'sequelize'

const dbName = process.env.PG_DB as string
const dbUser = process.env.PG_USER as string
const dbHost = process.env.PG_HOST
const dbPassword = process.env.PG_PASSWORD

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'postgres'
})

export default sequelizeConnection