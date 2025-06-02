import React from 'react';
import { useCurrency } from '../../context/CurrencyContext';

const CurrencySwitcher: React.FC = () => {
  const { currentCurrency, changeCurrency } = useCurrency();

  return (
    <select
      value={currentCurrency}
      onChange={(e) => changeCurrency(e.target.value)}
      className="bg-transparent text-white border border-primary-700 rounded px-2 py-1 focus:outline-none focus:border-secondary-500"
    >
      <option value="USD" className="bg-primary-900">USD</option>
      <option value="AZN" className="bg-primary-900">AZN</option>
    </select>
  );
};

export default CurrencySwitcher;