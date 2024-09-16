import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';

class Books extends Model {
  public id!: number;
  public title!: string;
  public author!: string;
  public published_year!: number | null;
  public genre!: string | null;
  public stock!: number | null;
}

Books.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  published_year: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'books',
  tableName: 'books', // Assicurati che questo corrisponda al nome effettivo della tua tabella
  timestamps: false, // Se non hai colonne createdAt e updatedAt
});

export default Books;