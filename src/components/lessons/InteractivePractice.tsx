import React, { useState } from 'react';
import { PracticeExercise } from '../../types';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { playSuccessSound, playErrorSound } from '../../services/sound';

interface InteractivePracticeProps {
  exercises: PracticeExercise[];
}

export const InteractivePractice: React.FC<InteractivePracticeProps> = ({ exercises }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [wordOrderStates, setWordOrderStates] = useState<Record<string, string[]>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  const handleSelectAnswer = (exId: string, value: string) => {
    if (submitted[exId]) return;
    setAnswers((prev) => ({ ...prev, [exId]: value }));
  };

  const handleToggleWord = (exId: string, word: string) => {
    if (submitted[exId]) return;
    const current = wordOrderStates[exId] || [];
    if (current.includes(word)) {
      setWordOrderStates((prev) => ({
        ...prev,
        [exId]: current.filter((w) => w !== word),
      }));
    } else {
      setWordOrderStates((prev) => ({
        ...prev,
        [exId]: [...current, word],
      }));
    }
  };

  const handleCheck = (ex: PracticeExercise) => {
    const isWordOrder = ex.type === 'word-ordering';
    const userAns = isWordOrder
      ? (wordOrderStates[ex.id] || []).join(' ').trim()
      : (answers[ex.id] || '').trim();

    if (!userAns) return;

    setSubmitted((prev) => ({ ...prev, [ex.id]: true }));
    const isCorrect = userAns.toLowerCase() === (typeof ex.correctAnswer === 'string' ? ex.correctAnswer.toLowerCase() : '');

    if (isCorrect) {
      playSuccessSound();
    } else {
      playErrorSound();
    }
  };

  const handleRetry = (exId: string) => {
    setSubmitted((prev) => ({ ...prev, [exId]: false }));
    setAnswers((prev) => ({ ...prev, [exId]: '' }));
    setWordOrderStates((prev) => ({ ...prev, [exId]: [] }));
  };

  return (
    <div className="space-y-6">
      {exercises.map((ex, index) => {
        const isDone = submitted[ex.id];
        const isWordOrder = ex.type === 'word-ordering';
        const userValue = isWordOrder
          ? (wordOrderStates[ex.id] || []).join(' ')
          : answers[ex.id] || '';

        const isCorrect = userValue.toLowerCase() === (typeof ex.correctAnswer === 'string' ? ex.correctAnswer.toLowerCase() : '');

        return (
          <div
            key={ex.id}
            className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs"
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 uppercase tracking-wider">
                Exercise {index + 1}
              </span>
              {isDone && (
                <button
                  onClick={() => handleRetry(ex.id)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retry</span>
                </button>
              )}
            </div>

            <h4 className="text-base font-bold text-slate-900 leading-snug">
              {ex.prompt}
            </h4>
            {ex.arabicPrompt && (
              <p className="text-xs font-arabic text-slate-500 mt-1 mb-4" dir="rtl">
                {ex.arabicPrompt}
              </p>
            )}

            {/* Word Ordering Interface */}
            {isWordOrder && ex.sentenceWords && (
              <div className="space-y-4 my-3">
                {/* Resulting Constructed Sentence */}
                <div className="min-h-12 p-3 bg-slate-50 rounded-2xl border border-dashed border-slate-300 flex flex-wrap gap-2 items-center">
                  {(wordOrderStates[ex.id] || []).length === 0 ? (
                    <span className="text-xs text-slate-400 italic">
                      Tap words below in the correct sequence...
                    </span>
                  ) : (
                    (wordOrderStates[ex.id] || []).map((w, wIdx) => (
                      <button
                        key={wIdx}
                        onClick={() => handleToggleWord(ex.id, w)}
                        disabled={isDone}
                        className="px-3 py-1.5 rounded-xl bg-purple-700 text-white font-medium text-sm shadow-xs"
                      >
                        {w}
                      </button>
                    ))
                  )}
                </div>

                {/* Available word bank */}
                <div className="flex flex-wrap gap-2">
                  {ex.sentenceWords.map((w, wIdx) => {
                    const isUsed = (wordOrderStates[ex.id] || []).includes(w);
                    return (
                      <button
                        key={wIdx}
                        onClick={() => handleToggleWord(ex.id, w)}
                        disabled={isDone || isUsed}
                        className={`px-3 py-2 rounded-xl text-sm font-semibold border transition-all ${
                          isUsed
                            ? 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-purple-300 hover:bg-purple-50 active:scale-95'
                        }`}
                      >
                        {w}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Multiple Choice / Sentence Completion Options */}
            {!isWordOrder && ex.options && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-4">
                {ex.options.map((opt, optIdx) => {
                  const isSelected = answers[ex.id] === opt;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectAnswer(ex.id, opt)}
                      disabled={isDone}
                      className={`p-3 rounded-2xl text-sm font-medium border text-left transition-all ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50 text-purple-900 font-semibold ring-2 ring-purple-600/20'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-purple-200'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Check Button */}
            {!isDone ? (
              <button
                onClick={() => handleCheck(ex)}
                disabled={!userValue}
                className={`w-full mt-3 py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${
                  userValue
                    ? 'bg-purple-700 hover:bg-purple-800 text-white active:scale-98'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                Check Answer
              </button>
            ) : (
              <div
                className={`mt-4 p-4 rounded-2xl text-xs sm:text-sm animate-in fade-in ${
                  isCorrect
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border border-rose-200 text-rose-900'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-bold">
                      {isCorrect ? 'Well done!' : `Correct Answer: "${ex.correctAnswer}"`}
                    </p>
                    <p className="mt-1 leading-relaxed">{ex.explanation}</p>
                    {ex.arabicExplanation && (
                      <p className="font-arabic mt-1 pt-1 border-t border-current/15" dir="rtl">
                        {ex.arabicExplanation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
