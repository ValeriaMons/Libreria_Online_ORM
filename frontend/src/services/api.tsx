import axios from 'axios';

const API_URL = 'http://localhost:3000/books';

export const get = () => axios.get(`${API_URL}/books`);
export const post = () => axios.post(`${API_URL}/books`);
export const put = (id: number | string) => axios.put(`${API_URL}/books/:id${id}`);
export const deletebook = (id: number | string) => axios.delete(`${API_URL}/books/:id${id}`);
