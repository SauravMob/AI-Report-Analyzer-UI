import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface QueryInputProps {
    onSubmit: (query: string) => void;
    loading?: boolean;
    placeholder?: string;
}

export const QueryInput: React.FC<QueryInputProps> = ({
    onSubmit,
    loading = false,
    placeholder = "Ask me about campaign performance..."
}) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim() && !loading) {
            onSubmit(query.trim());
        }
    };

    const exampleQueries = [
        "Give me analysis for campaign 61 for last week",
        "Show performance of campaign_69 yesterday",
        "How is campaign 123 doing this month?",
        "Analyze campaign_45 for last month"
    ];

    const handleExampleClick = (example: string) => {
        setQuery(example);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="relative">
                <div className="relative">
                    <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={placeholder}
                        className="w-full p-4 pr-16 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-all duration-200 bg-white shadow-sm"
                        rows={3}
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={!query.trim() || loading}
                        className="absolute bottom-3 right-3 p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    >
                        {loading ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                                <Sparkles className="w-5 h-5" />
                            </motion.div>
                        ) : (
                            <Send className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </form>

            {/* Example queries */}
            <div className="mt-4">
                <p className="text-sm text-gray-600 mb-3 font-medium">Try these examples:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {exampleQueries.map((example, index) => (
                        <motion.button
                            key={index}
                            onClick={() => handleExampleClick(example)}
                            className="text-left p-3 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 border border-gray-200 hover:border-gray-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="text-gray-700">{example}</span>
                        </motion.button>
                    ))}
                </div>
            </div>
        </div>
    );
};