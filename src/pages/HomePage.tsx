import React from 'react';
import {
  Sparkles,
  Flame,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Bookmark,
  Award,
  Zap,
  Clock,
  Compass,
} from 'lucide-react';
import { UserProfile, CEFRLevel } from '../types';
import { ALL_LESSONS } from '../data/lessons';
import { Mascot } from '../components/brand/MascotFamily';
import { INITIAL_ACHIEVEMENTS } from '../data/achievements';
import { PWAInstallButton } from '../components/common/PWAInstallButton';

interface HomePageProps {
  userProfile: UserProfile;
  onSelectLesson: (lessonId: string) => void;
  onNavigateTab: (tab: 'home' | 'pathway' | 'practice' | 'progress' | 'profile') => void;
  onSelectLevelFilter: (level: CEFRLevel) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  userProfile,
  onSelectLesson,
  onNavigateTab,
  onSelectLevelFilter,
}) => {
  // Find current next lesson to continue
  const completedSet = new Set(userProfile.completedLessons);
  const nextLesson = ALL_LESSONS.find((l) => !completedSet.has(l.id)) || ALL_LESSONS[0];

  const totalCompleted = userProfile.completedLessons.length;
  const overallPercent = Math.round((totalCompleted / ALL_LESSONS.length) * 100);

  const a1Completed = userProfile.completedLessons.filter((id) => id.includes('masar-a1')).length;
  const a2Completed = userProfile.completedLessons.filter((id) => id.includes('masar-a2')).length;
  const b1Completed = userProfile.completedLessons.filter((id) => id.includes('masar-b1')).length;

  const unlockedCount = userProfile.unlockedAchievements.length;

  return (
    <div className="space-y-6 animate-in fade-in pb-12">
      {/* Personalized Welcome Header Card */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-950 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-lg space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
              Welcome back · مرحباً بك
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-xs font-semibold text-amber-300">Day {userProfile.streak}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Hi, {userProfile.displayName || 'Learner'}!
          </h1>

          <p className="text-sm font-arabic text-purple-200" dir="rtl">
            جاهز لمواصلة رحلتك اليوم وتطوير ثقتك في التحدث بالإنجليزية؟
          </p>

          {/* XP & Streak Micro badges */}
          <div className="flex items-center gap-3 pt-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-amber-400 fill-current" />
              <span className="font-mono tabular-nums">{userProfile.xp} XP</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold">
              <Flame className="w-4 h-4 text-orange-400 fill-current" />
              <span className="font-mono tabular-nums">{userProfile.streak} Day Streak</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold">
              <Clock className="w-4 h-4 text-teal-300" />
              <span>Goal: {userProfile.dailyGoalMinutes}m</span>
            </div>
          </div>
        </div>

        {/* Mascot Mascot Floating on the Right */}
        <div className="absolute -bottom-2 -right-2 sm:right-4 pointer-events-none drop-shadow-xl">
          <Mascot character="nawras" mood="welcome" size={130} />
        </div>
      </div>

      {/* Continue Learning Spotlight Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-mono">
                {nextLesson.level} · Lesson {nextLesson.number}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Recommended Next Step
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">
              {nextLesson.title}
            </h3>
            <p className="text-xs font-arabic text-purple-700" dir="rtl">
              {nextLesson.arabicTitle} · {nextLesson.topic}
            </p>
          </div>

          <button
            onClick={() => onSelectLesson(nextLesson.id)}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-purple-900/20 active:scale-98 transition-all shrink-0"
          >
            <span>Continue Learning</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3 Core Levels Quick Navigator */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-slate-900">
            Curriculum Pathway · المستويات التعليمية
          </h2>
          <button
            onClick={() => onNavigateTab('pathway')}
            className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1"
          >
            <span>View All 90 Lessons</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {/* Level A1 Card */}
          <div
            onClick={() => {
              onSelectLevelFilter('A1');
              onNavigateTab('pathway');
            }}
            className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-1 rounded-xl bg-purple-100 text-purple-900 font-extrabold text-xs font-mono">
                Level A1
              </span>
              <span className="text-xs font-bold text-slate-400 font-mono">
                {a1Completed} / 30
              </span>
            </div>
            <h4 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
              Beginner English
            </h4>
            <p className="text-xs font-arabic text-slate-500 mt-0.5">
              المستوى المبتدئ: التأسيس والتواصل الأساسي
            </p>

            <div className="w-full h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-purple-600 rounded-full transition-all"
                style={{ width: `${Math.round((a1Completed / 30) * 100)}%` }}
              />
            </div>
          </div>

          {/* Level A2 Card */}
          <div
            onClick={() => {
              onSelectLevelFilter('A2');
              onNavigateTab('pathway');
            }}
            className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-1 rounded-xl bg-indigo-100 text-indigo-900 font-extrabold text-xs font-mono">
                Level A2
              </span>
              <span className="text-xs font-bold text-slate-400 font-mono">
                {a2Completed} / 30
              </span>
            </div>
            <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
              Elementary English
            </h4>
            <p className="text-xs font-arabic text-slate-500 mt-0.5">
              المستوى الابتدائي: مواقف الحياة والروتين
            </p>

            <div className="w-full h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all"
                style={{ width: `${Math.round((a2Completed / 30) * 100)}%` }}
              />
            </div>
          </div>

          {/* Level B1 Card */}
          <div
            onClick={() => {
              onSelectLevelFilter('B1');
              onNavigateTab('pathway');
            }}
            className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-teal-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-1 rounded-xl bg-teal-100 text-teal-900 font-extrabold text-xs font-mono">
                Level B1
              </span>
              <span className="text-xs font-bold text-slate-400 font-mono">
                {b1Completed} / 30
              </span>
            </div>
            <h4 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
              Intermediate English
            </h4>
            <p className="text-xs font-arabic text-slate-500 mt-0.5">
              المستوى المتوسط: الطلاقة والنقاش المهني
            </p>

            <div className="w-full h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-teal-600 rounded-full transition-all"
                style={{ width: `${Math.round((b1Completed / 30) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => onNavigateTab('practice')}
          className="p-4 rounded-3xl bg-white border border-slate-200/90 text-left hover:border-purple-300 hover:bg-purple-50/30 transition-all flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-2">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Daily Practice</h4>
            <p className="text-[11px] font-arabic text-slate-500">تمارين الكلمات والمراجعة</p>
          </div>
        </button>

        <button
          onClick={() => onNavigateTab('practice')}
          className="p-4 rounded-3xl bg-white border border-slate-200/90 text-left hover:border-purple-300 hover:bg-purple-50/30 transition-all flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center mb-2">
            <Bookmark className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Saved Words</h4>
            <p className="text-[11px] font-mono font-semibold text-purple-700">
              {userProfile.bookmarkedWords.length} Words saved
            </p>
          </div>
        </button>

        <button
          onClick={() => onNavigateTab('progress')}
          className="p-4 rounded-3xl bg-white border border-slate-200/90 text-left hover:border-purple-300 hover:bg-purple-50/30 transition-all flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Achievements</h4>
            <p className="text-[11px] font-mono font-semibold text-emerald-700">
              {unlockedCount} of {INITIAL_ACHIEVEMENTS.length} Badges
            </p>
          </div>
        </button>

        <button
          onClick={() => onNavigateTab('profile')}
          className="p-4 rounded-3xl bg-white border border-slate-200/90 text-left hover:border-purple-300 hover:bg-purple-50/30 transition-all flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center mb-2">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Your Goals</h4>
            <p className="text-[11px] font-semibold text-indigo-700">
              {userProfile.dailyGoalMinutes} mins / day
            </p>
          </div>
        </button>
      </div>

      {/* Mascot Encouragement Bubble */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-purple-50 via-indigo-50 to-amber-50 border border-purple-100/80 flex items-center gap-4">
        <Mascot character="bayan" mood="speaking" size={75} />
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-800">
            Guide Tip · نصيحة بيان
          </span>
          <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
            "Even 10 minutes of daily speaking practice builds natural muscle memory for English!"
          </p>
          <p className="text-xs font-arabic text-purple-700" dir="rtl">
            عشر دقائق يومياً من التحدث بصوت مسموع تصنع فارقاً حقيقياً في الطلاقة والثقة.
          </p>
        </div>
      </div>
    </div>
  );
};
