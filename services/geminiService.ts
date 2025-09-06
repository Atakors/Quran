import { SurahFeedback } from '../types';

/**
 * Generates a simple, non-AI feedback message for completing a Surah.
 * Kept as an async function to maintain compatibility with the component's existing structure.
 * @param surahName - The name of the Surah.
 * @param lang - The current language code.
 * @returns A Promise that resolves to a SurahFeedback object.
 */
export const generateSurahFeedback = async (surahName: string, lang: string): Promise<SurahFeedback | null> => {
  const encouragementMessages: Record<string, string> = {
    en: `Masha'Allah! You did a great job practicing Surah ${surahName}. Keep up the wonderful work!`,
    fr: `Masha'Allah ! Vous avez fait un excellent travail en pratiquant la sourate ${surahName}. Continuez ce merveilleux travail !`,
    ar: `ما شاء الله! لقد قمت بعمل رائع في ممارسة سورة ${surahName}. واصل هذا العمل الرائع!`,
  };

  const message = encouragementMessages[lang] || encouragementMessages['en'];
  
  // Resolve promise immediately with the static message.
  return Promise.resolve({
    encouragement: message,
  });
};
