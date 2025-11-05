'use client';

import { useMemo } from 'react';
import * as validation from '../utils/validation';
import { STATE_LICENSE_FORMATS } from '../utils/constants';

interface UseValidationProps {
  monthlyIncome: string;
  debtAmount: string;
  nextPayDate: string;
  secondPayDate: string;
  bankRoutingNumber: string;
  bankName: string;
  bankAccountNumber: string;
  zipCode: string;
  zipCodeError: string;
  streetAddress: string;
  email: string;
  driverLicenseState: string;
  driverLicenseNumber: string;
  employer: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  touchedFields: Record<number, boolean>;
}

export const useValidation = (props: UseValidationProps) => {
  // Use useMemo instead of useEffect + useState to avoid synchronous setState
  const stepValidationErrors = useMemo(() => {
    const errors: Record<number, string> = {};
    
    // Only validate and show errors for touched fields
    if (props.touchedFields[5]) {
      const error5 = validation.getStep5Error(props.monthlyIncome);
      if (error5) errors[5] = error5;
    }
    
    if (props.touchedFields[6]) {
      const error6 = validation.getStep6Error(props.debtAmount);
      if (error6) errors[6] = error6;
    }
    
    if (props.touchedFields[7]) {
      const error7 = validation.getStep7Error(props.nextPayDate);
      if (error7) errors[7] = error7;
    }
    
    if (props.touchedFields[8]) {
      const error8 = validation.getStep8Error(props.secondPayDate);
      if (error8) errors[8] = error8;
    }
    
    if (props.touchedFields[12]) {
      const error12 = validation.getStep12Error(props.bankRoutingNumber);
      if (error12) errors[12] = error12;
    }
    
    if (props.touchedFields[13]) {
      const error13 = validation.getStep13Error(props.bankName);
      if (error13) errors[13] = error13;
    }
    
    if (props.touchedFields[14]) {
      const error14 = validation.getStep14Error(props.bankAccountNumber);
      if (error14) errors[14] = error14;
    }
    
    if (props.touchedFields[15]) {
      const error15 = validation.getStep15Error(props.zipCode, props.zipCodeError);
      if (error15) errors[15] = error15;
    }
    
    if (props.touchedFields[16]) {
      const error16 = validation.getStep16Error(props.streetAddress);
      if (error16) errors[16] = error16;
    }
    
    if (props.touchedFields[19]) {
      const error19 = validation.getStep19Error(props.email);
      if (error19) errors[19] = error19;
    }
    
    if (props.touchedFields[21]) {
      const error21 = validation.getStep21Error(props.driverLicenseState);
      if (error21) errors[21] = error21;
    }
    
    if (props.touchedFields[22]) {
      const error22 = validation.getStep22Error(props.driverLicenseState, props.driverLicenseNumber, STATE_LICENSE_FORMATS);
      if (error22) errors[22] = error22;
    }
    
    if (props.touchedFields[25]) {
      const error25 = validation.getStep25Error(props.employer);
      if (error25) errors[25] = error25;
    }
    
    if (props.touchedFields[33]) {
      const error33 = validation.getStep33Error(props.firstName, props.lastName);
      if (error33) errors[33] = error33;
    }
    
    if (props.touchedFields[34]) {
      const error34 = validation.getStep34Error(props.birthdate);
      if (error34) errors[34] = error34;
    }
    
    return errors;
  }, [
    props.monthlyIncome,
    props.debtAmount,
    props.nextPayDate,
    props.secondPayDate,
    props.bankRoutingNumber,
    props.bankName,
    props.bankAccountNumber,
    props.zipCode,
    props.zipCodeError,
    props.streetAddress,
    props.email,
    props.driverLicenseState,
    props.driverLicenseNumber,
    props.employer,
    props.firstName,
    props.lastName,
    props.birthdate,
    props.touchedFields,
  ]);

  return stepValidationErrors;
};

