'use client';

import React, { createContext, useContext, useId } from 'react';
import { Check } from 'lucide-react';

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(undefined);

interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  children: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ 
    children, 
    value, 
    defaultValue, 
    onValueChange, 
    name, 
    disabled = false,
    className = '',
    orientation = 'vertical',
    ...props 
  }, ref) => {
    const generatedName = useId();
    const groupName = name || generatedName;
    const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue);
    
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const handleChange = (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <RadioGroupContext.Provider
        value={{
          name: groupName,
          value: currentValue,
          onChange: handleChange,
          disabled,
        }}
      >
        <div
          ref={ref}
          role="radiogroup"
          className={`
            flex
            ${orientation === 'horizontal' ? 'flex-row gap-4 sm:gap-6' : 'flex-col gap-3'}
            ${className}
          `}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

interface RadioGroupItemProps {
  value: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ value, label, disabled: itemDisabled, id }, ref) => {
    const context = useContext(RadioGroupContext);
    
    if (!context) {
      throw new Error('RadioGroupItem must be used within a RadioGroup');
    }

    const { name, value: selectedValue, onChange, disabled: groupDisabled } = context;
    const isDisabled = itemDisabled || groupDisabled;
    const isChecked = selectedValue === value;
    const itemId = id || `${name}-${value}`;
    const generatedLabelId = useId();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isDisabled && onChange) {
        onChange(value);
      }
      // Stop propagation to prevent label click from firing again
      e.stopPropagation();
    };

    const handleClick = () => {
      if (!isDisabled && onChange && isChecked) {
        // If already selected, trigger onChange on click (since input onChange won't fire)
        onChange(value);
      }
    };

    return (
      <label
        htmlFor={itemId}
        onClick={handleClick}
        className={`
          flex items-center w-full cursor-pointer
          ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {/* Hidden input for form submission and accessibility */}
        <input
          ref={ref}
          type="radio"
          id={itemId}
          name={name}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          onChange={handleChange}
          className="sr-only"
          aria-labelledby={label ? generatedLabelId : undefined}
        />
        
        {/* Custom check icon */}
        <div
          className={`
            shrink-0 w-6 h-6
            rounded-full border-2 flex items-center justify-center
            transition-all duration-200
            ${isChecked
              ? 'border-[#313863] bg-[#313863]'
              : 'border-gray-400 bg-white'
            }
            ${isDisabled ? 'opacity-50' : ''}
          `}
        >
          {isChecked && (
            <Check
              size={18}
              className="text-white"
              strokeWidth={3}
            />
          )}
        </div>
        
        {/* Label text */}
        {label && (
          <span
            id={generatedLabelId}
            className={`
              ml-3
              text-base
              font-medium
              text-[--text]
              select-none
              flex-1
            `}
          >
            {label}
          </span>
        )}
      </label>
    );
  }
);

RadioGroupItem.displayName = 'RadioGroupItem';

interface RadioGroupLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  className?: string;
}

const RadioGroupLabel = React.forwardRef<HTMLLabelElement, RadioGroupLabelProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={`
          block text-sm sm:text-base font-medium text-[--text] mb-2 sm:mb-3
          ${className}
        `}
        {...props}
      >
        {children}
      </label>
    );
  }
);

RadioGroupLabel.displayName = 'RadioGroupLabel';

export { RadioGroup, RadioGroupItem, RadioGroupLabel };
