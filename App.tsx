import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import QuranMemorizationPage from './components/QuranMemorizationPage';
import WuduGuidePage from './components/WuduGuidePage';
import PrayerGuidePage from './components/PrayerGuidePage';
import ProgressPage from './components/ProgressPage';
import { NavigationTab } from './types';

// FIX: Removed unused `react-router-dom` components that were causing import errors.
// The app's navigation is handled by component state, so URL-based routing components
// like HashRouter, Routes, Route, and Navigate were redundant.
const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<NavigationTab>(NavigationTab.Quran);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.dir(i18n.language);
  }, [i18n, i18n.language]);

  const handleTabChange = (tab: NavigationTab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case NavigationTab.Quran:
        return <QuranMemorizationPage />;
      case NavigationTab.Wudu:
        return <WuduGuidePage />;
      case NavigationTab.Prayer:
        return <PrayerGuidePage />;
      case NavigationTab.Progress:
        return <ProgressPage />;
      default:
        return <QuranMemorizationPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-100 via-emerald-50 to-yellow-50">
      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <footer className="bg-gray-800 text-white text-center p-4 text-sm">
        <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        <p>{t('footer.apiKeyNote')}</p>
      </footer>
    </div>
  );
};

export default App;