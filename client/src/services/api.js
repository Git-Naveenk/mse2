import axios from 'axios';

// Determine API base URL based on environment
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://mse2-1r63.onrender.com/api';

console.log('API Base URL:', API_BASE_URL); // For debugging

const apiClient = axios.create({
  baseURL: API_BASE_URL
});

// Add token to every request
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export const authService = {
  register: (name, email, password, confirmPassword) =>
    apiClient.post('/auth/register', { name, email, password, confirmPassword }),
  
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password })
};

export const grievanceService = {
  createGrievance: (title, description, category) =>
    apiClient.post('/grievances', { title, description, category }),
  
  getAllGrievances: () =>
    apiClient.get('/grievances'),
  
  getGrievanceById: (id) =>
    apiClient.get(`/grievances/${id}`),
  
  updateGrievance: (id, data) =>
    apiClient.put(`/grievances/${id}`, data),
  
  deleteGrievance: (id) =>
    apiClient.delete(`/grievances/${id}`),
  
  searchGrievances: (title) =>
    apiClient.get('/grievances/search/query', { params: { title } })
};

export default apiClient;
