// src/services/auth.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const login = (email, password) => {
    return axios.post(`${API_URL}/login`, { email, password })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};
