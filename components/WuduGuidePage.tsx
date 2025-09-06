import React, { useState }from 'react';
import { useTranslation } from 'react-i18next';
import { WUDU_STEPS } from '../constants';
import StepCard from './StepCard';
import { ChevronLeftIcon, ChevronRightIcon, WaterDropIcon } from './IconComponents';
import { getSimpleAnswer } from '../services/geminiService';
import { GroundingChunk } from '../types';
import LoadingSpinner from './LoadingSpinner';

const WuduGuidePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [sources, setSources] = useState<GroundingChunk[] | undefined>(undefined);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);

  const nextStep = () => {
    setCurrentStepIndex((prevIndex) => (prevIndex + 1) % WUDU_STEPS.length);
  };

  const prevStep = () => {
    setCurrentStepIndex((prevIndex) => (prevIndex - 1 + WUDU_STEPS.length) % WUDU_STEPS.length);
  };

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setIsLoadingAnswer(true);
    setAnswer('');
    setSources(undefined);
    const result = await getSimpleAnswer("Wudu", question, i18n.language);
    setAnswer(result.answer);
    setSources(result.sources);
    setIsLoadingAnswer(false);
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-3xl">
      <div className="text-center mb-10">
        <WaterDropIcon className="w-16 h-16 text-sky-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-sky-700">{t('wuduPage.title')}</h1>
        <p className="text-lg text-gray-600 mt-2">{t('wuduPage.subtitle')}</p>
      </div>

      <div className="relative mb-8">
        <div className="overflow-hidden">
           <div 
            className="flex transition-transform duration-500 ease-in-out" 
            style={{ transform: `translateX(-${currentStepIndex * 100}%)` }}
          >
            {WUDU_STEPS.map((step) => (
              <div key={step.id} className="w-full flex-shrink-0 px-2">
                 <StepCard step={step} stepNumber={step.id} totalSteps={WUDU_STEPS.length} />
              </div>
            ))}
          </div>
        </div>

        {WUDU_STEPS.length > 1 && (
            <>
                <button 
                    onClick={prevStep} 
                    className="absolute top-1/2 left-0 md:-left-8 rtl:left-auto rtl:right-0 rtl:md:-right-8 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                    aria-label="Previous step"
                >
                    <ChevronLeftIcon className="w-6 h-6 text-sky-600 rtl:hidden" />
                    <ChevronRightIcon className="w-6 h-6 text-sky-600 ltr:hidden" />
                </button>
                <button 
                    onClick={nextStep} 
                    className="absolute top-1/2 right-0 md:-right-8 rtl:right-auto rtl:left-0 rtl:md:-left-8 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                    aria-label="Next step"
                >
                    <ChevronRightIcon className="w-6 h-6 text-sky-600 rtl:hidden" />
                     <ChevronLeftIcon className="w-6 h-6 text-sky-600 ltr:hidden" />
                </button>
            </>
        )}
      </div>
        <div className="mt-6 text-center">
            <p className="text-gray-600">
                {t('wuduPage.step', { current: currentStepIndex + 1, total: WUDU_STEPS.length })}
            </p>
            <div className="flex justify-center mt-2 space-x-1">
                {WUDU_STEPS.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentStepIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentStepIndex ? 'bg-sky-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'}`}
                        aria-label={`Go to step ${index + 1}`}
                    />
                ))}
            </div>
        </div>
        
      <div className="mt-12 p-6 bg-sky-50 rounded-lg shadow">
        <h3 className="text-2xl font-semibold text-sky-700 mb-3">{t('wuduPage.questionTitle')}</h3>
        <form onSubmit={handleQuestionSubmit} className="space-y-3">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={t('wuduPage.questionPlaceholder')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
          />
          <button
            type="submit"
            disabled={isLoadingAnswer}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-70"
          >
            {isLoadingAnswer ? <LoadingSpinner size="sm" color="text-white"/> : t('wuduPage.ask')}
          </button>
        </form>
        {isLoadingAnswer && <div className="mt-4 flex justify-center"><LoadingSpinner text={t('wuduPage.thinking')} /></div>}
        {answer && !isLoadingAnswer && (
          <div className="mt-4 p-4 bg-white rounded-md shadow">
            <p className="text-gray-700 whitespace-pre-wrap">{answer}</p>
            {sources && sources.length > 0 && (
              <div className="mt-3 pt-3 border-t">
                <h4 className="text-sm font-semibold text-gray-600">Sources:</h4>
                <ul className="list-disc list-inside text-xs">
                  {sources.map((source, idx) => source.web && (
                    <li key={idx} className="mt-1">
                      <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">
                        {source.web.title || source.web.uri}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WuduGuidePage;