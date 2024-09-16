import { Sequelize } from 'sequelize';

const dbName = process.env.DB_NAME || 'Libreria_Online';
const dbUser = process.env.DB_USER || 'postgres';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPassword = process.env.DB_PASSWORD || 'Bloodborne1!';
const dbPort = parseInt(process.env.DB_PORT || '5432', 10);

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'postgres',
  logging: console.log, // Imposta a false in produzione
});

export const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connessione al database stabilita con successo.');
  } catch (error) {
    console.error('Impossibile connettersi al database:', error);
  }
};

export default sequelize;