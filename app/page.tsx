'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "@/app/ult/Navbar";
import Hero from "@/app/ult/Hero";
import Steps from "@/app/ult/Steps";
import Choose from "@/app/ult/Choose";
import About from "@/app/ult/About";
import Calculator from "@/app/ult/Calculator";
import FAQ from "@/app/ult/FAQ";
import Footer from "@/app/ult/Footer";
import Modal from "@/app/components/ui/Modal";
import LoanApplicationCard from "@/app/ult/components/LoanApplicationCard";
import { HERO_SECTION } from "@/app/utils/Constant";

const STORAGE_KEY = 'usa-loans-selected-amount';

export default function Home() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<string | undefined>(undefined);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    // Clear selection when opening modal
    setSelectedAmount(undefined);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Clear selection when closing modal
    setSelectedAmount(undefined);
  };

  const handleAmountChange = (value: string) => {
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, value);
    }
    // Clear the selected state immediately
    setSelectedAmount(undefined);
    // After selecting an amount, close modal and navigate to form
    setIsModalOpen(false);
    router.push('/form');
  };

  return (
   <main>
    <Navbar />
    <Hero />
    <Steps />
    <Choose onOpenModal={handleOpenModal} />
    <About onOpenModal={handleOpenModal} />
    <Calculator onOpenModal={handleOpenModal} />
    <FAQ />
    <Footer />

    {/* Form Modal */}
    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
      <LoanApplicationCard
        question={HERO_SECTION.question}
        loanAmountOptions={HERO_SECTION.loanAmountOptions}
        selectedAmount={selectedAmount}
        onAmountChange={handleAmountChange}
        disclaimerText={HERO_SECTION.disclaimerText}
        disclaimerLinks={HERO_SECTION.disclaimerLinks}
      />
    </Modal>
   </main>
  );
}
