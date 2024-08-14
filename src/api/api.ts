import axios from 'axios';

const BASE_URL = 'https://hp-api.onrender.com/api';

export default axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});
