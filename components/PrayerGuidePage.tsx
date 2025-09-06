import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PRAYER_STEPS_FAJR } from '../constants'; // Using Fajr as an example
import StepCard from './StepCard';
import { ChevronLeftIcon, ChevronRightIcon, PrayingHandsIcon } from './IconComponents';

const PrayerGuidePage: React.FC = () => {
  const { t } = useTranslation();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // For simplicity, this guide shows Fajr prayer. A real app might have selectors for different prayers.
  const prayerSteps = PRAYER_STEPS_FAJR;

  const nextStep = () => {
    setCurrentStepIndex((prevIndex) => (prevIndex + 1) % prayerSteps.length);
  };

  const prevStep = () => {
    setCurrentStepIndex((prevIndex) => (prevIndex - 1 + prayerSteps.length) % prayerSteps.length);
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-3xl">
      <div className="text-center mb-10">
        <PrayingHandsIcon className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-emerald-700">{t('prayerPage.title')}</h1>
        <p className="text-lg text-gray-600 mt-2">{t('prayerPage.subtitle')}</p>
      </div>

      <div className="relative mb-8">
         <div className="overflow-hidden">
           <div 
            className="flex transition-transform duration-500 ease-in-out" 
            style={{ transform: `translateX(-${currentStepIndex * 100}%)` }}
          >
            {prayerSteps.map((step) => (
              <div key={step.id} className="w-full flex-shrink-0 px-2">
                 <StepCard step={step} stepNumber={step.id} totalSteps={prayerSteps.length} />
              </div>
            ))}
          </div>
        </div>
        {prayerSteps.length > 1 && (
            <>
                <button 
                    onClick={prevStep} 
                    className="absolute top-1/2 left-0 md:-left-8 rtl:left-auto rtl:right-0 rtl:md:-right-8 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                    aria-label="Previous step"
                >
                    <ChevronLeftIcon className="w-6 h-6 text-emerald-600 rtl:hidden" />
                    <ChevronRightIcon className="w-6 h-6 text-emerald-600 ltr:hidden" />
                </button>
                <button 
                    onClick={nextStep} 
                    className="absolute top-1/2 right-0 md:-right-8 rtl:right-auto rtl:left-0 rtl:md:-left-8 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                    aria-label="Next step"
                >
                    <ChevronRightIcon className="w-6 h-6 text-emerald-600 rtl:hidden" />
                    <ChevronLeftIcon className="w-6 h-6 text-emerald-600 ltr:hidden" />
                </button>
            </>
        )}
      </div>
      <div className="mt-6 text-center">
            <p className="text-gray-600">
                {t('prayerPage.step', { current: currentStepIndex + 1, total: prayerSteps.length })}
            </p>
            <div className="flex justify-center mt-2 space-x-1">
                {prayerSteps.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentStepIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentStepIndex ? 'bg-emerald-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'}`}
                        aria-label={`Go to step ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    </div>
  );
};

export default PrayerGuidePage;
