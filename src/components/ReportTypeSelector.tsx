import React from 'react';
import { motion } from 'framer-motion';
import { ReportType, ReportConfig } from '../types/apiTypes';
import {
    ArrowTrendingUpIcon,
    SparklesIcon,
    GlobeAltIcon
} from '@heroicons/react/24/outline';

interface ReportTypeSelectorProps {
    selectedType: ReportType;
    onTypeChange: (type: ReportType) => void;
}

export const ReportTypeSelector: React.FC<ReportTypeSelectorProps> = ({
    selectedType,
    onTypeChange,
}) => {
    const reportConfigs: ReportConfig[] = [
        {
            type: 'campaign',
            label: 'Campaign Analysis',
            description: 'Analyze campaign performance, ROI, and optimization opportunities',
            icon: <ArrowTrendingUpIcon className="w-6 h-6" />,
            color: 'bg-blue-500',
            endpoint: '/api/campaign/analyze',
            placeholder: 'campaign: summer_sale_2024 last week'
        },
        {
            type: 'creative',
            label: 'Creative Analysis',
            description: 'Evaluate creative performance, engagement, and visual impact',
            icon: <SparklesIcon className="w-6 h-6" />,
            color: 'bg-purple-500',
            endpoint: '/api/creative/analyze',
            placeholder: 'creative: banner_v2 this month'
        },
        {
            type: 'siteapp',
            label: 'Site/App Analysis',
            description: 'Monitor site and app performance, user behavior, and conversions',
            icon: <GlobeAltIcon className="w-6 h-6" />,
            color: 'bg-green-500',
            endpoint: '/api/siteapp/analyze',
            placeholder: 'siteapp: mobile_app today'
        }
    ];

    return (
        <div className="w-full max-w-4xl mx-auto mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                Choose Analysis Type
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {reportConfigs.map((config) => (
                    <motion.div
                        key={config.type}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative cursor-pointer rounded-lg border-2 transition-all duration-200 ${selectedType === config.type
                            ? 'border-blue-500 bg-blue-50 shadow-lg'
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                            }`}
                        onClick={() => onTypeChange(config.type)}
                    >
                        <div className="p-6">
                            <div className="flex items-center mb-3">
                                <div className={`flex-shrink-0 p-2 rounded-lg ${config.color} text-white mr-3`}>
                                    {config.icon}
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900">
                                    {config.label}
                                </h4>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">
                                {config.description}
                            </p>
                            <div className="text-xs text-gray-500 font-mono bg-gray-100 rounded px-2 py-1">
                                {config.placeholder}
                            </div>
                        </div>

                        {selectedType === config.type && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                            >
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};