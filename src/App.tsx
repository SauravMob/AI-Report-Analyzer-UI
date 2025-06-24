import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { QueryInput } from './components/QueryInput';
import { AnalysisResult } from './components/AnalysisResult';
import { EmptyState } from './components/EmptyState';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { ErrorAlert } from './components/ui/ErrorAlert';
import { useAnalyzeCampaign } from './hooks/useApi';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { cleanAnalysisText } from './utils/utils';
import { AuthModal } from './components/AuthModal';

interface AnalysisHistory {
  id: string;
  query: string;
  analysis: string;
  timestamp: Date;
}

function App() {
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisHistory | null>(null);
  const [history, setHistory] = useState<AnalysisHistory[]>([]);
  const [bearerToken, setBearerToken] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { analyzeCampaign, loading, error } = useAnalyzeCampaign();

  useEffect(() => {
    const storedToken = localStorage.getItem('bearerToken');
    if (storedToken) {
      setBearerToken(storedToken);
    } else {
      setShowAuthModal(true);
    }
  }, []);

  const handleTokenSave = (token: string) => {
    setBearerToken(token);
    setShowAuthModal(false);
  };

  const handleQuerySubmit = async (query: string) => {
    if (!bearerToken) {
      toast.error('Bearer token is required');
      return;
    }

    try {
      // Pass both query and bearerToken to the API hook
      const result = await analyzeCampaign({ query, bearerToken });

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

  const handleTokenReset = () => {
    localStorage.removeItem('bearerToken');
    setBearerToken(null);
    setShowAuthModal(true);
    setCurrentAnalysis(null);
    setHistory([]);
    toast('Bearer token cleared. Please enter a new token.');
  };

  // Show loading while checking for token
  if (bearerToken === null && !showAuthModal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Checking authentication..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <AuthModal
            isOpen={showAuthModal}
            onSave={handleTokenSave}
          />
        )}
      </AnimatePresence>

      {/* Main App - only show when authenticated */}
      {bearerToken && (
        <>
          <Header />

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Token Management Section */}
            <div className="mb-4 flex justify-end">
              <button
                onClick={handleTokenReset}
                className="inline-flex items-center px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2h-6m6 0v6m0 0a2 2 0 01-2 2m2-2H9m10 0V9a2 2 0 00-2-2m0 0a2 2 0 00-2-2" />
                </svg>
                Reset Token
              </button>
            </div>

            <div className="space-y-8">
              {/* Query Input Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Report Analysis
                </h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Get AI-powered insights about your report performance using natural language queries.
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
        </>
      )}
    </div>
  );
}

export default App;