'use client';

import React from 'react';

interface LoanAmountOption {
  value: string;
  label: string;
}

interface LoanAmountSelectorProps {
  options: LoanAmountOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  name?: string;
}

const LoanAmountSelector: React.FC<LoanAmountSelectorProps> = ({
  options,
  value,
  onValueChange,
  name = 'loan-amount',
}) => {
  const handleChange = (optionValue: string) => {
    onValueChange?.(optionValue);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {options.map((option) => {
        const isSelected = value === option.value;
        const inputId = `${name}-${option.value}`;

        return (
          <label
            key={option.value}
            htmlFor={inputId}
            className={`
              relative flex items-center justify-center
              px-4 py-3 sm:px-6 sm:py-4
              border-2 rounded-xl
              cursor-pointer
              transition-all duration-200
              bg-white
              ${
                isSelected
                  ? 'border-[#D42C30] bg-red-50 shadow-md scale-[1.02]'
                  : 'border-gray-300 hover:border-gray-400 hover:shadow-md active:scale-[0.98]'
              }
            `}
          >
            <input
              type="radio"
              id={inputId}
              name={name}
              value={option.value}
              checked={isSelected}
              onChange={() => handleChange(option.value)}
              className="sr-only"
            />
            <span
              className={`
                text-sm sm:text-base font-semibold text-center
                ${isSelected ? 'text-[#D42C30]' : 'text-[#171717]'}
                transition-colors duration-200
              `}
            >
              {option.label}
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default LoanAmountSelector;

