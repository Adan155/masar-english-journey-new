import React, { useState } from 'react';
import { Search, ArrowRight, BookOpen, Sparkles, Filter } from 'lucide-react';
import { searchCurriculum } from '../data/lessons';
import { CEFRLevel } from '../types';

interface SearchPageProps {
  onSelectLesson: (lessonId: string) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ onSelectLesson }) => {
  const [query, setQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<'ALL' | CEFRLevel>('ALL');

  const searchResults = searchCurriculum(query, levelFilter);

  return (
    <div className="space-y-5 animate-in fade-in pb-16">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Curriculum Search · البحث في الدروس
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-arabic mt-0.5" dir="rtl">
          ابحث بالعربية أو بالإنجليزية عن أي كلمة، قاعدة، تعبير، أو موضوع
        </p>
      </div>

      {/* Search Input Box */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. greetings, التحيات, restaurant, present perfect, time..."
          className="w-full pl-11 pr-4 py-3.5 rounded-3xl bg-white border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-600/30 transition-all shadow-xs"
          autoFocus
        />
      </div>

      {/* Level Filters */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-200/60 rounded-2xl w-fit">
        {(['ALL', 'A1', 'A2', 'B1'] as ('ALL' | CEFRLevel)[]).map((lvl) => (
          <button
            key={lvl}
            onClick={() => setLevelFilter(lvl)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              levelFilter === lvl
                ? 'bg-purple-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {lvl === 'ALL' ? 'All Levels' : lvl}
          </button>
        ))}
      </div>

      {/* Results List */}
      {query.trim().length > 0 ? (
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-500 px-1">
            Found {searchResults.length} {searchResults.length === 1 ? 'match' : 'matches'}
          </div>

          {searchResults.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 space-y-2">
              <p className="font-bold text-slate-800">No results found for "{query}"</p>
              <p className="text-xs font-arabic text-slate-500">
                جرّب البحث بكلمة مرادفة أو مصطلح أبسط بالإنجليزية أو العربية.
              </p>
            </div>
          ) : (
            searchResults.map(({ lesson, matchedField, preview }, idx) => (
              <div
                key={idx}
                onClick={() => onSelectLesson(lesson.id)}
                className="p-4 rounded-3xl bg-white border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 font-mono">
                      {lesson.level} · L{lesson.number}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                      Matched: {matchedField}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors truncate">
                    {lesson.title}
                  </h3>

                  <p className="text-xs font-arabic text-purple-700 truncate" dir="rtl">
                    {lesson.arabicTitle}
                  </p>

                  <p className="text-xs text-slate-500 truncate italic">
                    Preview: {preview}
                  </p>
                </div>

                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-purple-700 group-hover:bg-purple-50 shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 space-y-3">
          <BookOpen className="w-8 h-8 text-purple-400 mx-auto" />
          <p className="font-bold text-slate-800">Type any term to search all 90 lessons</p>
          <p className="text-xs font-arabic text-slate-500">
            يمكنك كتابة أسماء الموضوعات، القواعد كـ "Past Simple"، أو معاني الكلمات كـ "سفر" أو "مطار".
          </p>
        </div>
      )}
    </div>
  );
};
