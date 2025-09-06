import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_API_KEY, GEMINI_MODEL_TEXT } from '../constants';
import { GeminiSurahFeedback, GroundingChunk } from '../types';

let ai: GoogleGenAI | null = null;

const getAiInstance = (): GoogleGenAI | null => {
  if (!GEMINI_API_KEY) {
    console.error("Gemini API key is not configured.");
    // In a real app, you might throw an error or handle this more gracefully.
    // For this example, we'll return null and let the caller handle it.
    return null; 
  }
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  }
  return ai;
};


export const generateSurahFeedback = async (surahName: string, lang: string): Promise<GeminiSurahFeedback | null> => {
  const currentAi = getAiInstance();
  if (!currentAi) {
    return { encouragement: "Great effort on memorizing! Keep up the wonderful work. (Unable to load quiz right now)", quiz: undefined };
  }
  
  const languageMap: Record<string, string> = {
      en: 'English',
      fr: 'French',
      ar: 'Arabic',
  };
  const responseLanguage = languageMap[lang] || 'English';


  const prompt = `You are a friendly and encouraging Islamic teacher for young children (around 5-10 years old).
A child has just tried to memorize Surah ${surahName}.
Please provide your entire response in ${responseLanguage}.
1. A short, very positive, and encouraging message for the child. Make it specific to their effort in memorizing the Quran.
2. One simple multiple-choice quiz question about a key theme, word, or very basic meaning from Surah ${surahName}. The question and options should be extremely simple for a young child. Provide 3 options (A, B, C) and indicate the correct answer letter.

Format the response strictly as JSON:
\`\`\`json
{
  "encouragement": "Your encouraging message here...",
  "quiz": {
    "question": "Your simple quiz question here...",
    "options": ["Option A", "Option B", "Option C"],
    "answer": "A" 
  }
}
\`\`\`
Example for Surah Al-Ikhlas in English:
\`\`\`json
{
  "encouragement": "Masha'Allah! You did so well trying to memorize Surah Al-Ikhlas! Allah loves it when you learn His words!",
  "quiz": {
    "question": "Surah Al-Ikhlas tells us that Allah is...?",
    "options": ["One", "Many", "A storybook"],
    "answer": "A"
  }
}
\`\`\`
`;

  try {
    const response: GenerateContentResponse = await currentAi.models.generateContent({
      model: GEMINI_MODEL_TEXT,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.7, // Moderately creative for encouragement
      }
    });
    
    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    const parsedData: GeminiSurahFeedback = JSON.parse(jsonStr);
    return parsedData;

  } catch (error) {
    console.error("Error generating Surah feedback from Gemini:", error);
    return { encouragement: "Amazing job on your recitation! You're doing wonderfully! (Quiz is unavailable at the moment)", quiz: undefined };
  }
};


export const getSimpleAnswer = async (topic: string, question: string, lang: string): Promise<{answer: string, sources: GroundingChunk[] | undefined }> => {
  const currentAi = getAiInstance();
   if (!currentAi) {
    return { answer: "I'm sorry, I can't answer right now. Please check your API key or try again later.", sources: undefined };
  }

  const languageMap: Record<string, string> = {
      en: 'English',
      fr: 'French',
      ar: 'Arabic',
  };
  const responseLanguage = languageMap[lang] || 'English';

  const prompt = `You are a friendly Islamic teacher for kids (ages 5-10).
Answer this question about ${topic} in a very simple, short, and easy-to-understand way.
Please provide your response in ${responseLanguage}.
The question is: "${question}".
If the question is about recent events or needs up-to-date information, use Google Search.
Focus on being clear and gentle.`;

  try {
    const response: GenerateContentResponse = await currentAi.models.generateContent({
      model: GEMINI_MODEL_TEXT,
      contents: prompt,
      config: {
        // Only add googleSearch if it's likely to be needed for recency.
        // For general Wudu/Salah questions, it might not be necessary.
        // Example: if (question.toLowerCase().includes("today") || question.toLowerCase().includes("recent")) 
        // tools: [{googleSearch: {}}], 
        temperature: 0.5,
      }
    });
    
    const answer = response.text;
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    const sources = groundingMetadata?.groundingChunks as GroundingChunk[] | undefined;

    return { answer, sources };

  } catch (error) {
    console.error("Error getting simple answer from Gemini:", error);
    return { answer: "Oops! I had a little trouble thinking of an answer. Maybe ask an adult or try again?", sources: undefined };
  }
};