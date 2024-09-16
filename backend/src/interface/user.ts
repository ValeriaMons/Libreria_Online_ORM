import { Optional } from 'sequelize';

export interface UserAttributes {
    id?: number;
    email: string;
    password: string;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export interface UserInput {
    email: string;
    password: string;
}
