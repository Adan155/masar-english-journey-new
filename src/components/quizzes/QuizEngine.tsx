import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, Award } from 'lucide-react';
import { QuizQuestion } from '../../types';
import { playSuccessSound, playErrorSound, playCelebrationSound } from '../../services/sound';
import { Mascot } from '../brand/MascotFamily';

interface QuizEngineProps {
  questions: QuizQuestion[];
  lessonTitle: string;
  arabicTitle: string;
  onFinish: (scorePercentage: number) => void;
  onRetry?: () => void;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({
  questions,
  lessonTitle,
  arabicTitle,
  onFinish,
  onRetry,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + (isAnswerSubmitted ? 1 : 0)) / questions.length) * 100);

  const handleSelectOption = (option: string) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(option);
  };

  const handleCheckAnswer = () => {
    if (!selectedAnswer || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedAnswer === currentQ.correctAnswer;
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      playSuccessSound();
    } else {
      playErrorSound();
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      const finalScore = Math.round(((correctCount + (selectedAnswer === currentQ.correctAnswer ? 1 : 0)) / questions.length) * 100);
      setIsCompleted(true);
      if (finalScore >= 80) {
        playCelebrationSound();
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {}
      }
      onFinish(finalScore);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setCorrectCount(0);
    setIsCompleted(false);
    if (onRetry) onRetry();
  };

  if (isCompleted) {
    const finalScore = Math.round((correctCount / questions.length) * 100);
    const passed = finalScore >= 70;

    return (
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-center animate-in fade-in zoom-in-95">
        <div className="flex justify-center my-2">
          <Mascot
            character={passed ? 'tareeq' : 'nawras'}
            mood={passed ? 'celebrating' : 'thinking'}
            size={120}
          />
        </div>

        <h3 className="text-xl font-extrabold text-slate-900 mt-2">
          {passed ? 'Quiz Completed!' : 'Keep Going! Almost There'}
        </h3>
        <p className="text-sm font-arabic text-purple-700 mt-1">
          {passed ? 'أحسنت! أكملت الاختبار بنجاح باهر' : 'أداء جيد! يمكنك إعادة المحاولة لتحقيق نسبة أعلى'}
        </p>

        {/* Score Ring Display */}
        <div className="my-6 inline-flex flex-col items-center justify-center p-6 rounded-3xl bg-purple-50 border border-purple-100 min-w-[200px]">
          <span className="text-4xl font-extrabold text-purple-900 font-mono tabular-nums">
            {finalScore}%
          </span>
          <span className="text-xs font-semibold text-purple-600 mt-1">
            {correctCount} out of {questions.length} correct
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button
            onClick={handleReset}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 active:scale-98 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retry Quiz (إعادة المحاولة)</span>
          </button>
        </div>
      </div>
    );
  }

  const isCurrentCorrect = selectedAnswer === currentQ.correctAnswer;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-100">
      {/* Quiz Header & Progress Bar */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
            Interactive Quiz
          </span>
          <h4 className="text-sm font-semibold text-slate-700 truncate max-w-[220px] sm:max-w-md">
            {lessonTitle}
          </h4>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 text-xs font-bold font-mono">
          <span>{currentIndex + 1}</span>
          <span>/</span>
          <span>{questions.length}</span>
        </div>
      </div>

      {/* Progress line */}
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-gradient-to-r from-purple-600 to-amber-500 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Question Text */}
      <div className="mb-6">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {currentQ.question}
        </h3>
        {currentQ.arabicQuestion && (
          <p className="text-sm text-slate-500 font-arabic mt-1.5" dir="rtl">
            {currentQ.arabicQuestion}
          </p>
        )}
      </div>

      {/* Options List */}
      <div className="space-y-2.5 mb-6">
        {currentQ.options.map((option, idx) => {
          const isSelected = selectedAnswer === option;
          let optionStyles = 'border-slate-200 hover:border-purple-300 bg-white text-slate-800';

          if (isAnswerSubmitted) {
            if (option === currentQ.correctAnswer) {
              optionStyles = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold shadow-xs';
            } else if (isSelected) {
              optionStyles = 'border-rose-400 bg-rose-50 text-rose-900 font-medium';
            } else {
              optionStyles = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
            }
          } else if (isSelected) {
            optionStyles = 'border-purple-600 bg-purple-50/70 text-purple-900 font-semibold ring-2 ring-purple-600/20';
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(option)}
              disabled={isAnswerSubmitted}
              className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between text-sm sm:text-base ${optionStyles}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs bg-slate-100 text-slate-600 shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{option}</span>
              </div>

              {isAnswerSubmitted && option === currentQ.correctAnswer && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
              )}
              {isAnswerSubmitted && isSelected && option !== currentQ.correctAnswer && (
                <XCircle className="w-5 h-5 text-rose-500 shrink-0 ml-2" />
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback banner after submission */}
      {isAnswerSubmitted && (
        <div
          className={`p-4 rounded-2xl mb-6 animate-in fade-in duration-200 ${
            isCurrentCorrect
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border border-rose-200 text-rose-900'
          }`}
        >
          <div className="flex items-start gap-3">
            {isCurrentCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 text-rose-600 mt-0.5 shrink-0" />
            )}
            <div className="space-y-1">
              <p className="font-bold text-sm">
                {isCurrentCorrect ? 'Correct! أحسنت' : 'Not quite right. راجع التفسير'}
              </p>
              <p className="text-xs sm:text-sm leading-relaxed">{currentQ.explanation}</p>
              {currentQ.arabicExplanation && (
                <p className="text-xs font-arabic pt-1 border-t border-current/15" dir="rtl">
                  {currentQ.arabicExplanation}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="pt-2">
        {!isAnswerSubmitted ? (
          <button
            onClick={handleCheckAnswer}
            disabled={!selectedAnswer}
            className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm sm:text-base transition-all shadow-md ${
              selectedAnswer
                ? 'bg-purple-700 hover:bg-purple-800 text-white active:scale-98 shadow-purple-900/20'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            Check Answer (تحقق من الإجابة)
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm sm:text-base bg-gradient-to-r from-purple-700 to-purple-800 hover:from-purple-800 hover:to-purple-900 text-white flex items-center justify-center gap-2 shadow-md shadow-purple-900/20 active:scale-98 transition-all"
          >
            <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
