
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';  const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';  
 

 declare global {
     namespace Express {    
       interface Request {     
          user?: any;    
         }  } } 
         
         
          export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {   
            const authHeader = req.headers['authorization'];   
            const token = authHeader && authHeader.split(' ')[1];   
             if (!token) {     
              return res.status(401).json({ error: 'Token di autenticazione mancante' });  
             }    
             jwt.verify(token, SECRET_KEY, (err: any, user: any) => {     
              if (err) {       
                if (err.name === 'TokenExpiredError') {         
                  return res.status(401).json({ error: 'Token scaduto' });      
                 }       
                 return res.status(403).json({ error: 'Token non valido' });    
                 }         
                  req.user = user;    
                   next();  
                   }); };