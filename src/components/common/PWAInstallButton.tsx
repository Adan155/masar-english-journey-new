import React, { useState } from 'react';
import { Download, Share2, X } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

export const PWAInstallButton: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);

  if (isInstalled) return null;

  if (isInstallable) {
    return (
      <button
        onClick={install}
        className={`flex items-center gap-1.5 font-semibold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95 transition-all shadow-sm rounded-xl ${
          compact ? 'px-2.5 py-1.5 text-xs' : 'px-3.5 py-2 text-sm'
        }`}
        title="Install MASAR App on your device"
      >
        <Download className="w-4 h-4 shrink-0" />
        <span>Install App</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSModal(true)}
          className={`flex items-center gap-1.5 font-semibold text-purple-900 bg-purple-100 hover:bg-purple-200 active:scale-95 transition-all rounded-xl ${
            compact ? 'px-2.5 py-1.5 text-xs' : 'px-3.5 py-2 text-sm'
          }`}
          title="Install on iPhone / iPad"
        >
          <Share2 className="w-3.5 h-3.5 shrink-0" />
          <span>Install iOS</span>
        </button>

        {showIOSModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-purple-100 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">Install MASAR on iOS</h3>
                <button
                  onClick={() => setShowIOSModal(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="my-4 space-y-3 text-sm text-slate-600">
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-2xl">
                  <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0">1</div>
                  <p>Tap the <strong>Share</strong> icon in the bottom Safari toolbar.</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-2xl">
                  <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0">2</div>
                  <p>Scroll down and select <strong>Add to Home Screen</strong>.</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-2xl">
                  <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0">3</div>
                  <p>Enjoy offline practice, zero lag, and full-screen experience!</p>
                </div>
              </div>

              <button
                onClick={() => setShowIOSModal(false)}
                className="w-full py-2.5 rounded-xl bg-purple-700 text-white font-semibold text-sm hover:bg-purple-800 transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
