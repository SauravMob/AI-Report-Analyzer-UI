import React, { useEffect } from 'react';
import { BarChart3, RefreshCw } from 'lucide-react';
import { StatusIndicator } from './ui/StatusIndicator';
import { useHealthCheck } from '../hooks/useApi';
import { motion } from 'framer-motion';

export const Header: React.FC = () => {
    const { checkHealth, loading, status } = useHealthCheck();

    useEffect(() => {
        checkHealth();
    }, [checkHealth]);

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border-b border-gray-200 sticky top-0 z-10"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <BarChart3 className="w-8 h-8 text-primary-600 mr-3" />
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                Campaign Analyzer
                            </h1>
                            <p className="text-sm text-gray-600">
                                AI-Powered Campaign Performance Analysis
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <StatusIndicator status={status} />
                        <button
                            onClick={checkHealth}
                            disabled={loading}
                            className="p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-100"
                            title="Refresh API Status"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.header>
    );
};