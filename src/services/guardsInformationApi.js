// services/GuardInformationApi.js

import axios from 'axios';

const API_URL = 'https://security-company-backend.vercel.app/api';

export const getAllGuardsInformation = async () => {
    try {
        const response = await axios.get(`${API_URL}/guard-information-information`);
        return response;
    } catch (error) {
        console.error('Error fetching security company information:', error);
        throw error;
    }
};

export const createGuardInformation = async (companyInfoData) => {
    try {
        const response = await axios.post(`${API_URL}/guard-information-information`, companyInfoData);
        return response;
    } catch (error) {
        console.error('Error creating security company information:', error);
        throw error;
    }
};

export const updateGuardInformation = async (id, companyInfoData) => {
    try {
        const response = await axios.put(`${API_URL}/guard-information-information/${id}`, companyInfoData);
        return response;
    } catch (error) {
        console.error('Error updating security company information:', error);
        throw error;
    }
};

export const updateSecurityTaxClearance = async (id, taxClearance) => {
    try {
        const response = await axios.put(`${API_URL}/guard-information-information/update-tax-clearance/${id}`, { tax_clearance: taxClearance });
        return response;
    } catch (error) {
        console.error('Error updating security tax clearance:', error);
        throw error;
    }
};

export const deleteGuardInformation = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/guard-information-information/${id}`);
        return response;
    } catch (error) {
        console.error('Error deleting security company information:', error);
        throw error;
    }
};

export const updateGuardVerificationStatus = async (id, status) => {
    try {
        const response = await axios.put(`${API_URL}/security-companies/update-status/${id}`, status);
        return response;
    } catch (error) {
        console.error('Error updating security company verification status:', error);
        throw error;
    }
};
