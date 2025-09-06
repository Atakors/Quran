
import { useState, useEffect, useCallback } from 'react';
import { SURAHS_DATA } from '../constants';
import { Surah } from '../types';

export interface MemorizationProgress {
  [surahId: number]: {
    [ayahId: number]: boolean; // true if memorized
  };
}

const PROGRESS_STORAGE_KEY = 'quranKidsProgress';
const PRACTICE_LOG_KEY = 'quranKidsPracticeLog';

// --- Progress Management ---

export const getMemorizationProgress = (): MemorizationProgress => {
  try {
    const savedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
    return savedProgress ? JSON.parse(savedProgress) : {};
  } catch (error) {
    console.error("Failed to parse memorization progress from localStorage", error);
    return {};
  }
};

export const saveMemorizationProgress = (progress: MemorizationProgress) => {
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error("Failed to save memorization progress to localStorage", error);
  }
};

// --- Practice Log & Streak Management ---

const getPracticeLog = (): string[] => {
  try {
    const savedLog = localStorage.getItem(PRACTICE_LOG_KEY);
    return savedLog ? JSON.parse(savedLog) : [];
  } catch (error) {
    console.error("Failed to parse practice log from localStorage", error);
    return [];
  }
};

const savePracticeLog = (dates: string[]) => {
  try {
    // Keep only unique dates and sort them
    const uniqueSortedDates = [...new Set(dates)].sort();
    localStorage.setItem(PRACTICE_LOG_KEY, JSON.stringify(uniqueSortedDates));
  } catch (error) {
    console.error("Failed to save practice log to localStorage", error);
  }
};

export const logPracticeToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().split('T')[0];

  const log = getPracticeLog();
  if (!log.includes(todayStr)) {
    log.push(todayStr);
    savePracticeLog(log);
  }
};

export const calculateStreak = (): number => {
    const log = getPracticeLog();
    const practiceDates = new Set(log);

    if (practiceDates.size === 0) return 0;

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayStr = today.toISOString().split('T')[0];
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let currentDate = new Date(today);
    // Streak is current only if they practiced today or yesterday
    if (!practiceDates.has(todayStr) && !practiceDates.has(yesterdayStr)) {
        return 0;
    }

    // If they haven't practiced today, start checking from yesterday.
    if (!practiceDates.has(todayStr)) {
      currentDate.setDate(currentDate.getDate() - 1);
    }
    
    while (true) {
        const dateStr = currentDate.toISOString().split('T')[0];
        if (practiceDates.has(dateStr)) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else {
            break; // Streak broken
        }
    }

    return streak;
};


// --- Chart Data Calculation ---

export interface ChartData {
  name: string;
  memorized: number;
  remaining: number;
  total: number;
}

export const getChartData = (): ChartData[] => {
  const progress = getMemorizationProgress();
  return SURAHS_DATA.map((surah: Surah) => {
    const surahProgress = progress[surah.id] || {};
    const memorizedCount = Object.values(surahProgress).filter(isMemorized => isMemorized).length;
    return {
      name: surah.englishName,
      memorized: memorizedCount,
      remaining: surah.ayahs.length - memorizedCount,
      total: surah.ayahs.length,
    };
  });
};

// --- Custom Hook ---

export const useProgress = () => {
    const [streak, setStreak] = useState(0);
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [progress, setProgress] = useState<MemorizationProgress>({});

    const refreshProgress = useCallback(() => {
        setStreak(calculateStreak());
        setChartData(getChartData());
        setProgress(getMemorizationProgress());
    }, []);

    useEffect(() => {
        refreshProgress();
    }, [refreshProgress]);
    
    // Listen for storage changes from other tabs
    useEffect(() => {
        const handleStorageChange = () => {
            refreshProgress();
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [refreshProgress]);

    return { streak, chartData, progress, refreshProgress };
};
