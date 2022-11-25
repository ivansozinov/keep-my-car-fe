import { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';

export function useToken() {
    const getToken = () => {
      const tokenString = localStorage.getItem('token');
      return tokenString;
    };
  
    const [token, setToken] = useState(getToken());
  
    const saveToken = userToken => {
        userToken === '' ? 
            localStorage.removeItem('token') : localStorage.setItem('token', userToken);
        setToken(userToken);
    };
  
    return {
      setToken: saveToken,
      token
    }
}

export default function useUserData() {
    const [userData, setUserData] = useState(null);
    const [isUserLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get('/user')
            .then(response => {
                setUserData(response.data);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }, []);

    return { isUserLoading, userData };
}