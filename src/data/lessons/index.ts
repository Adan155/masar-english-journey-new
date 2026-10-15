import { Lesson, CEFRLevel } from '../../types';
import { A1_LESSONS } from './a1';
import { A2_LESSONS } from './a2';
import { B1_LESSONS } from './b1';

export const ALL_LESSONS: Lesson[] = [
  ...A1_LESSONS,
  ...A2_LESSONS,
  ...B1_LESSONS,
];

// Exact counts verification
export const CURRICULUM_COUNTS = {
  A1: A1_LESSONS.length, // 30
  A2: A2_LESSONS.length, // 30
  B1: B1_LESSONS.length, // 30
  TOTAL: ALL_LESSONS.length, // 90
};

export function getAllLessons(): Lesson[] {
  return ALL_LESSONS;
}

export function getLessonsByLevel(level: CEFRLevel): Lesson[] {
  return ALL_LESSONS.filter((l) => l.level === level);
}

export function getLessonById(id: string): Lesson | undefined {
  return ALL_LESSONS.find((l) => l.id === id);
}

export function getAdjacentLessons(currentId: string): { prevLesson?: Lesson; nextLesson?: Lesson } {
  const index = ALL_LESSONS.findIndex((l) => l.id === currentId);
  if (index === -1) return {};
  return {
    prevLesson: index > 0 ? ALL_LESSONS[index - 1] : undefined,
    nextLesson: index < ALL_LESSONS.length - 1 ? ALL_LESSONS[index + 1] : undefined,
  };
}

/**
 * Normalizes Arabic text for search by removing diacritics (tashkeel),
 * standardizing Alef variants (أ إ آ -> ا), and unifying Yeh/Taa Marbuta.
 */
export function normalizeArabic(text: string): string {
  if (!text) return '';
  return text
    .replace(/[\u064B-\u065F\u0670]/g, '') // Remove tashkeel/diacritics
    .replace(/[أإآ]/g, 'ا') // Normalize Alef
    .replace(/ة/g, 'ه') // Normalize Taa Marbuta
    .replace(/ى/g, 'ي') // Normalize Alif Maqsura
    .toLowerCase()
    .trim();
}

/**
 * Comprehensive multi-lingual search across lessons, vocabulary, grammar, and expressions.
 */
export function searchCurriculum(
  query: string,
  levelFilter: 'ALL' | CEFRLevel = 'ALL'
): { lesson: Lesson; matchedField: string; preview: string }[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const normalizedQueryArabic = normalizeArabic(q);

  const results: { lesson: Lesson; matchedField: string; preview: string }[] = [];

  ALL_LESSONS.forEach((lesson) => {
    if (levelFilter !== 'ALL' && lesson.level !== levelFilter) return;

    // Check title
    if (lesson.title.toLowerCase().includes(q)) {
      results.push({ lesson, matchedField: 'Title', preview: lesson.title });
      return;
    }

    // Check Arabic title
    if (normalizeArabic(lesson.arabicTitle).includes(normalizedQueryArabic)) {
      results.push({ lesson, matchedField: 'Arabic Title', preview: lesson.arabicTitle });
      return;
    }

    // Check Topic
    if (lesson.topic.toLowerCase().includes(q) || normalizeArabic(lesson.arabicTopic).includes(normalizedQueryArabic)) {
      results.push({ lesson, matchedField: 'Topic', preview: `${lesson.topic} - ${lesson.arabicTopic}` });
      return;
    }

    // Check Vocabulary words & meanings
    const matchedVocab = lesson.vocabulary.find(
      (v) =>
        v.word.toLowerCase().includes(q) ||
        normalizeArabic(v.arabicMeaning).includes(normalizedQueryArabic)
    );
    if (matchedVocab) {
      results.push({
        lesson,
        matchedField: 'Vocabulary',
        preview: `${matchedVocab.word} (${matchedVocab.arabicMeaning})`,
      });
      return;
    }

    // Check Grammar title & explanation
    if (
      lesson.grammar.title.toLowerCase().includes(q) ||
      normalizeArabic(lesson.grammar.arabicTitle).includes(normalizedQueryArabic)
    ) {
      results.push({
        lesson,
        matchedField: 'Grammar',
        preview: `${lesson.grammar.title} - ${lesson.grammar.arabicTitle}`,
      });
      return;
    }

    // Check Useful expressions
    const matchedExpr = lesson.usefulExpressions.find(
      (e) =>
        e.english.toLowerCase().includes(q) ||
        normalizeArabic(e.arabic).includes(normalizedQueryArabic)
    );
    if (matchedExpr) {
      results.push({
        lesson,
        matchedField: 'Expression',
        preview: `${matchedExpr.english} - ${matchedExpr.arabic}`,
      });
      return;
    }
  });

  return results;
}
