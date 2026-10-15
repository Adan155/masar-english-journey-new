import React, { useState } from 'react';
import { ArrowRight, Sparkles, Check, X } from 'lucide-react';
import { UserProfile, CEFRLevel } from '../../types';
import { Mascot } from '../brand/MascotFamily';
import { Logo } from '../brand/Logo';
import { saveUserProfile } from '../../services/storage';

interface OnboardingModalProps {
  userProfile: UserProfile;
  onComplete: (updated: UserProfile) => void;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  userProfile,
  onComplete,
  onClose,
}) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState(userProfile.displayName || '');
  const [level, setLevel] = useState<CEFRLevel>(userProfile.preferredLevel || 'A1');
  const [goal, setGoal] = useState<number>(userProfile.dailyGoalMinutes || 15);

  const handleFinish = () => {
    const updated: UserProfile = {
      ...userProfile,
      displayName: name.trim() || 'Learner',
      preferredLevel: level,
      dailyGoalMinutes: goal,
      onboardingCompleted: true,
    };
    saveUserProfile(updated);
    onComplete(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-purple-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 1 && (
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-1">
              <Logo size="md" />
            </div>

            <div className="flex justify-center">
              <Mascot character="nawras" mood="welcome" size={110} />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-900">
                Welcome to MASAR English Journey!
              </h2>
              <p className="text-xs font-arabic text-purple-700" dir="rtl">
                أهلاً بك في مسار! ما هو اسمك لنبدأ رحلتك التعليمية معاً؟
              </p>
            </div>

            <div className="space-y-2 pt-2 text-left">
              <label className="text-xs font-bold text-slate-700">What is your name?</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sami, Sarah, Adam..."
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-600/30"
                autoFocus
              />
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 rounded-2xl bg-purple-700 text-white font-bold text-sm hover:bg-purple-800 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>Next: Choose Your Level</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <Mascot character="bayan" mood="speaking" size={90} />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-900">Choose Starting Level</h2>
              <p className="text-xs font-arabic text-purple-700" dir="rtl">
                اختر مستواك الحالي (يمكنك تصفح جميع المستويات والدروس بحرية لاحقاً)
              </p>
            </div>

            <div className="space-y-2.5 text-left pt-2">
              {[
                { lvl: 'A1', name: 'A1 · Beginner (المبتدئ)', desc: 'Greetings, personal info, time, food, everyday objects (30 lessons)' },
                { lvl: 'A2', name: 'A2 · Elementary (الابتدائي)', desc: 'Past experiences, travel, plans, advice, shopping, opinions (30 lessons)' },
                { lvl: 'B1', name: 'B1 · Intermediate (المتوسط)', desc: 'Narratives, conditionals, professional emails, presentations (30 lessons)' },
              ].map((item) => (
                <button
                  key={item.lvl}
                  onClick={() => setLevel(item.lvl as CEFRLevel)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all ${
                    level === item.lvl
                      ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-600/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">{item.name}</span>
                    {level === item.lvl && <Check className="w-4 h-4 text-purple-700" />}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(3)}
              className="w-full py-3.5 rounded-2xl bg-purple-700 text-white font-bold text-sm hover:bg-purple-800 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>Next: Set Daily Goal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <Mascot character="tareeq" mood="celebrating" size={90} />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-900">Your Daily Goal</h2>
              <p className="text-xs font-arabic text-purple-700" dir="rtl">
                كم دقيقة تود تخصيصها يومياً لتطوير لغتك الإنجليزية؟
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              {[
                { mins: 5, label: 'Casual (5 mins)', desc: 'Light & quick daily habit' },
                { mins: 10, label: 'Steady (10 mins)', desc: '1 lesson + practice daily' },
                { mins: 15, label: 'Dedicated (15 mins)', desc: 'Recommended optimal pace' },
                { mins: 20, label: 'Intensive (20 mins)', desc: 'Rapid fluency trajectory' },
              ].map((g) => (
                <button
                  key={g.mins}
                  onClick={() => setGoal(g.mins)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    goal === g.mins
                      ? 'border-amber-500 bg-amber-50/70 ring-2 ring-amber-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-900 block">{g.label}</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">{g.desc}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-black text-sm hover:from-purple-800 hover:to-indigo-800 shadow-lg shadow-purple-900/20 active:scale-98 transition-all flex items-center justify-center gap-2 mt-3"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Start My English Journey!</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
