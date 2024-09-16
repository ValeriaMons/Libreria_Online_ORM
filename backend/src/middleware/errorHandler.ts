import { Response } from "express";
 
const errorHandler = (res: Response, error: any) => {
    console.error("Error details:", error);
  
    if (error.name === 'ValidationError') {
      res.status(400).json({
        error: 'Validation failed',
        details: error.errors
      });
    } else {
      const statusCode = error.statusCode || 500;
      const message = error.message || 'Si è verificato un errore imprevisto';
      res.status(statusCode).json({ error: message });
    }
};
 
export default errorHandler;