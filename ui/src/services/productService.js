import axios from 'axios';
import io from 'socket.io-client';

const API_URL = 'http://localhost:5000/api/products/';
const FILTERS_API_URL = 'http://localhost:5000/api/products/filters';
const PRODUCT_API_URL = 'http://localhost:5000/api/products/';


export const fetchFilters = async () => {
    try {
        const response = await axios.get(FILTERS_API_URL);
        return response.data;
    } catch (error) {
        throw new Error('Failed to load filter data.');
    }
};


export const fetchProducts = async (filters) => {
    try {
        const params = buildFilteredParams(filters);
        const response = await axios.get(API_URL + 'search', { params });
        return response.data;
    } catch (error) {
        throw new Error('Failed to load products.');
    }
};


export const fetchProductDetails = async (id) => {
    try {
        const response = await axios.get(`${PRODUCT_API_URL}${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to load product details.');
    }
};

export const addProduct = async (productData, token) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const response = await axios.post(PRODUCT_API_URL, productData, config);
        return response.data;
    } catch (error) {
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
    const socket = io('http://localhost:5000');

    socket.on('productQuantityUpdated', (data) => {
        if (data.product_id === productId) {
            callback(data.current_quantity);
        }
    });

    return socket;
};
