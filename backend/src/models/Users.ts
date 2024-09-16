import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import { UserAttributes, UserCreationAttributes } from '../interface/user';

class Users extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public email!: string;
    public password!: string;
}

Users.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'users',
    tableName: 'users', // Specifica il nome esatto della tabella nel database
    timestamps: false, // Disabilita createdAt e updatedAt se non sono presenti nella tua tabella
});

export default Users;