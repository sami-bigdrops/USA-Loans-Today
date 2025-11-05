'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CALCULATOR_SECTION } from '@/app/utils/Constant';

interface CalculatorProps {
  onOpenModal?: () => void;
}

const Calculator: React.FC<CalculatorProps> = ({ onOpenModal }) => {
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [loanPeriod, setLoanPeriod] = useState<string>('');
  const [apr, setApr] = useState<string>('');
  const [results, setResults] = useState<{
    monthlyPayment: number;
    totalPayback: number;
  } | null>(null);

  // Calculate loan payment using standard amortization formula
  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const months = parseFloat(loanPeriod);
    const annualRate = parseFloat(apr);

    if (!principal || !months || !annualRate || principal <= 0 || months <= 0 || annualRate <= 0) {
      alert('Please enter valid values for all fields.');
      return;
    }

    // Monthly interest rate (APR / 12 / 100)
    const monthlyRate = annualRate / 12 / 100;

    // Calculate monthly payment using amortization formula
    // M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayback = monthlyPayment * months;

    setResults({
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalPayback: Math.round(totalPayback * 100) / 100,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateLoan();
  };

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={CALCULATOR_SECTION.backgroundImage}
          alt="Calculator Background"
          fill
          className="object-cover opacity-40"
          priority={false}
          quality={90}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 sm:mb-12 lg:mb-16">
          <span className="text-[#D42C30]">{CALCULATOR_SECTION.title}</span>
        </h2>

        {/* Calculator Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-300 overflow-hidden max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Side - Input Form */}
            <div className="bg-white p-6 sm:p-8 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Loan Amount */}
                <div>
                  <label
                    htmlFor="loanAmount"
                    className="block text-sm font-semibold text-[--text] mb-2"
                  >
                    Loan Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      id="loanAmount"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder="0"
                      min="0"
                      step="0.01"
                      className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#D42C30] focus:outline-none transition-colors duration-200 text-[--text] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      required
                    />
                  </div>
                </div>

                {/* Loan Period */}
                <div>
                  <label
                    htmlFor="loanPeriod"
                    className="block text-sm font-semibold text-[--text] mb-2"
                  >
                    Loan Period (in Months)
                  </label>
                  <input
                    type="number"
                    id="loanPeriod"
                    value={loanPeriod}
                    onChange={(e) => setLoanPeriod(e.target.value)}
                    placeholder="0"
                    min="1"
                    step="1"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#D42C30] focus:outline-none transition-colors duration-200 text-[--text] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    required
                  />
                </div>

                {/* APR */}
                <div>
                  <label
                    htmlFor="apr"
                    className="block text-sm font-semibold text-[--text] mb-2"
                  >
                    Annual Percentage Rate (APR)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="apr"
                      value={apr}
                      onChange={(e) => setApr(e.target.value)}
                      placeholder="0"
                      min="0"
                      max="100"
                      step="0.01"
                      className="w-full pr-8 pl-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#D42C30] focus:outline-none transition-colors duration-200 text-[--text] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      required
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>

                {/* Calculate Button */}
                <button
                  type="submit"
                  className="w-full bg-[#313863] hover:bg-[#252C4F] text-white font-semibold py-3.5 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Calculate
                </button>
              </form>
            </div>

            {/* Right Side - Results Display */}
            <div className="bg-gray-50 p-6 sm:p-8 lg:p-10 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-gray-200">
              {results ? (
                <div className="w-full">
                  <h3 className="text-xl sm:text-2xl font-bold text-[--text] mb-4 sm:mb-6">
                    Your Calculation Results
                  </h3>
                  <div className="bg-white rounded-lg p-5 sm:p-6 shadow-md">
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      If you borrowed{' '}
                      <span className="font-bold text-[#D42C30]">${parseFloat(loanAmount).toLocaleString()}</span>{' '}
                      over a{' '}
                      <span className="font-bold text-[#D42C30]">{loanPeriod}-month period</span>{' '}
                      and the loan had a{' '}
                      <span className="font-bold text-[#D42C30]">{apr}% APR</span>, your monthly repayments would be{' '}
                      <span className="font-bold text-[#D42C30]">${results.monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>, with a total payback amount of{' '}
                      <span className="font-bold text-[#D42C30]">${results.totalPayback.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <h3 className="text-xl sm:text-2xl font-bold text-[--text] mb-4 sm:mb-6">
                    Example Calculation
                  </h3>
                  <div className="bg-white rounded-lg p-5 sm:p-6 shadow-md">
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      If you borrowed{' '}
                      <span className="font-bold text-[#D42C30]">$2,500</span>{' '}
                      over a{' '}
                      <span className="font-bold text-[#D42C30]">12-month period</span>{' '}
                      and the loan had a{' '}
                      <span className="font-bold text-[#D42C30]">28% APR</span>, your monthly repayments would be{' '}
                      <span className="font-bold text-[#D42C30]">$241.26</span>, with a total payback amount of{' '}
                      <span className="font-bold text-[#D42C30]">$2,895.18</span>.
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    Enter your loan details and click Calculate to see your personalized results
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-8 sm:mt-10 lg:mt-12">
          <button
            onClick={onOpenModal}
            className="inline-block bg-[#D42C30] text-white font-semibold py-3.5 sm:py-4 lg:py-4 px-8 sm:px-10 lg:px-10 rounded-lg hover:bg-[#B0262A] transition-colors duration-200 shadow-md hover:shadow-lg text-sm sm:text-base"
          >
            {CALCULATOR_SECTION.ctaButton.text}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
