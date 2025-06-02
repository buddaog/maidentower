import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <select
      value={currentLanguage}
      onChange={(e) => changeLanguage(e.target.value)}
      className="bg-transparent text-white border border-primary-700 rounded px-2 py-1 focus:outline-none focus:border-secondary-500"
    >
      <option value="en" className="bg-primary-900">English</option>
      <option value="az" className="bg-primary-900">Azərbaycan</option>
    </select>
  );
};

export default LanguageSwitcher;