'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FOOTER_SECTION } from '@/app/utils/Constant';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Disclaimer Text */}
        <div className="mb-8 sm:mb-12">
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed text-justify max-w-5xl mx-auto">
            {FOOTER_SECTION.disclaimer}
          </p>
        </div>

        {/* Logo and Company Name */}
        <div className="flex justify-center items-center mb-6 sm:mb-8">
          <Link href="/" className="flex items-center gap-3 sm:gap-4">
            <Image
              src={FOOTER_SECTION.logo}
              alt="USA Loans Today Logo"
              width={180}
              height={40}
              className="h-8 sm:h-10 w-auto"
              priority={false}
            />
          </Link>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
          {FOOTER_SECTION.links.map((link: { text: string; href: string }, index: number) => (
            <React.Fragment key={index}>
              <Link
                href={link.href}
                className="text-[#D42C30] hover:underline font-medium text-sm sm:text-base transition-colors duration-200"
              >
                {link.text}
              </Link>
              {index < FOOTER_SECTION.links.length - 1 && (
                <span className="text-gray-400 hidden sm:inline">|</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-xs sm:text-sm text-gray-600">
            {FOOTER_SECTION.copyright.text}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
