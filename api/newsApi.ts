import axios from 'axios';

// API Configuration
const API_KEY = '75cacf83350b4811932d41f621c65b53'; // Replace with your API Key
const BASE_URL = 'https://newsapi.org/v2';

export const fetchBusinessSources = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines/sources`, {
      params: {
        category: 'business',
        apiKey: API_KEY,
      },
    });
    return response.data.sources; // Return the list of business sources
  } catch (error) {
    throw error; // Propagate the error for handling
  }
};
