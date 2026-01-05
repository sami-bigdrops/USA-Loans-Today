'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface BirthdatePickerProps {
  value?: string; // Format: YYYY-MM-DD
  onChange?: (value: string) => void;
  onEnterKeyPress?: () => void;
  placeholder?: string;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
}

const BirthdatePicker: React.FC<BirthdatePickerProps> = ({
  value,
  onChange,
  onEnterKeyPress,
  placeholder = 'Select your birthdate',
  className = '',
  minDate,
  maxDate,
}) => {
  const [day, setDay] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [isDayOpen, setIsDayOpen] = useState(false);
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  
  const dayInputRef = useRef<HTMLInputElement>(null);
  const monthInputRef = useRef<HTMLInputElement>(null);
  const yearInputRef = useRef<HTMLInputElement>(null);
  const dayDropdownRef = useRef<HTMLDivElement>(null);
  const monthDropdownRef = useRef<HTMLDivElement>(null);
  const yearDropdownRef = useRef<HTMLDivElement>(null);

  // Parse value prop to populate day, month, year
  useEffect(() => {
    if (value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        setDay(String(date.getDate()).padStart(2, '0'));
        setMonth(String(date.getMonth() + 1).padStart(2, '0'));
        setYear(String(date.getFullYear()));
      }
    } else {
      setDay('');
      setMonth('');
      setYear('');
    }
  }, [value]);

  // Format date when all three fields are complete (as a fallback)
  useEffect(() => {
    if (day && month && year && day.length > 0 && month.length > 0 && year.length === 4) {
      const paddedDay = day.padStart(2, '0');
      const paddedMonth = month.padStart(2, '0');
      const formatted = formatDate(paddedDay, paddedMonth, year);
      if (formatted && formatted !== value) {
        onChange?.(formatted);
      }
    }
  }, [day, month, year]);

  // Generate days based on selected month and year
  const getDaysInMonth = (monthNum: number, yearNum: number): number => {
    if (!monthNum || !yearNum) return 31;
    return new Date(yearNum, monthNum, 0).getDate();
  };

  const getDays = (): number[] => {
    const monthNum = parseInt(month) || 1;
    const yearNum = parseInt(year) || new Date().getFullYear();
    const daysInMonth = getDaysInMonth(monthNum, yearNum);
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  const getYears = (): number[] => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const minAgeYear = currentYear - 18; // User must be at least 18 years old
    const startYear = minDate ? Math.max(minDate.getFullYear(), currentYear - 120) : currentYear - 120;
    const endYear = maxDate ? Math.min(maxDate.getFullYear(), minAgeYear) : minAgeYear;
    const years: number[] = [];
    for (let y = endYear; y >= startYear; y--) {
      years.push(y);
    }
    return years;
  };

  const formatDate = (d: string, m: string, y: string): string | null => {
    const dayNum = parseInt(d);
    const monthNum = parseInt(m);
    const yearNum = parseInt(y);

    if (!dayNum || !monthNum || !yearNum) return null;
    if (dayNum < 1 || dayNum > 31) return null;
    if (monthNum < 1 || monthNum > 12) return null;
    if (yearNum < 1000 || yearNum > 9999) return null;

    const date = new Date(yearNum, monthNum - 1, dayNum);
    if (date.getDate() !== dayNum || date.getMonth() !== monthNum - 1 || date.getFullYear() !== yearNum) {
      return null;
    }

    if (minDate && date < minDate) return null;
    if (maxDate && date > maxDate) return null;

    // Validate user is at least 18 years old
    const today = new Date();
    const age = today.getFullYear() - yearNum;
    const monthDiff = today.getMonth() - (monthNum - 1);
    const dayDiff = today.getDate() - dayNum;
    const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;
    
    if (actualAge < 18) return null;

    // Ensure m and d are padded to 2 digits
    const paddedMonth = m.padStart(2, '0');
    const paddedDay = d.padStart(2, '0');
    return `${yearNum}-${paddedMonth}-${paddedDay}`;
  };

  const handleDayChange = (newDay: string) => {
    const digits = newDay.replace(/\D/g, '');
    let formattedDay = digits;
    
    if (digits.length > 2) {
      formattedDay = digits.slice(0, 2);
    }

    // Don't pad with zero while typing - only store the raw digits
    setDay(formattedDay);
    
    if (formattedDay.length === 2) {
      const monthNum = parseInt(month) || 1;
      const yearNum = parseInt(year) || new Date().getFullYear();
      const maxDay = getDaysInMonth(monthNum, yearNum);
      const dayNum = parseInt(formattedDay);
      if (dayNum > maxDay) {
        const correctedDay = String(maxDay).padStart(2, '0');
        setDay(correctedDay);
        // Format date if all fields are available
        if (month && year && year.length === 4) {
          const formatted = formatDate(correctedDay, month.padStart(2, '0'), year);
          if (formatted) {
            onChange?.(formatted);
          } else {
            onChange?.('');
          }
        }
      } else {
        // Format date if all fields are available
        if (month && year && year.length === 4) {
          const paddedDay = formattedDay.padStart(2, '0');
          const formatted = formatDate(paddedDay, month.padStart(2, '0'), year);
          if (formatted) {
            onChange?.(formatted);
          } else {
            onChange?.('');
          }
        }
        setTimeout(() => {
          monthInputRef.current?.focus();
          monthInputRef.current?.select();
        }, 0);
      }
      setIsDayOpen(false);
    } else if (formattedDay.length > 0) {
      // Try to format if all fields are available
      if (month && year && year.length === 4) {
        const paddedDay = formattedDay.padStart(2, '0');
        const formatted = formatDate(paddedDay, month.padStart(2, '0'), year);
        if (formatted) {
          onChange?.(formatted);
        }
      }
    }
  };

  const handleMonthChange = (newMonth: string) => {
    const digits = newMonth.replace(/\D/g, '');
    let formattedMonth = digits;
    
    if (digits.length > 2) {
      formattedMonth = digits.slice(0, 2);
    }

    if (formattedMonth && parseInt(formattedMonth) > 12) {
      formattedMonth = '12';
    }

    // Don't pad with zero while typing - only store the raw digits
    setMonth(formattedMonth);
    
    if (formattedMonth.length === 2) {
      const monthNum = parseInt(formattedMonth);
      if (monthNum >= 1 && monthNum <= 12) {
        const paddedMonth = formattedMonth.padStart(2, '0');
        const yearNum = parseInt(year) || new Date().getFullYear();
        const maxDay = getDaysInMonth(monthNum, yearNum);
        if (day && parseInt(day) > maxDay) {
          const correctedDay = String(maxDay).padStart(2, '0');
          setDay(correctedDay);
          // Format date if all fields are available
          if (day && year && year.length === 4) {
            const formatted = formatDate(correctedDay, paddedMonth, year);
            if (formatted) {
              onChange?.(formatted);
            } else {
              onChange?.('');
            }
          }
        } else {
          // Format date if all fields are available
          if (day && year && year.length === 4) {
            const paddedDay = day.padStart(2, '0');
            const formatted = formatDate(paddedDay, paddedMonth, year);
            if (formatted) {
              onChange?.(formatted);
            } else {
              onChange?.('');
            }
          }
          setTimeout(() => {
            yearInputRef.current?.focus();
            yearInputRef.current?.select();
          }, 0);
        }
        setIsMonthOpen(false);
      }
    } else if (formattedMonth.length > 0) {
      // Try to format if all fields are available
      if (day && year && year.length === 4) {
        const paddedMonth = formattedMonth.padStart(2, '0');
        const paddedDay = day.padStart(2, '0');
        const formatted = formatDate(paddedDay, paddedMonth, year);
        if (formatted) {
          onChange?.(formatted);
        }
      }
    }
  };

  const handleYearChange = (newYear: string) => {
    const digits = newYear.replace(/\D/g, '');
    let formattedYear = digits;
    
    if (digits.length > 4) {
      formattedYear = digits.slice(0, 4);
    }

    setYear(formattedYear);
    
    if (formattedYear.length === 4) {
      const yearNum = parseInt(formattedYear);
      const monthNum = parseInt(month) || 1;
      const maxDay = getDaysInMonth(monthNum, yearNum);
      let finalDay = day;
      if (day && parseInt(day) > maxDay) {
        finalDay = String(maxDay).padStart(2, '0');
        setDay(finalDay);
      }
      setIsYearOpen(false);
      
      // Format and call onChange when all fields are complete
      if (day && month) {
        const paddedDay = finalDay.padStart(2, '0');
        const paddedMonth = month.padStart(2, '0');
        const formatted = formatDate(paddedDay, paddedMonth, formattedYear);
        if (formatted) {
          onChange?.(formatted);
        }
      }
    } else if (formattedYear.length > 0) {
      // Try to format if all fields are available and year is complete
      if (day && month && formattedYear.length === 4) {
        const paddedDay = day.padStart(2, '0');
        const paddedMonth = month.padStart(2, '0');
        const formatted = formatDate(paddedDay, paddedMonth, formattedYear);
        if (formatted) {
          onChange?.(formatted);
        }
      }
    }
  };

  const handleDaySelect = (selectedDay: number) => {
    const dayStr = String(selectedDay).padStart(2, '0');
    setDay(dayStr);
    setIsDayOpen(false);
    setTimeout(() => {
      monthInputRef.current?.focus();
      monthInputRef.current?.select();
    }, 0);
    
    const formatted = formatDate(dayStr, month.padStart(2, '0'), year);
    if (formatted) {
      onChange?.(formatted);
    }
  };

  const handleMonthSelect = (selectedMonth: string) => {
    setMonth(selectedMonth);
    setIsMonthOpen(false);
    setTimeout(() => {
      yearInputRef.current?.focus();
    }, 0);
    
    const monthNum = parseInt(selectedMonth);
    const yearNum = parseInt(year) || new Date().getFullYear();
    const maxDay = getDaysInMonth(monthNum, yearNum);
    let finalDay = day;
    if (day && parseInt(day) > maxDay) {
      finalDay = String(maxDay).padStart(2, '0');
      setDay(finalDay);
    }
    
    const formatted = formatDate(finalDay, selectedMonth, year);
    if (formatted) {
      onChange?.(formatted);
    }
  };

  const handleYearSelect = (selectedYear: number) => {
    const yearStr = String(selectedYear);
    setYear(yearStr);
    setIsYearOpen(false);
    
    const monthNum = parseInt(month) || 1;
    const maxDay = getDaysInMonth(monthNum, selectedYear);
    if (day && parseInt(day) > maxDay) {
      setDay(String(maxDay).padStart(2, '0'));
    }
    
    const formatted = formatDate(day, month, yearStr);
    if (formatted) {
      onChange?.(formatted);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dayDropdownRef.current && !dayDropdownRef.current.contains(event.target as Node)) {
        setIsDayOpen(false);
      }
      if (monthDropdownRef.current && !monthDropdownRef.current.contains(event.target as Node)) {
        setIsMonthOpen(false);
      }
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target as Node)) {
        setIsYearOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex gap-2">
        {/* Day Input/Dropdown */}
        <div className="flex-1 relative" ref={dayDropdownRef}>
          <input
            ref={dayInputRef}
            type="text"
            value={day}
            onChange={(e) => handleDayChange(e.target.value)}
            onBlur={() => {
              setTimeout(() => {
                if (day && day.length === 1) {
                  const padded = day.padStart(2, '0');
                  setDay(padded);
                  const formatted = formatDate(padded, month.padStart(2, '0'), year);
                  if (formatted) {
                    onChange?.(formatted);
                  }
                }
                setIsDayOpen(false);
              }, 200);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (day.length === 2) {
                  monthInputRef.current?.focus();
                }
                if (onEnterKeyPress && day && month && year) {
                  onEnterKeyPress();
                }
              } else if (e.key === 'Backspace' && day === '' && dayInputRef.current?.selectionStart === 0) {
                e.preventDefault();
              }
            }}
            onFocus={() => setIsDayOpen(true)}
            placeholder="DD"
            maxLength={2}
            className="w-full px-4 py-3.5 pr-10 bg-white border-2 rounded-lg transition-all duration-200 border-gray-300 hover:border-[#313863] hover:shadow-md focus:border-[#313863] focus:ring-2 focus:ring-[#313863]/20 outline-none text-[--text] font-medium"
          />
          <button
            type="button"
            onClick={() => setIsDayOpen(!isDayOpen)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronDown size={16} className="text-gray-400" />
          </button>
          {isDayOpen && (
            <div className="absolute z-50 w-full mt-1 bg-white border-2 border-[#313863] rounded-lg shadow-2xl max-h-48 overflow-y-auto">
              {getDays().map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => handleDaySelect(d)}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors ${
                    (day === String(d).padStart(2, '0') || day === String(d)) ? 'bg-[#313863] text-white' : 'text-[--text]'
                  }`}
                >
                  {String(d).padStart(2, '0')}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Month Input/Dropdown */}
        <div className="flex-1 relative" ref={monthDropdownRef}>
          <input
            ref={monthInputRef}
            type="text"
            value={month}
            onChange={(e) => handleMonthChange(e.target.value)}
            onBlur={() => {
              setTimeout(() => {
                if (month && month.length === 1) {
                  const padded = month.padStart(2, '0');
                  setMonth(padded);
                  const formatted = formatDate(day.padStart(2, '0'), padded, year);
                  if (formatted) {
                    onChange?.(formatted);
                  }
                }
                setIsMonthOpen(false);
              }, 200);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (month.length === 2) {
                  yearInputRef.current?.focus();
                }
                if (onEnterKeyPress && day && month && year) {
                  onEnterKeyPress();
                }
              } else if (e.key === 'Backspace') {
                const cursorPos = monthInputRef.current?.selectionStart || 0;
                if (month === '' || (cursorPos === 0 && month.length > 0)) {
                  e.preventDefault();
                  if (month === '') {
                    dayInputRef.current?.focus();
                    dayInputRef.current?.setSelectionRange(day.length, day.length);
                  } else {
                    setMonth('');
                    monthInputRef.current?.setSelectionRange(0, 0);
                  }
                }
              }
            }}
            onFocus={() => setIsMonthOpen(true)}
            placeholder="MM"
            maxLength={2}
            className="w-full px-4 py-3.5 pr-10 bg-white border-2 rounded-lg transition-all duration-200 border-gray-300 hover:border-[#313863] hover:shadow-md focus:border-[#313863] focus:ring-2 focus:ring-[#313863]/20 outline-none text-[--text] font-medium"
          />
          <button
            type="button"
            onClick={() => setIsMonthOpen(!isMonthOpen)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronDown size={16} className="text-gray-400" />
          </button>
          {isMonthOpen && (
            <div className="absolute z-50 w-full mt-1 bg-white border-2 border-[#313863] rounded-lg shadow-2xl max-h-48 overflow-y-auto">
              {months.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => handleMonthSelect(m.value)}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors ${
                    (month === m.value || month === String(parseInt(m.value))) ? 'bg-[#313863] text-white' : 'text-[--text]'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Year Input/Dropdown */}
        <div className="flex-1 relative" ref={yearDropdownRef}>
          <input
            ref={yearInputRef}
            type="text"
            value={year}
            onChange={(e) => handleYearChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (onEnterKeyPress && day && month && year) {
                  onEnterKeyPress();
                }
              } else if (e.key === 'Backspace') {
                const cursorPos = yearInputRef.current?.selectionStart || 0;
                if (year === '' || (cursorPos === 0 && year.length > 0)) {
                  e.preventDefault();
                  if (year === '') {
                    monthInputRef.current?.focus();
                    monthInputRef.current?.setSelectionRange(month.length, month.length);
                  } else {
                    setYear('');
                    yearInputRef.current?.setSelectionRange(0, 0);
                  }
                }
              }
            }}
            onFocus={() => setIsYearOpen(true)}
            onBlur={() => {
              setTimeout(() => {
                setIsYearOpen(false);
              }, 200);
            }}
            placeholder="YYYY"
            maxLength={4}
            className="w-full px-4 py-3.5 pr-10 bg-white border-2 rounded-lg transition-all duration-200 border-gray-300 hover:border-[#313863] hover:shadow-md focus:border-[#313863] focus:ring-2 focus:ring-[#313863]/20 outline-none text-[--text] font-medium"
          />
          <button
            type="button"
            onClick={() => setIsYearOpen(!isYearOpen)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronDown size={16} className="text-gray-400" />
          </button>
          {isYearOpen && (
            <div className="absolute z-50 w-full mt-1 bg-white border-2 border-[#313863] rounded-lg shadow-2xl max-h-48 overflow-y-auto">
              {getYears().map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => handleYearSelect(y)}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors ${
                    year === String(y) ? 'bg-[#313863] text-white' : 'text-[--text]'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BirthdatePicker;

