// src/api.js
import axios from 'axios';
import store from '../store';    

// Configure Axios instance
const api = axios.create({
  baseURL: 'https://dpv8dcfjv0.execute-api.ap-south-1.amazonaws.com', // Replace with your backend API's base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add Authorization token
api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;

// Function to fetch a Sadhana report
export const submitSadhanaDetails = async (sadhana) => {
  try {
    const response = await api.post('/sadhana', sadhana);
    return response.data; // Return API response data
  } catch (error) {
    console.error('Error submitting Sadhana details:', error);
    throw error;
  }
};

// Function to fetch a Sadhana report
export const getReport = async (payload) => {
  try {
    const response = await api.post('/sadhana/report', payload);
    return response.data; // Return the fetched report data
  } catch (error) {
    console.error('Error fetching Sadhana report:', error);
    throw error;
  }
};

// Token retrieval function
export const getToken = async () => {
  const state = store.getState(); // Access Redux store
  const user = state.auth.user; // Get user from Redux state

  if (user) {
    const tokenResult = await user.getIdTokenResult();
    const token = tokenResult.token;
    const expirationTime = tokenResult.expirationTime;

    // Check if the token is expired
    if (expirationTime * 1000 < Date.now()) {
      // Token is expired, fetch a new one
      const newToken = await user.getIdToken(true); // Force refresh
      return newToken;
    } else {
      return token;
    }
  } else {
    return null;
  }
};
