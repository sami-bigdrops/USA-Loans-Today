// Validation utility functions for form steps

export const getStep5Error = (value: string): string | null => {
  if (!value || value.length <= 2) return null;
  const cleanValue = value.replace(/[^0-9.]/g, '');
  const numValue = parseFloat(cleanValue);
  if (isNaN(numValue) || numValue < 100 || numValue > 25000) {
    return 'Monthly income must be between $100 and $25,000';
  }
  return null;
};

export const getStep6Error = (value: string): string | null => {
  if (!value || value.length <= 2) return null;
  const cleanValue = value.replace(/[^0-9.]/g, '');
  const numValue = parseFloat(cleanValue);
  if (isNaN(numValue) || numValue < 1000 || numValue > 100000) {
    return 'Debt amount must be between $1,000 and $100,000';
  }
  return null;
};

export const getStep7Error = (value: string): string | null => {
  if (!value) return null;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(value)) {
    return 'Next pay date must be in YYYY-MM-DD format';
  }
  return null;
};

export const getStep8Error = (value: string): string | null => {
  if (!value) return null;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(value)) {
    return 'Second pay date must be in YYYY-MM-DD format';
  }
  return null;
};

export const getStep12Error = (value: string): string | null => {
  const cleanValue = value.replace(/[^\d]/g, '');
  if (cleanValue.length !== 9) {
    return 'Bank routing number must be exactly 9 digits';
  }
  return null;
};

export const getStep13Error = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed || trimmed.length < 1 || trimmed.length > 255) {
    return 'Bank name must be between 1 and 255 characters';
  }
  return null;
};

export const getStep14Error = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed || trimmed.length < 3 || trimmed.length > 30) {
    return 'Bank account number must be between 3 and 30 characters';
  }
  return null;
};

export const getStep15Error = (zip: string): string | null => {
  if (!zip || zip.length !== 5) {
    return 'Zip code must be exactly 5 digits';
  }
  return null;
};

export const getStep16Error = (streetAddress: string, state: string): string | null => {
  const trimmedAddress = streetAddress.trim();
  if (!trimmedAddress || trimmedAddress.length < 2 || trimmedAddress.length > 255) {
    return 'Address must be between 2 and 255 characters';
  }
  const trimmedState = state.trim();
  if (!trimmedState || trimmedState.length !== 2) {
    return 'Please select a state';
  }
  return null;
};

export const getStep19Error = (value: string): string | null => {
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

export const getStep21Error = (value: string): string | null => {
  if (!value) {
    return 'State is required';
  }
  if (value.toUpperCase() === 'NY') {
    return 'We do not provide service in New York';
  }
  return null;
};

export const getStep22Error = (state: string, license: string, stateLicenseFormats: Record<string, number>): string | null => {
  if (!state || !license) return null;
  const cleanLicense = license.replace(/[^A-Za-z0-9]/g, '');
  const maxLength = stateLicenseFormats[state] || 9;
  if (cleanLicense.length !== maxLength) {
    return `Please enter a valid ${state} driver's license number (${maxLength} characters)`;
  }
  return null;
};

export const getStep25Error = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed || trimmed.length < 1 || trimmed.length > 255) {
    return 'Employer name must be between 1 and 255 characters';
  }
  return null;
};

export const getStep33Error = (first: string, last: string): string | null => {
  const firstNameTrimmed = first.trim();
  const lastNameTrimmed = last.trim();
  if (!firstNameTrimmed || firstNameTrimmed.length < 1 || firstNameTrimmed.length > 255) {
    return 'First name must be between 1 and 255 characters';
  }
  if (!lastNameTrimmed || lastNameTrimmed.length < 1 || lastNameTrimmed.length > 255) {
    return 'Last name must be between 1 and 255 characters';
  }
  return null;
};

export const getStep34Error = (value: string): string | null => {
  if (!value) {
    return 'Date of birth is required';
  }
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(value)) {
    return 'Date of birth must be in YYYY-MM-DD format';
  }
  const birthDate = new Date(value);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;
  if (actualAge < 18 || actualAge > 100) {
    return 'Age must be between 18 and 100 years';
  }
  return null;
};

