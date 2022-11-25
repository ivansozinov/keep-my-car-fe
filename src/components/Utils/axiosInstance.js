import axios from 'axios';

const tokenString = localStorage.getItem('token');
//const userToken = JSON.parse(tokenString);

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization : `Bearer ${tokenString}`
        //Authorization : `Bearer ${process.env.REACT_APP_TOKEN}`
    }
});

export default axiosInstance;