import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export interface StatusIndicatorProps {
    status: 'online' | 'offline' | 'checking';
    showText?: boolean;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
    status,
    showText = true
}) => {
    const config = {
        online: {
            icon: CheckCircle,
            color: 'text-green-500',
            bgColor: 'bg-green-50',
            text: 'API Healthy'
        },
        offline: {
            icon: XCircle,
            color: 'text-red-500',
            bgColor: 'bg-red-50',
            text: 'API Unavailable'
        },
        checking: {
            icon: AlertCircle,
            color: 'text-yellow-500',
            bgColor: 'bg-yellow-50',
            text: 'Status Unknown'
        }
    };

    const { icon: Icon, color, bgColor, text } = config[status];

    return (
        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full ${bgColor}`}>
            <Icon className={`w-4 h-4 ${color}`} />
            {showText && (
                <span className={`text-sm font-medium ${color}`}>{text}</span>
            )}
        </div>
    );
};