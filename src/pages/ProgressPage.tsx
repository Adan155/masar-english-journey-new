import React from 'react';
import {
  Sparkles,
  Flame,
  Award,
  CheckCircle2,
  Lock,
  Clock,
  Compass,
  Trophy,
  GraduationCap,
  Zap,
  Footprints,
  Bookmark,
} from 'lucide-react';
import { UserProfile } from '../types';
import { ALL_LESSONS } from '../data/lessons';
import { INITIAL_ACHIEVEMENTS } from '../data/achievements';
import { Mascot } from '../components/brand/MascotFamily';

interface ProgressPageProps {
  userProfile: UserProfile;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({ userProfile }) => {
  const totalCompleted = userProfile.completedLessons.length;
  const overallPercent = Math.round((totalCompleted / ALL_LESSONS.length) * 100);

  const a1Completed = userProfile.completedLessons.filter((id) => id.includes('masar-a1')).length;
  const a2Completed = userProfile.completedLessons.filter((id) => id.includes('masar-a2')).length;
  const b1Completed = userProfile.completedLessons.filter((id) => id.includes('masar-b1')).length;

  const unlockedSet = new Set(userProfile.unlockedAchievements);

  // Icon resolver for badges
  const renderBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Footprints':
        return <Footprints className="w-6 h-6" />;
      case 'Flame':
        return <Flame className="w-6 h-6" />;
      case 'Award':
        return <Award className="w-6 h-6" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" />;
      case 'Zap':
        return <Zap className="w-6 h-6" />;
      case 'Bookmark':
        return <Bookmark className="w-6 h-6" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6" />;
      case 'Compass':
        return <Compass className="w-6 h-6" />;
      case 'Crown':
      case 'Trophy':
        return <Trophy className="w-6 h-6" />;
      default:
        return <Award className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Your Progress & Milestones · لوحة الإنجاز
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-arabic mt-0.5" dir="rtl">
          إحصاءات دقيقة ومباشرة لتقدمك الفعلي في الدروس والأوسمة المكتسبة
        </p>
      </div>

      {/* Main KPI Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center mb-2">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {totalCompleted}
            <span className="text-sm font-semibold text-slate-400">/90</span>
          </span>
          <span className="text-xs text-slate-500 block mt-0.5">Lessons Done</span>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-2">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono tabular-nums">
            {userProfile.xp}
          </span>
          <span className="text-xs text-slate-500 block mt-0.5">Total XP</span>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center mb-2">
            <Flame className="w-4 h-4" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-orange-600 font-mono tabular-nums">
            {userProfile.streak}
          </span>
          <span className="text-xs text-slate-500 block mt-0.5">Active Days Streak</span>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mb-2">
            <Award className="w-4 h-4" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-teal-600 font-mono tabular-nums">
            {userProfile.unlockedAchievements.length}
            <span className="text-sm font-semibold text-slate-400">/{INITIAL_ACHIEVEMENTS.length}</span>
          </span>
          <span className="text-xs text-slate-500 block mt-0.5">Badges Unlocked</span>
        </div>
      </div>

      {/* Progress Breakdown by Level */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
        <h3 className="text-base font-extrabold text-slate-900">
          Level Completion Breakdown · الإنجاز بحسب المستوى
        </h3>

        {/* Overall Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-800">Overall Course (90 Lessons)</span>
            <span className="text-purple-700 font-mono">{overallPercent}%</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
        </div>

        {/* Level A1 */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-800">A1 Beginner (الأساسيات)</span>
            <span className="text-purple-700 font-mono">{a1Completed} / 30 ({Math.round((a1Completed / 30) * 100)}%)</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-600 rounded-full transition-all"
              style={{ width: `${Math.round((a1Completed / 30) * 100)}%` }}
            />
          </div>
        </div>

        {/* Level A2 */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-800">A2 Elementary (المواقف اليومية)</span>
            <span className="text-indigo-700 font-mono">{a2Completed} / 30 ({Math.round((a2Completed / 30) * 100)}%)</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all"
              style={{ width: `${Math.round((a2Completed / 30) * 100)}%` }}
            />
          </div>
        </div>

        {/* Level B1 */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-800">B1 Intermediate (الطلاقة المهنية)</span>
            <span className="text-teal-700 font-mono">{b1Completed} / 30 ({Math.round((b1Completed / 30) * 100)}%)</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-600 rounded-full transition-all"
              style={{ width: `${Math.round((b1Completed / 30) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Badges & Achievements Gallery */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-900">
            Badges & Achievements · أوسمة التميز
          </h3>
          <span className="text-xs font-semibold text-slate-500">
            {unlockedSet.size} of {INITIAL_ACHIEVEMENTS.length} Earned
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {INITIAL_ACHIEVEMENTS.map((ach) => {
            const isUnlocked = unlockedSet.has(ach.id);

            const tierColors = {
              bronze: 'bg-amber-100 text-amber-900 border-amber-200',
              silver: 'bg-slate-100 text-slate-900 border-slate-300',
              gold: 'bg-yellow-100 text-yellow-900 border-yellow-300',
              platinum: 'bg-purple-100 text-purple-900 border-purple-300',
            };

            return (
              <div
                key={ach.id}
                className={`p-4 rounded-3xl border transition-all flex items-start gap-3.5 ${
                  isUnlocked
                    ? 'bg-white border-purple-200 shadow-xs'
                    : 'bg-slate-50/70 border-slate-200/80 opacity-75'
                }`}
              >
                {/* Icon Container */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                    isUnlocked ? tierColors[ach.badgeTier] : 'bg-slate-200 text-slate-400 border-slate-300'
                  }`}
                >
                  {isUnlocked ? renderBadgeIcon(ach.iconName) : <Lock className="w-5 h-5" />}
                </div>

                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-900 truncate">
                      {ach.title}
                    </h4>
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                      +{ach.xpReward} XP
                    </span>
                  </div>

                  <p className="text-xs font-arabic text-purple-800" dir="rtl">
                    {ach.arabicTitle}
                  </p>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {ach.description}
                  </p>

                  {isUnlocked && (
                    <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 pt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Unlocked!
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
