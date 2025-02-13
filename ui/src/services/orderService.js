import axios from 'axios';
import config from './config';

export const createOrder = async (orderData) => {
    try {
        const response = await axios.post(config.ORDER_URL, orderData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to place order. Please try again later.');
    }
};
