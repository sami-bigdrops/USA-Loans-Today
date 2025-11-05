'use client';

import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { FAQ_SECTION } from '@/app/utils/Constant';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 sm:mb-12 lg:mb-16">
          <span className="text-[--blue]">{FAQ_SECTION.title.prefix} </span>
          <span className="text-[#D42C30]">{FAQ_SECTION.title.highlight}</span>
        </h2>

        {/* FAQ Accordion */}
        <div className="space-y-4 mb-12">
          {FAQ_SECTION.items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border-2 border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-gray-300"
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between p-4 sm:p-6 bg-white text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-[--text] pr-4">
                    {item.question}
                  </h3>
                  <div className="shrink-0">
                    {isOpen ? (
                      <LucideIcons.X
                        size={24}
                        className="text-[#D42C30]"
                      />
                    ) : (
                      <LucideIcons.Plus
                        size={24}
                        className="text-[#D42C30]"
                      />
                    )}
                  </div>
                </button>

                {/* Answer Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 bg-gray-50">
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed pt-2">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
