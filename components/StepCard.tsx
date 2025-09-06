import React from 'react';
import { useTranslation } from 'react-i18next';
import { Step } from '../types';

interface StepCardProps {
  step: Step;
  stepNumber: number;
  totalSteps: number;
}

const StepCard: React.FC<StepCardProps> = ({ step, stepNumber }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white shadow-xl rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105">
      {step.imageUrl && (
        <img 
            src={step.imageUrl} 
            alt={step.title} 
            className="w-full h-48 object-cover"
            onError={(e) => (e.currentTarget.src = 'https://picsum.photos/300/200?grayscale')} // Fallback image
        />
      )}
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold text-teal-700">{step.title}</h3>
            <span className="text-sm font-semibold bg-sky-100 text-sky-700 py-1 px-3 rounded-full">
                {t('stepCard.step', { stepNumber })}
            </span>
        </div>
        <p className="text-gray-600 leading-relaxed">{step.description}</p>
      </div>
    </div>
  );
};

export default StepCard;