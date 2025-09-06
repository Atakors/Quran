
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Ayah } from '../types';
import useSpeechRecognition from '../hooks/useSpeechRecognition';
import { MicrophoneIcon, CheckIcon, XCircleIcon } from './IconComponents';
import LoadingSpinner from './LoadingSpinner';
import { normalizeArabicText } from '../constants';

interface AyahDisplayProps {
  ayah: Ayah;
  onAyahRecited: (ayahId: number, isCorrect: boolean) => void;
  isCurrentAyah: boolean;
  isCompleted: boolean;
}

const AyahDisplay: React.FC<AyahDisplayProps> = ({ ayah, onAyahRecited, isCurrentAyah, isCompleted }) => {
  const { t } = useTranslation();
  const { isListening, transcript, interimTranscript, error, startListening, stopListening, isSupported, resetTranscript } = useSpeechRecognition();
  const [recitationStatus, setRecitationStatus] = useState<'idle' | 'correct' | 'incorrect' | 'processing'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  const simpleArabicSimilarity = useCallback((text1: string, text2: string): number => {
    const normalized1 = normalizeArabicText(text1).split(/\s+/).filter(w => w.length > 0);
    const normalized2 = normalizeArabicText(text2).split(/\s+/).filter(w => w.length > 0);
    
    if (normalized1.length === 0 || normalized2.length === 0) return 0;

    const matches = normalized1.filter(word => normalized2.includes(word)).length;
    // Consider a match if at least 70% of the *shorter* text's words are present in the longer one.
    // This is a very basic heuristic.
    const similarity = matches / Math.min(normalized1.length, normalized2.length); 
    return similarity;
  }, []);


  useEffect(() => {
    if (!isListening && transcript && recitationStatus !== 'correct' && recitationStatus !== 'incorrect') {
      setRecitationStatus('processing');
      const similarity = simpleArabicSimilarity(ayah.arabic, transcript);
      
      if (similarity >= 0.6) { // Adjust threshold as needed
        setRecitationStatus('correct');
        setFeedbackMessage(t('ayahDisplay.feedbackCorrect'));
        onAyahRecited(ayah.id, true);
      } else {
        setRecitationStatus('incorrect');
        setFeedbackMessage(t('ayahDisplay.feedbackIncorrect'));
        onAyahRecited(ayah.id, false);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListening, transcript, ayah, onAyahRecited, simpleArabicSimilarity, t]);

  useEffect(() => {
    if(isCompleted) {
        setRecitationStatus('correct'); // Assume completed means correctly recited before
    } else if (isCurrentAyah) {
        setRecitationStatus('idle');
        resetTranscript();
        setFeedbackMessage('');
    } else {
        // If not current and not completed, could be idle or incorrect from previous attempt
        // For simplicity, reset to idle if it's not the active Ayah for recitation
         if (recitationStatus !== 'correct') setRecitationStatus('idle');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCurrentAyah, isCompleted, ayah.id]);


  const handleReciteClick = () => {
    if (!isSupported) {
      setFeedbackMessage(t('ayahDisplay.unsupported'));
      return;
    }
    if (isListening) {
      stopListening();
    } else {
      setRecitationStatus('idle');
      resetTranscript();
      setFeedbackMessage('');
      startListening();
    }
  };
  
  const getBorderColor = () => {
    if (!isCurrentAyah && !isCompleted && recitationStatus !== 'correct') return 'border-gray-300';
    if (isListening || recitationStatus === 'processing') return 'border-sky-500 animate-pulse';
    if (recitationStatus === 'correct' || isCompleted) return 'border-green-500';
    if (recitationStatus === 'incorrect') return 'border-red-500';
    return 'border-gray-300';
  };

  const recognizedWords = useMemo(() => {
    if (!isListening || !interimTranscript) {
      return new Set<string>();
    }
    const normalizedWords = normalizeArabicText(interimTranscript)
      .split(/\s+/)
      .filter(w => w.length > 0);
    return new Set(normalizedWords);
  }, [interimTranscript, isListening]);

  const renderHighlightedAyah = useCallback(() => {
    // Split by spaces while keeping the spaces, crucial for layout
    return ayah.arabic.split(/(\s+)/).map((segment, index) => {
      if (/\s+/.test(segment)) {
        return <span key={index}>{segment}</span>; // Return whitespace as is
      }
      const normalizedWord = normalizeArabicText(segment);
      const isRecognized = recognizedWords.has(normalizedWord);
      return (
        <span
          key={index}
          className={isRecognized ? 'bg-teal-200/60 rounded px-1 transition-all' : 'transition-all'}
        >
          {segment}
        </span>
      );
    });
  }, [ayah.arabic, recognizedWords]);


  return (
    <div className={`p-4 md:p-6 mb-4 bg-white shadow-lg rounded-xl border-2 transition-all duration-300 ${getBorderColor()}`}>
      <p className="text-2xl md:text-3xl text-right text-teal-700 mb-3 leading-relaxed" dir="rtl" lang="ar">
        {isListening ? renderHighlightedAyah() : ayah.arabic}
        <span className="text-sm text-amber-500 ms-2">({ayah.id})</span>
      </p>
      <p className="text-sm text-gray-500 mb-4 text-left" dir="ltr">
        {ayah.english}
      </p>

      {isCurrentAyah && !isCompleted && (
        <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={handleReciteClick}
            disabled={!isSupported || recitationStatus === 'processing'}
            className={`px-6 py-3 rounded-lg font-semibold text-white flex items-center justify-center transition-colors
              ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-teal-500 hover:bg-teal-600'}
              ${!isSupported ? 'bg-gray-400 cursor-not-allowed' : ''}`}
          >
            <MicrophoneIcon className="w-5 h-5 me-2" />
            {isListening ? t('ayahDisplay.listening') : (recitationStatus === 'processing' ? t('ayahDisplay.processing') : t('ayahDisplay.reciteAyah'))}
          </button>
          
          {recitationStatus === 'processing' && <LoadingSpinner size="sm" color="text-teal-500" />}
        </div>
      )}
      
      {isListening && (
        <div className="mt-4 p-3 bg-sky-50/50 rounded-lg border border-sky-200">
            <p className="text-xl text-right text-gray-500 font-sans" dir="rtl">
                {interimTranscript || <span className="italic text-gray-400">{t('ayahDisplay.speakNow')}</span>}
            </p>
        </div>
      )}


      {error && <p className="text-red-500 text-sm mt-2">Error: {error}</p>}
      {feedbackMessage && recitationStatus !== 'processing' && (
        <div className={`mt-3 p-3 rounded-md text-sm flex items-center ${recitationStatus === 'correct' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {recitationStatus === 'correct' ? <CheckIcon className="w-5 h-5 me-2" /> : <XCircleIcon className="w-5 h-5 me-2" />}
          {feedbackMessage}
        </div>
      )}
       {transcript && isCurrentAyah && recitationStatus !== 'processing' && (
        <p className="mt-2 text-sm text-gray-500 text-right" dir="rtl">{t('ayahDisplay.youSaid', { transcript })}</p>
      )}
      {(isCompleted || recitationStatus === 'correct') && !isCurrentAyah && (
         <div className="mt-2 text-green-600 font-semibold flex items-center">
            <CheckIcon className="w-5 h-5 me-1" /> {t('ayahDisplay.memorized')}
         </div>
      )}
    </div>
  );
};

export default AyahDisplay;
