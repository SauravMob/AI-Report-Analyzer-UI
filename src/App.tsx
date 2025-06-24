import React, { useState } from 'react';
import { Header } from './components/Header';
import { QueryInput } from './components/QueryInput';
import { AnalysisResult } from './components/AnalysisResult';
import { EmptyState } from './components/EmptyState';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { ErrorAlert } from './components/ui/ErrorAlert';
import { useAnalyzeCampaign } from './hooks/useApi';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

interface AnalysisHistory {
  id: string;
  query: string;
  analysis: string;
  timestamp: Date;
}

function App() {
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisHistory | null>(null);
  const [history, setHistory] = useState<AnalysisHistory[]>([]);
  const { analyzeCampaign, loading, error } = useAnalyzeCampaign();

  const cleanAnalysisText = (text: string): string => {
    if (!text) return '';

    let cleanedText = text;

    // Remove <think> blocks and their content (case insensitive)
    cleanedText = cleanedText.replace(/<think>[\s\S]*?<\/think>/gi, '');

    // Remove other common AI reasoning tags
    cleanedText = cleanedText.replace(/<reasoning>[\s\S]*?<\/reasoning>/gi, '');
    cleanedText = cleanedText.replace(/<thought>[\s\S]*?<\/thought>/gi, '');
    cleanedText = cleanedText.replace(/<analysis>[\s\S]*?<\/analysis>/gi, '');
    cleanedText = cleanedText.replace(/<reflection>[\s\S]*?<\/reflection>/gi, '');

    // Remove any XML-style tags that might be reasoning related
    cleanedText = cleanedText.replace(/<internal>[\s\S]*?<\/internal>/gi, '');
    cleanedText = cleanedText.replace(/<scratch>[\s\S]*?<\/scratch>/gi, '');

    // Remove multiple consecutive newlines (3 or more)
    cleanedText = cleanedText.replace(/\n{3,}/g, '\n\n');

    // Remove excessive spaces while preserving paragraph structure
    cleanedText = cleanedText.replace(/[ \t]{2,}/g, ' ');

    // Clean up any remaining empty lines at start/end
    cleanedText = cleanedText.trim();

    // Remove any leading/trailing quotes that might be artifacts
    cleanedText = cleanedText.replace(/^["'`]+|["'`]+$/g, '');

    return cleanedText;
  }

  const handleQuerySubmit = async (query: string) => {
    try {
      const result = await analyzeCampaign({ query });

      if (result?.success && result.analysis) {
        const newAnalysis: AnalysisHistory = {
          id: Date.now().toString(),
          query,
          analysis: cleanAnalysisText(result.analysis),
          timestamp: new Date(),
        };

        setCurrentAnalysis(newAnalysis);
        setHistory(prev => [newAnalysis, ...prev.slice(0, 9)]); // Keep last 10
        toast.success('Analysis completed successfully!');
      } else {
        toast.error(result?.error || 'Failed to analyze campaign');
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Query Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Campaign Performance Analysis
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Get AI-powered insights about your campaign performance using natural language queries.
            </p>

            <QueryInput
              onSubmit={handleQuerySubmit}
              loading={loading}
            />
          </motion.div>

          {/* Error Display */}
          <AnimatePresence>
            {error && (
              <ErrorAlert
                title="Analysis Failed"
                message={error.message}
                onClose={() => {/* Error will clear on next request */ }}
              />
            )}
          </AnimatePresence>

          {/* Loading State */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center py-12"
              >
                <LoadingSpinner
                  size="lg"
                  text="Analyzing campaign data..."
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Section */}
          <AnimatePresence mode="wait">
            {!loading && currentAnalysis && (
              <AnalysisResult
                query={currentAnalysis.query}
                analysis={currentAnalysis.analysis}
              />
            )}

            {!loading && !currentAnalysis && (
              <EmptyState />
            )}
          </AnimatePresence>

          {/* History Section */}
          {history.length > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Recent Analysis History
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {history.slice(1).map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    className="card cursor-pointer hover:shadow-md transition-all duration-200"
                    onClick={() => setCurrentAnalysis(item)}
                  >
                    <p className="font-medium text-gray-900 mb-2 line-clamp-2">
                      {item.query}
                    </p>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                      {item.analysis.substring(0, 150)}...
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.timestamp.toLocaleString()}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;