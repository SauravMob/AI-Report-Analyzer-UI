import { useState, useCallback } from 'react';
import { reportApi } from '../service/api';
import { AnalyzeRequest, AnalyzeResponse, ReportType } from '../types/apiTypes';

export const useAnalyzeReport = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const analyzeReport = async (
        request: AnalyzeRequest,
        reportType: ReportType
    ): Promise<AnalyzeResponse | null> => {
        setLoading(true);
        setError(null);

        try {
            const result = await reportApi.analyzeReport(request, reportType);
            return result;
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Unknown error occurred');
            setError(error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { analyzeReport, loading, error };
};

export const useHealthCheck = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'online' | 'offline' | 'checking'>('checking');
    const [allServicesStatus, setAllServicesStatus] = useState<Record<ReportType, 'online' | 'offline' | 'checking'>>({
        campaign: 'checking',
        creative: 'checking',
        siteapp: 'checking'
    });

    const checkHealth = useCallback(async (reportType?: ReportType) => {
        setLoading(true);

        try {
            if (reportType) {
                // Check specific service
                setAllServicesStatus(prev => ({ ...prev, [reportType]: 'checking' }));
                await reportApi.healthCheck(reportType);
                setAllServicesStatus(prev => ({ ...prev, [reportType]: 'online' }));
            } else {
                // Check all services
                setStatus('checking');
                setAllServicesStatus({
                    campaign: 'checking',
                    creative: 'checking',
                    siteapp: 'checking'
                });

                const healthChecks = await Promise.allSettled([
                    reportApi.healthCheck('campaign'),
                    reportApi.healthCheck('creative'),
                    reportApi.healthCheck('siteapp')
                ]);

                const newStatus: Record<ReportType, 'online' | 'offline' | 'checking'> = {
                    campaign: healthChecks[0].status === 'fulfilled' ? 'online' : 'offline',
                    creative: healthChecks[1].status === 'fulfilled' ? 'online' : 'offline',
                    siteapp: healthChecks[2].status === 'fulfilled' ? 'online' : 'offline'
                };

                setAllServicesStatus(newStatus);

                // Set overall status based on all services
                const allOnline = Object.values(newStatus).every(s => s === 'online');
                const anyOnline = Object.values(newStatus).some(s => s === 'online');
                setStatus(allOnline ? 'online' : anyOnline ? 'checking' : 'offline');
            }
        } catch (error) {
            if (reportType) {
                setAllServicesStatus(prev => ({ ...prev, [reportType]: 'offline' }));
            } else {
                setStatus('offline');
                setAllServicesStatus({
                    campaign: 'offline',
                    creative: 'offline',
                    siteapp: 'offline'
                });
            }
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        checkHealth,
        loading,
        status,
        allServicesStatus,
        checkSpecificService: (reportType: ReportType) => checkHealth(reportType)
    };
};