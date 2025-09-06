import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavigationTab } from '../types';
import { BookOpenIcon, WaterDropIcon, PrayingHandsIcon, ChartBarIcon } from './IconComponents';
import LanguageSwitcher from './LanguageSwitcher';

interface NavbarProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const { t } = useTranslation();

  const navItems = [
    { tab: NavigationTab.Quran, label: t('navbar.quran'), icon: <BookOpenIcon className="w-5 h-5 md:w-6 md:h-6" /> },
    { tab: NavigationTab.Wudu, label: t('navbar.wudu'), icon: <WaterDropIcon className="w-5 h-5 md:w-6 md:h-6" /> },
    { tab: NavigationTab.Prayer, label: t('navbar.prayer'), icon: <PrayingHandsIcon className="w-5 h-5 md:w-6 md:h-6" /> },
    { tab: NavigationTab.Progress, label: t('navbar.progress'), icon: <ChartBarIcon className="w-5 h-5 md:w-6 md:h-6" /> },
  ];

  return (
    <nav className="bg-gradient-to-r from-teal-500 via-emerald-500 to-sky-500 shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
             <img src="https://picsum.photos/seed/logo/40/40" alt="App Logo" className="h-10 w-10 rounded-full me-3 border-2 border-white shadow-sm" />
            <span className="text-white text-xl md:text-2xl font-bold tracking-tight">{t('navbar.title')}</span>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            {navItems.map(item => (
              <button
                key={item.tab}
                onClick={() => onTabChange(item.tab)}
                className={`flex items-center px-3 py-2 md:px-4 md:py-3 rounded-lg text-sm md:text-base font-medium transition-all duration-200 ease-in-out transform hover:scale-105
                  ${activeTab === item.tab 
                    ? 'bg-white text-teal-600 shadow-md' 
                    : 'text-white hover:bg-white/20'
                  }`}
              >
                <div className="me-2">{item.icon}</div>
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
            <div className="hidden sm:block h-8 w-px bg-white/30 mx-2"></div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;