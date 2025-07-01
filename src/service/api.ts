import axios from 'axios';
import { AnalyzeRequest, AnalyzeResponse, ReportType } from '../types/apiTypes';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8090';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

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

export const reportApi = {
    // Analyze report query - generic for all types
    analyzeReport: async (request: AnalyzeRequest, reportType: ReportType): Promise<AnalyzeResponse> => {
        const endpoint = `/api/${reportType}/analyze`;
        const response = await apiClient.post<AnalyzeResponse>(endpoint, request);
        return response.data;
    },

    // Health check for specific report type
    healthCheck: async (reportType: ReportType): Promise<string> => {
        const response = await apiClient.get<string>(`/api/${reportType}/health`);
        return response.data;
    },
};