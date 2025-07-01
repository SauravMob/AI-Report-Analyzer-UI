import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart3,
    RefreshCw,
    TrendingUpIcon,
    SparklesIcon,
    Globe2Icon,
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon
} from 'lucide-react';
import { StatusIndicator } from './ui/StatusIndicator';
import { useHealthCheck } from '../hooks/useApi';
import { ReportType } from '../types/apiTypes';

interface HeaderProps {
    selectedReportType?: ReportType;
    onReportTypeChange?: (type: ReportType) => void;
}

export const Header: React.FC<HeaderProps> = ({
    selectedReportType,
    onReportTypeChange
}) => {
    const { checkHealth, loading, status } = useHealthCheck();
    const [allStatuses, setAllStatuses] = useState<Record<ReportType, 'online' | 'offline' | 'checking'>>({
        campaign: 'checking',
        creative: 'checking',
        siteapp: 'checking'
    });

    useEffect(() => {
        checkHealth();
    }, [checkHealth]);

    // Mock health check for all services (you can implement actual health checks)
    const checkAllServices = async () => {
        setAllStatuses({
            campaign: 'checking',
            creative: 'checking',
            siteapp: 'checking'
        });

        // Simulate API calls to different services
        setTimeout(() => {
            setAllStatuses({
                campaign: 'online',
                creative: 'online',
                siteapp: 'online'
            });
        }, 1000);
    };

    useEffect(() => {
        checkAllServices();
    }, []);

    const getReportIcon = (type: ReportType) => {
        switch (type) {
            case 'campaign':
                return <TrendingUpIcon className="w-5 h-5" />;
            case 'creative':
                return <SparklesIcon className="w-5 h-5" />;
            case 'siteapp':
                return <Globe2Icon className="w-5 h-5" />;
        }
    };

    const getStatusIcon = (status: 'online' | 'offline' | 'checking') => {
        switch (status) {
            case 'online':
                return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
            case 'offline':
                return <XCircleIcon className="w-4 h-4 text-red-500" />;
            case 'checking':
                return <ClockIcon className="w-4 h-4 text-yellow-500 animate-pulse" />;
        }
    };

    const getReportTypeColor = (type: ReportType) => {
        switch (type) {
            case 'campaign':
                return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'creative':
                return 'text-purple-600 bg-purple-50 border-purple-200';
            case 'siteapp':
                return 'text-green-600 bg-green-50 border-green-200';
        }
    };

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Title */}
                    <div className="flex items-center">
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            className="mr-3"
                        >
                            <BarChart3 className="w-8 h-8 text-blue-600" />
                        </motion.div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                Multi-Report Analytics
                            </h1>
                            <p className="text-sm text-gray-600">
                                AI-Powered Cross-Platform Analysis
                            </p>
                        </div>
                    </div>

                    {/* Report Type Quick Selector (if enabled) */}
                    {selectedReportType && onReportTypeChange && (
                        <div className="hidden md:flex items-center space-x-2">
                            {(['campaign', 'creative', 'siteapp'] as ReportType[]).map((type) => (
                                <motion.button
                                    key={type}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => onReportTypeChange(type)}
                                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-all duration-200 ${selectedReportType === type
                                            ? getReportTypeColor(type)
                                            : 'text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100'
                                        }`}
                                >
                                    {getReportIcon(type)}
                                    <span className="capitalize">{type}</span>
                                    {getStatusIcon(allStatuses[type])}
                                </motion.button>
                            ))}
                        </div>
                    )}

                    {/* Status and Controls */}
                    <div className="flex items-center space-x-4">
                        {/* Service Status Summary */}
                        <div className="hidden sm:flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                                <span className="text-xs text-gray-500">Services:</span>
                                <div className="flex space-x-1">
                                    {Object.entries(allStatuses).map(([service, serviceStatus]) => (
                                        <div
                                            key={service}
                                            className="flex items-center space-x-1"
                                            title={`${service} service is ${serviceStatus}`}
                                        >
                                            {getStatusIcon(serviceStatus)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Status Indicator */}
                        <StatusIndicator status={status} />

                        {/* Refresh Button */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                                checkHealth();
                                checkAllServices();
                            }}
                            disabled={loading}
                            className="p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-100 relative"
                            title="Refresh All Services Status"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                            {loading && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"
                                />
                            )}
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Report Type Selector */}
                {selectedReportType && onReportTypeChange && (
                    <div className="md:hidden pb-3">
                        <div className="flex space-x-2 overflow-x-auto">
                            {(['campaign', 'creative', 'siteapp'] as ReportType[]).map((type) => (
                                <button
                                    key={type}
                                    onClick={() => onReportTypeChange(type)}
                                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border text-sm font-medium whitespace-nowrap transition-all duration-200 ${selectedReportType === type
                                            ? getReportTypeColor(type)
                                            : 'text-gray-600 bg-gray-50 border-gray-200'
                                        }`}
                                >
                                    {getReportIcon(type)}
                                    <span className="capitalize">{type}</span>
                                    {getStatusIcon(allStatuses[type])}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </motion.header>
    );
};