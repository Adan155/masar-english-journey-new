import React, { useState } from 'react';
import { Volume2, Volume1, Loader2 } from 'lucide-react';
import { speakEnglish } from '../../services/sound';

interface AudioPronounceButtonProps {
  text: string;
  size?: 'sm' | 'md';
  className?: string;
  allowSlow?: boolean;
}

export const AudioPronounceButton: React.FC<AudioPronounceButtonProps> = ({
  text,
  size = 'md',
  className = '',
  allowSlow = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSlow, setIsSlow] = useState(false);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
    speakEnglish(text, isSlow, () => {
      setIsPlaying(false);
    });
  };

  const toggleSpeed = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSlow(!isSlow);
  };

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <button
        onClick={handlePlay}
        className={`flex items-center justify-center rounded-full text-purple-700 bg-purple-100 hover:bg-purple-200 active:scale-90 transition-all ${
          size === 'sm' ? 'w-7 h-7' : 'w-8 h-8'
        }`}
        title={`Listen to pronunciation (${isSlow ? 'Slow 0.75x' : 'Normal 1.0x'})`}
        aria-label={`Listen to ${text}`}
      >
        {isPlaying ? (
          <Loader2 className={`animate-spin text-purple-700 ${size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
        ) : isSlow ? (
          <Volume1 className={`text-purple-700 ${size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
        ) : (
          <Volume2 className={`text-purple-700 ${size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
        )}
      </button>

      {allowSlow && (
        <button
          onClick={toggleSpeed}
          className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition-colors ${
            isSlow ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500 hover:text-slate-800'
          }`}
          title="Toggle slow pronunciation rate"
        >
          {isSlow ? '0.75x' : '1.0x'}
        </button>
      )}
    </div>
  );
};
