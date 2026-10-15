import React from 'react';

export type MascotName = 'nawras' | 'bayan' | 'tareeq';
export type MascotMood = 'welcome' | 'happy' | 'thinking' | 'celebrating' | 'speaking' | 'streak' | 'empty';

interface MascotProps {
  character?: MascotName;
  mood?: MascotMood;
  className?: string;
  size?: number;
}

export const Mascot: React.FC<MascotProps> = ({
  character = 'nawras',
  mood = 'welcome',
  className = '',
  size = 120,
}) => {
  if (character === 'bayan') {
    return <BayanMascot mood={mood} size={size} className={className} />;
  }
  if (character === 'tareeq') {
    return <TareeqMascot mood={mood} size={size} className={className} />;
  }
  return <NawrasMascot mood={mood} size={size} className={className} />;
};

/**
 * NAWRAS - The Navigator & Learning Guide (مرشد التعلم)
 * A wise, encouraging falcon guide with violet scholar cap and compass beacon.
 */
export const NawrasMascot: React.FC<{ mood?: MascotMood; size?: number; className?: string }> = ({
  mood = 'welcome',
  size = 120,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${className}`}
    >
      <defs>
        <linearGradient id="nawrasGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#4C1D95" />
        </linearGradient>
        <linearGradient id="goldFeather" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="capGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#312E81" />
          <stop offset="100%" stopColor="#1E1B4B" />
        </linearGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="100" cy="180" rx="46" ry="10" fill="#E2E8F0" />

      {/* Body & Wings */}
      <circle cx="100" cy="115" r="50" fill="url(#nawrasGrad)" />
      
      {/* Soft Chest Plumage */}
      <ellipse cx="100" cy="125" rx="30" ry="34" fill="#EDE9FE" />
      <path d="M 85 120 Q 100 135 115 120" stroke="#C4B5FD" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 88 135 Q 100 148 112 135" stroke="#C4B5FD" strokeWidth="2.5" strokeLinecap="round" />

      {/* Left & Right Folded Wings */}
      <path d="M 52 110 C 44 125 50 150 72 155 C 64 140 64 125 70 112 Z" fill="#6D28D9" />
      {mood === 'welcome' || mood === 'celebrating' ? (
        // Waving Right Wing
        <g transform="rotate(-25 145 110)">
          <path d="M 135 105 C 160 85 175 95 160 125 C 145 130 135 118 135 105 Z" fill="#6D28D9" />
          <circle cx="162" cy="100" r="4" fill="#FBBF24" />
        </g>
      ) : (
        <path d="M 148 110 C 156 125 150 150 128 155 C 136 140 136 125 130 112 Z" fill="#6D28D9" />
      )}

      {/* Head */}
      <circle cx="100" cy="80" r="38" fill="url(#nawrasGrad)" />
      {/* Cheek blush */}
      <circle cx="76" cy="88" r="6" fill="#F472B6" fillOpacity="0.4" />
      <circle cx="124" cy="88" r="6" fill="#F472B6" fillOpacity="0.4" />

      {/* Eyes */}
      {mood === 'happy' || mood === 'celebrating' ? (
        // Cheerful smiling curved eyes
        <g stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round">
          <path d="M 80 80 Q 88 72 94 80" />
          <path d="M 106 80 Q 112 72 120 80" />
        </g>
      ) : mood === 'thinking' ? (
        // Thinking eyes glancing up
        <g>
          <ellipse cx="86" cy="78" rx="7" ry="9" fill="#FFFFFF" />
          <ellipse cx="114" cy="78" rx="7" ry="9" fill="#FFFFFF" />
          <circle cx="86" cy="74" r="4" fill="#1E1B4B" />
          <circle cx="114" cy="74" r="4" fill="#1E1B4B" />
        </g>
      ) : (
        // Friendly bright eyes
        <g>
          <ellipse cx="86" cy="80" rx="7" ry="9" fill="#FFFFFF" />
          <ellipse cx="114" cy="80" rx="7" ry="9" fill="#FFFFFF" />
          <circle cx="88" cy="80" r="4.5" fill="#1E1B4B" />
          <circle cx="116" cy="80" r="4.5" fill="#1E1B4B" />
          <circle cx="90" cy="78" r="1.5" fill="#FFFFFF" />
          <circle cx="118" cy="78" r="1.5" fill="#FFFFFF" />
        </g>
      )}

      {/* Friendly Golden Beak */}
      <path d="M 94 88 L 106 88 L 100 102 Z" fill="url(#goldFeather)" />

      {/* Scholar Mortarboard Cap (Symbol of educational mastery) */}
      <g>
        <polygon points="100,34 146,50 100,64 54,50" fill="url(#capGrad)" />
        <path d="M 72 58 L 72 72 Q 100 82 128 72 L 128 58" fill="#1E1B4B" />
        {/* Golden Tassel */}
        <circle cx="100" cy="49" r="3.5" fill="#FBBF24" />
        <path d="M 100 49 Q 130 52 135 68" stroke="#F59E0B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <rect x="131" y="68" width="8" height="12" rx="2" fill="#F59E0B" />
      </g>

      {/* Golden Scarf / Compass Medal */}
      <path d="M 85 106 Q 100 114 115 106 Q 100 120 85 106" fill="#F59E0B" />
      <circle cx="100" cy="116" r="6" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
    </svg>
  );
};

/**
 * BAYAN - The Speaking Partner (شريك المحادثة)
 * An expressive conversationalist with audio headset and speech sparkle.
 */
export const BayanMascot: React.FC<{ mood?: MascotMood; size?: number; className?: string }> = ({
  mood = 'speaking',
  size = 120,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${className}`}
    >
      <defs>
        <linearGradient id="bayanGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
        <linearGradient id="headsetGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="100" cy="180" rx="42" ry="9" fill="#E2E8F0" />

      {/* Torso */}
      <path d="M 70 120 C 70 110 130 110 130 120 L 138 165 C 138 172 130 175 100 175 C 70 175 62 172 62 165 Z" fill="#0EA5E9" />
      <circle cx="100" cy="140" r="14" fill="#FFFFFF" fillOpacity="0.3" />
      <polygon points="96,134 107,140 96,146" fill="#FFFFFF" />

      {/* Head */}
      <circle cx="100" cy="78" r="38" fill="url(#bayanGrad)" />
      
      {/* Cute face hair fluff */}
      <path d="M 78 52 Q 100 38 122 52" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />

      {/* Headphone band */}
      <path d="M 62 76 C 62 50 138 50 138 76" stroke="#475569" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* Earcups */}
      <rect x="56" y="66" width="12" height="22" rx="6" fill="url(#headsetGrad)" />
      <rect x="132" y="66" width="12" height="22" rx="6" fill="url(#headsetGrad)" />
      {/* Mic arm */}
      <path d="M 64 82 Q 68 100 86 98" stroke="#475569" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="88" cy="98" r="4.5" fill="#EF4444" />

      {/* Eyes */}
      <g>
        <ellipse cx="86" cy="76" rx="6.5" ry="8.5" fill="#FFFFFF" />
        <ellipse cx="114" cy="76" rx="6.5" ry="8.5" fill="#FFFFFF" />
        <circle cx="88" cy="76" r="4.5" fill="#0F172A" />
        <circle cx="116" cy="76" r="4.5" fill="#0F172A" />
        <circle cx="90" cy="74" r="1.5" fill="#FFFFFF" />
        <circle cx="118" cy="74" r="1.5" fill="#FFFFFF" />
      </g>

      {/* Cheerful mouth / Speaking animation */}
      {mood === 'speaking' || mood === 'celebrating' ? (
        <path d="M 90 92 Q 100 106 110 92 Z" fill="#FFFFFF" stroke="#0369A1" strokeWidth="1.5" />
      ) : (
        <path d="M 92 92 Q 100 100 108 92" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      )}

      {/* Speech wave sparkles */}
      <g transform="translate(142, 60)">
        <path d="M 4 2 Q 12 10 4 18" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 12 -2 Q 22 10 12 22" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
};

