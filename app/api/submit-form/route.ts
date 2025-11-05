import { NextRequest, NextResponse } from 'next/server'
import { sendWelcomeEmail } from '@/app/utils/emailService'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Extract all form fields
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      homePhoneNumber,
      workPhoneNumber,
      zipCode,
      homeOwnership,
      debtAmount,
      subid1,
      subid2,
      subid3,
      trustedformCertUrl,
      // Additional fields
      birthdate,
      ssn,
      streetAddress,
      zipCodeCity,
      addressDuration,
      spendingPurpose,
      creditScore,
      employmentStatus,
      paymentFrequency,
      monthlyIncome,
      nextPayDate,
      secondPayDate,
      unsecuredDebtAmount,
      monthlyHousingPayment,
      hasCheckingAccount,
      hasDirectDeposit,
      bankAccountDuration,
      bankRoutingNumber,
      bankName,
      bankAccountNumber,
      employer,
      employerDuration,
      occupation,
      vehicleStatus,
      driverLicenseState,
      driverLicenseNumber,
      isMilitaryMember,
      hasFiledBankruptcy,
      bankruptcyChapter,
      bankruptcyStatus,
      bankruptcyDischargedInLast2Years,
    } = body

    // Validate required fields (use phoneNumber as primary phone, fallback to phone for backward compatibility)
    const phone = phoneNumber || body.phone || '';
    const homeOwner = homeOwnership || body.homeOwner || '';

    if (!firstName || !lastName || !email || !phone || !zipCode || !homeOwner || !debtAmount) {
      const missingFields = [];
      if (!firstName) missingFields.push('firstName');
      if (!lastName) missingFields.push('lastName');
      if (!email) missingFields.push('email');
      if (!phone) missingFields.push('phoneNumber');
      if (!zipCode) missingFields.push('zipCode');
      if (!homeOwner) missingFields.push('homeOwnership');
      if (!debtAmount) missingFields.push('debtAmount');
      
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
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      phone: phone.replace(/\D/g, ''),
      home_phone: homePhoneNumber?.replace(/\D/g, '') || '',
      work_phone: workPhoneNumber?.replace(/\D/g, '') || '',
      zip_code: zipCode.trim(),
      debt_amount: debtAmount.trim(),
      home_owner: homeOwner.trim(),
      ip_address: ip,
      user_agent: request.headers.get('user-agent') || '',
      landing_page_url: request.headers.get('referer') || '',
      trustedform_cert_url: trustedformCertUrl || '',
      // Additional form fields
      birthdate: birthdate || '',
      ssn: ssn || '',
      street_address: streetAddress || '',
      zip_code_city: zipCodeCity || '',
      address_duration: addressDuration || '',
      spending_purpose: spendingPurpose || '',
      credit_score: creditScore || '',
      employment_status: employmentStatus || '',
      payment_frequency: paymentFrequency || '',
      monthly_income: monthlyIncome || '',
      next_pay_date: nextPayDate || '',
      second_pay_date: secondPayDate || '',
      unsecured_debt_amount: unsecuredDebtAmount || '',
      monthly_housing_payment: monthlyHousingPayment || '',
      has_checking_account: hasCheckingAccount || '',
      has_direct_deposit: hasDirectDeposit || '',
      bank_account_duration: bankAccountDuration || '',
      bank_routing_number: bankRoutingNumber || '',
      bank_name: bankName || '',
      bank_account_number: bankAccountNumber || '',
      employer: employer || '',
      employer_duration: employerDuration || '',
      occupation: occupation || '',
      vehicle_status: vehicleStatus || '',
      driver_license_state: driverLicenseState || '',
      driver_license_number: driverLicenseNumber || '',
      is_military_member: isMilitaryMember || '',
      has_filed_bankruptcy: hasFiledBankruptcy || '',
      bankruptcy_chapter: bankruptcyChapter || '',
      bankruptcy_status: bankruptcyStatus || '',
      bankruptcy_discharged_in_last_2_years: bankruptcyDischargedInLast2Years || '',
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
      sendWelcomeEmail({ email: email.trim() }).catch((error) => {
        console.error('Failed to send welcome email:', error);
        // Email failure shouldn't block form submission
      });
      
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
