import axios from 'axios';
import { AnalyzeRequest, AnalyzeResponse } from '../types/apiTypes';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8090';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor
apiClient.interceptors.request.use(
    (config) => {
        console.log('API Request:', config.method?.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
apiClient.interceptors.response.use(
    (response) => {
        console.log('API Response:', response.status, response.data);
        return response;
    },
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const campaignApi = {
    // Analyze campaign query
    analyzeCampaign: async (request: AnalyzeRequest): Promise<AnalyzeResponse> => {
        const response = await apiClient.post<AnalyzeResponse>('/api/analyze', request);
        return response.data;
    },

    // Health check
    healthCheck: async (): Promise<string> => {
        const response = await apiClient.get<string>('/api/health');
        return response.data;
    },
};