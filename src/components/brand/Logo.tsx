import React from 'react';

interface LogoProps {
  variant?: 'full' | 'compact' | 'icon-only';
  theme?: 'dark' | 'light' | 'auto';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  theme = 'light',
  className = '',
  size = 'md',
}) => {
  const iconSizes = {
    sm: 28,
    md: 36,
    lg: 48,
  };

  const currentIconSize = iconSizes[size];

  const textColor = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const subtextColor = theme === 'dark' ? 'text-purple-200' : 'text-purple-700';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Original MASAR Vector Icon */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={currentIconSize}
          height={currentIconSize}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm"
        >
          <defs>
            <linearGradient id="logoBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#4C1D95" />
            </linearGradient>
            <linearGradient id="logoGold" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#FDE047" />
            </linearGradient>
          </defs>

          {/* Squircle background */}
          <rect width="48" height="48" rx="12" fill="url(#logoBg)" />

          {/* Stylized M Pathway */}
          <path
            d="M 12 36 L 12 20 C 12 17 14 15 17 15 C 18.5 15 20 16 21 17.5 L 24 22 L 27 17.5 C 28 16 29.5 15 31 15 C 34 15 36 17 36 20 L 36 36"
            stroke="#DDD6FE"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Ascending Golden Trajectory */}
          <path
            d="M 12 34 C 18 36 24 28 28 22 C 32 16 35 13 38 12"
            stroke="url(#logoGold)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Guiding Star Beacon */}
          <circle cx="38" cy="12" r="3.5" fill="#FDE047" />
          <circle cx="38" cy="12" r="1.5" fill="#FFFFFF" />
        </svg>
      </div>

      {variant !== 'icon-only' && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className={`font-extrabold tracking-tight ${textColor} ${
              size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg'
            }`}>
              MASAR
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 font-sans">
              English
            </span>
          </div>
          {variant === 'full' && (
            <span className={`text-[11px] font-medium tracking-normal mt-0.5 ${subtextColor}`}>
              رحلة تعلّم الإنجليزية
            </span>
          )}
        </div>
      )}
    </div>
  );
};
