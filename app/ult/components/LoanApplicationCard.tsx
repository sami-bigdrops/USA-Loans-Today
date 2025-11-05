'use client';

import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@/app/components/ui/Card';
import LoanAmountSelector from './LoanAmountSelector';
import Disclaimer from './Disclaimer';

interface LoanAmountOption {
  value: string;
  label: string;
}

interface LinkItem {
  text: string;
  href: string;
}

interface LoanApplicationCardProps {
  question: string;
  loanAmountOptions: LoanAmountOption[];
  selectedAmount?: string;
  onAmountChange?: (value: string) => void;
  disclaimerText: string;
  disclaimerLinks: LinkItem[];
}

const LoanApplicationCard: React.FC<LoanApplicationCardProps> = ({
  question,
  loanAmountOptions,
  selectedAmount,
  onAmountChange,
  disclaimerText,
  disclaimerLinks,
}) => {
  return (
    <Card className="w-full max-w-[750px] mx-auto shadow-2xl">
      <CardHeader className="border-b border-gray-200 pb-4 sm:pb-5">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#171717] text-center">
          {question}
        </h2>
      </CardHeader>

      <CardBody className="py-6 sm:py-8">
        <LoanAmountSelector
          options={loanAmountOptions}
          value={selectedAmount}
          onValueChange={onAmountChange}
        />
      </CardBody>

      <CardFooter className="bg-gray-50 pt-4 sm:pt-5 pb-4 sm:pb-5 border-t border-gray-200">
        <Disclaimer text={disclaimerText} links={disclaimerLinks} />
      </CardFooter>
    </Card>
  );
};

export default LoanApplicationCard;