/**
 * TAREEQ - The Challenge & Streak Companion (رفيق التحدي والإنجاز)
 * Energetic, sporty character with victory headband and glowing streak flame.
 */
export const TareeqMascot: React.FC<{ mood?: MascotMood; size?: number; className?: string }> = ({
  mood = 'streak',
  size = 120,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${className}`}
    >
      <defs>
        <linearGradient id="tareeqGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="fireGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FDE047" />
        </linearGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="100" cy="180" rx="44" ry="9" fill="#E2E8F0" />

      {/* Sporty Body */}
      <circle cx="100" cy="122" r="46" fill="url(#tareeqGrad)" />
      
      {/* Golden Star Medal on chest */}
      <circle cx="100" cy="132" r="14" fill="#F59E0B" />
      <polygon points="100,123 103,130 110,130 104,134 107,141 100,137 93,141 96,134 90,130 97,130" fill="#FEF08A" />

      {/* Head */}
      <circle cx="100" cy="80" r="36" fill="url(#tareeqGrad)" />

      {/* Sporty Headband */}
      <rect x="64" y="64" width="72" height="12" rx="4" fill="#EF4444" />
      <circle cx="100" cy="70" r="4" fill="#FFFFFF" />

      {/* Eyes with determination and joy */}
      {mood === 'streak' || mood === 'celebrating' ? (
        <g stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round">
          <path d="M 82 82 Q 88 74 94 82" />
          <path d="M 106 82 Q 112 74 118 82" />
        </g>
      ) : (
        <g>
          <ellipse cx="86" cy="82" rx="6" ry="8" fill="#FFFFFF" />
          <ellipse cx="114" cy="82" rx="6" ry="8" fill="#FFFFFF" />
          <circle cx="87" cy="82" r="4" fill="#064E3B" />
          <circle cx="115" cy="82" r="4" fill="#064E3B" />
          <circle cx="89" cy="80" r="1.5" fill="#FFFFFF" />
          <circle cx="117" cy="80" r="1.5" fill="#FFFFFF" />
        </g>
      )}

      {/* Big energetic grin */}
      <path d="M 88 94 Q 100 106 112 94" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* Flame / Streak Torch in hand or hovering above */}
      <g transform="translate(138, 55)">
        <path d="M 12 40 C 2 30 2 20 8 12 C 14 6 12 0 16 0 C 20 6 26 12 24 22 C 28 20 30 26 28 32 C 26 40 18 42 12 40 Z" fill="url(#fireGrad)" />
        <path d="M 14 36 C 8 28 10 22 14 16 C 16 20 18 22 18 26 C 20 28 18 34 14 36 Z" fill="#FFFFFF" fillOpacity="0.8" />
      </g>
    </svg>
  );
};
