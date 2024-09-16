import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Book } from '../types/Book';
import './BookList.css';

const API_BASE_URL = 'http://localhost:5000/api';

const BookList: React.FC = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isInsertFormVisible, setIsInsertFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const [newBook, setNewBook] = useState<Omit<Book, 'id'>>({
    title: '',
    author: '',
    published_year: null,
    genre: null,
    stock: null
  });

  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const handleApiError = useCallback((error: any, action: string) => {
    console.error(`Errore durante ${action}:`, error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.log('Sessione scaduta. Reindirizzamento al login.');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setError(`Errore durante ${action}: ${error.response?.data.message || error.message}`);
      }
    } else {
      setError(`Errore imprevisto durante ${action}.`);
    }
  }, [navigate]);

  const fetchBooks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get<Book[]>(`${API_BASE_URL}/books`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooks(response.data);
    } catch (error) {
      handleApiError(error, 'il recupero dei libri');
    } finally {
      setIsLoading(false);
    }
  }, [handleApiError]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchBooks();
    }
  }, [navigate, fetchBooks]);

  const searchResults = useMemo(() => {
    if (!isSearching) return books;
    return books.filter(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [books, searchTerm, isSearching]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSearching(true);
  };

  const handleInsert = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE_URL}/books`, newBook, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewBook({
        title: '',
        author: '',
        published_year: null,
        genre: null,
        stock: null
      });
      setIsInsertFormVisible(false);
      fetchBooks();
    } catch (error) {
      handleApiError(error, "l'inserimento del libro");
    }
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingBook) return;
    setError(null);
    setIsUpdating(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token di autenticazione non trovato');
  
      const { id, title, author, published_year, genre, stock } = editingBook;
      const bookData = { title, author, published_year, genre, stock };
  
      await axios.put(`${API_BASE_URL}/books/${id}`, bookData, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      setIsEditFormVisible(false);
      fetchBooks();
    } catch (error) {
      handleApiError(error, 'la modifica del libro');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Sei sicuro di voler eliminare questo libro?')) {
      setError(null);
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_BASE_URL}/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchBooks();
      } catch (error) {
        handleApiError(error, "l'eliminazione del libro");
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setIsSearching(event.target.value !== '');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const renderBooks = () => {
    if (searchResults.length === 0) {
      return <p>Nessun libro trovato.</p>;
    }

    return (
      <ul className="books-grid">
        {searchResults.map((book) => (
          <li key={book.id} className="book-item">
            <h3>{book.title}</h3>
            <p>Autore: {book.author}</p>
            <p>Anno di pubblicazione: {book.published_year}</p>
            <p>Genere: {book.genre}</p>
            <p>Copie disponibili: {book.stock}</p>
            <button className='editButton' onClick={() => {
              setEditingBook({...book});
              setIsEditFormVisible(true);
            }}>Modifica</button>
            <button className='deleteButton' onClick={() => handleDelete(book.id)}>Elimina</button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="book-list">
      <h1 className='title-document'>Libreria Online</h1>
      <button onClick={handleLogout} className="logout-button">Logout</button>
      
      <form onSubmit={handleSearch} className="search-form">
        <label htmlFor="search-input"></label>
        <input
          id="search-input"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Cerca per titolo o autore"
          className="search-input"
        />
        <button type="submit" className="search-button">Cerca</button>
      </form>

      <button onClick={() => setIsInsertFormVisible(!isInsertFormVisible)} className="mostra-button">
        {isInsertFormVisible ? 'Nascondi' : 'Inserisci Nuovo Libro'}
      </button>

      {isInsertFormVisible && (
        <form onSubmit={handleInsert} className="add-form">
          <label htmlFor="insert-title"></label>
          <input
            id="insert-title"
            type="text"
            value={newBook.title}
            onChange={(e) => setNewBook({...newBook, title: e.target.value})}
            placeholder="Titolo"
            className="insertTitle"
            required
          />
          <label htmlFor="insert-author"></label>
          <input
            id="insert-author"
            type="text"
            value={newBook.author}
            onChange={(e) => setNewBook({...newBook, author: e.target.value})}
            placeholder="Autore"
            className="insertAuthor"
            required
          />
          <label htmlFor="insert-year"></label>
          <input
            id="insert-year"
            type='number'
            value={newBook.published_year ?? ''}
            onChange={(e) => setNewBook({...newBook, published_year: e.target.value ? Number(e.target.value) : null})}
            placeholder="Anno di pubblicazione"
            className="insertPublished_Year"
            min="0"
            max={new Date().getFullYear()}
          />
          <label htmlFor="insert-genre"></label>
          <input
            id="insert-genre"
            type="text"
            value={newBook.genre ?? ''}
            onChange={(e) => setNewBook({...newBook, genre: e.target.value || null})}
            placeholder="Genere"
            className="insertGenre"
          />
          <label htmlFor="insert-stock"></label>
          <input
            id="insert-stock"
            type='number'
            value={newBook.stock ?? ''}
            onChange={(e) => setNewBook({...newBook, stock: e.target.value ? Number(e.target.value) : null})}
            placeholder="Copie disponibili"
            className="insertStock"
            min="0"
          />
          <button type="submit" className="insert-button">Inserisci</button>
          <button type="button" onClick={() => setIsInsertFormVisible(false)} className="cancel-button">Annulla</button>
        </form>
      )}

      {isEditFormVisible && editingBook && (
        <div className="edit-form-overlay">
          <div className="edit-form-container">
            <h2 className='modificaLibro'>Modifica Libro</h2>
            <form onSubmit={handleEdit} className="edit-form">
              <label htmlFor="edit-title"></label>
              <input
                id="edit-title"
                type="text"
                value={editingBook.title}
                onChange={(e) => setEditingBook({...editingBook, title: e.target.value})}
                placeholder="Titolo"
                className="editTitle"
                required
              />
              <label htmlFor="edit-author"></label>
              <input
                id="edit-author"
                type="text"
                value={editingBook.author}
                onChange={(e) => setEditingBook({...editingBook, author: e.target.value})}
                placeholder="Autore"
                className="editAuthor"
                required
              />
              <label htmlFor="edit-year"></label>
              <input
                id="edit-year"
                type='number'
                value={editingBook.published_year ?? ''}
                onChange={(e) => setEditingBook({...editingBook, published_year: e.target.value ? Number(e.target.value) : null})}
                placeholder="Anno di pubblicazione"
                className="editPublished_Year"
                min="0"
                max={new Date().getFullYear()}
              />
              <label htmlFor="edit-genre"></label>
              <input
                id="edit-genre"
                type="text"
                value={editingBook.genre ?? ''}
                onChange={(e) => setEditingBook({...editingBook, genre: e.target.value || null})}
                placeholder="Genere"
                className="editGenre"
              />
              <label htmlFor="edit-stock"></label>
              <input
                id="edit-stock"
                type='number'
                value={editingBook.stock ?? ''}
                onChange={(e) => setEditingBook({...editingBook, stock: e.target.value ? Number(e.target.value) : null})}
                placeholder="Copie disponibili"
                className="editStock"
                min="0"
              />
              <button type="submit" className="edit-button">Salva Modifiche</button>
              <button type="button" onClick={() => setIsEditFormVisible(false)} className="cancel-button">Annulla</button>
            </form>
          </div>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
      {isLoading ? <p>Caricamento in corso...</p> : renderBooks()}
    </div>
  );
};

export default BookList;