export interface Ayah {
  id: number;
  arabic: string;
  english: string; // For understanding, not for memorization matching
}

export interface Surah {
  id: number;
  name: string; // Arabic name
  englishName: string; // Transliterated or English common name
  frenchName: string;
  ayahs: Ayah[];
}

export interface Step {
  id: number;
  title: string;
  description: string;
  imageUrl?: string; // Placeholder for illustration
}

export enum NavigationTab {
  Quran = "Quran",
  Wudu = "Wudu",
  Prayer = "Prayer",
  Progress = "Progress",
}

export interface SurahFeedback {
  encouragement: string;
}
