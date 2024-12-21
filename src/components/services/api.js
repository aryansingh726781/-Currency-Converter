import axios from 'axios';
// import { API_URL } from '../../config';

export const fetchExchangeRates = async (baseCurrency) => {
  try {
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}?apiKey=e8277df2726887377f93de12`);
    return response.data;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
};
