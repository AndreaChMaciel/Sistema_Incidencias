import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', //url api laravel
});

export default api;
