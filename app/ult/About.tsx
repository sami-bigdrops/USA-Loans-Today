'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ABOUT_SECTION } from '@/app/utils/Constant';

interface AboutProps {
  onOpenModal?: () => void;
}

const About: React.FC<AboutProps> = ({ onOpenModal }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 lg:mb-10">
          <span className="text-[--text]">{ABOUT_SECTION.title.prefix} </span>
          <span className="text-[#D42C30]">{ABOUT_SECTION.title.highlight}</span>
        </h2>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-end">
          {/* Left Column - Image */}
          <div className="relative order-first flex flex-col h-full">
            <div className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] min-h-full rounded-2xl overflow-hidden shadow-xl bg-white">
              <Image
                src={ABOUT_SECTION.image}
                alt="Financial assistance"
                fill
                className="object-cover"
                priority={false}
                quality={90}
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="flex flex-col space-y-6 sm:space-y-7 lg:space-y-4 h-full">
            {/* Paragraphs */}
            <div className="space-y-5 sm:space-y-6 lg:space-y-4">
              {/* First Paragraph - Always Visible */}
              <p className="text-base sm:text-lg lg:text-base text-gray-700 leading-relaxed">
                {ABOUT_SECTION.paragraphs[0]}
              </p>

              {/* Show More Button - Only visible when collapsed, only on Mobile/Tablet */}
              {!isExpanded && (
                <button
                  onClick={() => setIsExpanded(true)}
                  className="lg:hidden text-[#D42C30] font-semibold hover:underline transition-all duration-200 text-sm sm:text-base"
                >
                  Show More
                </button>
              )}

              {/* Remaining Paragraphs - Visible based on state or always on desktop */}
              <div 
                className={`lg:block overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 lg:max-h-none lg:opacity-100'
                }`}
              >
                <div className="space-y-5 sm:space-y-6 lg:space-y-4">
                  {ABOUT_SECTION.paragraphs.slice(1).map((paragraph, index) => (
                    <p
                      key={index + 1}
                      className="text-base sm:text-lg lg:text-base text-gray-700 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Show Less Button - Only visible when expanded, only on Mobile/Tablet */}
                {isExpanded && (
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="lg:hidden text-[#D42C30] font-semibold hover:underline transition-all duration-200 text-sm sm:text-base mt-4 sm:mt-5"
                  >
                    Show Less
                  </button>
                )}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-3 sm:pt-4 lg:pt-3">
              <button
                onClick={onOpenModal}
                className="block w-full sm:w-auto text-center bg-[#D42C30] text-white font-semibold py-3.5 sm:py-4 lg:py-4 px-6 sm:px-8 lg:px-7 rounded-lg hover:bg-[#B0262A] transition-colors duration-200 shadow-md hover:shadow-lg text-sm sm:text-base lg:text-md"
              >
                {ABOUT_SECTION.ctaButton.text}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
