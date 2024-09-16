import { Optional } from "sequelize";

export interface BookAttributes {
    id?: number;
    title: string;
    author: string;
    published_year: number;
    genre: string;
    stock: number;
}

export type BookCreationAttributes = Optional<BookAttributes, 'id'>;