import { Request, Response } from 'express';
import { userModel } from '../models/userModel';

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.userId;
    const user = await userModel.getUserById(userId);
    if (user) {
      res.json({ user: { id: user.id, email: user.email } });
    } else {
      res.status(404).json({ error: 'Utente non trovato' });
    }
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    res.status(500).json({ error: 'Errore interno del server' });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.userId;
    const { email } = req.body;
    const updatedUser = await userModel.updateUser(userId, { email });
    if (updatedUser) {
      res.json({ user: { id: updatedUser.id, email: updatedUser.email } });
    } else {
      res.status(404).json({ error: 'Utente non trovato' });
    }
  } catch (error) {
    console.error('Error in updateUserProfile:', error);
    res.status(500).json({ error: 'Errore interno del server' });
  }
};