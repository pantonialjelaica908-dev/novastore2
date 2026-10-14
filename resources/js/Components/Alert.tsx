import { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

interface AlertProps {
    type?: 'success' | 'error' | 'info';
    message?: string | null;
    onClose?: () => void;
    autoClose?: boolean;
}

export default function Alert({
    type = 'success',
    message,
    onClose,
    autoClose = true,
}: AlertProps) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (!message) return;
        setVisible(true);

        if (autoClose) {
            const timer = setTimeout(() => {
                setVisible(false);
                if (onClose) onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message, autoClose, onClose]);

    if (!message || !visible) return null;

    const isSuccess = type === 'success';

    return (
        <div
            className={`flex items-center justify-between rounded-xl p-4 shadow-sm transition-all duration-200 border ${
                isSuccess
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-red-50 border-red-200 text-red-900'
            }`}
            role="alert"
        >
            <div className="flex items-center space-x-3">
                {isSuccess ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                ) : (
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                )}
                <span className="text-sm font-medium">{message}</span>
            </div>
            <button
                type="button"
                onClick={() => {
                    setVisible(false);
                    if (onClose) onClose();
                }}
                className={`rounded-lg p-1 transition-colors hover:bg-black/5 ${
                    isSuccess ? 'text-emerald-700' : 'text-red-700'
                }`}
                aria-label="Dismiss alert"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}
