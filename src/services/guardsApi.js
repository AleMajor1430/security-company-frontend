import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getAllGuards = async () => {
  try {
    const response = await api.get('/guards');
    return response;
  } catch (error) {
    console.error('Error fetching guards:', error);
    throw error;
  }
};

export const getGuardById = (id) => {
  return api.get(`/guards/${id}`);
};

export const createGuard = (guardData) => {
  return api.post('/add-guard', guardData);
};

export const updateGuard = (id, guardData) => {
return api.put(`/update-guard/${id}`, guardData);
};

export const updateGuardStatus = async (id, statusData) => {
  try {
    const response = await api.put(`/guards/update-status/${id}`, statusData);
    return response.data;
  } catch (error) {
    console.error('Error updating guard status:', error);
    throw error;
  }
};

export const deleteGuard = async (id) => {
  try {
    const response = await api.delete(`/delete-guard/${id}`);
    return response;
  } catch (error) {
    console.error('Error deleting guard:', error);
    throw error;
  }
};

export const getGuardsByStatus = async (status) => {
  try {
    const response = await api.get(`/guards-status/${status}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGuardsByCompanyId = async (companyId) => {
  try {
    const response = await api.get(`/guards/company/${companyId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};