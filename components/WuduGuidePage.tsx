import React, { useState }from 'react';
import { useTranslation } from 'react-i18next';
import { WUDU_STEPS } from '../constants';
import StepCard from './StepCard';
import { ChevronLeftIcon, ChevronRightIcon, WaterDropIcon } from './IconComponents';

const WuduGuidePage: React.FC = () => {
  const { t } = useTranslation();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const nextStep = () => {
    setCurrentStepIndex((prevIndex) => (prevIndex + 1) % WUDU_STEPS.length);
  };

  const prevStep = () => {
    setCurrentStepIndex((prevIndex) => (prevIndex - 1 + WUDU_STEPS.length) % WUDU_STEPS.length);
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
    </div>
  );
};

export default WuduGuidePage;
