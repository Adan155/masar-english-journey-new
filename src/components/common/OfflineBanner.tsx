import React, { useState, useEffect } from 'react';
import { WifiOff, CheckCircle2 } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      setTimeout(() => setShowReconnected(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowReconnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (showReconnected) {
    return (
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-full shadow-lg animate-in fade-in slide-in-from-top">
        <CheckCircle2 className="w-4 h-4" />
        <span>Connected — Sync Active</span>
      </div>
    );
  }

  if (isOnline) return null;

  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 bg-slate-900/90 text-amber-300 text-xs font-medium rounded-full shadow-xl border border-amber-500/30 backdrop-blur-md animate-in fade-in slide-in-from-top">
      <WifiOff className="w-3.5 h-3.5 text-amber-400" />
      <span>Offline Mode — All 90 lessons & practice work offline</span>
    </div>
  );
};
