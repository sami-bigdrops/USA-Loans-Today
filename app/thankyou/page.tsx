'use client'

import React, { useEffect, useState, Suspense } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Check, X } from 'lucide-react'

import { useSearchParams } from 'next/navigation'

interface UtmParams {
  utm_source: string
  utm_id: string
  utm_s1: string
}

function ThankYouContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [utmParams, setUtmParams] = useState<UtmParams>({
    utm_source: '',
    utm_id: '',
    utm_s1: ''
  })
  // Email service disabled
  // const [emailSent, setEmailSent] = useState(false)
  const [buyer, setBuyer] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [firstName, setFirstName] = useState<string>('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hasProcessedUrl, setHasProcessedUrl] = useState(false) // Used in commented code below

  // Email service disabled
  // // Function to send welcome email from thank you page
  // const sendWelcomeEmailFromThankYou = useCallback(async () => {
  //   try {
  //     // Get email from URL parameters (passed from webhook)
  //     const emailFromUrl = searchParams.get('email');
  //     
  //     // Fallback to localStorage if URL parameter not available
  //     const formData = localStorage.getItem('form_data');
  //     const emailFromStorage = formData ? JSON.parse(formData).email : null;
  //     
  //     const email = emailFromUrl || emailFromStorage;
  //     
  //     
  //     if (!email) {
  //       return;
  //     }
  //     
  //     const response = await fetch('/api/send-email', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         email: email
  //       })
  //     });
  //     
  //     if (response.ok) {
  //       setEmailSent(true);
  //     }
  //   } catch {
  //   }
  // }, [searchParams]);

  // Protection useEffect - runs first to check access authorization
  // COMMENTED OUT FOR DEVELOPMENT - Allow direct access to /thankyou
  useEffect(() => {
    // DEVELOPMENT: Allow direct access
    const timer = setTimeout(() => {
          setIsAuthorized(true);
          setIsLoading(false);
          
      const buyerFromUrl = searchParams.get('buyer');
          if (buyerFromUrl) {
            setBuyer(buyerFromUrl);
          }
          
      const statusFromUrl = searchParams.get('status');
      if (statusFromUrl) {
        setStatus(statusFromUrl);
      }
      
      const firstNameFromUrl = searchParams.get('firstName');
      if (firstNameFromUrl) {
        setFirstName(firstNameFromUrl);
      } else {
        // Fallback to localStorage if URL parameter not available
        const formData = localStorage.getItem('form_data');
        const firstNameFromStorage = formData ? JSON.parse(formData).firstName : null;
        if (firstNameFromStorage) {
          setFirstName(firstNameFromStorage);
        }
      }
    }, 0);
    
    return () => clearTimeout(timer);
    
    // ORIGINAL CODE - COMMENTED FOR DEVELOPMENT
    // // Prevent multiple runs
    // if (hasProcessedUrl) return;
    // 
    // const checkAccess = async () => {
    //   try {
    //     // Check if user came from webhook (has email parameter)
    //     const emailFromUrl = searchParams.get('email');
    //     const buyerFromUrl = searchParams.get('buyer');
    //     const statusFromUrl = searchParams.get('status');
    //     const firstNameFromUrl = searchParams.get('firstName');
    //     
    //     if (emailFromUrl) {
    //       // User came from webhook or form submission with email - allow access
    //       setIsAuthorized(true);
    //       setIsLoading(false);
    //       setHasProcessedUrl(true);
    //       
    //       // Set buyer from URL parameters
    //       if (buyerFromUrl) {
    //         setBuyer(buyerFromUrl);
    //       }
    //       
    //       // Set status from URL parameters
    //       if (statusFromUrl) {
    //         setStatus(statusFromUrl);
    //       }
    //       
    //       // Set firstName from URL parameters
    //       if (firstNameFromUrl) {
    //         setFirstName(firstNameFromUrl);
    //       } else {
    //         // Fallback to localStorage if URL parameter not available
    //         const formData = localStorage.getItem('form_data');
    //         const firstNameFromStorage = formData ? JSON.parse(formData).firstName : null;
    //         if (firstNameFromStorage) {
    //           setFirstName(firstNameFromStorage);
    //         }
    //       }
    //       
    //       // Clean URL by removing query parameters after extracting the data
    //       setTimeout(() => {
    //         if (typeof window !== 'undefined') {
    //           const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    //           window.history.replaceState({}, document.title, cleanUrl);
    //         }
    //       }, 100);
    //       
    //       // Email service disabled
    //       // // Send welcome email if not already sent
    //       // if (!emailSent) {
    //       //   sendWelcomeEmailFromThankYou();
    //       // }
    //       return;
    //     }
    //
    //     // Check for access token in localStorage (for direct access)
    //     const token = localStorage.getItem('thankyou_token');
    //     const expiresAt = localStorage.getItem('thankyou_expires');
    //
    //     if (!token || !expiresAt) {
    //       router.replace('/');
    //       return;
    //     }
    //
    //     // Check if token has expired
    //     const currentTime = Date.now();
    //     const tokenExpiry = parseInt(expiresAt, 10);
    //     
    //     if (currentTime > tokenExpiry) {
    //       localStorage.removeItem('thankyou_token');
    //       localStorage.removeItem('thankyou_expires');
    //       router.replace('/');
    //       return;
    //     }
    //
    //     // Validate token against server (optional additional security check)
    //     try {
    //       const response = await fetch('/api/validate-access', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ token })
    //       });
    //       
    //       if (!response.ok) {
    //         throw new Error('Token validation failed');
    //       }
    //     } catch {
    //       // If validation endpoint doesn't exist or fails, we'll rely on localStorage validation
    //     }
    //
    //     // All checks passed - authorize access
    //     setIsAuthorized(true);
    //     
    //     // Get status and firstName from URL if available (for token-based access)
    //     const statusFromTokenUrl = searchParams.get('status');
    //     const firstNameFromTokenUrl = searchParams.get('firstName');
    //     
    //     if (statusFromTokenUrl) {
    //       setStatus(statusFromTokenUrl);
    //     }
    //     
    //     if (firstNameFromTokenUrl) {
    //       setFirstName(firstNameFromTokenUrl);
    //     } else {
    //       // Fallback to localStorage if URL parameter not available
    //       const formData = localStorage.getItem('form_data');
    //       const firstNameFromStorage = formData ? JSON.parse(formData).firstName : null;
    //       if (firstNameFromStorage) {
    //         setFirstName(firstNameFromStorage);
    //       }
    //     }
    //     
    //     // Clear the token to prevent reuse (one-time access)
    //     localStorage.removeItem('thankyou_token');
    //     localStorage.removeItem('thankyou_expires');
    //     
    //     // Email service disabled
    //     // // Send welcome email if not already sent
    //     // if (!emailSent) {
    //     //   sendWelcomeEmailFromThankYou();
    //     // }
    //   } catch {
    //     router.replace('/');
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    //
    // checkAccess();
  }, [router, hasProcessedUrl, searchParams]);

  useEffect(() => {
    // Skip UTM parameter processing if not authorized
    if (!isAuthorized) return;

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

    // Get UTM parameters from URL
    const utm_source = searchParams.get('utm_source') || ''
    const utm_id = searchParams.get('utm_id') || ''
    const utm_s1 = searchParams.get('utm_s1') || ''

    // If URL parameters exist, use them and save to cookies
    let timeoutId: NodeJS.Timeout;
    if (utm_source || utm_id || utm_s1) {
      if (utm_source) setCookie('subid1', utm_source);
      if (utm_id) setCookie('subid2', utm_id);
      if (utm_s1) setCookie('subid3', utm_s1);
      
      // Defer state update to avoid synchronous setState in effect
      timeoutId = setTimeout(() => {
        setUtmParams({ utm_source, utm_id, utm_s1 });
      }, 0);
    } else {
      // If no URL parameters, try to read from cookies
      const cookieUtmSource = getCookie('subid1') || '';
      const cookieUtmId = getCookie('subid2') || '';
      const cookieUtmS1 = getCookie('subid3') || '';
      
      // Defer state update to avoid synchronous setState in effect
      timeoutId = setTimeout(() => {
      setUtmParams({
        utm_source: cookieUtmSource,
        utm_id: cookieUtmId,
        utm_s1: cookieUtmS1
        });
      }, 0);
    }

    // Cleanup timeout on unmount or dependency change
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [searchParams, isAuthorized])

  // Show loading state while checking authorization
  if (isLoading) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    );
  }

  // Show nothing if not authorized (redirect is in progress)
  if (!isAuthorized) {
    return null;
  }

  const isAccepted = status === 'ACCEPTED' || status === 'DUPLICATED' || status === 'ERROR';

  return (
    <main className="bg-linear-to-br from-gray-50 via-white to-gray-50">
      {/* Thank You Section */}
      <section id="thankyou" className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Main Content Card */}
            <div className="rounded-2xl shadow-xl border border-gray-100 overflow-hidden py-8">
              {/* Status Icon Section */}
              <div className={`relative bg-linear-to-br from-gray-50 to-white px-6 ${isAccepted ? 'pt-12 pb-8' : 'pt-8 pb-6'}`}>
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className={`absolute inset-0 rounded-full ${isAccepted ? 'bg-green-100 animate-ping' : 'bg-red-100 animate-ping'} opacity-75`}></div>
                    <div className={`relative rounded-full ${isAccepted ? 'bg-green-50' : 'bg-red-50'} p-6 border-4 ${isAccepted ? 'border-green-500' : 'border-red-500'}`}>
                      {isAccepted ? (
                        <Check className="size-16 text-green-600" strokeWidth={3} />
                      ) : (
                        <X className="size-16 text-red-600" strokeWidth={3} />
                      )}
                    </div>
                  </div>
            </div>
                
                {/* Status Badge */}
                <div className="flex justify-center mb-4">
                  <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${isAccepted ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {isAccepted ? 'Request Accepted' : 'Request Rejected'}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className={`px-6 sm:px-8 lg:px-12 ${isAccepted ? 'py-2' : 'py-6'}`}>

                {/* Main Message */}
                <div className={isAccepted ? 'mb-8' : 'mb-0'}>
                  <p className="text-2xl text-center leading-relaxed font-normal text-gray-900">
                    {isAccepted ? (
                      <>Congratulations! {firstName ? <><span className="font-bold">{firstName}</span>, </> : ''}your request has been accepted.</>
                    ) : (
                      <>Sorry! {firstName ? <><span className="font-bold">{firstName}</span>, </> : ''}your request has been rejected.</>
                    )}
                  </p>
                </div>

                {/* Information Cards */}
                {isAccepted && (
                  <div className="space-y-4 mb-6">
                    {/* Next Steps Card */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-blue-900 mb-3">
                        What Happens Next?
                      </h3>
                      <p className="text-blue-800">
                      Please check your mobile phone provided in the application to continue as the approval link has been sent there.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  )
}
