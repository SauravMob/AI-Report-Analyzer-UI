import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ErrorAlertProps {
    title?: string;
    message: string;
    onClose?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
    title = 'Error',
    message,
    onClose
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4"
        >
            <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-red-800">{title}</h3>
                    <p className="mt-1 text-sm text-red-700">{message}</p>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="ml-3 text-red-400 hover:text-red-600 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
        </motion.div>
    );
};