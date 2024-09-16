import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axios';


const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Nota: non c'è bisogno di '/api' qui perché è già nell'baseURL
      const response = await axiosInstance.post('/auth/register', { email, password });
      console.log('Risposta registrazione:', response.data);
      navigate('/login');
      // Gestisci il successo qui
    } catch (err: any) {
      console.error('Errore registrazione:', err.response?.data || err.message);
      setError('Registrazione fallita. Riprova.');
    }
  };
  
  return (
    <div className="register-container">
      <h2>Registrazione</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Registrati</button>
      </form>
    </div>
  );
};

export default Register;