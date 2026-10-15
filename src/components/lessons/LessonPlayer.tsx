import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CheckCircle,
  HelpCircle,
  BookOpen,
  MessageSquare,
  Sparkles,
  Mic,
  Award,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { Lesson, UserProfile } from '../../types';
import { AudioPronounceButton } from '../common/AudioPronounceButton';
import { QuizEngine } from '../quizzes/QuizEngine';
import { InteractivePractice } from './InteractivePractice';
import { Mascot } from '../brand/MascotFamily';
import { markLessonCompleted as saveProgress, toggleLessonBookmark as toggleBookmark, toggleWordBookmark as toggleWord } from '../../services/storage';

interface LessonPlayerProps {
  lesson: Lesson;
  userProfile: UserProfile;
  onProfileUpdated: (updated: UserProfile) => void;
  onBack: () => void;
  onNavigateLesson: (lessonId: string) => void;
  prevLesson?: Lesson;
  nextLesson?: Lesson;
}

type LessonStep =
  | 'overview'
  | 'vocabulary'
  | 'grammar'
  | 'dialogue'
  | 'mistakes'
  | 'practice'
  | 'quiz'
  | 'speaking'
  | 'completed';

export const LessonPlayer: React.FC<LessonPlayerProps> = ({
  lesson,
  userProfile,
  onProfileUpdated,
  onBack,
  onNavigateLesson,
  prevLesson,
  nextLesson,
}) => {
  const [activeStep, setActiveStep] = useState<LessonStep>('overview');
  const [showArabicTranslation, setShowArabicTranslation] = useState(true);
  const [latestXpGained, setLatestXpGained] = useState<number | null>(null);

  const isBookmarked = userProfile.bookmarkedLessons.includes(lesson.id);
  const isCompleted = userProfile.completedLessons.includes(lesson.id);

  const handleToggleBookmark = () => {
    const updated = toggleBookmark(lesson.id);
    onProfileUpdated(updated);
  };

  const handleToggleWord = (wordId: string) => {
    const updated = toggleWord(wordId);
    onProfileUpdated(updated);
  };

  const handleQuizFinished = (score: number) => {
    const res = saveProgress(lesson.id, lesson.level, score);
    setLatestXpGained(res.xpEarned);
    onProfileUpdated(res.updatedProfile);
    setActiveStep('speaking');
  };

  const handleFinishLesson = () => {
    const res = saveProgress(lesson.id, lesson.level, 100);
    setLatestXpGained(res.xpEarned);
    onProfileUpdated(res.updatedProfile);
    setActiveStep('completed');
  };

  const stepsList: { key: LessonStep; label: string; arLabel: string; icon: React.ElementType }[] = [
    { key: 'overview', label: 'Context', arLabel: 'السياق', icon: BookOpen },
    { key: 'vocabulary', label: 'Words', arLabel: 'المفردات', icon: Sparkles },
    { key: 'grammar', label: 'Grammar', arLabel: 'القواعد', icon: Lightbulb },
    { key: 'dialogue', label: 'Dialogue', arLabel: 'المحادثة', icon: MessageSquare },
    { key: 'mistakes', label: 'Mistakes', arLabel: 'الأخطاء', icon: AlertTriangle },
    { key: 'practice', label: 'Practice', arLabel: 'تمارين', icon: CheckCircle },
    { key: 'quiz', label: 'Quiz', arLabel: 'اختبار', icon: HelpCircle },
    { key: 'speaking', label: 'Speaking', arLabel: 'تحدث', icon: Mic },
  ];

  return (
    <div className="max-w-3xl mx-auto pb-24 animate-in fade-in">
      {/* Top Bar for Lesson Player */}
      <div className="sticky top-0 z-30 bg-[#F8F7FC]/95 backdrop-blur-md px-4 py-3 border-b border-slate-200/80 flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-purple-700 p-2 rounded-xl hover:bg-slate-100 transition-colors"
          aria-label="Back to pathway"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Back</span>
        </button>

        <div className="text-center truncate px-2">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-mono">
              {lesson.level} · L{lesson.number}
            </span>
            {isCompleted && (
              <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                Done
              </span>
            )}
          </div>
          <h2 className="text-sm font-bold text-slate-900 truncate mt-0.5">
            {lesson.title}
          </h2>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleToggleBookmark}
            className={`p-2 rounded-xl transition-all ${
              isBookmarked
                ? 'text-amber-500 bg-amber-50'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark lesson'}
            aria-label="Bookmark lesson"
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Step Navigation Pill Carousel */}
      <div className="px-4 py-2.5 overflow-x-auto no-scrollbar flex items-center gap-1.5 border-b border-slate-100 bg-white">
        {stepsList.map((st) => {
          const Icon = st.icon;
          const isActive = activeStep === st.key;
          return (
            <button
              key={st.key}
              onClick={() => setActiveStep(st.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{st.label}</span>
              <span className="text-[10px] font-arabic opacity-80">({st.arLabel})</span>
            </button>
          );
        })}
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Step: Overview & Context */}
        {activeStep === 'overview' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Header Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-800 to-indigo-900 text-white shadow-md relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-purple-200">
                  Lesson {lesson.number} · {lesson.level}
                </span>
                <h1 className="text-xl sm:text-2xl font-extrabold mt-1">
                  {lesson.title}
                </h1>
                <p className="text-base font-arabic text-amber-300 mt-1" dir="rtl">
                  {lesson.arabicTitle}
                </p>

                <div className="mt-4 flex flex-wrap gap-2 text-xs text-purple-200">
                  <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-xs">
                    Topic: {lesson.topic}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-xs font-mono">
                    ~{lesson.estimatedMinutes} mins
                  </span>
                </div>
              </div>

              {/* Decorative Guide Avatar */}
              <div className="absolute -bottom-4 -right-4 opacity-25 sm:opacity-40 pointer-events-none">
                <Mascot character="nawras" size={140} />
              </div>
            </div>

            {/* Situation Context */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-purple-700 mb-2">
                Real-Life Context · سياق الموقف
              </h3>
              <p className="text-base text-slate-800 leading-relaxed">
                {lesson.situationContext}
              </p>
              <p className="text-sm font-arabic text-slate-500 mt-2 pt-2 border-t border-slate-100" dir="rtl">
                {lesson.arabicContext}
              </p>
            </div>

            {/* Learning Objectives */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-purple-700 mb-3">
                Learning Goals · ما ستتقنه اليوم
              </h3>
              <ul className="space-y-2.5">
                {lesson.learningObjectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <span>{obj}</span>
                      {lesson.arabicObjectives && lesson.arabicObjectives[i] && (
                        <p className="text-xs font-arabic text-slate-500 mt-0.5" dir="rtl">
                          {lesson.arabicObjectives[i]}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Useful Expressions Preview */}
            <div className="p-5 rounded-3xl bg-amber-50/70 border border-amber-200/70">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-900 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Useful Expressions · تعابير ذهبية
              </h3>
              <div className="space-y-3">
                {lesson.usefulExpressions.map((expr, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-2xl border border-amber-100 flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{expr.english}</span>
                        <AudioPronounceButton text={expr.english} size="sm" />
                      </div>
                      <p className="text-xs font-arabic text-purple-700" dir="rtl">{expr.arabic}</p>
                      <p className="text-[11px] text-slate-400 italic">{expr.context}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step Advance Button */}
            <button
              onClick={() => setActiveStep('vocabulary')}
              className="w-full py-4 rounded-2xl bg-purple-700 text-white font-bold text-base hover:bg-purple-800 transition-all flex items-center justify-center gap-2 shadow-md shadow-purple-900/20 active:scale-98"
            >
              <span>Explore Vocabulary (المفردات)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step: Vocabulary */}
        {activeStep === 'vocabulary' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Core Vocabulary</h3>
                <p className="text-xs font-arabic text-purple-700">المفردات الأساسية والنطق السليم</p>
              </div>
              <Mascot character="bayan" mood="speaking" size={60} />
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              {lesson.vocabulary.map((vocab) => {
                const isWordSaved = userProfile.bookmarkedWords.includes(vocab.id);
                return (
                  <div
                    key={vocab.id}
                    className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-purple-200 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-lg font-extrabold text-slate-900">
                            {vocab.word}
                          </span>
                          <span className="text-xs font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                            {vocab.phonetic}
                          </span>
                          <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                            {vocab.partOfSpeech}
                          </span>
                          <AudioPronounceButton text={vocab.word} allowSlow size="sm" />
                        </div>
                        <p className="text-sm font-bold font-arabic text-purple-800" dir="rtl">
                          {vocab.arabicMeaning}
                        </p>
                      </div>

                      <button
                        onClick={() => handleToggleWord(vocab.id)}
                        className={`p-2 rounded-xl transition-all ${
                          isWordSaved
                            ? 'text-amber-500 bg-amber-50'
                            : 'text-slate-300 hover:text-slate-500'
                        }`}
                        title={isWordSaved ? 'Remove from saved words' : 'Save word'}
                      >
                        <Bookmark className={`w-4 h-4 ${isWordSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-1 text-xs">
                      <div className="flex items-center justify-between text-slate-700">
                        <span className="italic font-medium">"{vocab.exampleSentence}"</span>
                        <AudioPronounceButton text={vocab.exampleSentence} size="sm" />
                      </div>
                      <p className="text-slate-500 font-arabic text-[11px]" dir="rtl">
                        {vocab.arabicExample}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setActiveStep('overview')}
                className="py-3 px-5 rounded-2xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50"
              >
                Previous
              </button>
              <button
                onClick={() => setActiveStep('grammar')}
                className="flex-1 py-3 px-5 rounded-2xl bg-purple-700 text-white font-bold text-sm hover:bg-purple-800 flex items-center justify-center gap-2"
              >
                <span>Grammar in Context (القواعد)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step: Grammar */}
        {activeStep === 'grammar' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700 mb-2">
                <Lightbulb className="w-4 h-4" />
                <span>Grammar Focus · التركيز النحوي</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {lesson.grammar.title}
              </h3>
              <p className="text-sm font-arabic text-purple-800 mt-1" dir="rtl">
                {lesson.grammar.arabicTitle}
              </p>

              <p className="text-sm text-slate-700 mt-3 leading-relaxed">
                {lesson.grammar.explanation}
              </p>
              <p className="text-xs font-arabic text-slate-500 mt-2 pt-2 border-t border-slate-100 leading-relaxed" dir="rtl">
                {lesson.grammar.arabicExplanation}
              </p>
            </div>

            {/* Grammar Rules List */}
            <div className="p-5 rounded-3xl bg-purple-50/70 border border-purple-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900 mb-3">
                Key Rules & Patterns
              </h4>
              <ul className="space-y-2">
                {lesson.grammar.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-purple-950">
                    <span className="w-5 h-5 rounded-full bg-purple-200 text-purple-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sentence Examples */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Correct Usage Examples
              </h4>
              {lesson.grammar.examples.map((ex, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-sm font-bold text-slate-900">{ex.english}</span>
                    <p className="text-xs font-arabic text-slate-500 mt-0.5" dir="rtl">{ex.arabic}</p>
                  </div>
                  <AudioPronounceButton text={ex.english} size="sm" />
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setActiveStep('vocabulary')}
                className="py-3 px-5 rounded-2xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50"
              >
                Previous
              </button>
              <button
                onClick={() => setActiveStep('dialogue')}
                className="flex-1 py-3 px-5 rounded-2xl bg-purple-700 text-white font-bold text-sm hover:bg-purple-800 flex items-center justify-center gap-2"
              >
                <span>Natural Dialogue (المحادثة)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step: Dialogue */}
        {activeStep === 'dialogue' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Realistic Dialogue</h3>
                <p className="text-xs font-arabic text-purple-700">محادثة واقعية تضع المفردات في سياق حي</p>
              </div>

              <button
                onClick={() => setShowArabicTranslation(!showArabicTranslation)}
                className={`text-xs px-3 py-1.5 rounded-full font-semibold border transition-all ${
                  showArabicTranslation
                    ? 'bg-purple-100 text-purple-800 border-purple-200'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                {showArabicTranslation ? 'Hide Arabic' : 'Show Arabic'}
              </button>
            </div>

            <div className="space-y-3.5">
              {lesson.dialogue.map((line, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 p-4 rounded-3xl border transition-all ${
                      isEven
                        ? 'bg-white border-slate-200'
                        : 'bg-purple-50/60 border-purple-100'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                      {line.speaker.slice(0, 2).toUpperCase()}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-extrabold text-slate-900">{line.speaker}</span>
                          <span className="text-[10px] font-arabic text-slate-400">({line.arabicRole})</span>
                        </div>
                        <AudioPronounceButton text={line.english} size="sm" />
                      </div>

                      <p className="text-sm font-medium text-slate-800 leading-relaxed">
                        {line.english}
                      </p>

                      {showArabicTranslation && (
                        <p className="text-xs font-arabic text-purple-700 pt-1" dir="rtl">
                          {line.arabic}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setActiveStep('grammar')}
                className="py-3 px-5 rounded-2xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50"
              >
                Previous
              </button>
              <button
                onClick={() => setActiveStep('mistakes')}
                className="flex-1 py-3 px-5 rounded-2xl bg-purple-700 text-white font-bold text-sm hover:bg-purple-800 flex items-center justify-center gap-2"
              >
                <span>Common Mistakes (الأخطاء الشائعة)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step: Common Mistakes */}
        {activeStep === 'mistakes' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Common Learner Mistakes</h3>
                <p className="text-xs font-arabic text-rose-700">تجنب الأخطاء الشائعة التي يقع فيها المتعلمون</p>
              </div>
              <Mascot character="nawras" mood="thinking" size={60} />
            </div>

            <div className="space-y-4">
              {lesson.grammar.commonMistakes.map((m, idx) => (
                <div key={idx} className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-2xl">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block mb-0.5">
                      Incorrect (خطأ شائع)
                    </span>
                    <span className="text-sm font-semibold text-rose-900 line-through">
                      "{m.incorrect}"
                    </span>
                  </div>

                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block mb-0.5">
                        Correct (الصواب)
                      </span>
                      <AudioPronounceButton text={m.correct} size="sm" />
                    </div>
                    <span className="text-sm font-bold text-emerald-950">
                      "{m.correct}"
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 pt-1 space-y-1">
                    <p className="leading-relaxed"><strong>Why:</strong> {m.explanation}</p>
                    <p className="font-arabic text-purple-700 pt-1 border-t border-slate-100" dir="rtl">
                      {m.arabicExplanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setActiveStep('dialogue')}
                className="py-3 px-5 rounded-2xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50"
              >
                Previous
              </button>
              <button
                onClick={() => setActiveStep('practice')}
                className="flex-1 py-3 px-5 rounded-2xl bg-purple-700 text-white font-bold text-sm hover:bg-purple-800 flex items-center justify-center gap-2"
              >
                <span>Interactive Practice (التمارين)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step: Interactive Practice */}
        {activeStep === 'practice' && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Interactive Practice</h3>
              <p className="text-xs font-arabic text-purple-700">تمارين فورية لترسيخ القواعد والمفردات</p>
            </div>

            <InteractivePractice exercises={lesson.interactiveExercises} />

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setActiveStep('mistakes')}
                className="py-3 px-5 rounded-2xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50"
              >
                Previous
              </button>
              <button
                onClick={() => setActiveStep('quiz')}
                className="flex-1 py-3 px-5 rounded-2xl bg-purple-700 text-white font-bold text-sm hover:bg-purple-800 flex items-center justify-center gap-2"
              >
                <span>Start Lesson Quiz (الاختبار)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step: Quiz */}
        {activeStep === 'quiz' && (
          <div className="space-y-6 animate-in fade-in">
            <QuizEngine
              questions={lesson.quiz}
              lessonTitle={lesson.title}
              arabicTitle={lesson.arabicTitle}
              onFinish={handleQuizFinished}
            />
          </div>
        )}

        {/* Step: Speaking Challenge */}
        {activeStep === 'speaking' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700">
                <Mic className="w-4 h-4" />
                <span>Speaking Challenge · تحدي النطق والتحدث</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                {lesson.speakingChallenge.title}
              </h3>
              <p className="text-xs font-arabic text-purple-800" dir="rtl">
                {lesson.speakingChallenge.arabicTitle}
              </p>

              <div className="p-4 bg-purple-50 rounded-2xl space-y-2">
                <p className="text-sm font-semibold text-purple-950">
                  {lesson.speakingChallenge.prompt}
                </p>
                <p className="text-xs font-arabic text-purple-700" dir="rtl">
                  {lesson.speakingChallenge.arabicContext}
                </p>
              </div>

              {/* Model Answer Box */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    Model Answer (النموذج الصوتي المثالي)
                  </span>
                  <AudioPronounceButton text={lesson.speakingChallenge.modelAnswer} allowSlow size="sm" />
                </div>
                <p className="text-sm font-bold text-emerald-950">
                  "{lesson.speakingChallenge.modelAnswer}"
                </p>
                <p className="text-xs font-arabic text-emerald-800" dir="rtl">
                  {lesson.speakingChallenge.arabicModelAnswer}
                </p>
              </div>

              {/* Pronunciation Tips */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Pronunciation Tips (نصائح النطق)
                </span>
                <ul className="space-y-1.5">
                  {lesson.speakingChallenge.pronunciationTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={handleFinishLesson}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-extrabold text-base hover:from-emerald-700 hover:to-teal-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 active:scale-98"
            >
              <Award className="w-5 h-5" />
              <span>Complete Lesson & Earn XP (إنهاء الدرس)</span>
            </button>
          </div>
        )}

        {/* Step: Lesson Completed Screen */}
        {activeStep === 'completed' && (
          <div className="p-6 rounded-3xl bg-white border border-slate-200 text-center space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex justify-center my-3">
              <Mascot character="tareeq" mood="celebrating" size={140} />
            </div>

            <h2 className="text-2xl font-black text-slate-900">
              Congratulations! مبروك!
            </h2>
            <p className="text-sm font-arabic text-purple-700">
              أتممت بنجاح درس "{lesson.title} - {lesson.arabicTitle}"
            </p>

            {latestXpGained !== null && latestXpGained > 0 && (
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-100 text-amber-900 font-bold font-mono text-base">
                <Sparkles className="w-5 h-5 text-amber-600 fill-current" />
                <span>+{latestXpGained} XP Earned</span>
              </div>
            )}

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 text-left space-y-2">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider">Lesson Summary:</h4>
              <ul className="list-disc list-inside space-y-1">
                {lesson.reviewSummary.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <button
                onClick={onBack}
                className="flex-1 py-3 px-4 rounded-2xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50"
              >
                Learning Pathway
              </button>

              {nextLesson && (
                <button
                  onClick={() => onNavigateLesson(nextLesson.id)}
                  className="flex-1 py-3 px-4 rounded-2xl bg-purple-700 text-white font-bold text-sm hover:bg-purple-800 flex items-center justify-center gap-2"
                >
                  <span>Next Lesson: L{nextLesson.number}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Prev / Next Bottom Navigation Bar */}
      {activeStep !== 'completed' && (
        <div className="fixed bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 max-w-3xl mx-auto flex items-center justify-between gap-3">
          {prevLesson ? (
            <button
              onClick={() => onNavigateLesson(prevLesson.id)}
              className="text-xs font-semibold text-slate-600 hover:text-purple-700 flex items-center gap-1.5 py-1.5 px-3 rounded-xl hover:bg-slate-100"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="truncate max-w-[120px]">L{prevLesson.number}</span>
            </button>
          ) : <div />}

          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Lesson {lesson.number} of 90
          </span>

          {nextLesson ? (
            <button
              onClick={() => onNavigateLesson(nextLesson.id)}
              className="text-xs font-semibold text-purple-700 hover:text-purple-900 flex items-center gap-1.5 py-1.5 px-3 rounded-xl hover:bg-purple-50"
            >
              <span className="truncate max-w-[120px]">L{nextLesson.number}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : <div />}
        </div>
      )}
    </div>
  );
};
