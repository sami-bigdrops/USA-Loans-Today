'use client';

import React from 'react';
import Image from 'next/image';
import * as LucideIcons from 'lucide-react';
import { CHOOSE_SECTION } from '@/app/utils/Constant';

interface ChooseProps {
  onOpenModal?: () => void;
}

const Choose: React.FC<ChooseProps> = ({ onOpenModal }) => {
  // Get icon component dynamically
  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{
      size?: number;
      className?: string;
    }>>)[iconName];
    return IconComponent || LucideIcons.Zap;
  };

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 sm:mb-12 lg:mb-16">
          <span className="text-[--text]">{CHOOSE_SECTION.title.prefix} </span>
          <span className="text-[#D42C30]">{CHOOSE_SECTION.title.highlight}</span>
        </h2>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-end">
          {/* Left Column - Benefits */}
          <div className="flex flex-col space-y-4 sm:space-y-6 lg:space-y-5">
            {CHOOSE_SECTION.benefits.map((benefit, index) => {
              const IconComponent = getIcon(benefit.icon);
              const isLast = index === CHOOSE_SECTION.benefits.length - 1;

              return (
                <div key={index}>
                  <div className="flex gap-3 sm:gap-4 lg:gap-4">
                    {/* Icon */}
                    <div className="shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-11 lg:h-11 rounded-full bg-red-50 flex items-center justify-center">
                        <IconComponent
                          size={24}
                          className="text-[#D42C30] sm:w-6 sm:h-6 lg:w-6 lg:h-6"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-lg font-bold text-[--text] mb-1.5 sm:mb-2 lg:mb-1.5">
                        {benefit.title}
                      </h3>
                      <p className="text-sm sm:text-base lg:text-sm text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                  {/* Divider Line */}
                  {!isLast && (
                    <div className="mt-4 sm:mt-6 lg:mt-5 border-b border-gray-200"></div>
                  )}
                </div>
              );
            })}

            {/* CTA Button */}
            <div className="pt-3 sm:pt-4 lg:pt-3">
              <button
                onClick={onOpenModal}
                className="block w-full sm:w-auto text-center bg-[#D42C30] text-white font-semibold py-3.5 sm:py-4 lg:py-4 px-6 sm:px-8 lg:px-7 rounded-lg hover:bg-[#B0262A] transition-colors duration-200 shadow-md hover:shadow-lg text-sm sm:text-base lg:text-md"
              >
                {CHOOSE_SECTION.ctaButton.text}
              </button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative order-first lg:order-last">
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[450px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={CHOOSE_SECTION.image}
                alt="Happy family"
                fill
                className="object-cover"
                priority={false}
                quality={90}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Choose;
