import React from 'react';
import { BarChart3, TrendingUp, DollarSign, MousePointer, Eye, Target } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnalysisResultProps {
    analysis: string;
    query: string;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({
    analysis,
    query
}) => {
    const formatAnalysis = (text: string) => {
        // Split by sections and format
        const sections = text.split('\n\n');
        return sections.map((section, index) => {
            if (section.includes(':')) {
                const [title, ...content] = section.split(':');
                return (
                    <div key={index} className="mb-4">
                        <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                            {title.trim()}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                            {content.join(':').trim()}
                        </p>
                    </div>
                );
            }
            return (
                <p key={index} className="text-gray-700 leading-relaxed mb-4">
                    {section}
                </p>
            );
        });
    };

    const getIconForSection = (title: string) => {
        const iconClass = "w-5 h-5 mr-2 text-primary-600";
        const titleLower = title.toLowerCase();

        if (titleLower.includes('performance') || titleLower.includes('overview')) {
            return <BarChart3 className={iconClass} />;
        }
        if (titleLower.includes('trend') || titleLower.includes('insight')) {
            return <TrendingUp className={iconClass} />;
        }
        if (titleLower.includes('cost') || titleLower.includes('spend') || titleLower.includes('budget')) {
            return <DollarSign className={iconClass} />;
        }
        if (titleLower.includes('click') || titleLower.includes('ctr')) {
            return <MousePointer className={iconClass} />;
        }
        if (titleLower.includes('impression')) {
            return <Eye className={iconClass} />;
        }
        if (titleLower.includes('conversion') || titleLower.includes('recommendation')) {
            return <Target className={iconClass} />;
        }
        return <BarChart3 className={iconClass} />;
    };

    const extractMetrics = (text: string) => {
        const metrics: { label: string; value: string; }[] = [];
        const patterns = [
            { label: 'Impressions', regex: /(?:total\s+)?impressions:\s*([0-9,]+)/i },
            { label: 'Clicks', regex: /(?:total\s+)?clicks:\s*([0-9,]+)/i },
            { label: 'Conversions', regex: /(?:total\s+)?conversions:\s*([0-9,]+)/i },
            { label: 'CTR', regex: /(?:average\s+)?ctr:\s*([0-9.]+)%?/i },
            { label: 'Spend', regex: /(?:total\s+)?spend:\s*\$?([0-9,.]+)/i },
            { label: 'Conversion Rate', regex: /conversion\s+rate:\s*([0-9.]+)%/i },
        ];

        patterns.forEach(pattern => {
            const match = text.match(pattern.regex);
            if (match) {
                metrics.push({ label: pattern.label, value: match[1] });
            }
        });

        return metrics;
    };

    const metrics = extractMetrics(analysis);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl mx-auto"
        >
            {/* Query Display */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
                <h2 className="text-lg font-semibold text-primary-900 mb-2">
                    Analysis Query
                </h2>
                <p className="text-primary-800">{query}</p>
            </div>

            {/* Key Metrics Cards */}
            {metrics.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                    {metrics.map((metric, index) => (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white border border-gray-200 rounded-lg p-4 text-center"
                        >
                            <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                            <p className="text-xl font-bold text-gray-900">{metric.value}</p>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Analysis Content */}
            <div className="card">
                <div className="flex items-center mb-6">
                    <BarChart3 className="w-6 h-6 text-primary-600 mr-3" />
                    <h2 className="text-xl font-bold text-gray-900">
                        Campaign Analysis Results
                    </h2>
                </div>

                <div className="prose prose-gray max-w-none">
                    {formatAnalysis(analysis)}
                </div>
            </div>
        </motion.div>
    );
};