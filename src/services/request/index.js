import axios from 'axios';
import apis from '../../config/apis';
const axiosInstance = axios.create({
    baseURL: apis.Base_URL,
    timeout: 8000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

export const getRequest = async (url) => {
    try {
        const response = await axiosInstance.get(url);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error) {
        throw new Error('Network error: ' + error.message);
    }
};

export const postRequest = async (url, data) => {
    try {
        const response = await axiosInstance.post(url, data);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error) {
        throw new Error('Network error: ' + error.message);
    }
};

export const putRequest = async (url, data) => {

    try {
        const response = await axiosInstance.put(url, data);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error) {
        throw new Error('Network error: ' + error.message);
    }
};

export const deleteRequest = async (url, data) => {
    try {
        const response = await axiosInstance.delete(url, { data });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error) {
        throw new Error('Network error: ' + error.message);
    }
};

