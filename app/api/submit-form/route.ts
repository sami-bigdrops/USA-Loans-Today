import { NextRequest, NextResponse } from 'next/server'
// Email service disabled
// import { sendWelcomeEmail } from '@/app/utils/emailService'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Extract all form fields - matching payload variable names
    const {
      loanAmount,
      firstName,
      lastName,
      email,
      dob,
      zip,
      city,
      state,
      address,
      monthsAtAddress,
      homeOwnership,
      driversLicense,
      driversLicenseState,
      cellPhone,
      homePhone,
      ssn,
      employmentType,
      employerName,
      military,
      monthsEmployed,
      monthlyIncome,
      payFrequency,
      nextPayDate,
      secondPayDate,
      workPhone,
      payType,
      bankRoutingNumber,
      bankName,
      bankAccountNumber,
      bankAccountType,
      monthsAtBank,
      // Additional fields (for backward compatibility and LeadProsper)
      subid1,
      subid2,
      subid3,
      trustedformCertUrl,
      spendingPurpose,
      creditScore,
      debtAmount,
      unsecuredDebtAmount,
      monthlyHousingPayment,
      hasDirectDeposit,
      occupation,
      vehicleStatus,
      hasFiledBankruptcy,
      bankruptcyChapter,
      bankruptcyStatus,
      bankruptcyDischargedInLast2Years,
      // Backward compatibility mappings
      phoneNumber,
      homePhoneNumber,
      workPhoneNumber,
      zipCode,
      zipCodeCity,
      birthdate,
      streetAddress,
      addressDuration,
      employmentStatus,
      paymentFrequency: oldPaymentFrequency,
      hasCheckingAccount,
      bankAccountDuration,
      employer,
      employerDuration,
      driverLicenseState: oldDriverLicenseState,
      driverLicenseNumber,
      isMilitaryMember,
    } = body

    // Map to internal variables for processing
    const phone = cellPhone || phoneNumber || body.phone || '';
    const homeOwner = homeOwnership || body.homeOwner || '';
    const driverLicenseStateValue = state || driversLicenseState || oldDriverLicenseState || '';
    const driverLicenseNumberValue = driversLicense || driverLicenseNumber || '';
    const employmentStatusValue = employmentType || employmentStatus || '';
    const employerValue = employerName || employer || '';
    const employerDurationValue = monthsEmployed || employerDuration || '';
    const isMilitaryMemberValue = military || isMilitaryMember || '';
    const birthdateValue = dob || birthdate || '';
    const zipCodeValue = zip || zipCode || '';
    const zipCodeCityValue = city || zipCodeCity || '';
    const streetAddressValue = address || streetAddress || '';
    const addressDurationValue = monthsAtAddress || addressDuration || '';
    const paymentFrequencyValue = payFrequency || payType || oldPaymentFrequency || '';
    const homePhoneValue = homePhone || homePhoneNumber || '';
    const workPhoneValue = workPhone || workPhoneNumber || '';
    const bankAccountDurationValue = monthsAtBank || bankAccountDuration || '';
    const hasCheckingAccountValue = bankAccountType || hasCheckingAccount || '';

    // Validation functions
    const validateLength = (value: string, min: number, max: number, fieldName: string): string | null => {
      const trimmed = value?.trim() || '';
      if (trimmed.length < min || trimmed.length > max) {
        return `${fieldName} must be between ${min} and ${max} characters`;
      }
      return null;
    };

    const validateEmail = (value: string): string | null => {
      const trimmed = value?.trim() || '';
      if (trimmed.length < 5 || trimmed.length > 128) {
        return 'Email must be between 5 and 128 characters';
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) {
        return 'Please enter a valid email address';
      }
      return null;
    };

    const validateDOB = (value: string): string | null => {
      const trimmed = value?.trim() || '';
      if (!trimmed) return 'Date of birth is required';
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
      const trimmed = value?.trim() || '';
      if (!trimmed || !/^\d{5}$/.test(trimmed)) {
        return 'Zip code must be exactly 5 digits';
      }
      return null;
    };

    const validateState = (value: string): string | null => {
      const trimmed = value?.trim() || '';
      if (!trimmed) return 'State is required';
      if (trimmed.toUpperCase() === 'NY') {
        return 'We do not provide service in New York';
      }
      return null;
    };

    const validatePhone = (value: string, fieldName: string): string | null => {
      const cleanValue = value?.replace(/\D/g, '') || '';
      if (!cleanValue || cleanValue.length !== 10) {
        return `${fieldName} must be 10 digits`;
      }
      return null;
    };

    const validateSSN = (value: string): string | null => {
      const cleanValue = value?.replace(/\D/g, '') || '';
      if (!cleanValue || cleanValue.length !== 9) {
        return 'SSN must be 9 digits';
      }
      return null;
    };

    const validateDate = (value: string, fieldName: string): string | null => {
      const trimmed = value?.trim() || '';
      if (!trimmed) return `${fieldName} is required`;
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(trimmed)) {
        return `${fieldName} must be in YYYY-MM-DD format`;
      }
      return null;
    };

    const validateMonthlyIncome = (value: string): string | null => {
      const cleanValue = (value || '').replace(/[^0-9.]/g, '');
      const numValue = parseFloat(cleanValue);
      if (isNaN(numValue) || numValue < 100 || numValue > 25000) {
        return 'Monthly income must be between $100 and $25,000';
      }
      return null;
    };

    const validateBankRoutingNumber = (value: string): string | null => {
      const cleanValue = value?.replace(/\D/g, '') || '';
      if (!cleanValue || cleanValue.length !== 9) {
        return 'Bank routing number must be 9 digits';
      }
      return null;
    };

    const validateBankAccountNumber = (value: string): string | null => {
      const trimmed = value?.trim() || '';
      if (!trimmed || trimmed.length < 3 || trimmed.length > 30) {
        return 'Bank account number must be between 3 and 30 characters';
      }
      return null;
    };

    // Validate all fields
    const validationErrors: string[] = [];
    
    // Validate required fields and field formats
    if (!firstName) validationErrors.push('First name is required');
    else {
      const error = validateLength(firstName, 1, 255, 'First name');
      if (error) validationErrors.push(error);
    }
    
    if (!lastName) validationErrors.push('Last name is required');
    else {
      const error = validateLength(lastName, 1, 255, 'Last name');
      if (error) validationErrors.push(error);
    }
    
    if (!email) validationErrors.push('Email is required');
    else {
      const error = validateEmail(email);
      if (error) validationErrors.push(error);
    }
    
    if (!birthdateValue) validationErrors.push('Date of birth is required');
    else {
      const error = validateDOB(birthdateValue);
      if (error) validationErrors.push(error);
    }
    
    if (!zipCodeValue) validationErrors.push('Zip code is required');
    else {
      const error = validateZip(zipCodeValue);
      if (error) validationErrors.push(error);
    }
    
    if (!zipCodeCityValue) validationErrors.push('City is required');
    else {
      const error = validateLength(zipCodeCityValue, 2, 32, 'City');
      if (error) validationErrors.push(error);
    }
    
    if (!driverLicenseStateValue) validationErrors.push('State is required');
    else {
      const error = validateState(driverLicenseStateValue);
      if (error) validationErrors.push(error);
    }
    
    if (!streetAddressValue) validationErrors.push('Address is required');
    else {
      const error = validateLength(streetAddressValue, 2, 255, 'Address');
      if (error) validationErrors.push(error);
    }
    
    if (!phone) validationErrors.push('Cell phone is required');
    else {
      const error = validatePhone(phone, 'Cell phone');
      if (error) validationErrors.push(error);
    }
    
    if (homePhoneValue) {
      const error = validatePhone(homePhoneValue, 'Home phone');
      if (error) validationErrors.push(error);
    }
    
    if (workPhoneValue) {
      const error = validatePhone(workPhoneValue, 'Work phone');
      if (error) validationErrors.push(error);
    }
    
    if (!ssn) validationErrors.push('SSN is required');
    else {
      const error = validateSSN(ssn);
      if (error) validationErrors.push(error);
    }
    
    if (!employerValue) validationErrors.push('Employer name is required');
    else {
      const error = validateLength(employerValue, 1, 255, 'Employer name');
      if (error) validationErrors.push(error);
    }
    
    // Validate military (should be 1 or 0)
    const militaryValue = body.military || isMilitaryMemberValue;
    if (militaryValue !== '1' && militaryValue !== '0' && militaryValue !== 'yes' && militaryValue !== 'no') {
      validationErrors.push('Military status must be 1 or 0');
    }
    
    if (!monthlyIncome) validationErrors.push('Monthly income is required');
    else {
      const error = validateMonthlyIncome(monthlyIncome);
      if (error) validationErrors.push(error);
    }
    
    if (!nextPayDate) validationErrors.push('Next pay date is required');
    else {
      const error = validateDate(nextPayDate, 'Next pay date');
      if (error) validationErrors.push(error);
    }
    
    if (!secondPayDate) validationErrors.push('Second pay date is required');
    else {
      const error = validateDate(secondPayDate, 'Second pay date');
      if (error) validationErrors.push(error);
    }
    
    // Validate payType (should be direct_deposit or check)
    const payTypeValue = body.payType || (hasDirectDeposit === 'yes' ? 'direct_deposit' : 'check');
    if (payTypeValue !== 'direct_deposit' && payTypeValue !== 'check') {
      validationErrors.push('Pay type must be direct_deposit or check');
    }
    
    if (!bankRoutingNumber) validationErrors.push('Bank routing number is required');
    else {
      const error = validateBankRoutingNumber(bankRoutingNumber);
      if (error) validationErrors.push(error);
    }
    
    if (!bankName) validationErrors.push('Bank name is required');
    else {
      const error = validateLength(bankName, 1, 255, 'Bank name');
      if (error) validationErrors.push(error);
    }
    
    if (!bankAccountNumber) validationErrors.push('Bank account number is required');
    else {
      const error = validateBankAccountNumber(bankAccountNumber);
      if (error) validationErrors.push(error);
    }
    
    // Validate bankAccountType (should be checking or saving)
    const bankAccountTypeValue = body.bankAccountType || (hasCheckingAccountValue === 'yes' ? 'checking' : 'saving');
    if (bankAccountTypeValue !== 'checking' && bankAccountTypeValue !== 'saving') {
      validationErrors.push('Bank account type must be checking or saving');
    }
    
    // If there are validation errors, return them
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          validationErrors,
          missingFields: validationErrors
        },
        { status: 400 }
      );
    }

    // Validate required fields using mapped values
    // Bankruptcy fields (30, 31, 32) are only required if hasFiledBankruptcy === 'yes'
    const isBankruptcyRequired = hasFiledBankruptcy === 'yes';
    const bankruptcyFieldsValid = !isBankruptcyRequired || (bankruptcyChapter && bankruptcyStatus && bankruptcyDischargedInLast2Years);
    
    if (!firstName || !lastName || !email || !phone || !zipCodeValue || !homeOwner || !debtAmount || !birthdateValue || !ssn || !streetAddressValue || !zipCodeCityValue || !addressDurationValue || !spendingPurpose || !creditScore || !employmentStatusValue || !paymentFrequencyValue || !monthlyIncome || !nextPayDate || !secondPayDate || !unsecuredDebtAmount || !monthlyHousingPayment || !hasCheckingAccountValue || !hasDirectDeposit || !bankAccountDurationValue || !bankRoutingNumber || !bankName || !bankAccountNumber || !employerValue || !employerDurationValue || !occupation || !vehicleStatus || !driverLicenseStateValue || !driverLicenseNumberValue || !isMilitaryMemberValue || !hasFiledBankruptcy || !bankruptcyFieldsValid) {
      const missingFields = [];
      if (!firstName) missingFields.push('firstName');
      if (!lastName) missingFields.push('lastName');
      if (!email) missingFields.push('email');
      if (!phone) missingFields.push('cellPhone');
      if (!zipCodeValue) missingFields.push('zip');
      if (!homeOwner) missingFields.push('homeOwnership');
      if (!debtAmount) missingFields.push('debtAmount');
      if (!birthdateValue) missingFields.push('dob');
      if (!ssn) missingFields.push('ssn');
      if (!streetAddressValue) missingFields.push('address');
      if (!zipCodeCityValue) missingFields.push('city');
      if (!addressDurationValue) missingFields.push('monthsAtAddress');
      if (!spendingPurpose) missingFields.push('spendingPurpose');
      if (!creditScore) missingFields.push('creditScore');
      if (!employmentStatusValue) missingFields.push('employmentType');
      if (!paymentFrequencyValue) missingFields.push('payFrequency');
      if (!monthlyIncome) missingFields.push('monthlyIncome');
      if (!nextPayDate) missingFields.push('nextPayDate');
      if (!secondPayDate) missingFields.push('secondPayDate');
      if (!unsecuredDebtAmount) missingFields.push('unsecuredDebtAmount');
      if (!monthlyHousingPayment) missingFields.push('monthlyHousingPayment');
      if (!hasCheckingAccountValue) missingFields.push('bankAccountType');
      if (!hasDirectDeposit) missingFields.push('hasDirectDeposit');
      if (!bankAccountDurationValue) missingFields.push('monthsAtBank');
      if (!bankRoutingNumber) missingFields.push('bankRoutingNumber');
      if (!bankName) missingFields.push('bankName');
      if (!bankAccountNumber) missingFields.push('bankAccountNumber');
      if (!employerValue) missingFields.push('employerName');
      if (!employerDurationValue) missingFields.push('monthsEmployed');
      if (!occupation) missingFields.push('occupation');
      if (!vehicleStatus) missingFields.push('vehicleStatus');
      if (!driverLicenseStateValue) missingFields.push('state');
      if (!driverLicenseNumberValue) missingFields.push('driversLicense');
      if (!isMilitaryMemberValue) missingFields.push('military');
      if (!hasFiledBankruptcy) missingFields.push('hasFiledBankruptcy');
      // Only add bankruptcy fields to missing if bankruptcy is required (hasFiledBankruptcy === 'yes')
      if (isBankruptcyRequired) {
        if (!bankruptcyChapter) missingFields.push('bankruptcyChapter');
        if (!bankruptcyStatus) missingFields.push('bankruptcyStatus');
        if (!bankruptcyDischargedInLast2Years) missingFields.push('bankruptcyDischargedInLast2Years');
      }
      return NextResponse.json(
        { error: 'All required fields are missing', missingFields },
        { status: 400 }
      )
    }

    // Get client IP address
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'

    // Validate required environment variables
    if (!process.env.LEADPROSPER_CAMPAIGN_ID || !process.env.LEADPROSPER_SUPPLIER_ID || !process.env.LEADPROSPER_API_KEY || !process.env.LEADPROSPER_API_URL) {
      const missingVars = [];
      if (!process.env.LEADPROSPER_CAMPAIGN_ID) missingVars.push('LEADPROSPER_CAMPAIGN_ID');
      if (!process.env.LEADPROSPER_SUPPLIER_ID) missingVars.push('LEADPROSPER_SUPPLIER_ID');
      if (!process.env.LEADPROSPER_API_KEY) missingVars.push('LEADPROSPER_API_KEY');
      if (!process.env.LEADPROSPER_API_URL) missingVars.push('LEADPROSPER_API_URL');
      
      return NextResponse.json(
        { 
          error: 'Server configuration error. Please contact support.',
          details: `Missing: ${missingVars.join(', ')}`
        },
        { status: 500 }
      );
    }

    // Prepare the data for LeadProsper
    const formData = {
      lp_campaign_id: process.env.LEADPROSPER_CAMPAIGN_ID,
      lp_supplier_id: process.env.LEADPROSPER_SUPPLIER_ID,
      lp_key: process.env.LEADPROSPER_API_KEY,
      lp_subid1: subid1 || '',
      lp_subid2: subid2 || '',
      lp_subid3: subid3 || '',
      // Map to LeadProsper format using mapped values
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      cellPhone: phone.replace(/\D/g, ''),
      homePhone: homePhoneValue.replace(/\D/g, ''),
      workPhone: workPhoneValue.replace(/\D/g, ''),
      zip_code: zipCodeValue.trim(),
      debt_amount: debtAmount.trim(),
      homeOwnership: homeOwner.trim(),
      ip_address: ip,
      user_agent: request.headers.get('user-agent') || '',
      landing_page_url: request.headers.get('referer') || '',
      trustedform_cert_url: trustedformCertUrl || '',
      // Additional form fields
      birthdate: birthdateValue || '',
      ssn: ssn || '',
      street_address: streetAddressValue || '',
      city: zipCodeCityValue || '',
      monthsAtAddress: addressDurationValue || '',
      loanPurpose: spendingPurpose || '',
      creditScore: creditScore || '',
      employmentStatus: employmentStatusValue || '',
      payFrequency: paymentFrequencyValue || '',
      monthlyIncome: monthlyIncome || '',
      nextPayDate: nextPayDate || '',
      secondPayDate: secondPayDate || '',
      totalDebtAmount: unsecuredDebtAmount || '',
      monthlyHousingPayment: monthlyHousingPayment || '',
      bankAccountType: hasCheckingAccountValue || '',
      payType: hasDirectDeposit || '',
      monthsAtBank: bankAccountDurationValue || '',
      bankRoutingNumber: bankRoutingNumber || '',
      bankName: bankName || '',
      bankAccountNumber: bankAccountNumber || '',
      employerName: employerValue || '',
      monthsEmployed: employerDurationValue || '',
      employmentType: occupation || '',
      vehicleStatus: vehicleStatus || '',
      driverLicenseState: driverLicenseStateValue || '',
      driverLicense: driverLicenseNumberValue || '',
      military: isMilitaryMemberValue || '',
      hasFiledBankruptcy: hasFiledBankruptcy || '',
      bankruptcyChapter: bankruptcyChapter || '',
      bankruptcyStatus: bankruptcyStatus || '',
      bankruptcyDischargedInLast2Years: bankruptcyDischargedInLast2Years || '',
      loanAmount: loanAmount || '',
    };

    // Log form submission for monitoring (production logging)
    if (process.env.NODE_ENV === 'development') {
    }

    // Send to LeadProsper
    const API_URL = process.env.LEADPROSPER_API_URL
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    // Get the raw response text
    const rawResponse = await response.text();

    // Try to parse as JSON
    let result;
    try {
      result = JSON.parse(rawResponse);
    } catch {
      // Even if parsing fails, we'll treat it as success
      result = { status: 'ACCEPTED' };
    }

    if (process.env.NODE_ENV === 'development') {
    }

    if (result.status === 'ACCEPTED' || result.status === 'DUPLICATED' || result.status === 'ERROR') {
      // Send welcome email (non-blocking - don't fail form submission if email fails)
      // Email service disabled
      // sendWelcomeEmail({ email: email.trim() }).catch((error) => {
      //   console.error('Failed to send welcome email:', error);
      //   // Email failure shouldn't block form submission
      // });
      
      // Generate unique access token for thank you page
      const accessToken = crypto.randomUUID();
      const expiresAt = Date.now() + (10 * 60 * 1000); // Token expires in 10 minutes
      
      const successResponse = { 
        success: true, 
        message: 'Form submitted successfully',
        redirectUrl: `/thankyou?email=${encodeURIComponent(email.trim())}`,
        leadProsperStatus: result.status,
        accessToken,
        expiresAt
      };
      
      // Set secure cookie for additional validation
      const response = NextResponse.json(successResponse, { status: 200 });
      response.cookies.set('thankyou_access', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 10 * 60 // 10 minutes
      });
      
      return response;
    } else {
      const errorResponse = { 
        success: false, 
        error: 'Lead submission failed',
        leadProsperStatus: result.status
      };
      return NextResponse.json(errorResponse, { status: 400 })
    }
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
