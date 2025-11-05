'use client';

import TrustedForm from '@/app/ult/components/TrustedForm';
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import ProgressBar from '@/app/components/ui/ProgressBar';
import Dropdown from '@/app/components/ui/Dropdown';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/RadioGroup';
import DatePicker from '@/app/components/ui/DatePicker';


const FormPage = () => {
  const TOTAL_STEPS = 38;
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);

  // Calculate progress based on current step
  const calculateProgress = (step: number): number => {
    return Math.round((step / TOTAL_STEPS) * 100);
  };
  const [trustedFormCertUrl, setTrustedFormCertUrl] = useState<string>('');
  const [subid1, setSubid1] = useState<string>('');
  const [subid2, setSubid2] = useState<string>('');
  const [subid3, setSubid3] = useState<string>('');
  const [spendingPurpose, setSpendingPurpose] = useState<string>('');
  const [creditScore, setCreditScore] = useState<string>('');
  const [employmentStatus, setEmploymentStatus] = useState<string>('');
  const [paymentFrequency, setPaymentFrequency] = useState<string>('');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('$ ');
  const [debtAmount, setDebtAmount] = useState<string>('$ ');
  const [nextPayDate, setNextPayDate] = useState<string>('');
  const [secondPayDate, setSecondPayDate] = useState<string>('');
  const [hasCheckingAccount, setHasCheckingAccount] = useState<string>('');
  const [hasDirectDeposit, setHasDirectDeposit] = useState<string>('');
  const [bankAccountDuration, setBankAccountDuration] = useState<string>('');
  const [bankRoutingNumber, setBankRoutingNumber] = useState<string>('');
  const [bankName, setBankName] = useState<string>('');
  const [bankAccountNumber, setBankAccountNumber] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [zipCodeError, setZipCodeError] = useState<string>('');
  const [zipCodeCity, setZipCodeCity] = useState<string>('');
  const [streetAddress, setStreetAddress] = useState<string>('');
  const [homeOwnership, setHomeOwnership] = useState<string>('');
  const [addressDuration, setAddressDuration] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [vehicleStatus, setVehicleStatus] = useState<string>('');
  const [driverLicenseState, setDriverLicenseState] = useState<string>('');
  const [driverLicenseNumber, setDriverLicenseNumber] = useState<string>('');
  const [isMilitaryMember, setIsMilitaryMember] = useState<string>('');
  const [unsecuredDebtAmount, setUnsecuredDebtAmount] = useState<string>('');
  const [employer, setEmployer] = useState<string>('');
  const [employerDuration, setEmployerDuration] = useState<string>('');
  const [occupation, setOccupation] = useState<string>('');
  const [monthlyHousingPayment, setMonthlyHousingPayment] = useState<string>('$ ');
  const [hasFiledBankruptcy, setHasFiledBankruptcy] = useState<string>('');
  const [bankruptcyChapter, setBankruptcyChapter] = useState<string>('');
  const [bankruptcyStatus, setBankruptcyStatus] = useState<string>('');
  const [bankruptcyDischargedInLast2Years, setBankruptcyDischargedInLast2Years] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [birthdate, setBirthdate] = useState<string>('');
  const [homePhoneNumber, setHomePhoneNumber] = useState<string>('');
  const [workPhoneNumber, setWorkPhoneNumber] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [ssn, setSsn] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isValidatingZip, setIsValidatingZip] = useState<boolean>(false);
  const previousStepRef = useRef<number>(1);
  const isNavigatingBackRef = useRef<boolean>(false);
  const incomeInputRef = useRef<HTMLInputElement | null>(null);
  const debtInputRef = useRef<HTMLInputElement | null>(null);
  const routingNumberInputRef = useRef<HTMLInputElement | null>(null);
  const driverLicenseInputRef = useRef<HTMLInputElement | null>(null);
  const housingPaymentInputRef = useRef<HTMLInputElement | null>(null);
  const homePhoneInputRef = useRef<HTMLInputElement | null>(null);
  const workPhoneInputRef = useRef<HTMLInputElement | null>(null);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const ssnInputRef = useRef<HTMLInputElement | null>(null);

  // Handle TrustedForm certificate data
  const handleTrustedFormReady = (certUrl: string) => {
    setTrustedFormCertUrl(certUrl);
  };

  // UTM Parameter Detection with Cookie Fallback
  useEffect(() => {
    // Helper function to get cookie value
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
      return '';
    };

    // Helper function to set cookie
    const setCookie = (name: string, value: string, days: number = 30) => {
      const expires = new Date();
      expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    };

    const urlParams = new URLSearchParams(window.location.search);
    let utmSource = urlParams.get("utm_source") || "";
    let utmId = urlParams.get("utm_id") || "";
    let utmS1 = urlParams.get("utm_s1") || "";

    // If URL parameters exist, use them and save to cookies
    if (utmSource || utmId || utmS1) {
      if (utmSource) setCookie('subid1', utmSource);
      if (utmId) setCookie('subid2', utmId);
      if (utmS1) setCookie('subid3', utmS1);
      
      // Clean the URL by removing UTM parameters
      const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    } else {
      // If no URL parameters, try to read from cookies
      utmSource = getCookie('subid1') || "";
      utmId = getCookie('subid2') || "";
      utmS1 = getCookie('subid3') || "";
    }

    setSubid1(utmSource);
    setSubid2(utmId);
    setSubid3(utmS1);
  }, []);

  const spendingOptions = [
    { value: 'auto-purchase', label: 'Auto Purchase' },
    { value: 'credit-card-consolidation', label: 'Credit Card Consolidation' },
    { value: 'debt-consolidation', label: 'Debt Consolidation' },
    { value: 'debt-settlement', label: 'Debt Settlement' },
    { value: 'education', label: 'Education' },
    { value: 'home-improvement', label: 'Home Improvement' },
    { value: 'medical', label: 'Medical' },
    { value: 'relocation', label: 'Relocation' },
    { value: 'renewable-energy', label: 'Renewable Energy' },
    { value: 'small-business', label: 'Small Business' },
    { value: 'travel', label: 'Travel' },
    { value: 'wedding', label: 'Wedding' },
    { value: 'other', label: 'Other' },
  ];

  const creditScoreOptions = [
    { value: 'excellent', label: 'Excellent (720+)' },
    { value: 'good', label: 'Good (660-719)' },
    { value: 'fair', label: 'Fair (600-659)' },
    { value: 'poor', label: 'Poor (Under 599)' },
    { value: 'no-credit-established', label: 'No Credit Established' },
  ];

  const employmentStatusOptions = [
    { value: 'employed', label: 'Employed' },
    { value: 'self-employed', label: 'Self-Employed' },
    { value: 'social-security-or-disability', label: 'Social Security or Disability' },
    { value: 'benefits', label: 'Benefits' },
    { value: 'unemployed', label: 'Unemployed' },
  ];

  const paymentFrequencyOptions = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'semi-monthly', label: 'Twice A Month' },
    { value: 'biweekly', label: 'Every Other Week' },
    { value: 'weekly', label: 'Weekly' },
  ];

  const bankAccountDurationOptions = [
    { value: '2', label: 'Less than 3 Months' },
    { value: '4', label: '3-6 Months' },
    { value: '9', label: '6-12 Months' },
    { value: '24', label: '1-3 Years' },
    { value: '48', label: '3+ Years' },
  ];

  const addressDurationOptions = [
    { value: '60', label: '5 Years or More' },
    { value: '42', label: '3-4 Years' },
    { value: '18', label: '1-2 Years' },
    { value: '7', label: '4-11 Months' },
    { value: '2', label: 'Less than 3 Months' },
  ];

  const vehicleStatusOptions = [
    { value: 'paid-off', label: 'Yes - its paid off' },
    { value: 'making-payments', label: 'Yes - I\'m making payments' },
    { value: 'no', label: 'No' },
  ];

  const unsecuredDebtAmountOptions = [
    { value: '9999-or-less', label: '$9,999 or less' },
    { value: '10000-19999', label: '$10,000 - $19,999' },
    { value: '20000-29999', label: '$20,000 - $29,999' },
    { value: '30000-or-more', label: '$30,000 or more' },
  ];

  const employerDurationOptions = [
    { value: '60', label: '5 years or more' },
    { value: '42', label: '3-4 years' },
    { value: '18', label: '1-2 years' },
    { value: '7', label: '4 - 11 months' },
    { value: '2', label: 'Less than 3 months' },
  ];

  const bankruptcyChapterOptions = [
    { value: 'chapter-7', label: 'Chapter 7' },
    { value: 'chapter-13', label: 'Chapter 13' },
  ];

  const bankruptcyStatusOptions = [
    { value: 'completed', label: 'Discharged (Completed)' },
    { value: 'in-progress', label: 'Open (In Progress)' },
    { value: 'incomplete', label: 'Dismissed (Incomplete)' },
  ];

  const driverLicenseStateOptions = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' },
  ];

  // State-specific license formats and lengths
  const stateLicenseFormats: Record<string, number> = {
    'AL': 7, 'AK': 7, 'AZ': 9, 'AR': 9, 'CA': 8,
    'CO': 9, 'CT': 9, 'DE': 7, 'FL': 13, 'GA': 9,
    'HI': 9, 'ID': 9, 'IL': 12, 'IN': 10, 'IA': 9,
    'KS': 9, 'KY': 9, 'LA': 9, 'ME': 7, 'MD': 13,
    'MA': 9, 'MI': 13, 'MN': 13, 'MS': 9, 'MO': 9,
    'MT': 13, 'NE': 9, 'NV': 10, 'NH': 10, 'NJ': 15,
    'NM': 9, 'NC': 12, 'ND': 9, 'OH': 8,
    'OK': 9, 'OR': 9, 'PA': 8, 'RI': 7, 'SC': 9,
    'SD': 9, 'TN': 9, 'TX': 7, 'UT': 9, 'VT': 8,
    'VA': 9, 'WA': 12, 'WV': 7, 'WI': 14, 'WY': 9
  };

  const handleSpendingPurposeChange = (value: string) => {
    setSpendingPurpose(value);
  };

  const handleCreditScoreChange = (value: string) => {
    const isAlreadySelected = creditScore === value;
    setCreditScore(value);
    // Reset navigation flag to allow auto-proceed
    isNavigatingBackRef.current = false;
    // Edge case: if clicking already-selected option, manually trigger auto-proceed
    if (isAlreadySelected && currentStep === 2) {
      setTimeout(() => {
        setCurrentStep(3);
        setProgress(calculateProgress(3));
        previousStepRef.current = 3;
      }, 300);
    }
  };

  const handleEmploymentStatusChange = (value: string) => {
    const isAlreadySelected = employmentStatus === value;
    setEmploymentStatus(value);
    // Reset navigation flag to allow auto-proceed
    isNavigatingBackRef.current = false;
    // Edge case: if clicking already-selected option, manually trigger auto-proceed
    if (isAlreadySelected && currentStep === 3) {
      setTimeout(() => {
        setCurrentStep(4);
        setProgress(calculateProgress(4));
        previousStepRef.current = 4;
      }, 300);
    }
  };

  const handlePaymentFrequencyChange = (value: string) => {
    const isAlreadySelected = paymentFrequency === value;
    setPaymentFrequency(value);
    // Reset navigation flag to allow auto-proceed
    isNavigatingBackRef.current = false;
    // Edge case: if clicking already-selected option, manually trigger auto-proceed
    if (isAlreadySelected && currentStep === 4) {
      setTimeout(() => {
        setCurrentStep(5);
        setProgress(calculateProgress(5));
        previousStepRef.current = 5;
      }, 300);
    }
  };

  const formatCurrency = (value: string): string => {
    // Remove all non-digit characters
    const numericValue = value.replace(/[^\d]/g, '');
    
    if (!numericValue) return '';
    
    // Add commas for thousands
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleMonthlyIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const cursorPosition = input.selectionStart || 0;
    const value = input.value;
    
    // Store ref for cursor positioning
    incomeInputRef.current = input;
    
    // Prevent deletion of $ and space
    if (value === '' || !value.startsWith('$ ')) {
      setMonthlyIncome('$ ');
      requestAnimationFrame(() => {
        if (incomeInputRef.current) {
          incomeInputRef.current.setSelectionRange(2, 2);
        }
      });
      return;
    }
    
    // Get text before and after cursor
    const beforeCursor = value.substring(0, cursorPosition);
    const afterCursor = value.substring(cursorPosition);
    
    // Extract only digits from before and after cursor
    const digitsBefore = beforeCursor.replace(/[^\d]/g, '');
    const digitsAfter = afterCursor.replace(/[^\d]/g, '');
    
    // Combine all digits
    const allDigits = digitsBefore + digitsAfter;
    
    // Format the value
    const formatted = formatCurrency(allDigits);
    const newValue = '$ ' + formatted;
    
    setMonthlyIncome(newValue);
    
    // Calculate new cursor position based on digits before cursor
    let newCursorPosition = 2; // Start after '$ '
    
    if (digitsBefore.length > 0) {
      // Count digits we've processed
      let processedDigits = 0;
      
      // Walk through formatted string and count digits
      for (let i = 0; i < formatted.length; i++) {
        if (formatted[i] !== ',') {
          processedDigits++;
          if (processedDigits === digitsBefore.length) {
            // We've reached the last digit before cursor
            // Position cursor right after this digit
            newCursorPosition = i + 3; // +1 for the digit position, +2 for the '$ ' at start
            break;
          }
        }
        // If it's a comma, we still move forward but don't count it as a digit
      }
      
      // If we processed all digits but cursor should be at end
      if (processedDigits === digitsBefore.length && processedDigits === allDigits.length) {
        newCursorPosition = newValue.length;
      } else if (processedDigits < digitsBefore.length) {
        // Fallback: if something went wrong, position at end
        newCursorPosition = newValue.length;
      }
    }
    
    // Ensure cursor is valid (at least after '$ ', not beyond end)
    newCursorPosition = Math.max(2, Math.min(newCursorPosition, newValue.length));
    
    // Restore cursor position after React updates
    requestAnimationFrame(() => {
      if (incomeInputRef.current) {
        incomeInputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
      }
    });
  };

  const handleMonthlyIncomeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const cursorPosition = input.selectionStart || 0;
    
    // Prevent backspace/delete from removing the $ and space
    if ((e.key === 'Backspace' || e.key === 'Delete') && cursorPosition <= 2) {
      e.preventDefault();
    }
  };

  const handleDebtAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const cursorPosition = input.selectionStart || 0;
    const value = input.value;
    
    // Store ref for cursor positioning
    debtInputRef.current = input;
    
    // Prevent deletion of $ and space
    if (value === '' || !value.startsWith('$ ')) {
      setDebtAmount('$ ');
      requestAnimationFrame(() => {
        if (debtInputRef.current) {
          debtInputRef.current.setSelectionRange(2, 2);
        }
      });
      return;
    }
    
    // Get text before and after cursor
    const beforeCursor = value.substring(0, cursorPosition);
    const afterCursor = value.substring(cursorPosition);
    
    // Extract only digits from before and after cursor
    const digitsBefore = beforeCursor.replace(/[^\d]/g, '');
    const digitsAfter = afterCursor.replace(/[^\d]/g, '');
    
    // Combine all digits
    const allDigits = digitsBefore + digitsAfter;
    
    // Format the value
    const formatted = formatCurrency(allDigits);
    const newValue = '$ ' + formatted;
    
    setDebtAmount(newValue);
    
    // Calculate new cursor position based on digits before cursor
    let newCursorPosition = 2; // Start after '$ '
    
    if (digitsBefore.length > 0) {
      // Count digits we've processed
      let processedDigits = 0;
      
      // Walk through formatted string and count digits
      for (let i = 0; i < formatted.length; i++) {
        if (formatted[i] !== ',') {
          processedDigits++;
          if (processedDigits === digitsBefore.length) {
            // We've reached the last digit before cursor
            // Position cursor right after this digit
            newCursorPosition = i + 3; // +1 for the digit position, +2 for the '$ ' at start
            break;
          }
        }
        // If it's a comma, we still move forward but don't count it as a digit
      }
      
      // If we processed all digits but cursor should be at end
      if (processedDigits === digitsBefore.length && processedDigits === allDigits.length) {
        newCursorPosition = newValue.length;
      } else if (processedDigits < digitsBefore.length) {
        // Fallback: if something went wrong, position at end
        newCursorPosition = newValue.length;
      }
    }
    
    // Ensure cursor is valid (at least after '$ ', not beyond end)
    newCursorPosition = Math.max(2, Math.min(newCursorPosition, newValue.length));
    
    // Restore cursor position after React updates
    requestAnimationFrame(() => {
      if (debtInputRef.current) {
        debtInputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
      }
    });
  };

  const handleDebtAmountKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const cursorPosition = input.selectionStart || 0;
    
    // Prevent backspace/delete from removing the $ and space
    if ((e.key === 'Backspace' || e.key === 'Delete') && cursorPosition <= 2) {
      e.preventDefault();
    }
  };

  // Auto-proceed to next step when credit score is selected (only if not navigating back)
  useEffect(() => {
    if (creditScore && currentStep === 2 && !isNavigatingBackRef.current) {
      const timer = setTimeout(() => {
        setCurrentStep(3);
        setProgress(calculateProgress(3));
        previousStepRef.current = 3;
      }, 300);
      return () => clearTimeout(timer);
    }
    // Auto-proceed to next step when employment status is selected (only if not navigating back)
    if (employmentStatus && currentStep === 3 && !isNavigatingBackRef.current) {
      const timer = setTimeout(() => {
        setCurrentStep(4);
        setProgress(calculateProgress(4));
        previousStepRef.current = 4;
      }, 300);
      return () => clearTimeout(timer);
    }
    // Auto-proceed to next step when payment frequency is selected (only if not navigating back)
    if (paymentFrequency && currentStep === 4 && !isNavigatingBackRef.current) {
      const timer = setTimeout(() => {
        setCurrentStep(5);
        setProgress(calculateProgress(5));
        previousStepRef.current = 5;
      }, 300);
      return () => clearTimeout(timer);
    }
    // Auto-proceed to next step when checking account is selected (only if not navigating back)
    if (hasCheckingAccount && currentStep === 9 && !isNavigatingBackRef.current) {
      const timer = setTimeout(() => {
        setCurrentStep(10);
        setProgress(calculateProgress(10));
        previousStepRef.current = 10;
      }, 300);
      return () => clearTimeout(timer);
    }
    // Auto-proceed to next step when direct deposit is "Yes" (only if not navigating back)
    if (hasDirectDeposit === 'yes' && currentStep === 10 && !isNavigatingBackRef.current) {
      const timer = setTimeout(() => {
        setCurrentStep(11);
        setProgress(calculateProgress(11));
        previousStepRef.current = 11;
      }, 300);
      return () => clearTimeout(timer);
    }
    // Auto-proceed to next step when home ownership is selected (only if not navigating back)
    if (homeOwnership && currentStep === 17 && !isNavigatingBackRef.current) {
      const timer = setTimeout(() => {
        setCurrentStep(18);
        setProgress(calculateProgress(18));
        previousStepRef.current = 18;
      }, 300);
      return () => clearTimeout(timer);
    }
    // Auto-proceed to next step when address duration is selected (only if not navigating back)
    if (addressDuration && currentStep === 18 && !isNavigatingBackRef.current) {
      const timer = setTimeout(() => {
        setCurrentStep(19);
        setProgress(calculateProgress(19));
        previousStepRef.current = 19;
      }, 300);
      return () => clearTimeout(timer);
    }
    // Auto-proceed to next step when vehicle status is selected (only if not navigating back)
    if (vehicleStatus && currentStep === 20 && !isNavigatingBackRef.current) {
      const timer = setTimeout(() => {
        setCurrentStep(21);
        setProgress(calculateProgress(21));
        previousStepRef.current = 21;
      }, 300);
      return () => clearTimeout(timer);
    }
    // Auto-proceed to next step when military member status is selected (only if not navigating back)
    if (isMilitaryMember && currentStep === 23 && !isNavigatingBackRef.current) {
      const timer = setTimeout(() => {
        setCurrentStep(24);
        setProgress(calculateProgress(24));
        previousStepRef.current = 24;
      }, 300);
      return () => clearTimeout(timer);
    }
    // Auto-proceed to next step when unsecured debt amount is selected (only if not navigating back)
    if (unsecuredDebtAmount && currentStep === 24 && !isNavigatingBackRef.current) {
      const timer = setTimeout(() => {
        setCurrentStep(25);
        setProgress(calculateProgress(25));
        previousStepRef.current = 25;
      }, 300);
      return () => clearTimeout(timer);
    }
    // Auto-proceed to next step when employer duration is selected (only if not navigating back)
    if (employerDuration && currentStep === 26 && !isNavigatingBackRef.current) {
      const timer = setTimeout(() => {
        setCurrentStep(27);
        setProgress(calculateProgress(27));
        previousStepRef.current = 27;
      }, 300);
      return () => clearTimeout(timer);
    }
    // Auto-proceed to next step when bankruptcy status is selected (only if not navigating back)
    if (hasFiledBankruptcy && currentStep === 29 && !isNavigatingBackRef.current) {
      const timer = setTimeout(() => {
        if (hasFiledBankruptcy === 'yes') {
          // If "Yes", proceed to step 30 (bankruptcy questions)
          setCurrentStep(30);
          setProgress(calculateProgress(30));
          previousStepRef.current = 30;
        } else if (hasFiledBankruptcy === 'no') {
          // If "No", skip to step 33 (skip bankruptcy questions)
          setCurrentStep(33);
          setProgress(calculateProgress(33));
          previousStepRef.current = 33;
        }
      }, 300);
      return () => clearTimeout(timer);
    }
    // Auto-proceed to next step when bankruptcy chapter is selected (only if not navigating back)
    if (bankruptcyChapter && currentStep === 30 && !isNavigatingBackRef.current) {
      const timer = setTimeout(() => {
        setCurrentStep(31);
        setProgress(calculateProgress(31));
        previousStepRef.current = 31;
      }, 300);
      return () => clearTimeout(timer);
    }
    // Auto-proceed to next step when bankruptcy status is selected (only if not navigating back)
    if (bankruptcyStatus && currentStep === 31 && !isNavigatingBackRef.current) {
      const timer = setTimeout(() => {
        setCurrentStep(32);
        setProgress(calculateProgress(32));
        previousStepRef.current = 32;
      }, 300);
      return () => clearTimeout(timer);
    }
    // Auto-proceed to next step when bankruptcy discharged status is selected (only if not navigating back)
    if (bankruptcyDischargedInLast2Years && currentStep === 32 && !isNavigatingBackRef.current) {
      const timer = setTimeout(() => {
        setCurrentStep(33);
        setProgress(calculateProgress(33));
        previousStepRef.current = 33;
      }, 300);
      return () => clearTimeout(timer);
    }
    // Reset the flag after a short delay
    if (isNavigatingBackRef.current) {
      const timer = setTimeout(() => {
        isNavigatingBackRef.current = false;
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [creditScore, employmentStatus, paymentFrequency, hasCheckingAccount, hasDirectDeposit, homeOwnership, addressDuration, vehicleStatus, isMilitaryMember, unsecuredDebtAmount, employerDuration, hasFiledBankruptcy, bankruptcyChapter, bankruptcyStatus, bankruptcyDischargedInLast2Years, currentStep]);

  // Track step changes
  useEffect(() => {
    previousStepRef.current = currentStep;
  }, [currentStep]);

  const handleContinue = () => {
    if (currentStep === 1 && spendingPurpose) {
      setCurrentStep(2);
      // Progress updates only on step transition (Step 2 = 10%)
      setProgress(calculateProgress(2));
      previousStepRef.current = 2;
      isNavigatingBackRef.current = false;
    }
  };

  const handlePrevious = () => {
    if (currentStep === 2) {
      isNavigatingBackRef.current = true;
      setCurrentStep(1);
      setProgress(calculateProgress(1));
      previousStepRef.current = 1;
    } else if (currentStep === 3) {
      isNavigatingBackRef.current = true;
      setCurrentStep(2);
      setProgress(calculateProgress(2));
      previousStepRef.current = 2;
    } else if (currentStep === 4) {
      isNavigatingBackRef.current = true;
      setCurrentStep(3);
      setProgress(calculateProgress(3));
      previousStepRef.current = 3;
    } else if (currentStep === 5) {
      isNavigatingBackRef.current = true;
      setCurrentStep(4);
      setProgress(calculateProgress(4));
      previousStepRef.current = 4;
    } else if (currentStep === 6) {
      isNavigatingBackRef.current = true;
      setCurrentStep(5);
      setProgress(calculateProgress(5));
      previousStepRef.current = 5;
    } else if (currentStep === 7) {
      isNavigatingBackRef.current = true;
      setCurrentStep(6);
      setProgress(calculateProgress(6));
      previousStepRef.current = 6;
    } else if (currentStep === 8) {
      isNavigatingBackRef.current = true;
      setCurrentStep(7);
      setProgress(calculateProgress(7));
      previousStepRef.current = 7;
    } else if (currentStep === 9) {
      isNavigatingBackRef.current = true;
      setCurrentStep(8);
      setProgress(calculateProgress(8));
      previousStepRef.current = 8;
    } else if (currentStep === 10) {
      isNavigatingBackRef.current = true;
      setCurrentStep(9);
      setProgress(calculateProgress(9));
      previousStepRef.current = 9;
    } else if (currentStep === 11) {
      isNavigatingBackRef.current = true;
      setCurrentStep(10);
      setProgress(calculateProgress(10));
      previousStepRef.current = 10;
    } else if (currentStep === 12) {
      isNavigatingBackRef.current = true;
      setCurrentStep(11);
      setProgress(calculateProgress(11));
      previousStepRef.current = 11;
    } else if (currentStep === 13) {
      isNavigatingBackRef.current = true;
      setCurrentStep(12);
      setProgress(calculateProgress(12));
      previousStepRef.current = 12;
    } else if (currentStep === 14) {
      isNavigatingBackRef.current = true;
      setCurrentStep(13);
      setProgress(calculateProgress(13));
      previousStepRef.current = 13;
    } else if (currentStep === 15) {
      isNavigatingBackRef.current = true;
      setCurrentStep(14);
      setProgress(calculateProgress(14));
      previousStepRef.current = 14;
    } else if (currentStep === 16) {
      isNavigatingBackRef.current = true;
      setCurrentStep(15);
      setProgress(calculateProgress(15));
      previousStepRef.current = 15;
    } else if (currentStep === 17) {
      isNavigatingBackRef.current = true;
      setCurrentStep(16);
      setProgress(calculateProgress(16));
      previousStepRef.current = 16;
    } else if (currentStep === 18) {
      isNavigatingBackRef.current = true;
      setCurrentStep(17);
      setProgress(calculateProgress(17));
      previousStepRef.current = 17;
    } else if (currentStep === 19) {
      isNavigatingBackRef.current = true;
      setCurrentStep(18);
      setProgress(calculateProgress(18));
      previousStepRef.current = 18;
    } else if (currentStep === 20) {
      isNavigatingBackRef.current = true;
      setCurrentStep(19);
      setProgress(calculateProgress(19));
      previousStepRef.current = 19;
    } else if (currentStep === 21) {
      isNavigatingBackRef.current = true;
      setCurrentStep(20);
      setProgress(calculateProgress(20));
      previousStepRef.current = 20;
    } else if (currentStep === 22) {
      isNavigatingBackRef.current = true;
      setCurrentStep(21);
      setProgress(calculateProgress(21));
      previousStepRef.current = 21;
    } else if (currentStep === 23) {
      isNavigatingBackRef.current = true;
      setCurrentStep(22);
      setProgress(calculateProgress(22));
      previousStepRef.current = 22;
    } else if (currentStep === 24) {
      isNavigatingBackRef.current = true;
      setCurrentStep(23);
      setProgress(calculateProgress(23));
      previousStepRef.current = 23;
    } else if (currentStep === 25) {
      isNavigatingBackRef.current = true;
      setCurrentStep(24);
      setProgress(calculateProgress(24));
      previousStepRef.current = 24;
    } else if (currentStep === 26) {
      isNavigatingBackRef.current = true;
      setCurrentStep(25);
      setProgress(calculateProgress(25));
      previousStepRef.current = 25;
    } else if (currentStep === 27) {
      isNavigatingBackRef.current = true;
      setCurrentStep(26);
      setProgress(calculateProgress(26));
      previousStepRef.current = 26;
    } else if (currentStep === 28) {
      isNavigatingBackRef.current = true;
      setCurrentStep(27);
      setProgress(calculateProgress(27));
      previousStepRef.current = 27;
    } else if (currentStep === 29) {
      isNavigatingBackRef.current = true;
      setCurrentStep(28);
      setProgress(calculateProgress(28));
      previousStepRef.current = 28;
    } else if (currentStep === 30) {
      isNavigatingBackRef.current = true;
      setCurrentStep(29);
      setProgress(calculateProgress(29));
      previousStepRef.current = 29;
    } else if (currentStep === 31) {
      isNavigatingBackRef.current = true;
      setCurrentStep(30);
      setProgress(calculateProgress(30));
      previousStepRef.current = 30;
    } else if (currentStep === 32) {
      isNavigatingBackRef.current = true;
      setCurrentStep(31);
      setProgress(calculateProgress(31));
      previousStepRef.current = 31;
    } else if (currentStep === 33) {
      isNavigatingBackRef.current = true;
      // If user selected "no" in step 29, go back to step 29
      // Otherwise, go back to step 32 (if they went through bankruptcy questions)
      if (hasFiledBankruptcy === 'no') {
        setCurrentStep(29);
        setProgress(calculateProgress(29));
        previousStepRef.current = 29;
      } else {
        setCurrentStep(32);
        setProgress(calculateProgress(32));
        previousStepRef.current = 32;
      }
    } else if (currentStep === 34) {
      isNavigatingBackRef.current = true;
      setCurrentStep(33);
      setProgress(calculateProgress(33));
      previousStepRef.current = 33;
    } else if (currentStep === 35) {
      isNavigatingBackRef.current = true;
      setCurrentStep(34);
      setProgress(calculateProgress(34));
      previousStepRef.current = 34;
    } else if (currentStep === 36) {
      isNavigatingBackRef.current = true;
      setCurrentStep(35);
      setProgress(calculateProgress(35));
      previousStepRef.current = 35;
    } else if (currentStep === 37) {
      isNavigatingBackRef.current = true;
      setCurrentStep(36);
      setProgress(calculateProgress(36));
      previousStepRef.current = 36;
    } else if (currentStep === 38) {
      isNavigatingBackRef.current = true;
      setCurrentStep(37);
      setProgress(calculateProgress(37));
      previousStepRef.current = 37;
    }
  };

  const isStep5Complete = monthlyIncome && monthlyIncome.length > 2;
  const isStep6Complete = debtAmount && debtAmount.length > 2;
  const isStep7Complete = nextPayDate !== '';
  const isStep8Complete = secondPayDate !== '';
  const isStep10Complete = hasDirectDeposit === 'no';
  const isStep11Complete = bankAccountDuration !== '';
  const isStep12Complete = bankRoutingNumber.replace(/[^\d]/g, '').length === 9;
  const isStep13Complete = bankName.trim() !== '';
  const isStep14Complete = bankAccountNumber.trim() !== '';
  const isStep16Complete = streetAddress.trim() !== '';
  const isStep19Complete = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isStep21Complete = driverLicenseState !== '';
  const isStep22Complete = (() => {
    if (!driverLicenseState || !driverLicenseNumber) return false;
    const cleanLicense = driverLicenseNumber.replace(/[^A-Za-z0-9]/g, '');
    const maxLength = stateLicenseFormats[driverLicenseState] || 9;
    return cleanLicense.length === maxLength;
  })();
  const isStep25Complete = employer.trim() !== '';
  const isStep27Complete = occupation.trim() !== '';
  const isStep28Complete = monthlyHousingPayment && monthlyHousingPayment.length > 2;
  const isStep33Complete = firstName.trim() !== '' && lastName.trim() !== '';
  const isStep34Complete = birthdate !== '';
  const isStep35Complete = homePhoneNumber.replace(/[^\d]/g, '').length === 10;
  const isStep36Complete = workPhoneNumber.replace(/[^\d]/g, '').length === 10;
  const isStep37Complete = phoneNumber.replace(/[^\d]/g, '').length === 10;
  const isStep38Complete = ssn.replace(/[^\d]/g, '').length === 9;

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow digits and limit to 5 digits
    const digitsOnly = value.replace(/[^\d]/g, '').slice(0, 5);
    setZipCode(digitsOnly);
    // Clear error when user starts typing
    if (zipCodeError) {
      setZipCodeError('');
    }
  };

  const validateZipCode = async (zip: string): Promise<{ valid: boolean; isNewYork: boolean; city?: string; error?: string }> => {
    if (zip.length !== 5) {
      return { valid: false, isNewYork: false, error: 'Please enter a valid 5-digit US zip code' };
    }

    try {
      setIsValidatingZip(true);
      // Use Next.js API route to avoid CORS issues
      const response = await fetch(`/api/validate-zip?zip=${zip}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return { 
          valid: false, 
          isNewYork: false, 
          error: errorData.error || 'Please enter a valid US zip code' 
        };
      }

      const data = await response.json();
      
      if (data.error) {
        return { 
          valid: false, 
          isNewYork: data.isNewYork || false, 
          error: data.error 
        };
      }

      return { 
        valid: data.valid || false, 
        isNewYork: data.isNewYork || false, 
        city: data.city 
      };
    } catch (error) {
      console.error('Zip code validation error:', error);
      return { valid: false, isNewYork: false, error: 'Please enter a valid US zip code' };
    } finally {
      setIsValidatingZip(false);
    }
  };

  const handleZipCodeContinue = async () => {
    if (zipCode.length !== 5) {
      setZipCodeError('Please enter a valid 5-digit US zip code');
      return;
    }

    const validation = await validateZipCode(zipCode);
    
    if (!validation.valid) {
      setZipCodeError(validation.error || 'Please enter a valid US zip code');
      return;
    }

    // If valid and not New York, store city and proceed to next step
    setZipCodeError('');
    if (validation.city) {
      setZipCodeCity(validation.city);
    }
    setCurrentStep(16);
    setProgress(calculateProgress(16));
  };

  const handleNextPayDateChange = (value: string) => {
    setNextPayDate(value);
  };

  const handleSecondPayDateChange = (value: string) => {
    setSecondPayDate(value);
  };

  // Calculate valid date range for secondPayDate based on paymentFrequency and nextPayDate
  const getSecondPayDateRange = (): { minDate: Date | null; maxDate: Date | null } => {
    if (!paymentFrequency || !nextPayDate) {
      return { minDate: new Date(), maxDate: null };
    }

    // Parse nextPayDate (format: YYYY-MM-DD from DatePicker)
    const nextPayDateObj = new Date(nextPayDate);
    if (isNaN(nextPayDateObj.getTime())) {
      return { minDate: new Date(), maxDate: null };
    }

    // Calculate expected second pay date based on payment frequency
    const expectedDate = new Date(nextPayDateObj);
    let daysToAdd = 0;

    switch (paymentFrequency) {
      case 'weekly':
        daysToAdd = 7;
        break;
      case 'biweekly':
        daysToAdd = 14;
        break;
      case 'semi-monthly':
        daysToAdd = 15; // Approximately half a month
        break;
      case 'monthly':
        // Add one month
        expectedDate.setMonth(expectedDate.getMonth() + 1);
        break;
      default:
        daysToAdd = 14; // Default to biweekly
    }

    if (daysToAdd > 0) {
      expectedDate.setDate(expectedDate.getDate() + daysToAdd);
    }

    // Allow a range of ±5 days from the expected date for flexibility
    const minDate = new Date(expectedDate);
    minDate.setDate(minDate.getDate() - 5);
    
    // Ensure minDate is not in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (minDate < today) {
      minDate.setTime(today.getTime());
    }

    const maxDate = new Date(expectedDate);
    maxDate.setDate(maxDate.getDate() + 5);

    return { minDate, maxDate };
  };

  // Format date for display (MM/DD/YYYY)
  const formatDateForDisplay = (date: Date): string => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Get expected second pay date message
  const getSecondPayDateMessage = (): string => {
    if (!paymentFrequency || !nextPayDate) {
      return '';
    }

    const dateRange = getSecondPayDateRange();
    if (!dateRange.minDate || !dateRange.maxDate) {
      return '';
    }

    const frequencyLabels: Record<string, string> = {
      'weekly': 'weekly',
      'biweekly': 'every other week',
      'semi-monthly': 'twice a month',
      'monthly': 'monthly'
    };

    const frequencyLabel = frequencyLabels[paymentFrequency] || 'biweekly';
    return `Based on your ${frequencyLabel} payment frequency, please select a date between ${formatDateForDisplay(dateRange.minDate)} and ${formatDateForDisplay(dateRange.maxDate)}.`;
  };

  const handleCheckingAccountChange = (value: string) => {
    const isAlreadySelected = hasCheckingAccount === value;
    setHasCheckingAccount(value);
    // Reset navigation flag to allow auto-proceed
    isNavigatingBackRef.current = false;
    // Edge case: if clicking already-selected option, manually trigger auto-proceed
    if (isAlreadySelected && currentStep === 9) {
      setTimeout(() => {
        setCurrentStep(10);
        setProgress(calculateProgress(10));
        previousStepRef.current = 10;
      }, 300);
    }
  };

  const handleDirectDepositChange = (value: string) => {
    const isAlreadySelected = hasDirectDeposit === value;
    setHasDirectDeposit(value);
    // Reset navigation flag to allow auto-proceed
    isNavigatingBackRef.current = false;
    // Edge case: if clicking already-selected option, manually trigger auto-proceed
    if (isAlreadySelected && currentStep === 10 && value === 'yes') {
      setTimeout(() => {
        setCurrentStep(11);
        setProgress(calculateProgress(11));
        previousStepRef.current = 11;
      }, 300);
    }
  };

  const handleBankAccountDurationChange = (value: string) => {
    setBankAccountDuration(value);
  };

  const handleHomeOwnershipChange = (value: string) => {
    const isAlreadySelected = homeOwnership === value;
    setHomeOwnership(value);
    // Reset navigation flag to allow auto-proceed
    isNavigatingBackRef.current = false;
    // Edge case: if clicking already-selected option, manually trigger auto-proceed
    if (isAlreadySelected && currentStep === 17) {
      setTimeout(() => {
        setCurrentStep(18);
        setProgress(calculateProgress(18));
        previousStepRef.current = 18;
      }, 300);
    }
  };

  const handleAddressDurationChange = (value: string) => {
    setAddressDuration(value);
    // Reset navigation flag to allow auto-proceed
    isNavigatingBackRef.current = false;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleVehicleStatusChange = (value: string) => {
    const isAlreadySelected = vehicleStatus === value;
    setVehicleStatus(value);
    // Reset navigation flag to allow auto-proceed
    isNavigatingBackRef.current = false;
    // Edge case: if clicking already-selected option, manually trigger auto-proceed
    if (isAlreadySelected && currentStep === 20) {
      setTimeout(() => {
        setCurrentStep(21);
        setProgress(calculateProgress(21));
        previousStepRef.current = 21;
      }, 300);
    }
  };

  const handleDriverLicenseStateChange = (value: string) => {
    setDriverLicenseState(value);
    // Clear license number when state changes
    setDriverLicenseNumber('');
  };

  const handleMilitaryMemberChange = (value: string) => {
    const isAlreadySelected = isMilitaryMember === value;
    setIsMilitaryMember(value);
    // Reset navigation flag to allow auto-proceed
    isNavigatingBackRef.current = false;
    // Edge case: if clicking already-selected option, manually trigger auto-proceed
    if (isAlreadySelected && currentStep === 23) {
      setTimeout(() => {
        setCurrentStep(24);
        setProgress(calculateProgress(24));
        previousStepRef.current = 24;
      }, 300);
    }
  };

  const handleUnsecuredDebtAmountChange = (value: string) => {
    const isAlreadySelected = unsecuredDebtAmount === value;
    setUnsecuredDebtAmount(value);
    // Reset navigation flag to allow auto-proceed
    isNavigatingBackRef.current = false;
    // Edge case: if clicking already-selected option, manually trigger auto-proceed
    if (isAlreadySelected && currentStep === 24) {
      setTimeout(() => {
        setCurrentStep(25);
        setProgress(calculateProgress(25));
        previousStepRef.current = 25;
      }, 300);
    }
  };

  const handleEmployerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployer(e.target.value);
  };

  const handleEmployerDurationChange = (value: string) => {
    setEmployerDuration(value);
    // Reset navigation flag to allow auto-proceed
    isNavigatingBackRef.current = false;
  };

  const handleOccupationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOccupation(e.target.value);
  };

  const handleMonthlyHousingPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const cursorPosition = input.selectionStart || 0;
    const value = input.value;
    
    // Store ref for cursor positioning
    housingPaymentInputRef.current = input;
    
    // Prevent deletion of $ and space
    if (value === '' || !value.startsWith('$ ')) {
      setMonthlyHousingPayment('$ ');
      requestAnimationFrame(() => {
        if (housingPaymentInputRef.current) {
          housingPaymentInputRef.current.setSelectionRange(2, 2);
        }
      });
      return;
    }
    
    // Get text before and after cursor
    const beforeCursor = value.substring(0, cursorPosition);
    const afterCursor = value.substring(cursorPosition);
    
    // Extract only digits from before and after cursor
    const digitsBefore = beforeCursor.replace(/[^\d]/g, '');
    const digitsAfter = afterCursor.replace(/[^\d]/g, '');
    
    // Combine all digits
    const allDigits = digitsBefore + digitsAfter;
    
    // Format the value
    const formatted = formatCurrency(allDigits);
    const newValue = '$ ' + formatted;
    
    setMonthlyHousingPayment(newValue);
    
    // Calculate new cursor position based on digits before cursor
    let newCursorPosition = 2; // Start after '$ '
    
    if (digitsBefore.length > 0) {
      // Count digits we've processed
      let processedDigits = 0;
      
      // Walk through formatted string and count digits
      for (let i = 0; i < formatted.length; i++) {
        if (formatted[i] !== ',') {
          processedDigits++;
          if (processedDigits === digitsBefore.length) {
            // We've reached the last digit before cursor
            // Position cursor right after this digit
            newCursorPosition = i + 3; // +1 for the digit position, +2 for the '$ ' at start
            break;
          }
        }
        // If it's a comma, we still move forward but don't count it as a digit
      }
      
      // If we processed all digits but cursor should be at end
      if (processedDigits === digitsBefore.length && processedDigits === allDigits.length) {
        newCursorPosition = newValue.length;
      } else if (processedDigits < digitsBefore.length) {
        // Fallback: if something went wrong, position at end
        newCursorPosition = newValue.length;
      }
    }
    
    // Ensure cursor is valid (at least after '$ ', not beyond end)
    newCursorPosition = Math.max(2, Math.min(newCursorPosition, newValue.length));
    
    // Restore cursor position after React updates
    requestAnimationFrame(() => {
      if (housingPaymentInputRef.current) {
        housingPaymentInputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
      }
    });
  };

  const handleMonthlyHousingPaymentKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const cursorPosition = input.selectionStart || 0;
    
    // Prevent backspace/delete from removing the $ and space
    if ((e.key === 'Backspace' || e.key === 'Delete') && cursorPosition <= 2) {
      e.preventDefault();
    }
  };

  const handleBankruptcyChange = (value: string) => {
    const isAlreadySelected = hasFiledBankruptcy === value;
    setHasFiledBankruptcy(value);
    // Reset navigation flag to allow auto-proceed
    isNavigatingBackRef.current = false;
    // Edge case: if clicking already-selected option, manually trigger auto-proceed
    if (isAlreadySelected && currentStep === 29) {
      setTimeout(() => {
        if (value === 'yes') {
          setCurrentStep(30);
          setProgress(calculateProgress(30));
          previousStepRef.current = 30;
        } else if (value === 'no') {
          setCurrentStep(33);
          setProgress(calculateProgress(33));
          previousStepRef.current = 33;
        }
      }, 300);
    }
  };

  const handleBankruptcyChapterChange = (value: string) => {
    const isAlreadySelected = bankruptcyChapter === value;
    setBankruptcyChapter(value);
    // Reset navigation flag to allow auto-proceed
    isNavigatingBackRef.current = false;
    // Edge case: if clicking already-selected option, manually trigger auto-proceed
    if (isAlreadySelected && currentStep === 30) {
      setTimeout(() => {
        setCurrentStep(31);
        setProgress(calculateProgress(31));
        previousStepRef.current = 31;
      }, 300);
    }
  };

  const handleBankruptcyStatusChange = (value: string) => {
    const isAlreadySelected = bankruptcyStatus === value;
    setBankruptcyStatus(value);
    // Reset navigation flag to allow auto-proceed
    isNavigatingBackRef.current = false;
    // Edge case: if clicking already-selected option, manually trigger auto-proceed
    if (isAlreadySelected && currentStep === 31) {
      setTimeout(() => {
        setCurrentStep(32);
        setProgress(calculateProgress(32));
        previousStepRef.current = 32;
      }, 300);
    }
  };

  const handleBankruptcyDischargedChange = (value: string) => {
    const isAlreadySelected = bankruptcyDischargedInLast2Years === value;
    setBankruptcyDischargedInLast2Years(value);
    // Reset navigation flag to allow auto-proceed
    isNavigatingBackRef.current = false;
    // Edge case: if clicking already-selected option, manually trigger auto-proceed
    if (isAlreadySelected && currentStep === 32) {
      setTimeout(() => {
        setCurrentStep(33);
        setProgress(calculateProgress(33));
        previousStepRef.current = 33;
      }, 300);
    }
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleBirthdateChange = (value: string) => {
    setBirthdate(value);
  };

  const formatPhoneNumber = (value: string): string => {
    // Remove all non-digit characters
    const digits = value.replace(/[^\d]/g, '').slice(0, 10); // Limit to 10 digits
    
    // Format as (123) 456 - 7890
    if (digits.length === 0) return '';
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)} - ${digits.slice(6)}`;
  };

  // Generic phone number change handler
  const createPhoneNumberChangeHandler = (
    setValue: (value: string) => void,
    inputRef: React.MutableRefObject<HTMLInputElement | null>
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target;
      const cursorPosition = input.selectionStart || 0;
      const value = input.value;
      
      // Store ref for cursor positioning
      inputRef.current = input;
      
      // Get the numeric part before cursor to calculate new position
      const beforeCursor = value.substring(0, cursorPosition);
      
      // Count digits before cursor
      const digitsBefore = beforeCursor.replace(/[^\d]/g, '').length;
      
      // Format the value
      const formatted = formatPhoneNumber(value);
      
      setValue(formatted);
      
      // Calculate new cursor position
      let newCursorPosition = 0;
      let digitCount = 0;
      
      for (let i = 0; i < formatted.length; i++) {
        if (/[0-9]/.test(formatted[i])) {
          digitCount++;
          if (digitCount === digitsBefore) {
            newCursorPosition = i + 1;
            break;
          }
        }
        if (digitCount < digitsBefore) {
          newCursorPosition = i + 1;
        }
      }
      
      // Ensure cursor is valid
      newCursorPosition = Math.max(0, Math.min(newCursorPosition, formatted.length));
      
      // Restore cursor position after React updates
      requestAnimationFrame(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
        }
      });
    };
  };

  // Generic phone number keydown handler
  const createPhoneNumberKeyDownHandler = (
    setValue: (value: string) => void,
    inputRef: React.MutableRefObject<HTMLInputElement | null>
  ) => {
    return (e: React.KeyboardEvent<HTMLInputElement>) => {
      const input = e.currentTarget;
      const cursorPosition = input.selectionStart || 0;
      const value = input.value;
      
      // Handle backspace to remove separators
      if (e.key === 'Backspace' && cursorPosition > 0) {
        // If cursor is right after a separator, delete the separator and the digit before it
        const charBefore = value[cursorPosition - 1];
        if (charBefore === ')' || charBefore === '-' || charBefore === ' ' || charBefore === '(') {
          e.preventDefault();
          // Find the digit before the separator
          let newPos = cursorPosition - 1;
          while (newPos > 0 && !/[0-9]/.test(value[newPos - 1])) {
            newPos--;
          }
          if (newPos > 0) {
            const beforeSeparator = value.substring(0, newPos - 1);
            const afterSeparator = value.substring(cursorPosition);
            const newValue = beforeSeparator + afterSeparator;
            const formatted = formatPhoneNumber(newValue);
            setValue(formatted);
            
            requestAnimationFrame(() => {
              if (inputRef.current) {
                // Calculate new cursor position after formatting
                const digitsBefore = beforeSeparator.replace(/[^\d]/g, '').length;
                let pos = 0;
                let digitCount = 0;
                for (let i = 0; i < formatted.length; i++) {
                  if (/[0-9]/.test(formatted[i])) {
                    digitCount++;
                    if (digitCount === digitsBefore) {
                      pos = i + 1;
                      break;
                    }
                  }
                  if (digitCount < digitsBefore) {
                    pos = i + 1;
                  }
                }
                inputRef.current.setSelectionRange(Math.max(0, pos), Math.max(0, pos));
              }
            });
          }
        }
      }
    };
  };

  // Create handlers for each phone number input
  const handleHomePhoneNumberChange = createPhoneNumberChangeHandler(setHomePhoneNumber, homePhoneInputRef);
  const handleHomePhoneNumberKeyDown = createPhoneNumberKeyDownHandler(setHomePhoneNumber, homePhoneInputRef);
  const handleWorkPhoneNumberChange = createPhoneNumberChangeHandler(setWorkPhoneNumber, workPhoneInputRef);
  const handleWorkPhoneNumberKeyDown = createPhoneNumberKeyDownHandler(setWorkPhoneNumber, workPhoneInputRef);
  const handlePhoneNumberChange = createPhoneNumberChangeHandler(setPhoneNumber, phoneInputRef);
  const handlePhoneNumberKeyDown = createPhoneNumberKeyDownHandler(setPhoneNumber, phoneInputRef);

  const formatSSN = (value: string): string => {
    // Remove all non-digit characters
    const digits = value.replace(/[^\d]/g, '').slice(0, 9); // Limit to 9 digits
    
    // Format as 123-45-6789
    if (digits.length === 0) return '';
    if (digits.length <= 3) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
  };

  const handleSSNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const cursorPosition = input.selectionStart || 0;
    const value = input.value;
    
    // Store ref for cursor positioning
    ssnInputRef.current = input;
    
    // Get the numeric part before cursor to calculate new position
    const beforeCursor = value.substring(0, cursorPosition);
    
    // Count digits before cursor
    const digitsBefore = beforeCursor.replace(/[^\d]/g, '').length;
    
    // Format the value
    const formatted = formatSSN(value);
    
    setSsn(formatted);
    
    // Calculate new cursor position
    let newCursorPosition = 0;
    let digitCount = 0;
    
    for (let i = 0; i < formatted.length; i++) {
      if (/[0-9]/.test(formatted[i])) {
        digitCount++;
        if (digitCount === digitsBefore) {
          newCursorPosition = i + 1;
          break;
        }
      }
      if (digitCount < digitsBefore) {
        newCursorPosition = i + 1;
      }
    }
    
    // Ensure cursor is valid
    newCursorPosition = Math.max(0, Math.min(newCursorPosition, formatted.length));
    
    // Restore cursor position after React updates
    requestAnimationFrame(() => {
      if (ssnInputRef.current) {
        ssnInputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
      }
    });
  };

  const handleSSNKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const cursorPosition = input.selectionStart || 0;
    const value = input.value;
    
    // Handle backspace to remove separators
    if (e.key === 'Backspace' && cursorPosition > 0) {
      // If cursor is right after a separator, delete the separator and the digit before it
      const charBefore = value[cursorPosition - 1];
      if (charBefore === '-') {
        e.preventDefault();
        // Find the digit before the separator
        let newPos = cursorPosition - 1;
        while (newPos > 0 && !/[0-9]/.test(value[newPos - 1])) {
          newPos--;
        }
        if (newPos > 0) {
          const beforeSeparator = value.substring(0, newPos - 1);
          const afterSeparator = value.substring(cursorPosition);
          const newValue = beforeSeparator + afterSeparator;
          const formatted = formatSSN(newValue);
          setSsn(formatted);
          
          requestAnimationFrame(() => {
            if (ssnInputRef.current) {
              // Calculate new cursor position after formatting
              const digitsBefore = beforeSeparator.replace(/[^\d]/g, '').length;
              let pos = 0;
              let digitCount = 0;
              for (let i = 0; i < formatted.length; i++) {
                if (/[0-9]/.test(formatted[i])) {
                  digitCount++;
                  if (digitCount === digitsBefore) {
                    pos = i + 1;
                    break;
                  }
                }
                if (digitCount < digitsBefore) {
                  pos = i + 1;
                }
              }
              ssnInputRef.current.setSelectionRange(Math.max(0, pos), Math.max(0, pos));
            }
          });
        }
      }
    }
  };

  // Validation functions
  const validateFirstName = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed || trimmed.length < 1 || trimmed.length > 255) {
      return 'First name must be between 1 and 255 characters';
    }
    return null;
  };

  const validateLastName = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed || trimmed.length < 1 || trimmed.length > 255) {
      return 'Last name must be between 1 and 255 characters';
    }
    return null;
  };

  const validateEmail = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed || trimmed.length < 5 || trimmed.length > 128) {
      return 'Email must be between 5 and 128 characters';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      return 'Please enter a valid email address';
    }
    return null;
  };

  const validateDOB = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed) {
      return 'Date of birth is required';
    }
    // Check format YYYY-MM-DD
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(trimmed)) {
      return 'Date of birth must be in YYYY-MM-DD format';
    }
    const birthDate = new Date(trimmed);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;
    
    if (actualAge < 18 || actualAge > 100) {
      return 'Age must be between 18 and 100 years';
    }
    return null;
  };

  const validateZip = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed || !/^\d{5}$/.test(trimmed)) {
      return 'Zip code must be exactly 5 digits';
    }
    return null;
  };

  const validateCity = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed || trimmed.length < 2 || trimmed.length > 32) {
      return 'City must be between 2 and 32 characters';
    }
    return null;
  };

  const validateState = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed) {
      return 'State is required';
    }
    if (trimmed.toUpperCase() === 'NY') {
      return 'We do not provide service in New York';
    }
    return null;
  };

  const validateAddress = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed || trimmed.length < 2 || trimmed.length > 255) {
      return 'Address must be between 2 and 255 characters';
    }
    return null;
  };

  const validateEmployerName = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed || trimmed.length < 1 || trimmed.length > 255) {
      return 'Employer name must be between 1 and 255 characters';
    }
    return null;
  };

  const validateMonthlyIncome = (value: string): string | null => {
    const cleanValue = value.replace(/[^0-9.]/g, '');
    const numValue = parseFloat(cleanValue);
    if (isNaN(numValue) || numValue < 100 || numValue > 25000) {
      return 'Monthly income must be between $100 and $25,000';
    }
    return null;
  };

  const validateDate = (value: string, fieldName: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed) {
      return `${fieldName} is required`;
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(trimmed)) {
      return `${fieldName} must be in YYYY-MM-DD format`;
    }
    return null;
  };

  const validatePhone = (value: string, fieldName: string): string | null => {
    const cleanValue = value.replace(/\D/g, '');
    if (!cleanValue || cleanValue.length !== 10) {
      return `${fieldName} must be 10 digits`;
    }
    return null;
  };

  const validateSSN = (value: string): string | null => {
    const cleanValue = value.replace(/\D/g, '');
    if (!cleanValue || cleanValue.length !== 9) {
      return 'SSN must be 9 digits';
    }
    return null;
  };

  const validateBankRoutingNumber = (value: string): string | null => {
    const cleanValue = value.replace(/\D/g, '');
    if (!cleanValue || cleanValue.length !== 9) {
      return 'Bank routing number must be 9 digits';
    }
    return null;
  };

  const validateBankName = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed || trimmed.length < 1 || trimmed.length > 255) {
      return 'Bank name must be between 1 and 255 characters';
    }
    return null;
  };

  const validateBankAccountNumber = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed || trimmed.length < 3 || trimmed.length > 30) {
      return 'Bank account number must be between 3 and 30 characters';
    }
    return null;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Get TrustedForm certificate URL - try to get it if not already in state
      let certUrl = trustedFormCertUrl;
      if (!certUrl) {
        // Try to get certificate URL from the hidden input field
        const certUrlElement = document.getElementById('xxTrustedFormCertUrl_0') as HTMLInputElement;
        certUrl = certUrlElement?.value || '';
      }
      
      // Retrieve loanAmount from localStorage
      const STORAGE_KEY = 'usa-loans-selected-amount';
      const loanAmount = typeof window !== 'undefined' 
        ? localStorage.getItem(STORAGE_KEY) || '' 
        : '';
      
      // Clean phone numbers (remove formatting)
      const cleanPhone = phoneNumber.replace(/\D/g, '');
      const cleanHomePhone = homePhoneNumber.replace(/\D/g, '');
      const cleanWorkPhone = workPhoneNumber.replace(/\D/g, '');
      
      // Clean currency values (remove $ and spaces)
      const cleanMonthlyIncome = monthlyIncome.replace(/[^0-9.]/g, '');
      const cleanDebtAmount = debtAmount.replace(/[^0-9.]/g, '');
      const cleanMonthlyHousingPayment = monthlyHousingPayment.replace(/[^0-9.]/g, '');
      
      // Clean SSN (remove dashes)
      const cleanSsn = ssn.replace(/\D/g, '');
      
      // Validate all fields
      const validationErrors: string[] = [];
      
      // Validate required fields
      if (!loanAmount) validationErrors.push('Loan amount is required');
      
      const firstNameError = validateFirstName(firstName);
      if (firstNameError) validationErrors.push(firstNameError);
      
      const lastNameError = validateLastName(lastName);
      if (lastNameError) validationErrors.push(lastNameError);
      
      const emailError = validateEmail(email);
      if (emailError) validationErrors.push(emailError);
      
      const dobError = validateDOB(birthdate);
      if (dobError) validationErrors.push(dobError);
      
      const zipError = validateZip(zipCode);
      if (zipError) validationErrors.push(zipError);
      
      const cityError = validateCity(zipCodeCity);
      if (cityError) validationErrors.push(cityError);
      
      const stateError = validateState(driverLicenseState);
      if (stateError) validationErrors.push(stateError);
      
      const addressError = validateAddress(streetAddress);
      if (addressError) validationErrors.push(addressError);
      
      const cellPhoneError = validatePhone(phoneNumber, 'Cell phone');
      if (cellPhoneError) validationErrors.push(cellPhoneError);
      
      const homePhoneError = validatePhone(homePhoneNumber, 'Home phone');
      if (homePhoneError) validationErrors.push(homePhoneError);
      
      const workPhoneError = validatePhone(workPhoneNumber, 'Work phone');
      if (workPhoneError) validationErrors.push(workPhoneError);
      
      const ssnError = validateSSN(ssn);
      if (ssnError) validationErrors.push(ssnError);
      
      const employerNameError = validateEmployerName(employer);
      if (employerNameError) validationErrors.push(employerNameError);
      
      // Validate military (should be yes/no, will map to 1/0)
      if (!isMilitaryMember || (isMilitaryMember !== 'yes' && isMilitaryMember !== 'no')) {
        validationErrors.push('Military status is required');
      }
      
      const monthlyIncomeError = validateMonthlyIncome(monthlyIncome);
      if (monthlyIncomeError) validationErrors.push(monthlyIncomeError);
      
      const nextPayDateError = validateDate(nextPayDate, 'Next pay date');
      if (nextPayDateError) validationErrors.push(nextPayDateError);
      
      const secondPayDateError = validateDate(secondPayDate, 'Second pay date');
      if (secondPayDateError) validationErrors.push(secondPayDateError);
      
      // Validate payType (should be direct_deposit or check)
      if (!hasDirectDeposit || (hasDirectDeposit !== 'yes' && hasDirectDeposit !== 'no')) {
        validationErrors.push('Pay type is required');
      }
      
      const bankRoutingError = validateBankRoutingNumber(bankRoutingNumber);
      if (bankRoutingError) validationErrors.push(bankRoutingError);
      
      const bankNameError = validateBankName(bankName);
      if (bankNameError) validationErrors.push(bankNameError);
      
      const bankAccountNumberError = validateBankAccountNumber(bankAccountNumber);
      if (bankAccountNumberError) validationErrors.push(bankAccountNumberError);
      
      // Validate bankAccountType (should be checking or saving)
      if (!hasCheckingAccount || (hasCheckingAccount !== 'yes' && hasCheckingAccount !== 'no')) {
        validationErrors.push('Bank account type is required');
      }
      
      // If there are validation errors, show them and stop submission
      if (validationErrors.length > 0) {
        alert('Please fix the following errors:\n\n' + validationErrors.join('\n'));
        setIsSubmitting(false);
        return;
      }
      
      // Prepare all form data - matching payload variable names
      const formData = {
        // Personal Information
        loanAmount: loanAmount.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        dob: birthdate.trim(),
        ssn: cleanSsn,
        
        // Address Information
        zip: zipCode.trim(),
        city: zipCodeCity.trim(),
        state: driverLicenseState.trim(),
        address: streetAddress.trim(),
        monthsAtAddress: addressDuration.trim(),
        homeOwnership: homeOwnership.trim(),
        
        // Driver's License
        driversLicense: driverLicenseNumber.replace(/[^A-Za-z0-9]/g, '').toUpperCase(),
        driversLicenseState: driverLicenseState.trim(),
        
        // Phone Information
        cellPhone: cleanPhone,
        homePhone: cleanHomePhone,
        workPhone: cleanWorkPhone,
        
        // Employment Information
        employmentType: employmentStatus.trim(),
        employerName: employer.trim(),
        monthsEmployed: employerDuration.trim(),
        military: isMilitaryMember === 'yes' ? '1' : '0', // Map yes/no to 1/0
        
        // Income Information
        monthlyIncome: cleanMonthlyIncome,
        payFrequency: paymentFrequency.trim(),
        nextPayDate: nextPayDate.trim(),
        secondPayDate: secondPayDate.trim(),
        payType: hasDirectDeposit === 'yes' ? 'direct_deposit' : 'check', // Map hasDirectDeposit to payType
        
        // Banking Information
        bankRoutingNumber: bankRoutingNumber.replace(/\D/g, ''),
        bankName: bankName.trim(),
        bankAccountNumber: bankAccountNumber.trim(),
        bankAccountType: hasCheckingAccount === 'yes' ? 'checking' : 'saving', // Map yes/no to checking/saving
        monthsAtBank: bankAccountDuration.trim(),
        
        // Additional fields (not in user's list but needed for API)
        spendingPurpose: spendingPurpose.trim(),
        creditScore: creditScore.trim(),
        debtAmount: cleanDebtAmount,
        unsecuredDebtAmount: unsecuredDebtAmount.trim(),
        monthlyHousingPayment: cleanMonthlyHousingPayment,
        hasDirectDeposit: hasDirectDeposit.trim(),
        occupation: occupation.trim(),
        vehicleStatus: vehicleStatus.trim(),
        hasFiledBankruptcy: hasFiledBankruptcy.trim(),
        bankruptcyChapter: bankruptcyChapter.trim(),
        bankruptcyStatus: bankruptcyStatus.trim(),
        bankruptcyDischargedInLast2Years: bankruptcyDischargedInLast2Years.trim(),
        
        // Tracking Information
        subid1: subid1.trim(),
        subid2: subid2.trim(),
        subid3: subid3.trim(),
        trustedformCertUrl: certUrl,
      };
      
      // Submit to API
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Redirect to thank you page
        const redirectUrl = result.redirectUrl || `/thankyou?email=${encodeURIComponent(email.trim())}`;
        window.location.href = redirectUrl;
      } else {
        // Handle error
        alert(result.error || 'Failed to submit form. Please try again.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('An error occurred while submitting the form. Please try again.');
      setIsSubmitting(false);
    }
  };

  const formatDriverLicenseNumber = (value: string, state: string): string => {
    // Remove all non-alphanumeric characters and convert to upper case
    let cleanValue = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    
    // Get max length based on state
    const maxLength = stateLicenseFormats[state] || 9;
    
    // Limit length based on state
    cleanValue = cleanValue.substring(0, maxLength);
    
    // Format based on state patterns
    if (state === 'FL') {
      // Florida format: A123-456-78-901-0
      let formatted = '';
      if (cleanValue.length > 0) formatted = cleanValue[0];
      if (cleanValue.length > 1) formatted += cleanValue.slice(1, 4);
      if (cleanValue.length > 4) formatted += '-' + cleanValue.slice(4, 7);
      if (cleanValue.length > 7) formatted += '-' + cleanValue.slice(7, 9);
      if (cleanValue.length > 9) formatted += '-' + cleanValue.slice(9, 12);
      if (cleanValue.length > 12) formatted += '-' + cleanValue.slice(12);
      return formatted;
    } else if (state === 'CA') {
      // California format: A1234567 (no dashes)
      return cleanValue;
    } else {
      // Generic format with dashes every 3 characters
      return cleanValue.replace(/(.{3})/g, '$1-').replace(/-$/, '');
    }
  };

  const handleDriverLicenseNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const cursorPosition = input.selectionStart || 0;
    const value = input.value;
    
    // Store ref for cursor positioning
    driverLicenseInputRef.current = input;
    
    if (!driverLicenseState) {
      // Don't format if no state is selected
      setDriverLicenseNumber(value);
      return;
    }
    
    // Format the value based on state
    const formatted = formatDriverLicenseNumber(value, driverLicenseState);
    
    setDriverLicenseNumber(formatted);
    
    // Calculate new cursor position
    const beforeCursor = value.substring(0, cursorPosition);
    const cleanBefore = beforeCursor.replace(/[^A-Za-z0-9]/g, '').length;
    
    let newCursorPosition = 0;
    let charCount = 0;
    
    for (let i = 0; i < formatted.length; i++) {
      if (formatted[i].match(/[A-Za-z0-9]/)) {
        charCount++;
        if (charCount === cleanBefore) {
          newCursorPosition = i + 1;
          break;
        }
      }
      if (charCount < cleanBefore) {
        newCursorPosition = i + 1;
      }
    }
    
    // Ensure cursor is valid
    newCursorPosition = Math.max(0, Math.min(newCursorPosition, formatted.length));
    
    // Restore cursor position after React updates
    requestAnimationFrame(() => {
      if (driverLicenseInputRef.current) {
        driverLicenseInputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
      }
    });
  };

  const handleDriverLicenseNumberKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!driverLicenseState) {
      e.preventDefault();
      return;
    }
    
    const char = String.fromCharCode(e.keyCode || e.which);
    const regex = /[A-Za-z0-9]/;
    const maxLength = stateLicenseFormats[driverLicenseState] || 9;
    const currentValue = driverLicenseNumber.replace(/[^A-Za-z0-9]/g, '');
    
    if (!regex.test(char) || 
        (currentValue.length >= maxLength && 
         e.key !== 'Backspace' && 
         e.key !== 'Delete' &&
         e.key !== 'Tab')) {
      e.preventDefault();
    }
  };

  const formatRoutingNumber = (value: string): string => {
    // Remove all non-digit characters
    const digits = value.replace(/[^\d]/g, '').slice(0, 9); // Limit to 9 digits
    
    // Format as XXX-XXX-XXX
    if (digits.length === 0) return '';
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const handleRoutingNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const cursorPosition = input.selectionStart || 0;
    const value = input.value;
    
    // Store ref for cursor positioning
    routingNumberInputRef.current = input;
    
    // Get the numeric part before cursor to calculate new position
    const beforeCursor = value.substring(0, cursorPosition);
    
    // Count digits before cursor
    const digitsBefore = beforeCursor.replace(/[^\d]/g, '').length;
    
    // Format the value
    const formatted = formatRoutingNumber(value);
    
    setBankRoutingNumber(formatted);
    
    // Calculate new cursor position
    let newCursorPosition = 0;
    let digitCount = 0;
    
    for (let i = 0; i < formatted.length; i++) {
      if (formatted[i] !== '-') {
        digitCount++;
        if (digitCount === digitsBefore) {
          newCursorPosition = i + 1;
          break;
        }
      }
      if (digitCount < digitsBefore) {
        newCursorPosition = i + 1;
      }
    }
    
    // Ensure cursor is valid
    newCursorPosition = Math.max(0, Math.min(newCursorPosition, formatted.length));
    
    // Restore cursor position after React updates
    requestAnimationFrame(() => {
      if (routingNumberInputRef.current) {
        routingNumberInputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
      }
    });
  };

  const handleRoutingNumberKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const cursorPosition = input.selectionStart || 0;
    const value = input.value;
    
    // Handle backspace to remove dashes
    if (e.key === 'Backspace' && cursorPosition > 0) {
      // If cursor is right after a dash, delete the dash and the digit before it
      if (value[cursorPosition - 1] === '-') {
        e.preventDefault();
        const beforeDash = value.substring(0, cursorPosition - 1);
        const afterDash = value.substring(cursorPosition);
        const newValue = beforeDash + afterDash;
        const formatted = formatRoutingNumber(newValue);
        setBankRoutingNumber(formatted);
        
        requestAnimationFrame(() => {
          if (routingNumberInputRef.current) {
            const newPos = cursorPosition - 2;
            routingNumberInputRef.current.setSelectionRange(Math.max(0, newPos), Math.max(0, newPos));
          }
        });
      }
    }
  };

  const isStep1Complete = spendingPurpose !== '';

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Progress Bar */}
        <div className="mb-8 sm:mb-12">
          <ProgressBar progress={progress} />
        </div>

        {/* Form Steps */}
        <div className="space-y-6">

        {/* TrustedForm Integration */}
        <TrustedForm onCertUrlReady={handleTrustedFormReady} />

        {/* UTM Parameters - Values populated from state */}
        <input type="hidden" id="hidden_subid1" name="subid1" value={subid1} />
        <input type="hidden" id="hidden_subid2" name="subid2" value={subid2} />
        <input type="hidden" id="hidden_subid3" name="subid3" value={subid3} />

          {/* Step 1: Spending Purpose */}
          {currentStep === 1 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                How do you want to spend your money?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Select the primary purpose for your loan
              </p>
              
              {/* Dropdown */}
              <div className="mb-6">
                <Dropdown
                  options={spendingOptions}
                  value={spendingPurpose}
                  onChange={handleSpendingPurposeChange}
                  placeholder="Select a purpose..."
                  className="w-full"
                />
              </div>

              {/* Continue Button */}
              <button
                onClick={handleContinue}
                disabled={!isStep1Complete}
                className={`
                  w-full px-6 py-3.5 font-semibold rounded-lg shadow-md 
                  transition-all duration-200 flex items-center justify-center gap-2 group
                  ${isStep1Complete
                    ? 'bg-[#313863] text-white hover:bg-[#252b4d] cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                Continue
                <ArrowRight 
                  size={20} 
                  className={`
                    transition-transform duration-200
                    ${isStep1Complete ? 'group-hover:translate-x-1' : ''}
                  `} 
                />
              </button>
            </div>
          )}

          {/* Step 2: Credit Score */}
          {currentStep === 2 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                What is your estimated credit score?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Select the range that best matches your credit score
              </p>
              
              {/* Radio Group */}
              <div className="mb-6">
                <RadioGroup
                  value={creditScore}
                  onValueChange={handleCreditScoreChange}
                  orientation="vertical"
                  className="w-full space-y-3"
                >
                  {creditScoreOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        handleCreditScoreChange(option.value);
                      }}
                      className={`
                        border-2 rounded-lg transition-all duration-200
                        px-4 py-3.5 sm:px-5 sm:py-4
                        cursor-pointer
                        ${creditScore === option.value
                          ? 'border-[#313863] bg-[#313863]/5 shadow-md'
                          : 'border-gray-300 bg-white hover:border-[#313863]/50 hover:bg-gray-50'
                        }
                      `}
                    >
                      <RadioGroupItem
                        value={option.value}
                        label={option.label}
                      />
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Employment Status */}
          {currentStep === 3 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                What is your employment status?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Select your current employment status
              </p>
              
              {/* Radio Group */}
              <div className="mb-6">
                <RadioGroup
                  value={employmentStatus}
                  onValueChange={handleEmploymentStatusChange}
                  orientation="vertical"
                  className="w-full space-y-3"
                >
                  {employmentStatusOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        handleEmploymentStatusChange(option.value);
                      }}
                      className={`
                        border-2 rounded-lg transition-all duration-200
                        px-4 py-3.5 sm:px-5 sm:py-4
                        cursor-pointer
                        ${employmentStatus === option.value
                          ? 'border-[#313863] bg-[#313863]/5 shadow-md'
                          : 'border-gray-300 bg-white hover:border-[#313863]/50 hover:bg-gray-50'
                        }
                      `}
                    >
                      <RadioGroupItem
                        value={option.value}
                        label={option.label}
                      />
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Payment Frequency */}
          {currentStep === 4 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                How often are you paid?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Select your payment frequency
              </p>
              
              {/* Radio Group */}
              <div className="mb-6">
                <RadioGroup
                  value={paymentFrequency}
                  onValueChange={handlePaymentFrequencyChange}
                  orientation="vertical"
                  className="w-full space-y-3"
                >
                  {paymentFrequencyOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        handlePaymentFrequencyChange(option.value);
                      }}
                      className={`
                        border-2 rounded-lg transition-all duration-200
                        px-4 py-3.5 sm:px-5 sm:py-4
                        cursor-pointer
                        ${paymentFrequency === option.value
                          ? 'border-[#313863] bg-[#313863]/5 shadow-md'
                          : 'border-gray-300 bg-white hover:border-[#313863]/50 hover:bg-gray-50'
                        }
                      `}
                    >
                      <RadioGroupItem
                        value={option.value}
                        label={option.label}
                      />
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Monthly Income */}
          {currentStep === 5 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                What is your monthly income?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base leading-relaxed">
                You are not required to disclose income that is alimony, child support, or separate maintenance unless you want that income considered as a basis for repayment. You may increase any non-taxable income or benefits by 25%.
              </p>
              
              {/* Currency Input */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    ref={incomeInputRef}
                    type="text"
                    value={monthlyIncome}
                    onChange={handleMonthlyIncomeChange}
                    onKeyDown={handleMonthlyIncomeKeyDown}
                    onFocus={(e) => {
                      // Position cursor after '$ ' when focused
                      if (e.target.value === '$ ' || e.target.value === '$') {
                        e.target.setSelectionRange(2, 2);
                      } else if (e.target.selectionStart === 0 || e.target.selectionStart === 1 || e.target.selectionStart === null) {
                        e.target.setSelectionRange(2, 2);
                      }
                    }}
                    className={`
                      w-full px-4 py-3.5 text-base
                      border-2 rounded-lg
                      transition-all duration-200
                      focus:outline-none
                      ${monthlyIncome && monthlyIncome.length > 2
                        ? 'border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                        : 'border-gray-300 focus:border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                      }
                      text-[--text] font-medium
                    `}
                  />
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (isStep5Complete) {
                      setCurrentStep(6);
                      setProgress(calculateProgress(6));
                    }
                  }}
                  disabled={!isStep5Complete}
                  className={`
                    flex-1 px-6 py-3.5 font-semibold rounded-lg shadow-md 
                    transition-all duration-200 flex items-center justify-center gap-2 group
                    ${isStep5Complete
                      ? 'bg-[#313863] text-white hover:bg-[#252b4d] cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  Continue
                  <ArrowRight 
                    size={20} 
                    className={`
                      transition-transform duration-200
                      ${isStep5Complete ? 'group-hover:translate-x-1' : ''}
                    `} 
                  />
                </button>
              </div>
            </div>
          )}

          {/* Step 6: Debt Amount */}
          {currentStep === 6 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                What is your debt amount?
              </h2>
              
              {/* Currency Input */}
              <div className="mb-6 mt-8">
                <div className="relative">
                  <input
                    ref={debtInputRef}
                    type="text"
                    value={debtAmount}
                    onChange={handleDebtAmountChange}
                    onKeyDown={handleDebtAmountKeyDown}
                    onFocus={(e) => {
                      // Position cursor after '$ ' when focused
                      if (e.target.value === '$ ' || e.target.value === '$') {
                        e.target.setSelectionRange(2, 2);
                      } else if (e.target.selectionStart === 0 || e.target.selectionStart === 1 || e.target.selectionStart === null) {
                        e.target.setSelectionRange(2, 2);
                      }
                    }}
                    className={`
                      w-full px-4 py-3.5 text-base
                      border-2 rounded-lg
                      transition-all duration-200
                      focus:outline-none
                      ${debtAmount && debtAmount.length > 2
                        ? 'border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                        : 'border-gray-300 focus:border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                      }
                      text-[--text] font-medium
                    `}
                  />
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (isStep6Complete) {
                      setCurrentStep(7);
                      setProgress(calculateProgress(7));
                      isNavigatingBackRef.current = false;
                    }
                  }}
                  disabled={!isStep6Complete}
                  className={`
                    flex-1 px-6 py-3.5 font-semibold rounded-lg shadow-md 
                    transition-all duration-200 flex items-center justify-center gap-2 group
                    ${isStep6Complete
                      ? 'bg-[#313863] text-white hover:bg-[#252b4d] cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  Continue
                  <ArrowRight 
                    size={20} 
                    className={`
                      transition-transform duration-200
                      ${isStep6Complete ? 'group-hover:translate-x-1' : ''}
                    `} 
                  />
                </button>
              </div>
            </div>
          )}

          {/* Step 7: Next Pay Date */}
          {currentStep === 7 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                What is your next pay date?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Select your next expected pay date
              </p>
              
              {/* Date Picker */}
              <div className="mb-6">
                <DatePicker
                  value={nextPayDate}
                  onChange={handleNextPayDateChange}
                  placeholder="Select your next pay date..."
                  className="w-full"
                  minDate={new Date()}
                />
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (isStep7Complete) {
                      setCurrentStep(8);
                      setProgress(calculateProgress(8));
                    }
                  }}
                  disabled={!isStep7Complete}
                  className={`
                    flex-1 px-6 py-3.5 font-semibold rounded-lg shadow-md 
                    transition-all duration-200 flex items-center justify-center gap-2 group
                    ${isStep7Complete
                      ? 'bg-[#313863] text-white hover:bg-[#252b4d] cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  Continue
                  <ArrowRight 
                    size={20} 
                    className={`
                      transition-transform duration-200
                      ${isStep7Complete ? 'group-hover:translate-x-1' : ''}
                    `} 
                  />
                </button>
              </div>
            </div>
          )}

          {/* Step 8: Second Pay Date */}
          {currentStep === 8 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                What is your second pay date?
              </h2>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                Select your second expected pay date
              </p>
              
              {/* Helper Message */}
              {getSecondPayDateMessage() && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    {getSecondPayDateMessage()}
                  </p>
                </div>
              )}
              
              {/* Date Picker */}
              <div className="mb-6">
                <DatePicker
                  value={secondPayDate}
                  onChange={handleSecondPayDateChange}
                  placeholder="Select your second pay date..."
                  className="w-full"
                  minDate={getSecondPayDateRange().minDate || new Date()}
                  maxDate={getSecondPayDateRange().maxDate || undefined}
                />
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (isStep8Complete) {
                      setCurrentStep(9);
                      setProgress(calculateProgress(9));
                    }
                  }}
                  disabled={!isStep8Complete}
                  className={`
                    flex-1 px-6 py-3.5 font-semibold rounded-lg shadow-md 
                    transition-all duration-200 flex items-center justify-center gap-2 group
                    ${isStep8Complete
                      ? 'bg-[#313863] text-white hover:bg-[#252b4d] cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  Continue
                  <ArrowRight 
                    size={20} 
                    className={`
                      transition-transform duration-200
                      ${isStep8Complete ? 'group-hover:translate-x-1' : ''}
                    `} 
                  />
                </button>
              </div>
            </div>
          )}

          {/* Step 9: Checking Account */}
          {currentStep === 9 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                Do you have a checking account?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Select your option
              </p>

              {/* Radio Group */}
              <div className="mb-6">
                <RadioGroup
                  value={hasCheckingAccount}
                  onValueChange={handleCheckingAccountChange}
                  orientation="vertical"
                  className="w-full space-y-3"
                >
                  <div
                    onClick={() => {
                      handleCheckingAccountChange('yes');
                    }}
                    className={`
                      border-2 rounded-lg transition-all duration-200
                      px-4 py-3.5 sm:px-5 sm:py-4
                      cursor-pointer
                      ${hasCheckingAccount === 'yes'
                        ? 'border-[#313863] bg-[#313863]/5 shadow-md'
                        : 'border-gray-300 bg-white hover:border-[#313863]/50 hover:bg-gray-50'
                      }
                    `}
                  >
                    <RadioGroupItem
                      value="yes"
                      label="Yes"
                    />
                  </div>
                  <div
                    onClick={() => {
                      handleCheckingAccountChange('no');
                    }}
                    className={`
                      border-2 rounded-lg transition-all duration-200
                      px-4 py-3.5 sm:px-5 sm:py-4
                      cursor-pointer
                      ${hasCheckingAccount === 'no'
                        ? 'border-[#313863] bg-[#313863]/5 shadow-md'
                        : 'border-gray-300 bg-white hover:border-[#313863]/50 hover:bg-gray-50'
                      }
                    `}
                  >
                    <RadioGroupItem
                      value="no"
                      label="No"
                    />
                  </div>
                </RadioGroup>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
              </div>
            </div>
          )}

          {/* Step 10: Direct Deposit */}
          {currentStep === 10 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                Do you have a direct deposit?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Select your option
              </p>

              {/* Radio Group */}
              <div className="mb-6">
                <RadioGroup
                  value={hasDirectDeposit}
                  onValueChange={handleDirectDepositChange}
                  orientation="vertical"
                  className="w-full space-y-3"
                >
                  <div
                    onClick={() => {
                      handleDirectDepositChange('yes');
                    }}
                    className={`
                      border-2 rounded-lg transition-all duration-200
                      px-4 py-3.5 sm:px-5 sm:py-4
                      cursor-pointer
                      ${hasDirectDeposit === 'yes'
                        ? 'border-[#313863] bg-[#313863]/5 shadow-md'
                        : 'border-gray-300 bg-white hover:border-[#313863]/50 hover:bg-gray-50'
                      }
                    `}
                  >
                    <RadioGroupItem
                      value="yes"
                      label="Yes"
                    />
                  </div>
                  <div
                    onClick={(e) => {
                      // Only trigger if click is not on the label itself
                      if (!(e.target as HTMLElement).closest('label')) {
                        handleDirectDepositChange('no');
                      }
                    }}
                    className={`
                      border-2 rounded-lg transition-all duration-200
                      px-4 py-3.5 sm:px-5 sm:py-4
                      cursor-pointer
                      ${hasDirectDeposit === 'no'
                        ? 'border-[#313863] bg-[#313863]/5 shadow-md'
                        : 'border-gray-300 bg-white hover:border-[#313863]/50 hover:bg-gray-50'
                      }
                    `}
                  >
                    <RadioGroupItem
                      value="no"
                      label="No"
                    />
                  </div>
                </RadioGroup>
              </div>

              {/* Warning/Tip Container - Shows when "No" is selected */}
              {hasDirectDeposit === 'no' && (
                <div className="mb-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-lg">
                  <p className="text-sm sm:text-base text-amber-800 font-medium">
                    Individuals who have a Direct Deposit have a higher chance of getting connected with a lender and/or lending partner.
                  </p>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
                {/* Show Continue button only when "No" is selected */}
                {hasDirectDeposit === 'no' && (
                  <button
                    onClick={() => {
                      if (isStep10Complete) {
                        setCurrentStep(11);
                        setProgress(calculateProgress(11));
                      }
                    }}
                    disabled={!isStep10Complete}
                    className={`
                      flex-1 px-6 py-3.5 font-semibold rounded-lg shadow-md 
                      transition-all duration-200 flex items-center justify-center gap-2 group
                      ${isStep10Complete
                        ? 'bg-[#313863] text-white hover:bg-[#252b4d] cursor-pointer'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }
                    `}
                  >
                    Continue
                    <ArrowRight 
                      size={20} 
                      className={`
                        transition-transform duration-200
                        ${isStep10Complete ? 'group-hover:translate-x-1' : ''}
                      `} 
                    />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Step 11: Bank Account Duration */}
          {currentStep === 11 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                How long have you had your current bank account?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Select the duration you&apos;ve had your current bank account
              </p>

              {/* Dropdown */}
              <div className="mb-6">
                <Dropdown
                  options={bankAccountDurationOptions}
                  value={bankAccountDuration}
                  onChange={handleBankAccountDurationChange}
                  placeholder="Select duration..."
                  className="w-full"
                />
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (isStep11Complete) {
                      setCurrentStep(12);
                      setProgress(calculateProgress(12));
                    }
                  }}
                  disabled={!isStep11Complete}
                  className={`
                    flex-1 px-6 py-3.5 font-semibold rounded-lg shadow-md 
                    transition-all duration-200 flex items-center justify-center gap-2 group
                    ${isStep11Complete
                      ? 'bg-[#313863] text-white hover:bg-[#252b4d] cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  Continue
                  <ArrowRight 
                    size={20} 
                    className={`
                      transition-transform duration-200
                      ${isStep11Complete ? 'group-hover:translate-x-1' : ''}
                    `} 
                  />
                </button>
              </div>
            </div>
          )}

          {/* Step 12: Bank Routing Number */}
          {currentStep === 12 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                What is your bank routing number?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Enter your 9-digit bank routing number
              </p>

              {/* Routing Number Input */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    ref={routingNumberInputRef}
                    type="text"
                    value={bankRoutingNumber}
                    onChange={handleRoutingNumberChange}
                    onKeyDown={handleRoutingNumberKeyDown}
                    placeholder="123-456-789"
                    maxLength={11}
                    className={`
                      w-full px-4 py-3.5 text-base
                      border-2 rounded-lg
                      transition-all duration-200
                      focus:outline-none
                      ${bankRoutingNumber && bankRoutingNumber.replace(/[^\d]/g, '').length === 9
                        ? 'border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                        : 'border-gray-300 focus:border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                      }
                      text-[--text] font-medium
                    `}
                  />
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (isStep12Complete) {
                      setCurrentStep(13);
                      setProgress(calculateProgress(13));
                    }
                  }}
                  disabled={!isStep12Complete}
                  className={`
                    flex-1 px-6 py-3.5 font-semibold rounded-lg shadow-md 
                    transition-all duration-200 flex items-center justify-center gap-2 group
                    ${isStep12Complete
                      ? 'bg-[#313863] text-white hover:bg-[#252b4d] cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  Continue
                  <ArrowRight 
                    size={20} 
                    className={`
                      transition-transform duration-200
                      ${isStep12Complete ? 'group-hover:translate-x-1' : ''}
                    `} 
                  />
                </button>
              </div>
            </div>
          )}

          {/* Step 13: Bank Name */}
          {currentStep === 13 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                What is your Bank Name?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Enter the name of your bank
              </p>

              {/* Bank Name Input */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="Enter your bank name"
                    className={`
                      w-full px-4 py-3.5 text-base
                      border-2 rounded-lg
                      transition-all duration-200
                      focus:outline-none
                      ${bankName.trim() !== ''
                        ? 'border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                        : 'border-gray-300 focus:border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                      }
                      text-[--text] font-medium
                    `}
                  />
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (isStep13Complete) {
                      setCurrentStep(14);
                      setProgress(calculateProgress(14));
                    }
                  }}
                  disabled={!isStep13Complete}
                  className={`
                    flex-1 px-6 py-3.5 font-semibold rounded-lg shadow-md 
                    transition-all duration-200 flex items-center justify-center gap-2 group
                    ${isStep13Complete
                      ? 'bg-[#313863] text-white hover:bg-[#252b4d] cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  Continue
                  <ArrowRight 
                    size={20} 
                    className={`
                      transition-transform duration-200
                      ${isStep13Complete ? 'group-hover:translate-x-1' : ''}
                    `} 
                  />
                </button>
              </div>
            </div>
          )}

          {/* Step 14: Bank Account Number */}
          {currentStep === 14 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                What is your bank account number?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Enter your bank account number
              </p>

              {/* Bank Account Number Input */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    value={bankAccountNumber}
                    onChange={(e) => setBankAccountNumber(e.target.value)}
                    placeholder="Enter your bank account number"
                    className={`
                      w-full px-4 py-3.5 text-base
                      border-2 rounded-lg
                      transition-all duration-200
                      focus:outline-none
                      ${bankAccountNumber.trim() !== ''
                        ? 'border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                        : 'border-gray-300 focus:border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                      }
                      text-[--text] font-medium
                    `}
                  />
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (isStep14Complete) {
                      setCurrentStep(15);
                      setProgress(calculateProgress(15));
                    }
                  }}
                  disabled={!isStep14Complete}
                  className={`
                    flex-1 px-6 py-3.5 font-semibold rounded-lg shadow-md 
                    transition-all duration-200 flex items-center justify-center gap-2 group
                    ${isStep14Complete
                      ? 'bg-[#313863] text-white hover:bg-[#252b4d] cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  Continue
                  <ArrowRight 
                    size={20} 
                    className={`
                      transition-transform duration-200
                      ${isStep14Complete ? 'group-hover:translate-x-1' : ''}
                    `} 
                  />
                </button>
              </div>
            </div>
          )}

          {/* Step 15: Zip Code */}
          {currentStep === 15 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                What is your Zip Code?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Enter your 5-digit zip code
              </p>

              {/* Zip Code Input */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    value={zipCode}
                    onChange={handleZipCodeChange}
                    placeholder="12345"
                    maxLength={5}
                    className={`
                      w-full px-4 py-3.5 text-base
                      border-2 rounded-lg
                      transition-all duration-200
                      focus:outline-none
                      ${zipCodeError
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : zipCode.length === 5
                          ? 'border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                          : 'border-gray-300 focus:border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                      }
                      text-[--text] font-medium
                    `}
                  />
                </div>
              </div>

              {/* Error/Warning Message */}
              {zipCodeError && (
                <div className={`mb-6 p-4 rounded-lg border-2 ${
                  zipCodeError.includes('don\'t provide service')
                    ? 'bg-red-50 border-red-200'
                    : 'bg-red-50 border-red-200'
                }`}>
                  <p className={`text-sm sm:text-base font-medium ${
                    zipCodeError.includes('don\'t provide service')
                      ? 'text-red-800'
                      : 'text-red-800'
                  }`}>
                    {zipCodeError}
                  </p>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
                <button
                  onClick={handleZipCodeContinue}
                  disabled={zipCode.length !== 5 || isValidatingZip}
                  className={`
                    flex-1 px-6 py-3.5 font-semibold rounded-lg shadow-md 
                    transition-all duration-200 flex items-center justify-center gap-2 group
                    ${zipCode.length === 5 && !isValidatingZip
                      ? 'bg-[#313863] text-white hover:bg-[#252b4d] cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  {isValidatingZip ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Validating...
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight 
                        size={20} 
                        className={`
                          transition-transform duration-200
                          ${zipCode.length === 5 && !isValidatingZip ? 'group-hover:translate-x-1' : ''}
                        `} 
                      />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 16: Street Address */}
          {currentStep === 16 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                What is your Street Address?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Enter your street address
              </p>

              {/* Street Address Input */}
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="Enter your street address"
                    className={`
                      w-full px-4 py-3.5 text-base
                      border-2 rounded-lg
                      transition-all duration-200
                      focus:outline-none
                      ${streetAddress.trim() !== ''
                        ? 'border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                        : 'border-gray-300 focus:border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                      }
                      text-[--text] font-medium
                    `}
                  />
                </div>
              </div>

              {/* City Name Display */}
              {zipCodeCity && (
                <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm sm:text-base text-blue-800 font-medium">
                    City: <span className="font-semibold">{zipCodeCity}</span>
                  </p>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (isStep16Complete) {
                      setCurrentStep(17);
                      setProgress(calculateProgress(17));
                    }
                  }}
                  disabled={!isStep16Complete}
                  className={`
                    flex-1 px-6 py-3.5 font-semibold rounded-lg shadow-md 
                    transition-all duration-200 flex items-center justify-center gap-2 group
                    ${isStep16Complete
                      ? 'bg-[#313863] text-white hover:bg-[#252b4d] cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  Continue
                  <ArrowRight 
                    size={20} 
                    className={`
                      transition-transform duration-200
                      ${isStep16Complete ? 'group-hover:translate-x-1' : ''}
                    `} 
                  />
                </button>
              </div>
            </div>
          )}

          {/* Step 17: Home Ownership */}
          {currentStep === 17 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                Do you own or rent your home?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Select your option
              </p>

              {/* Radio Group */}
              <div className="mb-6">
                <RadioGroup
                  value={homeOwnership}
                  onValueChange={handleHomeOwnershipChange}
                  orientation="vertical"
                  className="w-full space-y-3"
                >
                  <div
                    onClick={() => {
                      handleHomeOwnershipChange('own');
                    }}
                    className={`
                      border-2 rounded-lg transition-all duration-200
                      px-4 py-3.5 sm:px-5 sm:py-4
                      cursor-pointer
                      ${homeOwnership === 'own'
                        ? 'border-[#313863] bg-[#313863]/5 shadow-md'
                        : 'border-gray-300 bg-white hover:border-[#313863]/50 hover:bg-gray-50'
                      }
                    `}
                  >
                    <RadioGroupItem
                      value="own"
                      label="Own"
                    />
                  </div>
                  <div
                    onClick={() => {
                      handleHomeOwnershipChange('rent');
                    }}
                    className={`
                      border-2 rounded-lg transition-all duration-200
                      px-4 py-3.5 sm:px-5 sm:py-4
                      cursor-pointer
                      ${homeOwnership === 'rent'
                        ? 'border-[#313863] bg-[#313863]/5 shadow-md'
                        : 'border-gray-300 bg-white hover:border-[#313863]/50 hover:bg-gray-50'
                      }
                    `}
                  >
                    <RadioGroupItem
                      value="rent"
                      label="Rent"
                    />
                  </div>
                </RadioGroup>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
              </div>
            </div>
          )}

          {/* Step 18: Address Duration */}
          {currentStep === 18 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                How long have you been at this address?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Select the duration you&apos;ve been at this address
              </p>

              {/* Radio Group */}
              <div className="mb-6">
                <RadioGroup
                  value={addressDuration}
                  onValueChange={handleAddressDurationChange}
                  orientation="vertical"
                  className="w-full space-y-3"
                >
                  {addressDurationOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={(e) => {
                        // Only trigger if click is not on the label itself
                        if (!(e.target as HTMLElement).closest('label')) {
                          handleAddressDurationChange(option.value);
                        }
                      }}
                      className={`
                        border-2 rounded-lg transition-all duration-200
                        px-4 py-3.5 sm:px-5 sm:py-4
                        cursor-pointer
                        ${addressDuration === option.value
                          ? 'border-[#313863] bg-[#313863]/5 shadow-md'
                          : 'border-gray-300 bg-white hover:border-[#313863]/50 hover:bg-gray-50'
                        }
                      `}
                    >
                      <RadioGroupItem
                        value={option.value}
                        label={option.label}
                      />
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
              </div>
            </div>
          )}

          {/* Step 19: Email Address */}
          {currentStep === 19 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                What is your email address?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Enter your email address
              </p>

              {/* Email Input */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email address"
                    className={`
                      w-full px-4 py-3.5 text-base
                      border-2 rounded-lg
                      transition-all duration-200
                      focus:outline-none
                      ${isStep19Complete
                        ? 'border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                        : email.trim() !== '' && !isStep19Complete
                          ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                          : 'border-gray-300 focus:border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                      }
                      text-[--text] font-medium
                    `}
                  />
                </div>
                {email.trim() !== '' && !isStep19Complete && (
                  <p className="mt-2 text-sm text-red-600">
                    Please enter a valid email address
                  </p>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (isStep19Complete) {
                      setCurrentStep(20);
                      setProgress(calculateProgress(20));
                    }
                  }}
                  disabled={!isStep19Complete}
                  className={`
                    flex-1 px-6 py-3.5 font-semibold rounded-lg shadow-md 
                    transition-all duration-200 flex items-center justify-center gap-2 group
                    ${isStep19Complete
                      ? 'bg-[#313863] text-white hover:bg-[#252b4d] cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  Continue
                  <ArrowRight 
                    size={20} 
                    className={`
                      transition-transform duration-200
                      ${isStep19Complete ? 'group-hover:translate-x-1' : ''}
                    `} 
                  />
                </button>
              </div>
            </div>
          )}

          {/* Step 20: Vehicle Registration Status */}
          {currentStep === 20 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                Do you have a vehicle registered in your name?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Select your option
              </p>

              {/* Radio Group */}
              <div className="mb-6">
                <RadioGroup
                  value={vehicleStatus}
                  onValueChange={handleVehicleStatusChange}
                  orientation="vertical"
                  className="w-full space-y-3"
                >
                  {vehicleStatusOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        handleVehicleStatusChange(option.value);
                      }}
                      className={`
                        border-2 rounded-lg transition-all duration-200
                        px-4 py-3.5 sm:px-5 sm:py-4
                        cursor-pointer
                        ${vehicleStatus === option.value
                          ? 'border-[#313863] bg-[#313863]/5 shadow-md'
                          : 'border-gray-300 bg-white hover:border-[#313863]/50 hover:bg-gray-50'
                        }
                      `}
                    >
                      <RadioGroupItem
                        value={option.value}
                        label={option.label}
                      />
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
              </div>
            </div>
          )}

          {/* Step 21: Driver's License Issuing State */}
          {currentStep === 21 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                What is your Driver&apos;s License Issuing State?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Select the state where your driver&apos;s license was issued
              </p>

              {/* Dropdown with Search */}
              <div className="mb-6">
                <Dropdown
                  options={driverLicenseStateOptions}
                  value={driverLicenseState}
                  onChange={handleDriverLicenseStateChange}
                  placeholder="Select a state..."
                  className="w-full"
                  searchable={true}
                />
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (isStep21Complete) {
                      setCurrentStep(22);
                      setProgress(calculateProgress(22));
                    }
                  }}
                  disabled={!isStep21Complete}
                  className={`
                    flex-1 px-6 py-3.5 font-semibold rounded-lg shadow-md 
                    transition-all duration-200 flex items-center justify-center gap-2 group
                    ${isStep21Complete
                      ? 'bg-[#313863] text-white hover:bg-[#252b4d] cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  Continue
                  <ArrowRight 
                    size={20} 
                    className={`
                      transition-transform duration-200
                      ${isStep21Complete ? 'group-hover:translate-x-1' : ''}
                    `} 
                  />
                </button>
              </div>
            </div>
          )}

          {/* Step 22: Driver's License Number */}
          {currentStep === 22 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                What is your Driving License Number?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                {driverLicenseState 
                  ? `Enter your ${driverLicenseStateOptions.find(opt => opt.value === driverLicenseState)?.label} driver's license number`
                  : 'Please select your driver\'s license state first'}
              </p>

              {/* Warning if no state selected */}
              {!driverLicenseState && (
                <div className="mb-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-lg">
                  <p className="text-sm sm:text-base text-amber-800 font-medium">
                    Please go back and select your driver&apos;s license issuing state first.
                  </p>
                </div>
              )}

              {/* Driver License Number Input */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    ref={driverLicenseInputRef}
                    type="text"
                    value={driverLicenseNumber}
                    onChange={handleDriverLicenseNumberChange}
                    onKeyPress={handleDriverLicenseNumberKeyPress}
                    placeholder={driverLicenseState 
                      ? `Enter your ${driverLicenseStateOptions.find(opt => opt.value === driverLicenseState)?.label} license number`
                      : 'Select state first'}
                    disabled={!driverLicenseState}
                    className={`
                      w-full px-4 py-3.5 text-base
                      border-2 rounded-lg
                      transition-all duration-200
                      focus:outline-none
                      ${!driverLicenseState
                        ? 'border-gray-200 bg-gray-50 cursor-not-allowed text-gray-400'
                        : isStep22Complete
                          ? 'border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                          : driverLicenseNumber.trim() !== '' && !isStep22Complete
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                            : 'border-gray-300 focus:border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                      }
                      text-[--text] font-medium uppercase
                    `}
                  />
                </div>
                {driverLicenseState && driverLicenseNumber.trim() !== '' && !isStep22Complete && (
                  <p className="mt-2 text-sm text-red-600">
                    {`Please enter a valid ${driverLicenseStateOptions.find(opt => opt.value === driverLicenseState)?.label} driver's license number (${stateLicenseFormats[driverLicenseState] || 9} characters)`}
                  </p>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (isStep22Complete) {
                      setCurrentStep(23);
                      setProgress(calculateProgress(23));
                    }
                  }}
                  disabled={!isStep22Complete}
                  className={`
                    flex-1 px-6 py-3.5 font-semibold rounded-lg shadow-md 
                    transition-all duration-200 flex items-center justify-center gap-2 group
                    ${isStep22Complete
                      ? 'bg-[#313863] text-white hover:bg-[#252b4d] cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  Continue
                  <ArrowRight 
                    size={20} 
                    className={`
                      transition-transform duration-200
                      ${isStep22Complete ? 'group-hover:translate-x-1' : ''}
                    `} 
                  />
                </button>
              </div>
            </div>
          )}

          {/* Step 23: Military Member */}
          {currentStep === 23 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                Are you a Military Member?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Select your option
              </p>

              {/* Radio Group */}
              <div className="mb-6">
                <RadioGroup
                  value={isMilitaryMember}
                  onValueChange={handleMilitaryMemberChange}
                  orientation="vertical"
                  className="w-full space-y-3"
                >
                  <div
                    onClick={() => {
                      handleMilitaryMemberChange('yes');
                    }}
                    className={`
                      border-2 rounded-lg transition-all duration-200
                      px-4 py-3.5 sm:px-5 sm:py-4
                      cursor-pointer
                      ${isMilitaryMember === 'yes'
                        ? 'border-[#313863] bg-[#313863]/5 shadow-md'
                        : 'border-gray-300 bg-white hover:border-[#313863]/50 hover:bg-gray-50'
                      }
                    `}
                  >
                    <RadioGroupItem
                      value="yes"
                      label="Yes"
                    />
                  </div>
                  <div
                    onClick={() => {
                      handleMilitaryMemberChange('no');
                    }}
                    className={`
                      border-2 rounded-lg transition-all duration-200
                      px-4 py-3.5 sm:px-5 sm:py-4
                      cursor-pointer
                      ${isMilitaryMember === 'no'
                        ? 'border-[#313863] bg-[#313863]/5 shadow-md'
                        : 'border-gray-300 bg-white hover:border-[#313863]/50 hover:bg-gray-50'
                      }
                    `}
                  >
                    <RadioGroupItem
                      value="no"
                      label="No"
                    />
                  </div>
                </RadioGroup>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
              </div>
            </div>
          )}

          {/* Step 24: Unsecured Debt Amount */}
          {currentStep === 24 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                How much unsecured debt do you have?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base leading-relaxed">
                This is the total amount of unsecured debt you have, including credit cards, personal loans, and other unsecured debts.
              </p>

              {/* Radio Group */}
              <div className="mb-6">
                <RadioGroup
                  value={unsecuredDebtAmount}
                  onValueChange={handleUnsecuredDebtAmountChange}
                  orientation="vertical"
                  className="w-full space-y-3"
                >
                  {unsecuredDebtAmountOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        handleUnsecuredDebtAmountChange(option.value);
                      }}
                      className={`
                        border-2 rounded-lg transition-all duration-200
                        px-4 py-3.5 sm:px-5 sm:py-4
                        cursor-pointer
                        ${unsecuredDebtAmount === option.value
                          ? 'border-[#313863] bg-[#313863]/5 shadow-md'
                          : 'border-gray-300 bg-white hover:border-[#313863]/50 hover:bg-gray-50'
                        }
                      `}
                    >
                      <RadioGroupItem
                        value={option.value}
                        label={option.label}
                      />
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
              </div>
            </div>
          )}

          {/* Step 25: Employer */}
          {currentStep === 25 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                Who is your Employer?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Enter your employer&apos;s name
              </p>

              {/* Employer Input */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    value={employer}
                    onChange={handleEmployerChange}
                    placeholder="Enter your employer's name"
                    className={`
                      w-full px-4 py-3.5 text-base
                      border-2 rounded-lg
                      transition-all duration-200
                      focus:outline-none
                      ${employer.trim() !== ''
                        ? 'border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                        : 'border-gray-300 focus:border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                      }
                      text-[--text] font-medium
                    `}
                  />
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (isStep25Complete) {
                      setCurrentStep(26);
                      setProgress(calculateProgress(26));
                    }
                  }}
                  disabled={!isStep25Complete}
                  className={`
                    flex-1 px-6 py-3.5 font-semibold rounded-lg shadow-md 
                    transition-all duration-200 flex items-center justify-center gap-2 group
                    ${isStep25Complete
                      ? 'bg-[#313863] text-white hover:bg-[#252b4d] cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  Continue
                  <ArrowRight 
                    size={20} 
                    className={`
                      transition-transform duration-200
                      ${isStep25Complete ? 'group-hover:translate-x-1' : ''}
                    `} 
                  />
                </button>
              </div>
            </div>
          )}

          {/* Step 26: Employer Duration */}
          {currentStep === 26 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                How long have you been at your employer?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Select the duration you&apos;ve been with your current employer
              </p>

              {/* Radio Group */}
              <div className="mb-6">
                <RadioGroup
                  value={employerDuration}
                  onValueChange={handleEmployerDurationChange}
                  orientation="vertical"
                  className="w-full space-y-3"
                >
                  {employerDurationOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={(e) => {
                        // Only trigger if click is not on the label itself
                        if (!(e.target as HTMLElement).closest('label')) {
                          handleEmployerDurationChange(option.value);
                        }
                      }}
                      className={`
                        border-2 rounded-lg transition-all duration-200
                        px-4 py-3.5 sm:px-5 sm:py-4
                        cursor-pointer
                        ${employerDuration === option.value
                          ? 'border-[#313863] bg-[#313863]/5 shadow-md'
                          : 'border-gray-300 bg-white hover:border-[#313863]/50 hover:bg-gray-50'
                        }
                      `}
                    >
                      <RadioGroupItem
                        value={option.value}
                        label={option.label}
                      />
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
              </div>
            </div>
          )}

          {/* Step 27: Occupation */}
          {currentStep === 27 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                What is your occupation?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Enter your current occupation or job title
              </p>

              {/* Occupation Input */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    value={occupation}
                    onChange={handleOccupationChange}
                    placeholder="Enter your occupation"
                    className={`
                      w-full px-4 py-3.5 text-base
                      border-2 rounded-lg
                      transition-all duration-200
                      focus:outline-none
                      ${occupation.trim() !== ''
                        ? 'border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                        : 'border-gray-300 focus:border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                      }
                      text-[--text] font-medium
                    `}
                  />
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (isStep27Complete) {
                      setCurrentStep(28);
                      setProgress(calculateProgress(28));
                    }
                  }}
                  disabled={!isStep27Complete}
                  className={`
                    flex-1 px-6 py-3.5 font-semibold rounded-lg shadow-md 
                    transition-all duration-200 flex items-center justify-center gap-2 group
                    ${isStep27Complete
                      ? 'bg-[#313863] text-white hover:bg-[#252b4d] cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  Continue
                  <ArrowRight 
                    size={20} 
                    className={`
                      transition-transform duration-200
                      ${isStep27Complete ? 'group-hover:translate-x-1' : ''}
                    `} 
                  />
                </button>
              </div>
            </div>
          )}

          {/* Step 28: Monthly Housing Payment */}
          {currentStep === 28 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                What is your monthly housing payment?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Enter your monthly rent or mortgage payment
              </p>

              {/* Monthly Housing Payment Input */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    ref={housingPaymentInputRef}
                    type="text"
                    value={monthlyHousingPayment}
                    onChange={handleMonthlyHousingPaymentChange}
                    onKeyDown={handleMonthlyHousingPaymentKeyDown}
                    onFocus={(e) => {
                      // Position cursor after '$ ' when focused
                      if (e.target.value === '$ ' || e.target.value === '$') {
                        e.target.setSelectionRange(2, 2);
                      } else if (e.target.selectionStart === 0 || e.target.selectionStart === 1 || e.target.selectionStart === null) {
                        e.target.setSelectionRange(2, 2);
                      }
                    }}
                    className={`
                      w-full px-4 py-3.5 text-base
                      border-2 rounded-lg
                      transition-all duration-200
                      focus:outline-none
                      ${monthlyHousingPayment && monthlyHousingPayment.length > 2
                        ? 'border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                        : 'border-gray-300 focus:border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                      }
                      text-[--text] font-medium
                    `}
                  />
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (isStep28Complete) {
                      setCurrentStep(29);
                      setProgress(calculateProgress(29));
                    }
                  }}
                  disabled={!isStep28Complete}
                  className={`
                    flex-1 px-6 py-3.5 font-semibold rounded-lg shadow-md 
                    transition-all duration-200 flex items-center justify-center gap-2 group
                    ${isStep28Complete
                      ? 'bg-[#313863] text-white hover:bg-[#252b4d] cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  Continue
                  <ArrowRight 
                    size={20} 
                    className={`
                      transition-transform duration-200
                      ${isStep28Complete ? 'group-hover:translate-x-1' : ''}
                    `} 
                  />
                </button>
              </div>
            </div>
          )}

          {/* Step 29: Bankruptcy */}
          {currentStep === 29 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                Have you filed bankruptcy in the last 5 years?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Select your option
              </p>

              {/* Radio Group */}
              <div className="mb-6">
                <RadioGroup
                  value={hasFiledBankruptcy}
                  onValueChange={handleBankruptcyChange}
                  orientation="vertical"
                  className="w-full space-y-3"
                >
                  <div
                    onClick={() => {
                      handleBankruptcyChange('yes');
                    }}
                    className={`
                      border-2 rounded-lg transition-all duration-200
                      px-4 py-3.5 sm:px-5 sm:py-4
                      cursor-pointer
                      ${hasFiledBankruptcy === 'yes'
                        ? 'border-[#313863] bg-[#313863]/5 shadow-md'
                        : 'border-gray-300 bg-white hover:border-[#313863]/50 hover:bg-gray-50'
                      }
                    `}
                  >
                    <RadioGroupItem
                      value="yes"
                      label="Yes"
                    />
                  </div>
                  <div
                    onClick={() => {
                      handleBankruptcyChange('no');
                    }}
                    className={`
                      border-2 rounded-lg transition-all duration-200
                      px-4 py-3.5 sm:px-5 sm:py-4
                      cursor-pointer
                      ${hasFiledBankruptcy === 'no'
                        ? 'border-[#313863] bg-[#313863]/5 shadow-md'
                        : 'border-gray-300 bg-white hover:border-[#313863]/50 hover:bg-gray-50'
                      }
                    `}
                  >
                    <RadioGroupItem
                      value="no"
                      label="No"
                    />
                  </div>
                </RadioGroup>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
              </div>
            </div>
          )}

          {/* Step 30: Bankruptcy Chapter */}
          {currentStep === 30 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                What is the bankruptcy chapter?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Select the bankruptcy chapter you filed
              </p>

              {/* Radio Group */}
              <div className="mb-6">
                <RadioGroup
                  value={bankruptcyChapter}
                  onValueChange={handleBankruptcyChapterChange}
                  orientation="vertical"
                  className="w-full space-y-3"
                >
                  {bankruptcyChapterOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        handleBankruptcyChapterChange(option.value);
                      }}
                      className={`
                        border-2 rounded-lg transition-all duration-200
                        px-4 py-3.5 sm:px-5 sm:py-4
                        cursor-pointer
                        ${bankruptcyChapter === option.value
                          ? 'border-[#313863] bg-[#313863]/5 shadow-md'
                          : 'border-gray-300 bg-white hover:border-[#313863]/50 hover:bg-gray-50'
                        }
                      `}
                    >
                      <RadioGroupItem
                        value={option.value}
                        label={option.label}
                      />
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
              </div>
            </div>
          )}

          {/* Step 31: Bankruptcy Status */}
          {currentStep === 31 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                What is the status of your bankruptcy?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Select the current status of your bankruptcy
              </p>

              {/* Radio Group */}
              <div className="mb-6">
                <RadioGroup
                  value={bankruptcyStatus}
                  onValueChange={handleBankruptcyStatusChange}
                  orientation="vertical"
                  className="w-full space-y-3"
                >
                  {bankruptcyStatusOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        handleBankruptcyStatusChange(option.value);
                      }}
                      className={`
                        border-2 rounded-lg transition-all duration-200
                        px-4 py-3.5 sm:px-5 sm:py-4
                        cursor-pointer
                        ${bankruptcyStatus === option.value
                          ? 'border-[#313863] bg-[#313863]/5 shadow-md'
                          : 'border-gray-300 bg-white hover:border-[#313863]/50 hover:bg-gray-50'
                        }
                      `}
                    >
                      <RadioGroupItem
                        value={option.value}
                        label={option.label}
                      />
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
              </div>
            </div>
          )}

          {/* Step 32: Bankruptcy Discharged in Last 2 Years */}
          {currentStep === 32 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                Was your bankruptcy discharged in the last 2 years?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Select your option
              </p>

              {/* Radio Group */}
              <div className="mb-6">
                <RadioGroup
                  value={bankruptcyDischargedInLast2Years}
                  onValueChange={handleBankruptcyDischargedChange}
                  orientation="vertical"
                  className="w-full space-y-3"
                >
                  <div
                    onClick={() => {
                      handleBankruptcyDischargedChange('yes');
                    }}
                    className={`
                      border-2 rounded-lg transition-all duration-200
                      px-4 py-3.5 sm:px-5 sm:py-4
                      cursor-pointer
                      ${bankruptcyDischargedInLast2Years === 'yes'
                        ? 'border-[#313863] bg-[#313863]/5 shadow-md'
                        : 'border-gray-300 bg-white hover:border-[#313863]/50 hover:bg-gray-50'
                      }
                    `}
                  >
                    <RadioGroupItem
                      value="yes"
                      label="Yes"
                    />
                  </div>
                  <div
                    onClick={() => {
                      handleBankruptcyDischargedChange('no');
                    }}
                    className={`
                      border-2 rounded-lg transition-all duration-200
                      px-4 py-3.5 sm:px-5 sm:py-4
                      cursor-pointer
                      ${bankruptcyDischargedInLast2Years === 'no'
                        ? 'border-[#313863] bg-[#313863]/5 shadow-md'
                        : 'border-gray-300 bg-white hover:border-[#313863]/50 hover:bg-gray-50'
                      }
                    `}
                  >
                    <RadioGroupItem
                      value="no"
                      label="No"
                    />
                  </div>
                  <div
                    onClick={() => {
                      handleBankruptcyDischargedChange('n/a');
                    }}
                    className={`
                      border-2 rounded-lg transition-all duration-200
                      px-4 py-3.5 sm:px-5 sm:py-4
                      cursor-pointer
                      ${bankruptcyDischargedInLast2Years === 'n/a'
                        ? 'border-[#313863] bg-[#313863]/5 shadow-md'
                        : 'border-gray-300 bg-white hover:border-[#313863]/50 hover:bg-gray-50'
                      }
                    `}
                  >
                    <RadioGroupItem
                      value="n/a"
                      label="N/A"
                    />
                  </div>
                </RadioGroup>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
              </div>
            </div>
          )}

          {/* Step 33: Name */}
          {currentStep === 33 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                What is your name?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Enter your first and last name
              </p>

              {/* Name Inputs */}
              <div className="mb-6 space-y-4">
                {/* First Name */}
                <div className="relative">
                  <input
                    type="text"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    placeholder="First Name"
                    className={`
                      w-full px-4 py-3.5 text-base
                      border-2 rounded-lg
                      transition-all duration-200
                      focus:outline-none
                      ${firstName.trim() !== ''
                        ? 'border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                        : 'border-gray-300 focus:border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                      }
                      text-[--text] font-medium
                    `}
                  />
                </div>
                {/* Last Name */}
                <div className="relative">
                  <input
                    type="text"
                    value={lastName}
                    onChange={handleLastNameChange}
                    placeholder="Last Name"
                    className={`
                      w-full px-4 py-3.5 text-base
                      border-2 rounded-lg
                      transition-all duration-200
                      focus:outline-none
                      ${lastName.trim() !== ''
                        ? 'border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                        : 'border-gray-300 focus:border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                      }
                      text-[--text] font-medium
                    `}
                  />
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (isStep33Complete) {
                      setCurrentStep(34);
                      setProgress(calculateProgress(34));
                    }
                  }}
                  disabled={!isStep33Complete}
                  className={`
                    flex-1 px-6 py-3.5 font-semibold rounded-lg shadow-md 
                    transition-all duration-200 flex items-center justify-center gap-2 group
                    ${isStep33Complete
                      ? 'bg-[#313863] text-white hover:bg-[#252b4d] cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  Continue
                  <ArrowRight 
                    size={20} 
                    className={`
                      transition-transform duration-200
                      ${isStep33Complete ? 'group-hover:translate-x-1' : ''}
                    `} 
                  />
                </button>
              </div>
            </div>
          )}

          {/* Step 34: Birthdate */}
          {currentStep === 34 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                What is your birthdate?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Select your date of birth
              </p>

              {/* Birthdate Input */}
              <div className="mb-6">
                <DatePicker
                  value={birthdate}
                  onChange={handleBirthdateChange}
                  placeholder="Select your birthdate"
                  maxDate={new Date()} // Cannot select future dates
                  minDate={new Date(new Date().getFullYear() - 120, 0, 1)} // Allow up to 120 years ago
                />
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (isStep34Complete) {
                      setCurrentStep(35);
                      setProgress(calculateProgress(35));
                    }
                  }}
                  disabled={!isStep34Complete}
                  className={`
                    flex-1 px-6 py-3.5 font-semibold rounded-lg shadow-md 
                    transition-all duration-200 flex items-center justify-center gap-2 group
                    ${isStep34Complete
                      ? 'bg-[#313863] text-white hover:bg-[#252b4d] cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  Continue
                  <ArrowRight 
                    size={20} 
                    className={`
                      transition-transform duration-200
                      ${isStep34Complete ? 'group-hover:translate-x-1' : ''}
                    `} 
                  />
                </button>
              </div>
            </div>
          )}

          {/* Step 35: Home Phone Number */}
          {currentStep === 35 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                What is your Home Phone Number?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Enter your home phone number
              </p>

              {/* Home Phone Number Input */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    ref={homePhoneInputRef}
                    type="text"
                    value={homePhoneNumber}
                    onChange={handleHomePhoneNumberChange}
                    onKeyDown={handleHomePhoneNumberKeyDown}
                    placeholder="(123) 456 - 7890"
                    maxLength={17} // (123) 456 - 7890 = 17 characters
                    className={`
                      w-full px-4 py-3.5 text-base
                      border-2 rounded-lg
                      transition-all duration-200
                      focus:outline-none
                      ${isStep35Complete
                        ? 'border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                        : homePhoneNumber.trim() !== ''
                          ? 'border-gray-300 focus:border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                          : 'border-gray-300 focus:border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                      }
                      text-[--text] font-medium
                    `}
                  />
                </div>
                {homePhoneNumber.trim() !== '' && !isStep35Complete && (
                  <p className="mt-2 text-sm text-gray-600">
                    Please enter a complete 10-digit phone number
                  </p>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (isStep35Complete) {
                      setCurrentStep(36);
                      setProgress(calculateProgress(36));
                    }
                  }}
                  disabled={!isStep35Complete}
                  className={`
                    flex-1 px-6 py-3.5 font-semibold rounded-lg shadow-md 
                    transition-all duration-200 flex items-center justify-center gap-2 group
                    ${isStep35Complete
                      ? 'bg-[#313863] text-white hover:bg-[#252b4d] cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  Continue
                  <ArrowRight 
                    size={20} 
                    className={`
                      transition-transform duration-200
                      ${isStep35Complete ? 'group-hover:translate-x-1' : ''}
                    `} 
                  />
                </button>
              </div>
            </div>
          )}

          {/* Step 36: Work Phone Number */}
          {currentStep === 36 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                What is your Work Phone Number?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Enter your work phone number
              </p>

              {/* Work Phone Number Input */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    ref={workPhoneInputRef}
                    type="text"
                    value={workPhoneNumber}
                    onChange={handleWorkPhoneNumberChange}
                    onKeyDown={handleWorkPhoneNumberKeyDown}
                    placeholder="(123) 456 - 7890"
                    maxLength={17} // (123) 456 - 7890 = 17 characters
                    className={`
                      w-full px-4 py-3.5 text-base
                      border-2 rounded-lg
                      transition-all duration-200
                      focus:outline-none
                      ${isStep36Complete
                        ? 'border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                        : workPhoneNumber.trim() !== ''
                          ? 'border-gray-300 focus:border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                          : 'border-gray-300 focus:border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                      }
                      text-[--text] font-medium
                    `}
                  />
                </div>
                {workPhoneNumber.trim() !== '' && !isStep36Complete && (
                  <p className="mt-2 text-sm text-gray-600">
                    Please enter a complete 10-digit phone number
                  </p>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (isStep36Complete) {
                      setCurrentStep(37);
                      setProgress(calculateProgress(37));
                    }
                  }}
                  disabled={!isStep36Complete}
                  className={`
                    flex-1 px-6 py-3.5 font-semibold rounded-lg shadow-md 
                    transition-all duration-200 flex items-center justify-center gap-2 group
                    ${isStep36Complete
                      ? 'bg-[#313863] text-white hover:bg-[#252b4d] cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  Continue
                  <ArrowRight 
                    size={20} 
                    className={`
                      transition-transform duration-200
                      ${isStep36Complete ? 'group-hover:translate-x-1' : ''}
                    `} 
                  />
                </button>
              </div>
            </div>
          )}

          {/* Step 37: Phone Number with Consent */}
          {currentStep === 37 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                What is your phone number?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Enter your phone number
              </p>

              {/* Phone Number Input */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    ref={phoneInputRef}
                    type="text"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    onKeyDown={handlePhoneNumberKeyDown}
                    placeholder="(123) 456 - 7890"
                    maxLength={17} // (123) 456 - 7890 = 17 characters
                    className={`
                      w-full px-4 py-3.5 text-base
                      border-2 rounded-lg
                      transition-all duration-200
                      focus:outline-none
                      ${isStep37Complete
                        ? 'border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                        : phoneNumber.trim() !== ''
                          ? 'border-gray-300 focus:border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                          : 'border-gray-300 focus:border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                      }
                      text-[--text] font-medium
                    `}
                  />
                </div>
                {phoneNumber.trim() !== '' && !isStep37Complete && (
                  <p className="mt-2 text-sm text-gray-600">
                    Please enter a complete 10-digit phone number
                  </p>
                )}
              </div>

              {/* Consent Message in Green Box */}
              <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                <p className="text-sm text-gray-700 leading-relaxed">
                  I consent to be contacted at the telephone number I disclose above. By providing my phone number and clicking on the &quot;Continue&quot; button above, I provide my express consent to be contacted at the telephone number by USA Loans Today and our Marketing Partners in connection with my loan request, for other marketing purposes, and related to credit or credit repair offers, including contact through automatic dialing systems, artificial or pre-recorded voice messaging, or text message. I understand that my consent applies to these text messages and telemarketing calls even if I have subscribed to a federal, state, or company &quot;Do Not Call&quot; registry. Message and data rates may apply. To opt-out, please follow the unsubscribe instructions within the text message. Clicking &quot;Next&quot; shall be my electronic signature to this consent.
                </p>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (isStep37Complete) {
                      setCurrentStep(38);
                      setProgress(calculateProgress(38));
                    }
                  }}
                  disabled={!isStep37Complete}
                  className={`
                    flex-1 px-6 py-3.5 font-semibold rounded-lg shadow-md 
                    transition-all duration-200 flex items-center justify-center gap-2 group
                    ${isStep37Complete
                      ? 'bg-[#313863] text-white hover:bg-[#252b4d] cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  Continue
                  <ArrowRight 
                    size={20} 
                    className={`
                      transition-transform duration-200
                      ${isStep37Complete ? 'group-hover:translate-x-1' : ''}
                    `} 
                  />
                </button>
              </div>
            </div>
          )}

          {/* Step 38: Social Security Number */}
          {currentStep === 38 && (
            <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              {/* Question */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[--text] mb-2">
                What is your social security number?
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Enter your Social Security Number
              </p>

              {/* SSN Input */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    ref={ssnInputRef}
                    type="text"
                    value={ssn}
                    onChange={handleSSNChange}
                    onKeyDown={handleSSNKeyDown}
                    placeholder="123-45-6789"
                    maxLength={11} // 123-45-6789 = 11 characters
                    className={`
                      w-full px-4 py-3.5 text-base
                      border-2 rounded-lg
                      transition-all duration-200
                      focus:outline-none
                      ${isStep38Complete
                        ? 'border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                        : ssn.trim() !== ''
                          ? 'border-gray-300 focus:border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                          : 'border-gray-300 focus:border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
                      }
                      text-[--text] font-medium
                    `}
                  />
                </div>
                {ssn.trim() !== '' && !isStep38Complete && (
                  <p className="mt-2 text-sm text-gray-600">
                    Please enter a complete 9-digit Social Security Number
                  </p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="text-sm text-gray-700 leading-relaxed">
                  <p className="mb-3">
                    By providing my Social Security Number and clicking on &quot;Submit&quot; above, I consent, acknowledge, and agree to the following:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>
                      <a href="/terms" className="text-[#313863] hover:underline">Terms of Service</a>, <a href="/privacy-policy" className="text-[#313863] hover:underline">Privacy Policy</a>, <a href="/terms#credit-authorization" className="text-[#313863] hover:underline credit-authorization-agreement">Credit Authorization Agreement</a>
                    </li>
                    <li>By continuing with the loan request process. USA Loans Today may use the report to authenticate your identity and connect you with products or services. The inquiry is a soft pull of your consumer report and does not affect your credit score.</li>
                    <li>I understand my information will be presented to a network of lenders and/or lending partners, and those lenders and/or lending partners will review and verify my information in order to determine if I may qualify for a loan. I acknowledge that lenders, lending partners, and other financial service providers may share my personal information, including approval status and funded status.</li>
                    <li>I understand that if I am not connected with a personal loan lender and/or lending partner at the requested amount, my information may be shown to additional lenders and/or lending partners who provide lower loan amounts and higher rates. I also understand that if I am not connected with a Lender I may be connected with other financial service providers that offer products associated with my selected loan purpose.</li>
                    <li>There is no hard credit check on the consumer at any time.</li>
                    <li>I certify that all information herein is true and complete.</li>
                  </ul>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3.5 bg-gray-200 text-[--text] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!isStep38Complete || isSubmitting}
                  className={`
                    flex-1 px-6 py-3.5 font-semibold rounded-lg shadow-md 
                    transition-all duration-200 flex items-center justify-center gap-2 group
                    ${isStep38Complete && !isSubmitting
                      ? 'bg-[#313863] text-white hover:bg-[#252b4d] cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                    ${isSubmitting ? 'bg-[#313863] text-white' : ''}
                  `}
                >
                  {isSubmitting ? (
                    <>
                      Submitting...
                      <div className="w-5 h-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    </>
                  ) : (
                    <>
                      Submit
                      <ArrowRight 
                        size={20} 
                        className={`
                          transition-transform duration-200
                          ${isStep38Complete ? 'group-hover:translate-x-1' : ''}
                        `} 
                      />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPage;