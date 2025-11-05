'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import LoanApplicationCard from './components/LoanApplicationCard';
import { HERO_SECTION } from '@/app/utils/Constant';

const STORAGE_KEY = 'usa-loans-selected-amount';

const Hero = () => {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState<string | undefined>(undefined);

  const handleAmountChange = (value: string) => {
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, value);
    }
    // Clear the selected state immediately (don't show as selected)
    setSelectedAmount(undefined);
    // Navigate to form page after selecting amount
    router.push('/form');
  };

  return (
    <section className="relative max-h-[700px] flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_SECTION.backgroundImage}
          alt="Hero Background"
          fill
          priority
          quality={90}
          objectFit="cover"
          objectPosition="center"
          className="object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-8 sm:mb-12 lg:mb-16 px-4">
          {HERO_SECTION.title}
        </h1>

        {/* Loan Application Card */}
        <LoanApplicationCard
          question={HERO_SECTION.question}
          loanAmountOptions={HERO_SECTION.loanAmountOptions}
          selectedAmount={selectedAmount}
          onAmountChange={handleAmountChange}
          disclaimerText={HERO_SECTION.disclaimerText}
          disclaimerLinks={HERO_SECTION.disclaimerLinks}
        />
      </div>
    </section>
  );
};

export default Hero;
