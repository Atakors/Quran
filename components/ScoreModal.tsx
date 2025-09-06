import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SurahFeedback } from '../types';
import { SparklesIcon, XCircleIcon } from './IconComponents';

interface ScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  surahName: string;
  feedbackPromise: Promise<SurahFeedback | null> | null; 
}

const ScoreModal: React.FC<ScoreModalProps> = ({ isOpen, onClose, score, surahName, feedbackPromise }) => {
  const { t } = useTranslation();
  const [feedback, setFeedback] = useState<SurahFeedback | null>(null);
  
  useEffect(() => {
    if (isOpen && feedbackPromise) {
      feedbackPromise
        .then(data => {
          setFeedback(data);
        })
        .catch(() => {
          // Fallback static message in case of error
          setFeedback({ encouragement: "Great effort! Keep practicing!" });
        });
    }
  }, [isOpen, feedbackPromise]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="bg-gradient-to-br from-sky-100 via-emerald-50 to-yellow-50 p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto text-center relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <XCircleIcon className="w-8 h-8" />
        </button>

        <SparklesIcon className="w-16 h-16 text-amber-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-teal-600 mb-2">{t('scoreModal.title')}</h2>
        <p className="text-lg text-gray-700 mb-4">{t('scoreModal.completed', { surahName })}</p>
        
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <p className="text-xl font-semibold text-gray-700">{t('scoreModal.yourScore')}</p>
            <p className={`text-5xl font-bold my-2 ${score >= 70 ? 'text-green-500' : 'text-orange-500'}`}>
            {score}%
            </p>
        </div>
        
        {feedback && (
          <div className="mt-4 text-left p-4 bg-teal-50 rounded-lg">
            <h3 className="text-xl font-semibold text-teal-700 mb-2">{t('scoreModal.messageTitle')}</h3>
            <p className="text-gray-700 italic">"{feedback.encouragement}"</p>
          </div>
        )}
        
        <button 
            onClick={onClose} 
            className="mt-8 w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg"
        >
            {t('scoreModal.continue')}
        </button>
      </div>
    </div>
  );
};

export default ScoreModal;
