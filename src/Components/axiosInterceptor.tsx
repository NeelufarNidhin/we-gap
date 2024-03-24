import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const navigate = useNavigate()
// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Add Authorization header with the token
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    // Check for user blocking status or other conditions in response
    if (response.data.isBlocked) {
      navigate('/login')
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
