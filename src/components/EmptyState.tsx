import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const EmptyState: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
        >
            <div className="mx-auto w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <MessageSquare className="w-12 h-12 text-primary-600" />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Ready to Analyze Your Campaigns
            </h3>

            <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Ask me anything about your campaign performance. I can analyze metrics,
                provide insights, and suggest optimizations using natural language.
            </p>

            <div className="flex items-center justify-center space-x-2 text-sm text-primary-600">
                <Sparkles className="w-4 h-4" />
                <span>Powered by AI</span>
            </div>
        </motion.div>
    );
};