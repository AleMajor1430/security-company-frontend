import axios from 'axios';

const API_URL = 'https://security-company-backend.vercel.app/api';

export const getAllFireArms = async () => {
    try {
        const response = await axios.get(`${API_URL}/firearms`);
        return response;
    } catch (error) {
        console.error('Error fetching firearms:', error);
        throw error;
    }
};

export const getFireArmsByGuardId = async (guardId) => {
    try {
        const response = await axios.get(`${API_URL}/firearms/guard/${guardId}`);
        return response;
    } catch (error) {
        console.error('Error fetching firearms by guard:', error);
        throw error;
    }
};

export const getFireArmsByCompanyId = async (companyId) => {
    try {
        const response = await axios.get(`${API_URL}/firearms/company/${companyId}`);
        return response;
    } catch (error) {
        console.error('Error fetching firearms by company:', error);
        throw error;
    }
};

export const getFireArmById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/firearms/${id}`);
        return response;
    } catch (error) {
        console.error('Error fetching firearm:', error);
        throw error;
    }
};

export const createFireArm = async (fireArmData) => {
    try {
        const response = await axios.post(`${API_URL}/add-firearm`, fireArmData);
        return response;
    } catch (error) {
        console.error('Error creating firearm:', error);
        throw error;
    }
};

export const updateFireArm = async (id, fireArmData) => {
    try {
        const response = await axios.put(`${API_URL}/update-firearms/${id}`, fireArmData);
        return response;
    } catch (error) {
        console.error('Error updating firearm:', error);
        throw error;
    }
};

export const updateFireArmStatus = async (id, status) => {
    try {
        const response = await axios.put(`${API_URL}/firearms/update-status/${id}`, { status });
        return response;
    } catch (error) {
        console.error('Error updating firearm status:', error);
        throw error;
    }
};

export const deleteFireArm = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/firearms/${id}`);
        return response;
    } catch (error) {
        console.error('Error deleting firearm:', error);
        throw error;
    }
};