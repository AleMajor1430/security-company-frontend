import axios from 'axios';

const API_URL = 'https://security-company-backend.vercel.app/api';

export const getAllCompanies = async () => {
    try {
      const response = await axios.get(`${API_URL}/companies`);
      return response;
    } catch (error) {
      console.error('Error fetching companies:', error);
      throw error;
    }
  };

export const getCompanyById = (id) => {
  return axios.get(`${API_URL}/companies/${id}`);
};

export const createCompany = (companyData) => {
  return axios.post(`${API_URL}/add-company`, companyData);
};

export const updateCompany = (id, companyData) => {
  return axios.put(`${API_URL}/companies/${id}`, companyData);
};

export const updateCompanyStatus = async (id, status) => {
  try {
    const response = await axios.put(`${API_URL}/companies/update-status/${id}`, status);
    return response;
  } catch (error) {
    console.error('Error updating status:', error);
    throw error;
  }
};

export const deleteCompany = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/companies/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting company:', error);
      throw error;
    }
  };
