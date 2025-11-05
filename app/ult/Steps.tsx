'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';
import { STEPS_SECTION } from '@/app/utils/Constant';

const Steps = () => {
  // Get icon component dynamically
  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{
      size?: number;
      className?: string;
    }>>)[iconName];
    return IconComponent || LucideIcons.FileText;
  };

  return (
    <section className="bg-gray-100 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 lg:mb-16">
          <span className="text-[--text]">{STEPS_SECTION.title.prefix} </span>
          <span className="text-[#D42C30]">{STEPS_SECTION.title.highlight}</span>
        </h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {STEPS_SECTION.steps.map((step, index) => {
            const IconComponent = getIcon(step.icon);

            return (
              <div key={index} className="relative flex flex-col pl-8 sm:pl-12 md:pl-16">
                {/* Large Number */}
                <div className="absolute left-0 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 z-0">
                  <span className="text-7xl sm:text-8xl md:text-9xl lg:text-[180px] font-bold text-gray-200 leading-none select-none">
                    {step.number}
                  </span>
                </div>

                {/* Step Card - Equal Height */}
                <div className="relative z-10 bg-white rounded-xl border border-gray-300 shadow-md p-4 sm:p-5 transition-all duration-200 hover:shadow-lg flex flex-col flex-1 h-full">
                  {/* Icon Container */}
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <div className={`${step.iconBgColor} rounded-full p-2.5 sm:p-3`}>
                      <IconComponent
                        size={32}
                        className={`${step.iconColor} w-8 h-8 sm:w-9 sm:h-9`}
                      />
                    </div>
                  </div>

                  {/* Step Text */}
                  <p className="text-sm sm:text-base font-medium text-[--text] text-center leading-snug flex-1 flex items-center justify-center">
                    {step.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Steps;
