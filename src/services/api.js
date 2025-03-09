import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    // Add any filters to the query params
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value);
      }
    });
    
    const response = await api.get(`/products/?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProduct = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    throw error;
  }
};

export const compareProductPrices = async (productId) => {
  try {
    const response = await api.get(`/compare/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error comparing prices for product ${productId}:`, error);
    throw error;
  }
};

export const getBrands = async () => {
  try {
    const response = await api.get('/brands/');
    return response.data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw error;
  }
};

export const getStores = async () => {
  try {
    const response = await api.get('/stores/');
    return response.data;
  } catch (error) {
    console.error('Error fetching stores:', error);
    throw error;
  }
};

export const searchProducts = async (query) => {
  try {
    const response = await api.get(`/search/?query=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error(`Error searching for products with query "${query}":`, error);
    throw error;
  }
};

export const getMultiStoreProducts = async (minStores = 2) => {
  try {
    const response = await api.get(`/products/multi-store/?min_stores=${minStores}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching multi-store products:', error);
    throw error;
  }
};

export const getStats = async () => {
  try {
    const response = await api.get('/stats/');
    return response.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};

export default {
  getProducts,
  getProduct,
  compareProductPrices,
  getBrands,
  getStores,
  searchProducts,
  getMultiStoreProducts,
  getStats,
};
