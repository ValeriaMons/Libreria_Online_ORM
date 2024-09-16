import { Router } from 'express';
import { BookControllers } from '../controllers/bookshopControllers';
import { login, register } from '../controllers/authController';
import { authenticateToken } from '../middleware/authenticateToken';
import { getUserProfile, updateUserProfile } from '../controllers/userController'; 

const router = Router();
const bookshopController = new BookControllers();

// Rotte di autenticazione
router.post('/auth/login', login);
router.post('/auth/register', register);

// Rotte del profilo utente (protette)
router.get('/user/profile', authenticateToken, getUserProfile);
router.post('/user/profile', authenticateToken, updateUserProfile);

// Rotte dei libri (protette)
router.get('/books', authenticateToken, bookshopController.getBooks);
router.post('/books', authenticateToken, bookshopController.createNewBook);
router.put('/books/:id', authenticateToken, bookshopController.updateBook);
router.delete('/books/:id', authenticateToken, bookshopController.deleteBook);

export const appRoutes = router;