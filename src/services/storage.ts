import { UserProfile, CEFRLevel, Achievement } from '../types';
import { INITIAL_ACHIEVEMENTS } from '../data/achievements';

const STORAGE_KEY = 'masar_english_user_profile_v1';

export function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getDaysDifference(dateStr1: string, dateStr2: string): number {
  if (!dateStr1 || !dateStr2) return 999;
  const d1 = new Date(dateStr1).getTime();
  const d2 = new Date(dateStr2).getTime();
  const diffTime = Math.abs(d2 - d1);
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

const DEFAULT_PROFILE: UserProfile = {
  displayName: 'Learner',
  preferredLevel: 'A1',
  dailyGoalMinutes: 15,
  avatarId: 'nawras',
  createdAt: new Date().toISOString(),
  xp: 0,
  streak: 1,
  lastActiveDate: getTodayDateString(),
  completedLessons: [],
  bookmarkedLessons: [],
  bookmarkedWords: [],
  unlockedAchievements: [],
  quizScores: {},
  studyMinutesToday: 0,
  soundEnabled: true,
  speechSpeed: 0.95,
  onboardingCompleted: false,
};

export function loadUserProfile(): UserProfile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveUserProfile(DEFAULT_PROFILE);
      return DEFAULT_PROFILE;
    }
    const parsed = JSON.parse(raw) as Partial<UserProfile>;
    const merged: UserProfile = {
      ...DEFAULT_PROFILE,
      ...parsed,
    };

    // Update streak logic based on calendar day
    const today = getTodayDateString();
    if (merged.lastActiveDate !== today) {
      const diff = getDaysDifference(merged.lastActiveDate, today);
      if (diff === 1) {
        merged.streak = (merged.streak || 0) + 1;
      } else if (diff > 1) {
        merged.streak = 1;
      }
      merged.lastActiveDate = today;
      merged.studyMinutesToday = 0;
      saveUserProfile(merged);
    }

    return merged;
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveUserProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile to local storage', e);
  }
}

export interface CompletionResult {
  isFirstCompletion: boolean;
  xpEarned: number;
  newAchievements: Achievement[];
  updatedProfile: UserProfile;
}

export function markLessonCompleted(
  lessonId: string,
  level: CEFRLevel,
  quizScorePercent: number = 100
): CompletionResult {
  const profile = loadUserProfile();
  const isFirst = !profile.completedLessons.includes(lessonId);
  let xpEarned = 0;

  if (isFirst) {
    profile.completedLessons.push(lessonId);
    xpEarned += 60; // 60 XP for lesson completion
  }

  // Record best quiz score
  const prevScore = profile.quizScores[lessonId] || 0;
  if (quizScorePercent > prevScore) {
    profile.quizScores[lessonId] = quizScorePercent;
    if (isFirst) {
      xpEarned += Math.round(quizScorePercent * 0.4); // up to 40 XP
    }
  }

  profile.studyMinutesToday = (profile.studyMinutesToday || 0) + 10;
  profile.xp += xpEarned;

  // Check achievements
  const newAchievements: Achievement[] = [];
  INITIAL_ACHIEVEMENTS.forEach((ach) => {
    if (profile.unlockedAchievements.includes(ach.id)) return;

    let unlock = false;
    if (ach.id === 'first-step' && profile.completedLessons.length >= 1) unlock = true;
    if (ach.id === 'five-lessons' && profile.completedLessons.length >= 5) unlock = true;
    if (ach.id === 'ten-lessons' && profile.completedLessons.length >= 10) unlock = true;
    if (ach.id === 'perfect-quiz' && quizScorePercent === 100) unlock = true;
    if (ach.id === 'streak-3' && profile.streak >= 3) unlock = true;
    if (ach.id === 'streak-7' && profile.streak >= 7) unlock = true;
    if (ach.id === 'word-collector' && profile.bookmarkedWords.length >= 5) unlock = true;
    
    // Check level completion
    if (ach.id === 'level-a1-complete') {
      const a1Count = profile.completedLessons.filter((id) => id.includes('masar-a1')).length;
      if (a1Count >= 30) unlock = true;
    }
    if (ach.id === 'level-a2-complete') {
      const a2Count = profile.completedLessons.filter((id) => id.includes('masar-a2')).length;
      if (a2Count >= 30) unlock = true;
    }
    if (ach.id === 'level-b1-complete') {
      const b1Count = profile.completedLessons.filter((id) => id.includes('masar-b1')).length;
      if (b1Count >= 30) unlock = true;
    }
    if (ach.id === 'grand-master-90' && profile.completedLessons.length >= 90) {
      unlock = true;
    }

    if (unlock) {
      profile.unlockedAchievements.push(ach.id);
      profile.xp += ach.xpReward;
      newAchievements.push({ ...ach, isUnlocked: true, unlockedAt: new Date().toISOString() });
    }
  });

  saveUserProfile(profile);
  return {
    isFirstCompletion: isFirst,
    xpEarned,
    newAchievements,
    updatedProfile: profile,
  };
}

export function toggleLessonBookmark(lessonId: string): UserProfile {
  const profile = loadUserProfile();
  const index = profile.bookmarkedLessons.indexOf(lessonId);
  if (index >= 0) {
    profile.bookmarkedLessons.splice(index, 1);
  } else {
    profile.bookmarkedLessons.push(lessonId);
  }
  saveUserProfile(profile);
  return profile;
}

export function toggleWordBookmark(wordId: string): UserProfile {
  const profile = loadUserProfile();
  const index = profile.bookmarkedWords.indexOf(wordId);
  if (index >= 0) {
    profile.bookmarkedWords.splice(index, 1);
  } else {
    profile.bookmarkedWords.push(wordId);
    // Check word collector achievement
    if (profile.bookmarkedWords.length >= 5 && !profile.unlockedAchievements.includes('word-collector')) {
      profile.unlockedAchievements.push('word-collector');
      profile.xp += 80;
    }
  }
  saveUserProfile(profile);
  return profile;
}

export function resetAllProgress(): UserProfile {
  const cleanProfile: UserProfile = {
    ...DEFAULT_PROFILE,
    createdAt: new Date().toISOString(),
    lastActiveDate: getTodayDateString(),
  };
  saveUserProfile(cleanProfile);
  return cleanProfile;
}
