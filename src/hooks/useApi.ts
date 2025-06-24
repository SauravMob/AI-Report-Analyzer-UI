import { useState, useCallback } from 'react';
import { AnalyzeRequest, AnalyzeResponse, ApiError } from '../types/apiTypes';
import { campaignApi } from '../service/api';

export const useAnalyzeCampaign = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);

    const analyzeCampaign = useCallback(async (request: AnalyzeRequest): Promise<AnalyzeResponse | null> => {
        setLoading(true);
        setError(null);

        try {
            const response = await campaignApi.analyzeCampaign(request);
            return response;
        } catch (err: any) {
            const error: ApiError = {
                message: err.response?.data?.error || err.message || 'An unexpected error occurred',
                status: err.response?.status,
            };
            setError(error);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return { analyzeCampaign, loading, error };
};

export const useHealthCheck = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'unknown' | 'healthy' | 'unhealthy'>('unknown');

    const checkHealth = useCallback(async () => {
        setLoading(true);
        try {
            await campaignApi.healthCheck();
            setStatus('healthy');
        } catch (err) {
            setStatus('unhealthy');
        } finally {
            setLoading(false);
        }
    }, []);

    return { checkHealth, loading, status };
};