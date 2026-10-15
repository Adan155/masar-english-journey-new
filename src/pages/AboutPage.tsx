import React from 'react';
import { Compass, Sparkles, BookOpen, HeartHandshake, ShieldCheck } from 'lucide-react';
import { Mascot } from '../components/brand/MascotFamily';
import { Logo } from '../components/brand/Logo';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in pb-16">
      {/* Brand Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-900 to-indigo-950 text-white text-center space-y-3">
        <div className="flex justify-center">
          <Logo size="lg" theme="dark" />
        </div>
        <p className="text-sm font-medium text-purple-200 max-w-md mx-auto">
          A dedicated interactive journey helping Arabic-speaking learners build practical, confident English communication.
        </p>
        <p className="text-xs font-arabic text-amber-300" dir="rtl">
          رحلة تعليمية تفاعلية مصممة خصيصاً لتمكين المتعلمين العرب من إتقان الإنجليزية العملية بثقة.
        </p>
      </div>

      {/* Core Educational Philosophy */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4">
        <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <Compass className="w-5 h-5 text-purple-700" />
          <span>Curriculum Design & CEFR Framework</span>
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed">
          MASAR English Journey is structured into 90 comprehensive lessons organized across 3 progression levels:
          <strong> A1 Beginner (30 lessons)</strong>, <strong>A2 Elementary (30 lessons)</strong>, and <strong>B1 Intermediate (30 lessons)</strong>.
        </p>
        <p className="text-xs text-slate-500 leading-relaxed">
          *Note on CEFR Alignment: The Common European Framework of Reference (CEFR) levels are utilized strictly as instructional guidance to sequence grammar, vocabulary, and linguistic tasks from fundamental to communicative independence. It is not an official accredited testing certification.
        </p>
      </div>

      {/* Meet the MASAR Mascot Family */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-5">
        <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>Meet Your Educational Companions</span>
        </h3>

        {/* Nawras */}
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-purple-50/70 border border-purple-100">
          <Mascot character="nawras" mood="welcome" size={64} className="shrink-0" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900">Nawras · نورس (The Learning Guide)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              A wise, encouraging guide who introduces lesson contexts, explains grammar rules in clear terms, and celebrates student milestones.
            </p>
          </div>
        </div>

        {/* Bayan */}
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-sky-50/70 border border-sky-100">
          <Mascot character="bayan" mood="speaking" size={64} className="shrink-0" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900">Bayan · بيان (The Speaking Partner)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              An expressive dialogue specialist with audio headphones who leads realistic conversation practice, pronunciation challenges, and idiomatic expressions.
            </p>
          </div>
        </div>

        {/* Tareeq */}
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
          <Mascot character="tareeq" mood="streak" size={64} className="shrink-0" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900">Tareeq · طريق (The Challenge Champion)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              An energetic companion who tracks your daily streaks, introduces interactive quizzes, and awards milestone achievement medals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
