import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7086/api/Customers' // backend endpoints are assumed under this base
});

export default api;
