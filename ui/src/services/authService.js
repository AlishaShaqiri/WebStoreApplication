import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}login`, { username, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw new Error('Login failed: ' + error.response.data.message);
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1])); 
      return decoded; 
    } catch (e) {
      return null;
    }
  }
  return null;
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; 
};

export const getUserRole = () => {
  const user = getCurrentUser();
  return user ? user.role : null;
};
