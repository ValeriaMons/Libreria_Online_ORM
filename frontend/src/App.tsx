// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import BookList from './components/BookList';

const App: React.FC = () => {
  const isAuthenticated = () => !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/books"
          element={isAuthenticated() ? <BookList /> : <Navigate to="/login" />}
        />
        <Route 
          path="/" 
          element={
            isAuthenticated() ? <Navigate to="/books" /> : <Navigate to="/login" />
          } 
        />
        {/* Rotta di fallback per gestire URL non corrispondenti */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;