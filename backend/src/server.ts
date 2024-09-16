import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { appRoutes } from './routes/routes';
import sequelize from './config/db';
import Book from './models/Books';
import User from './models/Users';

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', appRoutes);
app.use('/books', appRoutes);

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    // Sincronizza tutti i modelli con il database
    await sequelize.sync({ force: false, alter: true });
    console.log('All models were synchronized successfully.');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Aggiungi questo per il debugging
sequelize.afterSync(() => {
  console.log('Database structure after sync:');
  Object.values(sequelize.models).forEach(model => {
    console.log(`Model: ${model.name}`);
    console.log(model.rawAttributes);
  });
});

syncDatabase();