import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const getAllCompanyInformation = async () => {
    try {
        const response = await axios.get(`${API_URL}/company-information`);
        return response;
    } catch (error) {
        console.error('Error fetching company information:', error);
        throw error;
    }
};

export const createCompanyInformation = async (companyInfoData) => {
    try {
        const response = await axios.post(`${API_URL}/company-information`, companyInfoData);
        return response;
    } catch (error) {
        console.error('Error creating company information:', error);
        throw error;
    }
};

export const updateCompanyInformation = async (id, companyInfoData) => {
    try {
        const response = await axios.put(`${API_URL}/company-information/${id}`, companyInfoData);
        return response;
    } catch (error) {
        console.error('Error updating company information:', error);
        throw error;
    }
};

export const updateTaxClearance = async (id, taxClearance) => {
    try {
        const response = await axios.put(`${API_URL}/company-information/update-tax-clearance/${id}`, { tax_clearance: taxClearance });
        return response;
    } catch (error) {
        console.error('Error updating tax clearance:', error);
        throw error;
    }
};

export const deleteCompanyInformation = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/company-information/${id}`);
        return response;
    } catch (error) {
        console.error('Error deleting company information:', error);
        throw error;
    }
};

export const updateCompanyVerificationStatus = async (id, status) => {
    try {
        const response = await axios.put(`${API_URL}/companies/update-status/${id}`, status);
        return response;
    } catch (error) {
        console.error('Error updating status:', error);
        throw error;
    }
};
