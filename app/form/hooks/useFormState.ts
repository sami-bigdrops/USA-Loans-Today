'use client';

import { useState, useRef } from 'react';

export const useFormState = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
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
  const [isLookingUpBank, setIsLookingUpBank] = useState<boolean>(false);
  const [isValidatingZip, setIsValidatingZip] = useState<boolean>(false);
  const [zipCodeError, setZipCodeError] = useState<string>('');
  const [touchedFields, setTouchedFields] = useState<Record<number, boolean>>({});
  
  const previousStepRef = useRef<number>(1);
  const isNavigatingBackRef = useRef<boolean>(false);
  const lastUserInteractionStepRef = useRef<number | null>(null);
  const incomeInputRef = useRef<HTMLInputElement | null>(null);
  const debtInputRef = useRef<HTMLInputElement | null>(null);
  const routingNumberInputRef = useRef<HTMLInputElement | null>(null);
  const driverLicenseInputRef = useRef<HTMLInputElement | null>(null);
  const housingPaymentInputRef = useRef<HTMLInputElement | null>(null);
  const homePhoneInputRef = useRef<HTMLInputElement | null>(null);
  const workPhoneInputRef = useRef<HTMLInputElement | null>(null);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const ssnInputRef = useRef<HTMLInputElement | null>(null);

  const markFieldTouched = (step: number) => {
    setTouchedFields(prev => ({ ...prev, [step]: true }));
  };

  return {
    currentStep,
    setCurrentStep,
    progress,
    setProgress,
    trustedFormCertUrl,
    setTrustedFormCertUrl,
    subid1,
    setSubid1,
    subid2,
    setSubid2,
    subid3,
    setSubid3,
    spendingPurpose,
    setSpendingPurpose,
    creditScore,
    setCreditScore,
    employmentStatus,
    setEmploymentStatus,
    paymentFrequency,
    setPaymentFrequency,
    monthlyIncome,
    setMonthlyIncome,
    debtAmount,
    setDebtAmount,
    nextPayDate,
    setNextPayDate,
    secondPayDate,
    setSecondPayDate,
    hasCheckingAccount,
    setHasCheckingAccount,
    hasDirectDeposit,
    setHasDirectDeposit,
    bankAccountDuration,
    setBankAccountDuration,
    bankRoutingNumber,
    setBankRoutingNumber,
    bankName,
    setBankName,
    bankAccountNumber,
    setBankAccountNumber,
    zipCode,
    setZipCode,
    zipCodeCity,
    setZipCodeCity,
    streetAddress,
    setStreetAddress,
    homeOwnership,
    setHomeOwnership,
    addressDuration,
    setAddressDuration,
    email,
    setEmail,
    vehicleStatus,
    setVehicleStatus,
    driverLicenseState,
    setDriverLicenseState,
    driverLicenseNumber,
    setDriverLicenseNumber,
    isMilitaryMember,
    setIsMilitaryMember,
    unsecuredDebtAmount,
    setUnsecuredDebtAmount,
    employer,
    setEmployer,
    employerDuration,
    setEmployerDuration,
    occupation,
    setOccupation,
    monthlyHousingPayment,
    setMonthlyHousingPayment,
    hasFiledBankruptcy,
    setHasFiledBankruptcy,
    bankruptcyChapter,
    setBankruptcyChapter,
    bankruptcyStatus,
    setBankruptcyStatus,
    bankruptcyDischargedInLast2Years,
    setBankruptcyDischargedInLast2Years,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    birthdate,
    setBirthdate,
    homePhoneNumber,
    setHomePhoneNumber,
    workPhoneNumber,
    setWorkPhoneNumber,
    phoneNumber,
    setPhoneNumber,
    ssn,
    setSsn,
    isSubmitting,
    setIsSubmitting,
    isLookingUpBank,
    setIsLookingUpBank,
    isValidatingZip,
    setIsValidatingZip,
    zipCodeError,
    setZipCodeError,
    touchedFields,
    markFieldTouched,
    previousStepRef,
    isNavigatingBackRef,
    lastUserInteractionStepRef,
    incomeInputRef,
    debtInputRef,
    routingNumberInputRef,
    driverLicenseInputRef,
    housingPaymentInputRef,
    homePhoneInputRef,
    workPhoneInputRef,
    phoneInputRef,
    ssnInputRef,
  };
};

