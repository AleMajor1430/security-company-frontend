import axios from 'axios';

const API_URL = 'https://security-company-backend.vercel.app/api';

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData, { withCredentials: true });
    // console.log("Login API response:", response);
    return response;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    return response;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export const verifyUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard`, { withCredentials: true });
    return response;
  } catch (error) {
    console.error("Error verifying user:", error);
    throw error;
  }
};
