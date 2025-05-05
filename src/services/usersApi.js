import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserById = (id) => {
  return axios.get(`${API_URL}/users/${id}`);
};

export const createUser = (userData) => {
  return axios.post(`${API_URL}/add-user`, userData);
};

export const updateUser = (id, userData) => {
  return axios.put(`${API_URL}/users/${id}`, userData);
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${id}`);
    return response;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
