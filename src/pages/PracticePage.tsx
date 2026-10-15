import React, { useState } from 'react';
import {
  Sparkles,
  RotateCcw,
  Volume2,
  Check,
  X,
  Bookmark,
  AlertTriangle,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { UserProfile, VocabularyItem, CommonMistake } from '../types';
import { ALL_LESSONS } from '../data/lessons';
import { AudioPronounceButton } from '../components/common/AudioPronounceButton';
import { Mascot } from '../components/brand/MascotFamily';
import { playSuccessSound, playClickSound } from '../services/sound';

interface PracticePageProps {
  userProfile: UserProfile;
  onSelectLesson: (lessonId: string) => void;
  onToggleWordBookmark: (wordId: string) => void;
}

export const PracticePage: React.FC<PracticePageProps> = ({
  userProfile,
  onSelectLesson,
  onToggleWordBookmark,
}) => {
  const [activeTab, setActiveTab] = useState<'flashcards' | 'saved' | 'mistakes'>('flashcards');

  // Collect all vocabulary across curriculum
  const allVocab: { vocab: VocabularyItem; lessonTitle: string; lessonId: string }[] = [];
  const allMistakes: { mistake: CommonMistake; lessonTitle: string; lessonId: string }[] = [];

  ALL_LESSONS.forEach((l) => {
    l.vocabulary.forEach((v) => allVocab.push({ vocab: v, lessonTitle: l.title, lessonId: l.id }));
    l.grammar.commonMistakes.forEach((m) => allMistakes.push({ mistake: m, lessonTitle: l.title, lessonId: l.id }));
  });

  // Flashcard state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);

  const currentFlashcard = allVocab[cardIndex % allVocab.length];

  const handleFlip = () => {
    playClickSound();
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = (known: boolean) => {
    if (known) {
      setKnownCount((prev) => prev + 1);
      playSuccessSound();
    } else {
      playClickSound();
    }
    setIsFlipped(false);
    setCardIndex((prev) => (prev + 1) % allVocab.length);
  };

  // Filter bookmarked words
  const savedWordsList = allVocab.filter((item) =>
    userProfile.bookmarkedWords.includes(item.vocab.id)
  );

  return (
    <div className="space-y-6 animate-in fade-in pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Practice & Review · التدريب والمراجعة
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-arabic mt-0.5" dir="rtl">
            بطاقات الاستذكار وقاموس الكلمات المحفوظة ومراجعة الأخطاء الشائعة
          </p>
        </div>
        <Mascot character="tareeq" mood="streak" size={70} />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-200/70 rounded-2xl">
        <button
          onClick={() => setActiveTab('flashcards')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'flashcards'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Flashcards</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'saved'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved Words ({savedWordsList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('mistakes')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'mistakes'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Mistake Bank</span>
        </button>
      </div>

      {/* Tab Content: Flashcards */}
      {activeTab === 'flashcards' && currentFlashcard && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
            <span>Card {cardIndex + 1} of {allVocab.length}</span>
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-mono">
              {knownCount} Mastered Today
            </span>
          </div>

          {/* Interactive Flipped Card */}
          <div
            onClick={handleFlip}
            className="min-h-[260px] sm:min-h-[300px] p-6 sm:p-8 rounded-3xl bg-white border border-purple-200 shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden group select-none text-center"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700">
                {currentFlashcard.lessonTitle}
              </span>
              <span className="text-[11px] text-slate-400 group-hover:text-purple-600 font-medium">
                Tap to flip card
              </span>
            </div>

            {!isFlipped ? (
              <div className="my-auto space-y-3 py-6">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 block">
                  {currentFlashcard.vocab.word}
                </span>
                <span className="text-sm font-mono text-purple-700 bg-purple-50 px-3 py-1 rounded-full inline-block">
                  {currentFlashcard.vocab.phonetic}
                </span>
                <div className="pt-2">
                  <AudioPronounceButton text={currentFlashcard.vocab.word} size="md" allowSlow />
                </div>
              </div>
            ) : (
              <div className="my-auto space-y-3 py-6 animate-in fade-in">
                <span className="text-2xl sm:text-3xl font-extrabold font-arabic text-purple-900 block" dir="rtl">
                  {currentFlashcard.vocab.arabicMeaning}
                </span>
                <p className="text-sm text-slate-700 italic max-w-md mx-auto">
                  "{currentFlashcard.vocab.exampleSentence}"
                </p>
                <p className="text-xs font-arabic text-slate-500" dir="rtl">
                  {currentFlashcard.vocab.arabicExample}
                </p>
              </div>
            )}

            <div className="text-[11px] text-slate-400">
              {isFlipped ? 'Answer revealed' : 'Guess the meaning in Arabic'}
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => handleNextCard(false)}
              className="py-3 px-4 rounded-2xl border border-slate-200 bg-white text-slate-700 font-bold text-sm hover:bg-slate-50 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4 text-slate-400" />
              <span>Still Learning</span>
            </button>

            <button
              onClick={() => handleNextCard(true)}
              className="py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
            >
              <Check className="w-4 h-4" />
              <span>I Know This!</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab Content: Saved Words */}
      {activeTab === 'saved' && (
        <div className="space-y-3">
          {savedWordsList.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 space-y-3">
              <Bookmark className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="font-bold text-slate-800">No bookmarked words yet</p>
              <p className="text-xs font-arabic text-slate-500">
                أثناء تصفح الدروس، اضغط على أيقونة الإشارة المرجعية لحفظ الكلمات هنا ومراجعتها لاحقاً.
              </p>
            </div>
          ) : (
            savedWordsList.map((item) => (
              <div
                key={item.vocab.id}
                className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-slate-900">{item.vocab.word}</span>
                    <span className="text-xs font-mono text-purple-700">{item.vocab.phonetic}</span>
                    <AudioPronounceButton text={item.vocab.word} size="sm" />
                  </div>
                  <p className="text-xs font-bold font-arabic text-purple-800" dir="rtl">
                    {item.vocab.arabicMeaning}
                  </p>
                  <p className="text-[11px] text-slate-500 italic">
                    "{item.vocab.exampleSentence}"
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => onToggleWordBookmark(item.vocab.id)}
                    className="p-2 rounded-xl text-amber-500 bg-amber-50 hover:bg-amber-100 transition-colors"
                    title="Remove from saved"
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>

                  <button
                    onClick={() => onSelectLesson(item.lessonId)}
                    className="p-2 rounded-xl text-slate-400 hover:text-purple-700 hover:bg-purple-50 transition-colors"
                    title="Go to lesson"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab Content: Common Mistakes Bank */}
      {activeTab === 'mistakes' && (
        <div className="space-y-3.5">
          {allMistakes.map((item, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                  {item.lessonTitle}
                </span>
                <button
                  onClick={() => onSelectLesson(item.lessonId)}
                  className="text-xs font-semibold text-slate-500 hover:text-purple-700 flex items-center gap-1"
                >
                  <span>Open Lesson</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-900">
                  <span className="font-bold block text-rose-600 mb-0.5">Incorrect:</span>
                  <span className="line-through">"{item.mistake.incorrect}"</span>
                </div>

                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-950 flex items-center justify-between">
                  <div>
                    <span className="font-bold block text-emerald-600 mb-0.5">Correct:</span>
                    <span className="font-semibold">"{item.mistake.correct}"</span>
                  </div>
                  <AudioPronounceButton text={item.mistake.correct} size="sm" />
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                {item.mistake.explanation}
              </p>
              {item.mistake.arabicExplanation && (
                <p className="text-xs font-arabic text-purple-700 pt-1 border-t border-slate-100" dir="rtl">
                  {item.mistake.arabicExplanation}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
