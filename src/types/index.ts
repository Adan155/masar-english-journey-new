export type CEFRLevel = 'A1' | 'A2' | 'B1';

export type NavigationTab = 'home' | 'pathway' | 'practice' | 'progress' | 'profile';

export interface VocabularyItem {
  id: string;
  word: string;
  phonetic: string;
  arabicMeaning: string;
  partOfSpeech: string;
  exampleSentence: string;
  arabicExample: string;
}

export interface UsefulExpression {
  english: string;
  arabic: string;
  context: string;
}

export interface CommonMistake {
  incorrect: string;
  correct: string;
  explanation: string;
  arabicExplanation: string;
}

export interface GrammarSection {
  title: string;
  arabicTitle: string;
  explanation: string;
  arabicExplanation: string;
  rules: string[];
  examples: { english: string; arabic: string }[];
  commonMistakes: CommonMistake[];
}

export interface DialogueLine {
  speaker: string;
  arabicRole: string;
  english: string;
  arabic: string;
  avatar: 'nawras' | 'bayan' | 'tareeq' | 'alex' | 'sarah' | 'omar' | 'reem';
}

export type ExerciseType = 'multiple-choice' | 'sentence-completion' | 'matching' | 'word-ordering' | 'error-correction';

export interface PracticeExercise {
  id: string;
  type: ExerciseType;
  prompt: string;
  arabicPrompt: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  arabicExplanation: string;
  sentenceWords?: string[]; // For word ordering
  pairs?: { left: string; right: string }[]; // For matching
}

export interface QuizQuestion {
  id: string;
  question: string;
  arabicQuestion?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  arabicExplanation: string;
}

export interface SpeakingChallenge {
  title: string;
  arabicTitle: string;
  prompt: string;
  arabicContext: string;
  modelAnswer: string;
  arabicModelAnswer: string;
  keyPhrasesToUse: string[];
  pronunciationTips: string[];
}

export interface Lesson {
  id: string;
  number: number;
  level: CEFRLevel;
  title: string;
  arabicTitle: string;
  topic: string;
  arabicTopic: string;
  estimatedMinutes: number;
  learningObjectives: string[];
  arabicObjectives: string[];
  situationContext: string;
  arabicContext: string;
  usefulExpressions: UsefulExpression[];
  vocabulary: VocabularyItem[];
  grammar: GrammarSection;
  dialogue: DialogueLine[];
  interactiveExercises: PracticeExercise[];
  quiz: QuizQuestion[];
  speakingChallenge: SpeakingChallenge;
  reviewSummary: string[];
}

export interface Achievement {
  id: string;
  title: string;
  arabicTitle: string;
  description: string;
  arabicDescription: string;
  iconName: string;
  badgeTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  xpReward: number;
  isUnlocked: boolean;
  unlockedAt?: string;
  category: 'lessons' | 'streak' | 'quiz' | 'level' | 'practice';
}

export interface UserProfile {
  displayName: string;
  preferredLevel: CEFRLevel;
  dailyGoalMinutes: number;
  avatarId: string;
  createdAt: string;
  xp: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  completedLessons: string[]; // lesson ids
  bookmarkedLessons: string[]; // lesson ids
  bookmarkedWords: string[]; // word ids
  unlockedAchievements: string[]; // achievement ids
  quizScores: Record<string, number>; // lessonId -> best score percentage
  studyMinutesToday: number;
  soundEnabled: boolean;
  speechSpeed: number; // 0.75 or 1.0
  onboardingCompleted: boolean;
}

export interface FilterState {
  level: 'ALL' | CEFRLevel;
  status: 'ALL' | 'COMPLETED' | 'IN_PROGRESS' | 'UNSTARTED';
  searchQuery: string;
}
