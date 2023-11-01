// Import Axios
import axios from 'axios';
import router from '../routes.js'
import store from '../store'
// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000, // Request timeout in milliseconds
});

// Add an interceptor to include the token in the request headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Replace with your token storage method
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error)
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
    (response) => {
        if(response.data.invalidToken){
            router.replace('/login');
            store.dispatch('admin/logout')
            return false;
        }
        return response;
    },
    (error) => {
      if (error.response.status === 401) {
        console.error('Invalid token error:', error);
        router.replace('/login')
        store.dispatch('admin/logout')
        return Promise.reject(error);
      } else {
        // Handle other types of errors (e.g., network errors) here
        return Promise.reject(error);
      }
    }
  );

export default axiosInstance;
