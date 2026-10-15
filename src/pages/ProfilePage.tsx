import React, { useState } from 'react';
import {
  User,
  Settings,
  Shield,
  RotateCcw,
  Download,
  Upload,
  Check,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { UserProfile, CEFRLevel } from '../types';
import { Mascot } from '../components/brand/MascotFamily';
import { saveUserProfile, resetAllProgress } from '../services/storage';

interface ProfilePageProps {
  userProfile: UserProfile;
  onProfileUpdated: (updated: UserProfile) => void;
  onNavigateTab: (tab: 'home' | 'pathway' | 'practice' | 'progress' | 'profile') => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  userProfile,
  onProfileUpdated,
  onNavigateTab,
}) => {
  const [displayName, setDisplayName] = useState(userProfile.displayName);
  const [preferredLevel, setPreferredLevel] = useState<CEFRLevel>(userProfile.preferredLevel);
  const [dailyGoal, setDailyGoal] = useState<number>(userProfile.dailyGoalMinutes);
  const [avatarId, setAvatarId] = useState<string>(userProfile.avatarId);
  const [speechSpeed, setSpeechSpeed] = useState<number>(userProfile.speechSpeed || 0.95);
  const [isSaved, setIsSaved] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...userProfile,
      displayName: displayName.trim() || 'Learner',
      preferredLevel,
      dailyGoalMinutes: dailyGoal,
      avatarId,
      speechSpeed,
    };
    saveUserProfile(updated);
    onProfileUpdated(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleResetData = () => {
    const clean = resetAllProgress();
    onProfileUpdated(clean);
    setShowResetConfirm(false);
  };

  const handleExportBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(userProfile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `masar_progress_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && typeof parsed === 'object') {
          saveUserProfile(parsed);
          onProfileUpdated(parsed);
          alert('Backup restored successfully!');
        }
      } catch {
        alert('Invalid backup JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in pb-20">
      {/* Profile Card Top */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-purple-50 border-2 border-purple-200 flex items-center justify-center overflow-hidden">
            <Mascot character={avatarId as 'nawras' | 'bayan' | 'tareeq'} size={90} />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h2 className="text-xl font-extrabold text-slate-900">{userProfile.displayName}</h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-mono">
              Level {userProfile.preferredLevel}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-arabic" dir="rtl">
            طالب مجتهد في رحلة مسار الإنجليزية
          </p>
          <div className="flex items-center justify-center sm:justify-start gap-3 pt-2 text-xs text-slate-600 font-medium">
            <span>🔥 {userProfile.streak} Day Streak</span>
            <span>·</span>
            <span>✨ {userProfile.xp} XP</span>
            <span>·</span>
            <span>📚 {userProfile.completedLessons.length}/90 Done</span>
          </div>
        </div>
      </div>

      {/* Edit Settings Form */}
      <form onSubmit={handleSaveSettings} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-base font-extrabold text-slate-900">Student Preferences · الإعدادات</h3>
          {isSaved && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in">
              <Check className="w-3.5 h-3.5" />
              Settings Saved!
            </span>
          )}
        </div>

        {/* Display Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-600/30"
            placeholder="Enter your name"
          />
        </div>

        {/* Mascot Avatar Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700">Choose Your Companion Guide</label>
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { id: 'nawras', name: 'Nawras (نورس)', role: 'The Learning Guide' },
              { id: 'bayan', name: 'Bayan (بيان)', role: 'The Speaking Partner' },
              { id: 'tareeq', name: 'Tareeq (طريق)', role: 'The Challenge Champion' },
            ].map((char) => (
              <button
                type="button"
                key={char.id}
                onClick={() => setAvatarId(char.id)}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  avatarId === char.id
                    ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-600/20'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                }`}
              >
                <div className="flex justify-center mb-1">
                  <Mascot character={char.id as 'nawras' | 'bayan' | 'tareeq'} size={50} />
                </div>
                <span className="text-xs font-bold text-slate-900 block truncate">{char.name}</span>
                <span className="text-[10px] text-slate-500 block truncate">{char.role}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Preferred Starting Level */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Target Focus Level</label>
          <div className="grid grid-cols-3 gap-2">
            {(['A1', 'A2', 'B1'] as CEFRLevel[]).map((lvl) => (
              <button
                type="button"
                key={lvl}
                onClick={() => setPreferredLevel(lvl)}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  preferredLevel === lvl
                    ? 'bg-purple-700 text-white border-purple-700'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {lvl} {lvl === 'A1' ? 'Beginner' : lvl === 'A2' ? 'Elementary' : 'Intermediate'}
              </button>
            ))}
          </div>
        </div>

        {/* Daily Goal */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Daily Learning Commitment</label>
          <div className="grid grid-cols-4 gap-2">
            {[5, 10, 15, 20].map((mins) => (
              <button
                type="button"
                key={mins}
                onClick={() => setDailyGoal(mins)}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  dailyGoal === mins
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {mins} mins
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm shadow-md shadow-purple-900/20 active:scale-98 transition-all"
        >
          Save Profile Preferences
        </button>
      </form>

      {/* Local Storage Disclosure Notice (As requested in brief Section 15 & 19) */}
      <div className="p-5 rounded-3xl bg-slate-100/90 border border-slate-200 text-slate-600 text-xs space-y-2">
        <div className="flex items-center gap-2 font-bold text-slate-900">
          <Shield className="w-4 h-4 text-purple-700" />
          <span>Local Device Privacy & Storage Policy</span>
        </div>
        <p className="leading-relaxed">
          MASAR English Journey stores your completed lessons, quiz scores, XP, daily streak, and bookmarks
          directly inside your current browser using secure client-side storage. Your personal information is not sold,
          tracked, or uploaded to unauthorized clouds.
        </p>
        <p className="font-arabic text-purple-900 pt-1 border-t border-slate-200" dir="rtl">
          بيانات تقدمك ودروسك مسجلة بأمان على هذا المتصفح/الجهاز محلياً ولا تتطلب حساباً سحابياً لتعمل.
        </p>
      </div>

      {/* Data Backup & Restore */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Data Backup & Portability
        </h4>
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={handleExportBackup}
            className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5"
          >
            <Download className="w-4 h-4 text-purple-700" />
            <span>Export Progress (JSON)</span>
          </button>

          <label className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 cursor-pointer">
            <Upload className="w-4 h-4 text-purple-700" />
            <span>Restore Backup</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportBackup}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Reset Progress Section */}
      <div className="p-5 rounded-3xl bg-rose-50/60 border border-rose-200 space-y-3">
        <div className="flex items-center gap-2 font-bold text-rose-900 text-xs">
          <AlertTriangle className="w-4 h-4 text-rose-600" />
          <span>Reset Learning Progress</span>
        </div>
        <p className="text-xs text-rose-700">
          Resetting will clear all completed lessons, quiz scores, streak, and bookmarks on this device.
        </p>

        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="py-2 px-4 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-100 text-xs font-bold"
          >
            Reset Progress
          </button>
        ) : (
          <div className="p-3 bg-white rounded-2xl border border-rose-300 space-y-2">
            <p className="text-xs font-bold text-rose-900">Are you absolutely sure?</p>
            <div className="flex gap-2">
              <button
                onClick={handleResetData}
                className="py-1.5 px-3 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-700"
              >
                Yes, Reset Everything
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="py-1.5 px-3 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
