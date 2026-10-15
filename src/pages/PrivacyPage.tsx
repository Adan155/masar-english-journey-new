import React from 'react';
import { Shield, EyeOff, Server, Lock, CheckCircle2 } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in pb-16">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Privacy & Data Transparency · سياسة الخصوصية
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-arabic mt-0.5" dir="rtl">
          بيان شفاف حول كيفية تخزين بيانات دراستك وعدم تتبع هويتك الشخصية
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 text-purple-700 font-bold text-sm">
          <Shield className="w-5 h-5" />
          <span>Local Device Storage (No Cloud Login Mandated)</span>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">
          MASAR English Journey is built with a learner-first, privacy-respecting architecture.
          Your completed lessons, streak count, quiz scores, and bookmarked words are saved directly
          within your device's browser using web standard LocalStorage.
        </p>
        <p className="text-xs font-arabic text-slate-600 leading-relaxed" dir="rtl">
          بيانات دراستك وإنجازاتك محفوظة محلياً على جهازك دون الحاجة لإنشاء حساب سحابي أو إدخال بيانات بنكية.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 text-slate-900 font-bold text-sm">
          <Server className="w-5 h-5 text-indigo-600" />
          <span>Aggregate Privacy-Friendly Analytics</span>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">
          As instructed in project governance, MASAR does NOT track personal identity, browser fingerprinting,
          or individual names. When connected to an aggregate analytics service, only high-level anonymous metrics
          (e.g., total visits, lesson completion count, level popularity) are logged to improve educational content.
        </p>
        <ul className="space-y-2 text-xs text-slate-600">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Zero selling or sharing of student data with third-party advertising brokers.</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Complete student data portability (export and restore your full JSON backup anytime).</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Complete right to reset all local progress with a single click.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
