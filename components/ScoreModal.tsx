import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GeminiSurahFeedback, GeminiQuiz } from '../types';
import { SparklesIcon, CheckIcon, XCircleIcon } from './IconComponents';
import LoadingSpinner from './LoadingSpinner';

interface ScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  surahName: string;
  feedbackPromise: Promise<GeminiSurahFeedback | null> | null; 
}

const ScoreModal: React.FC<ScoreModalProps> = ({ isOpen, onClose, score, surahName, feedbackPromise }) => {
  const { t } = useTranslation();
  const [feedback, setFeedback] = useState<GeminiSurahFeedback | null>(null);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen && feedbackPromise) {
      setIsLoadingFeedback(true);
      setQuizSubmitted(false);
      setSelectedOption(null);
      feedbackPromise
        .then(data => {
          setFeedback(data);
          setIsLoadingFeedback(false);
        })
        .catch(() => {
          setFeedback({ encouragement: "Great effort! Keep practicing!", quiz: undefined });
          setIsLoadingFeedback(false);
        });
    }
  }, [isOpen, feedbackPromise]);

  if (!isOpen) return null;

  const handleOptionSelect = (option: string) => {
    if (!quizSubmitted) {
      setSelectedOption(option);
    }
  };

  const handleSubmitQuiz = () => {
    if (selectedOption) {
      setQuizSubmitted(true);
    }
  };
  
  const isCorrectAnswer = feedback?.quiz && selectedOption === feedback.quiz.answer;

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

        {isLoadingFeedback && <LoadingSpinner text={t('scoreModal.loadingFeedback')} color="text-teal-500" />}
        
        {!isLoadingFeedback && feedback && (
          <div className="mt-4 text-left p-4 bg-teal-50 rounded-lg">
            <h3 className="text-xl font-semibold text-teal-700 mb-2">{t('scoreModal.messageTitle')}</h3>
            <p className="text-gray-700 italic mb-6">"{feedback.encouragement}"</p>

            {feedback.quiz && (
              <div>
                <h3 className="text-xl font-semibold text-teal-700 mb-3">{t('scoreModal.quizTitle')}</h3>
                <p className="text-gray-700 mb-3">{feedback.quiz.question}</p>
                <div className="space-y-2 mb-4">
                  {feedback.quiz.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(option)}
                      disabled={quizSubmitted}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-all
                        ${selectedOption === option ? 'bg-sky-200 border-sky-400 ring-2 ring-sky-300' : 'bg-white hover:bg-sky-50 border-gray-300'}
                        ${quizSubmitted && option === feedback.quiz?.answer ? 'bg-green-200 border-green-400' : ''}
                        ${quizSubmitted && selectedOption === option && option !== feedback.quiz?.answer ? 'bg-red-200 border-red-400' : ''}
                        ${quizSubmitted ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {!quizSubmitted && selectedOption && (
                  <button 
                    onClick={handleSubmitQuiz}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    {t('scoreModal.checkAnswer')}
                  </button>
                )}
                {quizSubmitted && (
                  <div className={`p-3 rounded-md mt-2 text-sm font-medium flex items-center justify-center
                    ${isCorrectAnswer ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {isCorrectAnswer ? <CheckIcon className="w-5 h-5 me-2"/> : <XCircleIcon className="w-5 h-5 me-2"/>}
                    {isCorrectAnswer ? t('scoreModal.correct') : t('scoreModal.incorrect', { answer: feedback.quiz.answer })}
                  </div>
                )}
              </div>
            )}
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