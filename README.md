# MASAR English Journey (مسار رحلة الإنجليزية)

A complete, interactive, mobile-first English learning progressive web application designed for Arabic-speaking learners.

---

## 🌟 What Was Built

### 1. Complete 90-Lesson Curriculum
- **Level A1 (Beginner)**: 30 structured lessons (`masar-a1-01` to `masar-a1-30`)
- **Level A2 (Elementary)**: 30 structured lessons (`masar-a2-31` to `masar-a2-60`)
- **Level B1 (Intermediate)**: 30 structured lessons (`masar-b1-61` to `masar-b1-90`)
- **Total: Exactly 90 unique lessons**. Every single lesson contains:
  - Unique lesson ID and number
  - English & Arabic titles
  - Learning objectives
  - Real-world context and situation
  - Key vocabulary with phonetics, Arabic meanings, and example sentences
  - Grammar in context with rules and examples
  - Common learner mistakes with explanations and corrected forms
  - Realistic dialogues with audio pronunciation and Arabic translation toggle
  - Interactive practice exercises (sentence completion, multiple choice, and word sequencing)
  - Interactive comprehension quizzes with instant feedback
  - Speaking challenge with model answers and pronunciation tips
  - Review summary and XP rewards

### 2. Original MASAR Brand & Mascot Family
- **Original MASAR Logo**: Scalable vector SVG combining an ascending path ("مسار"), an architectural "M", and a golden star beacon.
- **Nawras (نورس - The Learning Guide)**: The wise falcon guide in a violet scholar cap and compass motif who introduces lessons and celebrates milestones.
- **Bayan (بيان - The Speaking Partner)**: The dialogue partner with audio headset and speech sparkles who guides conversation and pronunciation.
- **Tareeq (طريق - The Challenge Champion)**: The energetic companion who tracks daily streaks, fires up quizzes, and awards achievement medals.

### 3. Interactive Audio Pronunciation
- **Web Speech API (`speakEnglish`)**: Real-time pronunciation for all vocabulary words, useful expressions, dialogue lines, and model speaking answers. Includes 1.0x and slow 0.75x speed options.
- **Web Audio API Synth**: Lightweight, zero-latency audio chimes for correct answers, celebratory fanfares, and tap feedback without relying on external MP3 assets.

### 4. Gamification, Badges & Local Persistence
- **Accurate XP Engine**: Awards XP upon first-time lesson and quiz completion, preventing duplicate exploits.
- **Daily Streak Tracking**: Calendar-based day comparison with midnight rollover support.
- **Milestone Achievements**: Real badges (Bronze, Silver, Gold, Platinum) with concrete unlock criteria (e.g. First Step, 5 Lessons, 10 Lessons, Perfect Quiz, 7-Day Streak, A1/A2/B1 completions, and 90-lesson Master).
- **LocalStorage Data Management**: Transparent local persistence with full JSON export/import backup and explicit progress reset.

### 5. PWA & Offline Readiness
- **Web App Manifest**: Valid `manifest.webmanifest` configured for standalone mobile use.
- **App Icons**: Maskable and standard vector icons for Android and iOS.
- **Custom Service Worker**: Precaches core shell assets and provides graceful offline capability.
- **In-App Install Banner & Button**: Dynamic PWA install prompt with iOS Safari guided step-by-step instructions.

---

## 🚀 Build & Verification Commands
- `npm run lint` (`tsc --noEmit`): Passed with 0 errors.
- `npm run build` (`vite build`): Succeeded cleanly.
