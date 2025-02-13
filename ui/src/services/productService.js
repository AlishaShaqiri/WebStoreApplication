import axios from 'axios';
import io from 'socket.io-client';
import config from './config';

export const fetchFilters = async () => {
    try {
        const response = await axios.get(config.FILTERS_URL);
        return response.data;
    } catch (error) {
        throw new Error('Failed to load filter data.');
    }
};

export const fetchProducts = async (filters) => {
    try {
        const params = buildFilteredParams(filters);
        const response = await axios.get(`${config.PRODUCT_URL}search`, { params });
        return response.data;
    } catch (error) {
        throw new Error('Failed to load products.');
    }
};

export const fetchProductDetails = async (id) => {
    try {
        const response = await axios.get(`${config.PRODUCT_URL}${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to load product details.');
    }
};

export const updateProduct = async (id, productData, token) => {
    try {
        const response = await axios.put(
            `${config.PRODUCT_URL}${id}`, 
            productData, 
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error response:', error.response?.data || error.message);
        throw new Error('Failed to update product. Please try again later.');
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${config.PRODUCT_URL}${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete product');
    }
};
export const addProduct = async (productData, token) => {
    try {
        const response = await axios.post(
            config.PRODUCT_URL, 
            productData, 
            {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data' // Ensures file upload works properly
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error response:', error.response?.data || error.message);
        throw new Error('Failed to add product. Please try again later.');
    }
};


const buildFilteredParams = (filters) => {
    const params = {};
    for (const key in filters) {
        if (filters[key]) {
            params[key] = filters[key];
        }
    }
    return params;
};

export const createSocketConnection = (productId, callback) => {
    const socket = io(config.BASE_URL);

    socket.on('productQuantityUpdated', (data) => {
        if (data.product_id === productId) {
            callback(data.current_quantity);
        }
    });

    return socket;
};
