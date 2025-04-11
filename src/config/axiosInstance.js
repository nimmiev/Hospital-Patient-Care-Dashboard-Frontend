import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

// console.log(API_URL)

export const axiosInstance = axios.create({ baseURL: API_URL, withCredentials: true })

// Attach token from localStorage to every request
axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      // console.log(token);
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);