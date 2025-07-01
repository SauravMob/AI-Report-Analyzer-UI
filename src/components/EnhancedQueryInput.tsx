import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ReportType } from '../types/apiTypes';

interface EnhancedQueryInputProps {
    onSubmit: (query: string) => void;
    loading: boolean;
    reportType: ReportType;
}

export const EnhancedQueryInput: React.FC<EnhancedQueryInputProps> = ({
    onSubmit,
    loading,
    reportType,
}) => {
    const [query, setQuery] = useState('');

    const getPlaceholder = (type: ReportType) => {
        switch (type) {
            case 'campaign':
                return 'e.g., "campaign: summer_sale_2024 performance last week"';
            case 'creative':
                return 'e.g., "creative: banner_v2 engagement this month"';
            case 'siteapp':
                return 'e.g., "siteapp: mobile_app conversions today"';
            default:
                return 'Enter your analysis query...';
        }
    };

    const getExamples = (type: ReportType) => {
        switch (type) {
            case 'campaign':
                return [
                    'campaign: summer_sale_2024 last week',
                    'campaign: holiday_promo this month',
                    'campaign: brand_awareness yesterday'
                ];
            case 'creative':
                return [
                    'creative: banner_v2 last week',
                    'creative: video_ad_001 this month',
                    'creative: carousel_ad today'
                ];
            case 'siteapp':
                return [
                    'siteapp: mobile_app last week',
                    'siteapp: website_main this month',
                    'siteapp: landing_page today'
                ];
            default:
                return [];
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim() && !loading) {
            onSubmit(query.trim());
        }
    };

    const handleExampleClick = (example: string) => {
        setQuery(example);
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={getPlaceholder(reportType)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                        rows={3}
                        disabled={loading}
                    />
                    <div className="absolute bottom-3 right-3">
                        <motion.button
                            type="submit"
                            disabled={!query.trim() || loading}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${query.trim() && !loading
                                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            {loading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Analyzing...</span>
                                </div>
                            ) : (
                                'Analyze'
                            )}
                        </motion.button>
                    </div>
                </div>
            </form>

            {/* Quick Examples */}
            <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Quick examples:</p>
                <div className="flex flex-wrap gap-2">
                    {getExamples(reportType).map((example, index) => (
                        <motion.button
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleExampleClick(example)}
                            className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200"
                            disabled={loading}
                        >
                            {example}
                        </motion.button>
                    ))}
                </div>
            </div>
        </div>
    );
};