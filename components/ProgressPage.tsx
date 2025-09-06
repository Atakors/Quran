import React from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useProgress, ChartData } from '../hooks/useProgress';
import { ChartBarIcon } from './IconComponents';

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  const { t } = useTranslation();
  if (active && payload && payload.length) {
    const data: ChartData = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-md">
        <p className="font-bold text-teal-700">{label}</p>
        <p className="text-sm text-sky-600">{t('progressPage.tooltipMemorized', { count: data.memorized })}</p>
        <p className="text-sm text-gray-500">{t('progressPage.tooltipRemaining', { count: data.remaining })}</p>
      </div>
    );
  }
  return null;
};

const ProgressPage: React.FC = () => {
    const { t } = useTranslation();
    const { streak, chartData } = useProgress();
    const totalMemorized = chartData.reduce((acc, surah) => acc + surah.memorized, 0);
    const totalAyahs = chartData.reduce((acc, surah) => acc + surah.total, 0);

    return (
        <div className="container mx-auto p-4 md:p-8 max-w-5xl">
            <div className="text-center mb-10">
                <ChartBarIcon className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                <h1 className="text-4xl font-bold text-gray-800">{t('progressPage.title')}</h1>
                <p className="text-lg text-gray-600 mt-2">{t('progressPage.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gradient-to-br from-orange-400 to-amber-500 p-8 rounded-2xl shadow-lg text-white text-center flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-2">{t('progressPage.streakTitle')}</h2>
                    <p className="text-7xl font-extrabold">{streak}</p>
                    <p className="text-xl font-semibold">{streak === 1 ? t('progressPage.day') : t('progressPage.days')}</p>
                    <p className="mt-4 text-amber-100">{streak > 0 ? t('progressPage.streakMessage') : t('progressPage.streakStart')}</p>
                </div>
                <div className="bg-gradient-to-br from-teal-400 to-sky-500 p-8 rounded-2xl shadow-lg text-white text-center flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-2">{t('progressPage.totalMemorizedTitle')}</h2>
                    <p className="text-7xl font-extrabold">{totalMemorized}</p>
                    <p className="text-xl font-semibold">{t('progressPage.totalMemorizedSubtitle', { total: totalAyahs })}</p>
                     <p className="mt-4 text-sky-100">{t('progressPage.totalMemorizedMessage')}</p>
                </div>
            </div>
            
            <div className="bg-white p-4 md:p-8 rounded-2xl shadow-xl">
                 <h2 className="text-2xl md:text-3xl font-bold text-center text-teal-600 mb-6">{t('progressPage.chartTitle')}</h2>
                 {chartData.every(d => d.memorized === 0) ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">{t('progressPage.chartEmpty')}</p>
                    </div>
                 ) : (
                    <div style={{ width: '100%', height: 400 }}>
                        <ResponsiveContainer>
                            <BarChart
                                data={chartData}
                                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                <XAxis dataKey="name" tick={{ fill: '#4A5568' }} />
                                <YAxis allowDecimals={false} tick={{ fill: '#4A5568' }} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(178, 245, 234, 0.4)' }} />
                                <Legend />
                                <Bar dataKey="memorized" stackId="a" fill="#2DD4BF" name={t('progressPage.legendMemorized')} />
                                <Bar dataKey="remaining" stackId="a" fill="#E0F2F1" name={t('progressPage.legendRemaining')} radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                 )}
            </div>
        </div>
    );
};

export default ProgressPage;