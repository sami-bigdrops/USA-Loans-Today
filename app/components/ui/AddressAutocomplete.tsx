'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  zipCode?: string;
  disabled?: boolean;
}

interface GoogleMapsPlacesAutocomplete {
  getPlace: () => {
    formatted_address?: string;
    [key: string]: unknown;
  };
  setOptions: (options: AutocompleteOptions) => void;
  addListener: (event: string, callback: () => void) => void;
}

interface AutocompleteOptions {
  types?: string[];
  componentRestrictions?: {
    country?: string;
    postalCode?: string;
  };
}

interface GoogleMapsPlaces {
  Autocomplete: new (input: HTMLInputElement, options?: AutocompleteOptions) => GoogleMapsPlacesAutocomplete;
}

interface GoogleMaps {
  places: GoogleMapsPlaces;
  maps: {
    places?: GoogleMapsPlaces;
    event?: {
      clearInstanceListeners?: (autocomplete: GoogleMapsPlacesAutocomplete) => void;
    };
  };
}

declare global {
  interface Window {
    google?: GoogleMaps;
  }
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  value,
  onChange,
  onBlur,
  onKeyDown,
  placeholder = 'Enter your street address',
  className = '',
  zipCode,
  disabled = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<GoogleMapsPlacesAutocomplete | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (!isScriptLoaded || !window.google || !inputRef.current || isInitializedRef.current) {
      return;
    }

    const options: AutocompleteOptions = {
      types: ['address'],
      componentRestrictions: { country: 'us' },
    };

    if (zipCode && zipCode.length === 5) {
      options.componentRestrictions = {
        country: 'us',
        postalCode: zipCode,
      };
    }

    if (window.google.places && window.google.places.Autocomplete) {
      autocompleteRef.current = new window.google.places.Autocomplete(
        inputRef.current,
        options
      );

      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current?.getPlace();
        if (place && place.formatted_address) {
          onChange(place.formatted_address);
        }
      });

      isInitializedRef.current = true;
    }
  }, [isScriptLoaded, zipCode, onChange]);

  useEffect(() => {
    if (isInitializedRef.current && autocompleteRef.current && zipCode && zipCode.length === 5) {
      const options: AutocompleteOptions = {
        types: ['address'],
        componentRestrictions: {
          country: 'us',
          postalCode: zipCode,
        },
      };

      autocompleteRef.current.setOptions(options);
    }
  }, [zipCode]);

  useEffect(() => {
    if (window.google?.places || window.google?.maps?.places) {
      setTimeout(() => setIsScriptLoaded(true), 0);
      return;
    }

    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      const handleLoad = () => {
        setTimeout(() => setIsScriptLoaded(true), 0);
      };
      existingScript.addEventListener('load', handleLoad);
      if (window.google?.maps) {
        setTimeout(() => setIsScriptLoaded(true), 0);
      }
      return () => {
        existingScript.removeEventListener('load', handleLoad);
      };
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      console.warn('Google Places API key not found. Please set NEXT_PUBLIC_GOOGLE_PLACES_API_KEY in your environment variables.');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setTimeout(() => setIsScriptLoaded(true), 0);
    };
    script.onerror = () => {
      console.error('Failed to load Google Places API');
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (autocompleteRef.current && window.google?.maps?.event?.clearInstanceListeners) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
    />
  );
};

export default AddressAutocomplete;

