import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  register: (userData: any) =>
    api.post('/auth/register', userData),
  getProfile: () =>
    api.get('/auth/profile'),
};

export const facultyAPI = {
  getFaculty: (params?: { department?: string; search?: string }) =>
    api.get('/faculty', { params }),
  getDepartments: () =>
    api.get('/faculty/departments'),
};

export const gradeAPI = {
  getGrades: () =>
    api.get('/grades'),
  getGradeSummary: () =>
    api.get('/grades/summary'),
};

export default api;