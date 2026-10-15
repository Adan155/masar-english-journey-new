import React, { useState, useEffect } from 'react';
import {
  Home,
  Compass,
  Zap,
  BarChart2,
  User,
  Search,
  Sparkles,
  Flame,
  Info,
  Shield,
  BookOpen,
} from 'lucide-react';
import { UserProfile, CEFRLevel } from './types';
import { loadUserProfile, toggleLessonBookmark, toggleWordBookmark } from './services/storage';
import { ALL_LESSONS, getLessonById, getAdjacentLessons } from './data/lessons';
import { Logo } from './components/brand/Logo';
import { Mascot } from './components/brand/MascotFamily';
import { PWAInstallButton } from './components/common/PWAInstallButton';
import { OfflineBanner } from './components/common/OfflineBanner';
import { OnboardingModal } from './components/common/OnboardingModal';
import { HomePage } from './pages/HomePage';
import { PathwayPage } from './pages/PathwayPage';
import { PracticePage } from './pages/PracticePage';
import { ProgressPage } from './pages/ProgressPage';
import { ProfilePage } from './pages/ProfilePage';
import { SearchPage } from './pages/SearchPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { LessonPlayer } from './components/lessons/LessonPlayer';

type ActiveView =
  | 'home'
  | 'pathway'
  | 'practice'
  | 'progress'
  | 'profile'
  | 'search'
  | 'about'
  | 'privacy'
  | 'lesson';

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(() => loadUserProfile());
  const [currentView, setCurrentView] = useState<ActiveView>('home');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [pathwayLevelFilter, setPathwayLevelFilter] = useState<CEFRLevel | 'ALL'>('ALL');
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Check if onboarding needs to be shown
  useEffect(() => {
    if (!profile.onboardingCompleted) {
      setShowOnboarding(true);
    }
  }, [profile.onboardingCompleted]);

  const handleSelectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setCurrentView('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateTab = (tab: 'home' | 'pathway' | 'practice' | 'progress' | 'profile') => {
    setCurrentView(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLevelFilterSelected = (level: CEFRLevel) => {
    setPathwayLevelFilter(level);
    setCurrentView('pathway');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLessonBookmark = (lessonId: string) => {
    const updated = toggleLessonBookmark(lessonId);
    setProfile(updated);
  };

  const handleWordBookmark = (wordId: string) => {
    const updated = toggleWordBookmark(wordId);
    setProfile(updated);
  };

  const activeLesson = activeLessonId ? getLessonById(activeLessonId) : undefined;
  const { prevLesson, nextLesson } = activeLessonId
    ? getAdjacentLessons(activeLessonId)
    : { prevLesson: undefined, nextLesson: undefined };

  return (
    <div className="min-h-screen bg-[#F8F7FC] text-slate-900 flex flex-col font-sans">
      {/* Offline Status Monitor */}
      <OfflineBanner />

      {/* Onboarding Dialog */}
      {showOnboarding && (
        <OnboardingModal
          userProfile={profile}
          onComplete={(updated) => {
            setProfile(updated);
            setShowOnboarding(false);
          }}
          onClose={() => setShowOnboarding(false)}
        />
      )}

      {/* Top Application Bar */}
      {currentView !== 'lesson' && (
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            {/* Zone 1: Brand Wordmark */}
            <div
              onClick={() => setCurrentView('home')}
              className="cursor-pointer shrink-0"
            >
              <Logo size="md" />
            </div>

            {/* Zone 2: Navigation Links for Desktop */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
              <button
                onClick={() => setCurrentView('home')}
                className={`whitespace-nowrap transition-colors ${
                  currentView === 'home' ? 'text-purple-700 font-bold' : 'hover:text-slate-900'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentView('pathway')}
                className={`whitespace-nowrap transition-colors ${
                  currentView === 'pathway' ? 'text-purple-700 font-bold' : 'hover:text-slate-900'
                }`}
              >
                All 90 Lessons
              </button>
              <button
                onClick={() => setCurrentView('practice')}
                className={`whitespace-nowrap transition-colors ${
                  currentView === 'practice' ? 'text-purple-700 font-bold' : 'hover:text-slate-900'
                }`}
              >
                Practice
              </button>
              <button
                onClick={() => setCurrentView('progress')}
                className={`whitespace-nowrap transition-colors ${
                  currentView === 'progress' ? 'text-purple-700 font-bold' : 'hover:text-slate-900'
                }`}
              >
                Progress
              </button>
              <button
                onClick={() => setCurrentView('about')}
                className={`whitespace-nowrap transition-colors ${
                  currentView === 'about' ? 'text-purple-700 font-bold' : 'hover:text-slate-900'
                }`}
              >
                About MASAR
              </button>
            </nav>

            {/* Zone 3: Quick Action Badges, Search & Profile */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Daily Streak Counter */}
              <div
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200/60 text-xs font-bold"
                title={`${profile.streak} consecutive days of learning`}
              >
                <Flame className="w-3.5 h-3.5 fill-current text-orange-500" />
                <span className="font-mono tabular-nums">{profile.streak}</span>
              </div>

              {/* XP Counter */}
              <div
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200/60 text-xs font-bold"
                title={`${profile.xp} total XP earned`}
              >
                <Sparkles className="w-3.5 h-3.5 fill-current text-amber-500" />
                <span className="font-mono tabular-nums">{profile.xp}</span>
              </div>

              {/* Search Trigger */}
              <button
                onClick={() => setCurrentView('search')}
                className={`p-2 rounded-xl text-slate-600 hover:text-purple-700 hover:bg-slate-100 transition-colors ${
                  currentView === 'search' ? 'bg-purple-50 text-purple-700' : ''
                }`}
                title="Search lessons"
                aria-label="Search curriculum"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Install PWA Button */}
              <PWAInstallButton compact />

              {/* Avatar Trigger for Profile */}
              <button
                onClick={() => setCurrentView('profile')}
                className="w-8 h-8 rounded-full border border-purple-300 bg-purple-50 flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-purple-400 transition-all shrink-0"
                title="Your student profile & settings"
              >
                <Mascot character={profile.avatarId as 'nawras' | 'bayan' | 'tareeq'} size={30} />
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {currentView === 'home' && (
          <HomePage
            userProfile={profile}
            onSelectLesson={handleSelectLesson}
            onNavigateTab={handleNavigateTab}
            onSelectLevelFilter={handleLevelFilterSelected}
          />
        )}

        {currentView === 'pathway' && (
          <PathwayPage
            userProfile={profile}
            initialLevelFilter={pathwayLevelFilter}
            onSelectLesson={handleSelectLesson}
            onToggleBookmark={handleLessonBookmark}
          />
        )}

        {currentView === 'practice' && (
          <PracticePage
            userProfile={profile}
            onSelectLesson={handleSelectLesson}
            onToggleWordBookmark={handleWordBookmark}
          />
        )}

        {currentView === 'progress' && (
          <ProgressPage userProfile={profile} />
        )}

        {currentView === 'profile' && (
          <ProfilePage
            userProfile={profile}
            onProfileUpdated={(up) => setProfile(up)}
            onNavigateTab={handleNavigateTab}
          />
        )}

        {currentView === 'search' && (
          <SearchPage onSelectLesson={handleSelectLesson} />
        )}

        {currentView === 'about' && (
          <AboutPage />
        )}

        {currentView === 'privacy' && (
          <PrivacyPage />
        )}

        {currentView === 'lesson' && activeLesson && (
          <LessonPlayer
            lesson={activeLesson}
            userProfile={profile}
            onProfileUpdated={(up) => setProfile(up)}
            onBack={() => setCurrentView('pathway')}
            onNavigateLesson={handleSelectLesson}
            prevLesson={prevLesson}
            nextLesson={nextLesson}
          />
        )}
      </main>

      {/* Footer with honest navigation & copyright */}
      {currentView !== 'lesson' && (
        <footer className="border-t border-slate-200 bg-white/70 py-6 px-4 text-center text-xs text-slate-500 mb-16 md:mb-0">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">MASAR English Journey</span>
              <span>·</span>
              <span className="font-arabic text-purple-700">رحلة تعلّم الإنجليزية الشاملة</span>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
              <button onClick={() => setCurrentView('about')} className="hover:text-purple-700">
                About
              </button>
              <button onClick={() => setCurrentView('privacy')} className="hover:text-purple-700">
                Privacy Policy
              </button>
              <button
                onClick={() => {
                  setShowOnboarding(true);
                }}
                className="hover:text-purple-700"
              >
                Restart Guide
              </button>
            </div>

            <span className="text-[11px] text-slate-400">
              90 Lessons · A1, A2, B1 · Client-Side PWA
            </span>
          </div>
        </footer>
      )}

      {/* Fixed Mobile Bottom Navigation Bar (Thumb ergonomic anchor) */}
      {currentView !== 'lesson' && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 pb-safe shadow-lg">
          <div className="grid grid-cols-5 items-center h-16 px-1">
            <button
              onClick={() => handleNavigateTab('home')}
              className={`flex flex-col items-center justify-center min-h-[44px] transition-colors ${
                currentView === 'home' ? 'text-purple-700' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Home className={`w-5 h-5 ${currentView === 'home' ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px] font-bold mt-1 tracking-tight">Home</span>
            </button>

            <button
              onClick={() => handleNavigateTab('pathway')}
              className={`flex flex-col items-center justify-center min-h-[44px] transition-colors ${
                currentView === 'pathway' ? 'text-purple-700' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Compass className={`w-5 h-5 ${currentView === 'pathway' ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px] font-bold mt-1 tracking-tight">Learn</span>
            </button>

            <button
              onClick={() => handleNavigateTab('practice')}
              className={`flex flex-col items-center justify-center min-h-[44px] transition-colors ${
                currentView === 'practice' ? 'text-purple-700' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Zap className={`w-5 h-5 ${currentView === 'practice' ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px] font-bold mt-1 tracking-tight">Practice</span>
            </button>

            <button
              onClick={() => handleNavigateTab('progress')}
              className={`flex flex-col items-center justify-center min-h-[44px] transition-colors ${
                currentView === 'progress' ? 'text-purple-700' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <BarChart2 className={`w-5 h-5 ${currentView === 'progress' ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px] font-bold mt-1 tracking-tight">Progress</span>
            </button>

            <button
              onClick={() => handleNavigateTab('profile')}
              className={`flex flex-col items-center justify-center min-h-[44px] transition-colors ${
                currentView === 'profile' ? 'text-purple-700' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <User className={`w-5 h-5 ${currentView === 'profile' ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px] font-bold mt-1 tracking-tight">Profile</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
