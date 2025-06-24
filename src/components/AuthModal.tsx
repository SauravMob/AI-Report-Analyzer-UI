import toast from 'react-hot-toast';
import { useState } from "react";
import { motion } from 'framer-motion';

export const AuthModal = ({ isOpen, onSave }: { isOpen: boolean; onSave: (token: string) => void }) => {
    const [token, setToken] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        if (!token.trim()) {
            toast.error('Please enter a valid bearer token');
            return;
        }

        setIsLoading(true);
        try {
            localStorage.setItem('bearerToken', token.trim());
            onSave(token.trim());
            toast.success('Bearer token saved successfully!');
        } catch (error) {
            toast.error('Failed to save bearer token');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
            >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Authentication Required
                </h3>
                <p className="text-gray-600 mb-4">
                    Please enter your bearer token to access the campaign analysis tool.
                </p>

                <div className="mb-4">
                    <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-2">
                        Bearer Token
                    </label>
                    <textarea
                        id="token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        placeholder="Enter your bearer token here..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        rows={4}
                        disabled={isLoading}
                    />
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        onClick={handleSave}
                        disabled={isLoading || !token.trim()}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </>
                        ) : (
                            'Save Token'
                        )}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};