// Form input formatting utilities

export const formatCurrency = (value: string): string => {
  // Remove all non-digit characters
  const numericValue = value.replace(/[^\d]/g, '');
  
  if (!numericValue) return '';
  
  // Add commas for thousands
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatPhoneNumber = (value: string): string => {
  // Remove all non-digit characters
  const digits = value.replace(/[^\d]/g, '').slice(0, 10); // Limit to 10 digits
  
  // Format as (123) 456 - 7890
  if (digits.length === 0) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)} - ${digits.slice(6)}`;
};

export const formatSSN = (value: string): string => {
  // Remove all non-digit characters
  const digits = value.replace(/[^\d]/g, '').slice(0, 9); // Limit to 9 digits
  
  // Format as 123-45-6789
  if (digits.length === 0) return '';
  if (digits.length <= 3) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
};

export const formatRoutingNumber = (value: string): string => {
  // Remove all non-digit characters
  const digits = value.replace(/[^\d]/g, '').slice(0, 9); // Limit to 9 digits
  
  // Format as XXX-XXX-XXX
  if (digits.length === 0) return '';
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
};

export const formatDriverLicenseNumber = (value: string, state: string, stateLicenseFormats: Record<string, number>): string => {
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

