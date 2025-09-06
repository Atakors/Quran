import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { SURAHS_DATA, getLocalizedSurahName } from '../constants';
import { Surah, Ayah, SurahFeedback } from '../types';
import AyahDisplay from './AyahDisplay';
import ScoreModal from './ScoreModal';
import { generateSurahFeedback } from '../services/geminiService';
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon } from './IconComponents';
import LoadingSpinner from './LoadingSpinner';
import { getMemorizationProgress, saveMemorizationProgress, logPracticeToday } from '../hooks/useProgress';


const QuranMemorizationPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(SURAHS_DATA[0] || null);
  const [currentAyahIndex, setCurrentAyahIndex] = useState(0);
  const [memorizedAyahs, setMemorizedAyahs] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState(0);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [feedbackPromise, setFeedbackPromise] = useState<Promise<SurahFeedback | null> | null>(null);
  const [isLoadingSurah, setIsLoadingSurah] = useState(false);

  const totalAyahsInSurah = selectedSurah ? selectedSurah.ayahs.length : 0;
  
  // Load progress from localStorage when selectedSurah changes
  useEffect(() => {
    if (selectedSurah) {
        const allProgress = getMemorizationProgress();
        setMemorizedAyahs(allProgress[selectedSurah.id] || {});
    }
  }, [selectedSurah]);


  const calculateScore = useCallback(() => {
    if (!selectedSurah) return 0;
    const correctCount = Object.values(memorizedAyahs).filter(status => status === true).length;
    return totalAyahsInSurah > 0 ? Math.round((correctCount / totalAyahsInSurah) * 100) : 0;
  }, [selectedSurah, memorizedAyahs, totalAyahsInSurah]);

  useEffect(() => {
    setScore(calculateScore());
  }, [memorizedAyahs, calculateScore]);

  const handleSurahChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsLoadingSurah(true);
    const surahId = parseInt(event.target.value);
    const newSurah = SURAHS_DATA.find(s => s.id === surahId) || null;
    
    // Simulate loading
    setTimeout(() => {
      setSelectedSurah(newSurah);
      setCurrentAyahIndex(0);
      setScore(0);
      setIsScoreModalOpen(false);
      setIsLoadingSurah(false);
    }, 500);
  };

  const handleAyahRecited = (ayahId: number, isCorrect: boolean) => {
    setMemorizedAyahs(prev => ({ ...prev, [ayahId]: isCorrect }));

    if (isCorrect && selectedSurah) {
      logPracticeToday();
      const allProgress = getMemorizationProgress();
      const surahProgress = allProgress[selectedSurah.id] || {};
      surahProgress[ayahId] = true; // Only save true (correctly memorized)
      allProgress[selectedSurah.id] = surahProgress;
      saveMemorizationProgress(allProgress);
      // Manually dispatch a storage event so other tabs/components can update
      window.dispatchEvent(new Event('storage'));
    }
  };

  const isCurrentSurahCompleted = () => {
    if (!selectedSurah) return false;
    // Check if all ayahs have an entry in memorizedAyahs (attempted)
    return selectedSurah.ayahs.every(ayah => memorizedAyahs.hasOwnProperty(ayah.id));
  };

  const goToNextAyah = () => {
    if (selectedSurah && currentAyahIndex < totalAyahsInSurah - 1) {
      setCurrentAyahIndex(prev => prev + 1);
    } else if (selectedSurah && currentAyahIndex === totalAyahsInSurah - 1) {
      // Last Ayah, check if all attempted then show score.
      if(isCurrentSurahCompleted()){
        setScore(calculateScore());
        if (selectedSurah) {
            setFeedbackPromise(generateSurahFeedback(getLocalizedSurahName(selectedSurah, i18n.language), i18n.language));
        }
        setIsScoreModalOpen(true);
      } else {
        // If not all ayahs are attempted, cycle back to the first unattempted ayah
        const firstUnattemptedIndex = selectedSurah.ayahs.findIndex(ayah => !memorizedAyahs[ayah.id]);
        if (firstUnattemptedIndex !== -1) {
            setCurrentAyahIndex(firstUnattemptedIndex);
        } else {
            // Should not happen if isCurrentSurahCompleted is false, but as a fallback:
             if (selectedSurah) {
                setFeedbackPromise(generateSurahFeedback(getLocalizedSurahName(selectedSurah, i18n.language), i18n.language));
            }
            setIsScoreModalOpen(true);
        }
      }
    }
  };
  
  const goToPreviousAyah = () => {
    if (currentAyahIndex > 0) {
      setCurrentAyahIndex(prev => prev - 1);
    }
  };

  const currentAyahToDisplay = selectedSurah?.ayahs[currentAyahIndex];

  const allAyahsCorrect = selectedSurah && selectedSurah.ayahs.every(ayah => memorizedAyahs[ayah.id] === true);


  if (!selectedSurah && SURAHS_DATA.length > 0) {
    setSelectedSurah(SURAHS_DATA[0]); // Default to first surah
    return <LoadingSpinner text="Initializing Quran reader..." />;
  }
  if (!selectedSurah && SURAHS_DATA.length === 0) {
      return <div className="p-8 text-center text-red-500">No Surah data available.</div>;
  }


  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl">
      <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-teal-600 mb-2" dir="rtl">
          {selectedSurah?.name}
        </h1>
        <p className="text-center text-lg text-gray-500 mb-6">{selectedSurah ? getLocalizedSurahName(selectedSurah, i18n.language) : ''}</p>

        <div className="mb-6">
          <label htmlFor="surah-select" className="block text-sm font-medium text-gray-700 mb-1">
            {t('quranPage.chooseSurah')}
          </label>
          <select
            id="surah-select"
            value={selectedSurah?.id || ''}
            onChange={handleSurahChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            disabled={isLoadingSurah}
          >
            {SURAHS_DATA.map(surah => (
              <option key={surah.id} value={surah.id}>
                {surah.id}. {surah.name} ({getLocalizedSurahName(surah, i18n.language)})
              </option>
            ))}
          </select>
        </div>
        
        <div className="text-center my-4 p-3 bg-sky-100 rounded-lg">
            <p className="text-teal-700 font-semibold">
                {t('quranPage.progress', { attempted: Object.keys(memorizedAyahs).length, total: totalAyahsInSurah })}
            </p>
            <p className={`text-lg font-bold ${score >= 70 ? 'text-green-600' : 'text-orange-600'}`}>
                {t('quranPage.currentScore', { score })}
            </p>
        </div>
      </div>
      
      {isLoadingSurah && <div className="flex justify-center items-center h-64"><LoadingSpinner text={t('quranPage.loadingSurah')} size="lg" /></div>}

      {!isLoadingSurah && selectedSurah && currentAyahToDisplay && (
        <AyahDisplay
          key={currentAyahToDisplay.id} // Important for re-mount and state reset in AyahDisplay
          ayah={currentAyahToDisplay}
          onAyahRecited={handleAyahRecited}
          isCurrentAyah={true} // This AyahDisplay is always for the current ayah
          isCompleted={memorizedAyahs[currentAyahToDisplay.id] === true}
        />
      )}

      {!isLoadingSurah && selectedSurah && (
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={goToPreviousAyah}
            disabled={currentAyahIndex === 0 || isLoadingSurah}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg flex items-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon className="w-5 h-5 me-2 rtl:hidden" />
            <ChevronRightIcon className="w-5 h-5 ms-2 ltr:hidden" />
            {t('quranPage.previous')}
          </button>
          
          {isCurrentSurahCompleted() && !allAyahsCorrect && !isScoreModalOpen && (
             <button
                onClick={() => {
                    setScore(calculateScore());
                    setFeedbackPromise(generateSurahFeedback(getLocalizedSurahName(selectedSurah, i18n.language), i18n.language));
                    setIsScoreModalOpen(true);
                }}
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center transition-colors"
            >
                <CheckIcon className="w-5 h-5 me-2" /> {t('quranPage.viewScore')}
            </button>
          )}

          <button
            onClick={goToNextAyah}
            disabled={isLoadingSurah || (isCurrentSurahCompleted() && allAyahsCorrect) } // Disable if all correct and completed
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentAyahIndex === totalAyahsInSurah - 1 ? 
                (isCurrentSurahCompleted() ? t('quranPage.finishSurah') : t('quranPage.nextReview')) 
                : t('quranPage.nextAyah')} 
            <ChevronRightIcon className="w-5 h-5 ms-2 rtl:hidden" />
            <ChevronLeftIcon className="w-5 h-5 me-2 ltr:hidden" />
          </button>
        </div>
      )}
      
      {selectedSurah && isScoreModalOpen && (
        <ScoreModal
          isOpen={isScoreModalOpen}
          onClose={() => setIsScoreModalOpen(false)}
          score={score}
          surahName={getLocalizedSurahName(selectedSurah, i18n.language)}
          feedbackPromise={feedbackPromise}
        />
      )}
       <div className="mt-8 text-sm text-gray-500 p-4 bg-yellow-50 rounded-lg shadow">
            <h4 className="font-semibold text-yellow-700">{t('quranPage.tipsTitle')}</h4>
            <ul className="list-disc list-inside ms-4">
                <li>{t('quranPage.tip1')}</li>
                <li>{t('quranPage.tip2')}</li>
                <li>{t('quranPage.tip3')}</li>
                <li>{t('quranPage.tip4')}</li>
            </ul>
        </div>
    </div>
  );
};

export default QuranMemorizationPage;
