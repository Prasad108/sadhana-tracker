// src/api.js
import axios from 'axios';

// Configure Axios instance
const api = axios.create({
  baseURL: 'http://localhost:4000', // Replace with your backend API's base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;


// src/api.js
export const submitSadhanaDetails = async (sadhana) => {
    try {
      const response = await api.post('/sadhana', sadhana);
      return response.data; // Return API response data
    } catch (error) {
      console.error('Error submitting Sadhana details:', error);
      throw error;
    }
  };
  