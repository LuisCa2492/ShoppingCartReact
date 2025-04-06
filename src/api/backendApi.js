import axios from 'axios';

export const backendApi = axios.create({
    baseURL: 'https://localhost:44348'
});