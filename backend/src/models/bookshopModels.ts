import Books from "./Books";
import { BookAttributes, BookCreationAttributes } from "../interface/books";

export class BookshopModels {
    async getBooks(): Promise<Books[]> {
        return await Books.findAll();
    }

    async createNewBook(newBook: BookCreationAttributes): Promise<Books> {
        return await Books.create(newBook);
    }

    async updateBook(id: number, books: Partial<BookAttributes>): Promise<[number, Books[]]> {
        return await Books.update(books, {
            where: { id: id },
            returning: true,
        });
    }

    async deleteBook(id: number): Promise<number> {
        return await Books.destroy({
            where: { id: id }
        });
    }
}