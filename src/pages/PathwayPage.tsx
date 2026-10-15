import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Bookmark,
  Search,
  Filter,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { Lesson, UserProfile, CEFRLevel } from '../types';
import { ALL_LESSONS } from '../data/lessons';
import { normalizeArabic } from '../data/lessons';

interface PathwayPageProps {
  userProfile: UserProfile;
  initialLevelFilter?: CEFRLevel | 'ALL';
  onSelectLesson: (lessonId: string) => void;
  onToggleBookmark: (lessonId: string) => void;
}

export const PathwayPage: React.FC<PathwayPageProps> = ({
  userProfile,
  initialLevelFilter = 'ALL',
  onSelectLesson,
  onToggleBookmark,
}) => {
  const [levelFilter, setLevelFilter] = useState<'ALL' | CEFRLevel>(initialLevelFilter);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'COMPLETED' | 'UNCOMPLETED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const completedSet = new Set(userProfile.completedLessons);
  const bookmarkedSet = new Set(userProfile.bookmarkedLessons);

  const filteredLessons = ALL_LESSONS.filter((lesson) => {
    // Level filter
    if (levelFilter !== 'ALL' && lesson.level !== levelFilter) return false;

    // Status filter
    const isDone = completedSet.has(lesson.id);
    if (statusFilter === 'COMPLETED' && !isDone) return false;
    if (statusFilter === 'UNCOMPLETED' && isDone) return false;

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const normAr = normalizeArabic(q);
      const titleMatch = lesson.title.toLowerCase().includes(q);
      const arTitleMatch = normalizeArabic(lesson.arabicTitle).includes(normAr);
      const topicMatch = lesson.topic.toLowerCase().includes(q) || normalizeArabic(lesson.arabicTopic).includes(normAr);
      const vocabMatch = lesson.vocabulary.some(
        (v) => v.word.toLowerCase().includes(q) || normalizeArabic(v.arabicMeaning).includes(normAr)
      );
      if (!titleMatch && !arTitleMatch && !topicMatch && !vocabMatch) {
        return false;
      }
    }

    return true;
  });

  const a1Count = ALL_LESSONS.filter((l) => l.level === 'A1').length;
  const a2Count = ALL_LESSONS.filter((l) => l.level === 'A2').length;
  const b1Count = ALL_LESSONS.filter((l) => l.level === 'B1').length;

  return (
    <div className="space-y-5 animate-in fade-in pb-16">
      {/* Header & Subtitle */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Learning Pathway · مسار الدروس
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-arabic mt-0.5" dir="rtl">
          90 درساً تعليمياً متكاملاً موزعة على 3 مستويات من A1 إلى B1
        </p>
      </div>

      {/* Level Segmented Filter Bar */}
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/70 rounded-2xl overflow-x-auto no-scrollbar">
        <button
          onClick={() => setLevelFilter('ALL')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            levelFilter === 'ALL'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All Levels (90)
        </button>
        <button
          onClick={() => setLevelFilter('A1')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            levelFilter === 'A1'
              ? 'bg-purple-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          A1 Beginner ({a1Count})
        </button>
        <button
          onClick={() => setLevelFilter('A2')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            levelFilter === 'A2'
              ? 'bg-indigo-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          A2 Elementary ({a2Count})
        </button>
        <button
          onClick={() => setLevelFilter('B1')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            levelFilter === 'B1'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          B1 Intermediate ({b1Count})
        </button>
      </div>

      {/* Search & Status Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lessons by title, topic, or Arabic meaning..."
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-600/30 transition-all placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-2xl shrink-0">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              statusFilter === 'ALL'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter('COMPLETED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              statusFilter === 'COMPLETED'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setStatusFilter('UNCOMPLETED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              statusFilter === 'UNCOMPLETED'
                ? 'bg-purple-700 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            To Learn
          </button>
        </div>
      </div>

      {/* Lessons List Grid */}
      {filteredLessons.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 space-y-2">
          <p className="font-bold text-base text-slate-800">No lessons match your search criteria</p>
          <p className="text-xs font-arabic text-slate-500">لم يتم العثور على دروس مطابقة، جرّب كلمات بحث أخرى</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredLessons.map((lesson) => {
            const isCompleted = completedSet.has(lesson.id);
            const isBookmarked = bookmarkedSet.has(lesson.id);
            const quizScore = userProfile.quizScores[lesson.id];

            return (
              <div
                key={lesson.id}
                onClick={() => onSelectLesson(lesson.id)}
                className={`p-4 sm:p-5 rounded-3xl border transition-all cursor-pointer bg-white hover:border-purple-300 hover:shadow-md flex items-center justify-between gap-4 group ${
                  isCompleted ? 'border-emerald-200/90' : 'border-slate-200/80'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Number & Completion Indicator */}
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center font-extrabold font-mono text-sm shrink-0 transition-transform group-hover:scale-105 ${
                      isCompleted
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : 'bg-purple-100 text-purple-900'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <span>{lesson.number}</span>
                    )}
                  </div>

                  {/* Title and metadata */}
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                        {lesson.level}
                      </span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs font-medium text-slate-500 truncate max-w-[140px] sm:max-w-xs">
                        {lesson.topic}
                      </span>
                      {quizScore !== undefined && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-mono">
                          {quizScore}%
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors truncate">
                      {lesson.title}
                    </h3>

                    <p className="text-xs font-arabic text-purple-700 truncate" dir="rtl">
                      {lesson.arabicTitle}
                    </p>
                  </div>
                </div>

                {/* Right Action & Bookmark */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(lesson.id);
                    }}
                    className={`p-2 rounded-xl transition-colors ${
                      isBookmarked
                        ? 'text-amber-500 hover:text-amber-600 bg-amber-50'
                        : 'text-slate-300 hover:text-slate-500'
                    }`}
                    title={isBookmarked ? 'Remove bookmark' : 'Bookmark lesson'}
                    aria-label="Bookmark lesson"
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  </button>

                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-purple-700 group-hover:bg-purple-50 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
