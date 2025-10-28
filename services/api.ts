import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL = 'http://172.20.10.2:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  login: async (nickname: string) => {
    const response = await api.post('/auth/login', { nickname });
    return response.data;
  },
  updateProfile: async (profileData: any) => {
    const response = await api.put('/auth/profile', profileData);
    return response.data;
  },
};

export const batAPI = {
  submitAssessment: async (responses: number[]) => {
    const response = await api.post('/bat/submit', { responses });
    return response.data;
  },
  getLatestAssessment: async () => {
    const response = await api.get('/bat/latest');
    return response.data;
  },
  getAssessmentHistory: async () => {
    const response = await api.get('/bat/history');
    return response.data;
  },
};

export const emojiAPI = {
  submitRating: async (ratingData: any) => {
    const response = await api.post('/emoji/submit', ratingData);
    return response.data;
  },
  getTodayRating: async () => {
    const response = await api.get('/emoji/today');
    return response.data;
  },
  getRatingHistory: async (period: 'daily' | 'weekly' | 'monthly') => {
    const response = await api.get(`/emoji/history?period=${period}`);
    return response.data;
  },
};

export default api;