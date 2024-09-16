import { Request, Response } from 'express';
import { BookshopModels } from '../models/bookshopModels';
import { validateBook } from '../middleware/validation-handler';
import Book from '../models/Books';
import errorHandler from '../middleware/errorHandler';

export class BookControllers {
    private bookshopModels: BookshopModels;

    constructor() {
        this.bookshopModels = new BookshopModels();
    }

    getBooks = async (req: Request, res: Response) => {
        try {
            const books = await Book.findAll();
            console.log('Libri recuperati:', books); // Aggiungi questo log
            res.json(books);
          } catch (error) {
            console.error('Errore nel recupero dei libri:', error);
            res.status(500).json({ message: 'Errore nel recupero dei libri' });
          }
    }

    createNewBook = async (req: Request, res: Response) => {
        try {
            validateBook(req.body);
            const newBook = await this.bookshopModels.createNewBook(req.body);
            res.status(201).json(newBook);
        } catch (error) {
            console.error("Error in createNewBook:", error);
            errorHandler(res, error);
        }
    }

    updateBook = async (req: Request, res: Response) => {
        try {
            const bookId = parseInt(req.params.id, 10); // Estrai l'ID del libro dall'URL
            const bookData = req.body;
    
            validateBook(bookData);
    
            // Passa l'ID del libro separatamente dai dati del libro
            const updatedBook = await this.bookshopModels.updateBook(bookId, bookData);
    
            if (updatedBook) {
                res.json(updatedBook);
            } else {
                res.status(404).json({ error: 'Libro non trovato' });
            }
        } catch (error) {
            console.error("Error in updateBook:", error);
            errorHandler(res, error);
        }
    }

    deleteBook = async (req: Request, res: Response) => {
        try {
            const deleted = await this.bookshopModels.deleteBook(parseInt(req.params.id));
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Libro non trovato' });
            }
        } catch (error) {
            console.error("Error in deleteBook:", error);
            errorHandler(res, error);
        }
    }
}