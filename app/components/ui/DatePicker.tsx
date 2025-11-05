'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface DatePickerProps {
  value?: string; // Format: YYYY-MM-DD
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = 'Select a date',
  className = '',
  minDate,
  maxDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'calendar' | 'month' | 'year'>('calendar');
  
  // Derive selected date from value prop
  const selectedDate = value ? (() => {
    const date = new Date(value);
    return !isNaN(date.getTime()) ? date : null;
  })() : null;
  
  // Initialize display month - use selected date's month if available, otherwise current month
  const getInitialDisplayMonth = () => {
    if (selectedDate) {
      return new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    }
    return new Date();
  };
  
  const [displayMonth, setDisplayMonth] = useState(getInitialDisplayMonth);

  // Handle opening calendar - reset to selected date's month if available
  const handleToggleCalendar = () => {
    if (!isOpen && selectedDate) {
      // When opening, show the month of the selected date
      setDisplayMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
    }
    setIsOpen(!isOpen);
    setViewMode('calendar'); // Reset to calendar view when opening
  };

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const formatValueForForm = (date: Date): string => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(displayMonth);
  const firstDay = getFirstDayOfMonth(displayMonth);

  const isDateDisabled = (date: Date): boolean => {
    if (minDate) {
      const min = new Date(minDate);
      min.setHours(0, 0, 0, 0);
      if (date < min) return true;
    }
    if (maxDate) {
      const max = new Date(maxDate);
      max.setHours(23, 59, 59, 999);
      if (date > max) return true;
    }
    return false;
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date): boolean => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(displayMonth.getFullYear(), displayMonth.getMonth(), day);
    if (!isDateDisabled(newDate)) {
      onChange?.(formatValueForForm(newDate));
      setIsOpen(false);
    }
  };

  const handlePreviousMonth = () => {
    setDisplayMonth(new Date(displayMonth.getFullYear(), displayMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDisplayMonth(new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1, 1));
  };

  const handleHeaderClick = () => {
    if (viewMode === 'calendar') {
      setViewMode('month');
    } else if (viewMode === 'month') {
      setViewMode('year');
    }
  };

  const handleMonthSelect = (month: number) => {
    setDisplayMonth(new Date(displayMonth.getFullYear(), month, 1));
    setViewMode('calendar');
  };

  const handleYearSelect = (year: number) => {
    setDisplayMonth(new Date(year, displayMonth.getMonth(), 1));
    setViewMode('month');
  };

  const getYearRange = () => {
    const currentYear = displayMonth.getFullYear();
    const startYear = minDate ? minDate.getFullYear() : currentYear - 100;
    const endYear = maxDate ? maxDate.getFullYear() : currentYear + 10;
    return { startYear, endYear };
  };

  const getYearsForPicker = () => {
    const { startYear, endYear } = getYearRange();
    const currentYear = displayMonth.getFullYear();
    const years: number[] = [];
    
    // Show 12 years at a time, centered around current year
    const start = Math.max(startYear, currentYear - 6);
    const end = Math.min(endYear, currentYear + 5);
    
    for (let year = start; year <= end; year++) {
      years.push(year);
    }
    
    return years;
  };

  const handleTodayClick = () => {
    const today = new Date();
    if (!isDateDisabled(today)) {
      onChange?.(formatValueForForm(today));
      setIsOpen(false);
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const days: (number | null)[] = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return (
    <div className={`relative w-full ${className}`} ref={datePickerRef}>
      <button
        type="button"
        onClick={handleToggleCalendar}
        className={`
          w-full px-4 py-3.5 text-left bg-white border-2 rounded-lg
          transition-all duration-200
          flex items-center justify-between
          ${isOpen
            ? 'border-[#313863] shadow-lg ring-2 ring-[#313863]/20'
            : 'border-gray-300 hover:border-[#313863] hover:shadow-md focus:border-[#313863] focus:ring-2 focus:ring-[#313863]/20'
          }
          ${selectedDate ? 'text-[--text] font-medium' : 'text-gray-500'}
        `}
      >
        <span className="truncate">
          {selectedDate ? formatDate(selectedDate) : placeholder}
        </span>
        <CalendarIcon
          size={20}
          className={`
            text-gray-400 transition-colors duration-200 shrink-0 ml-2
            ${isOpen ? 'text-[#313863]' : ''}
          `}
        />
      </button>

      {/* Calendar Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full max-w-sm mt-2 bg-white border-2 border-[#313863] rounded-lg shadow-2xl p-2">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-2 px-1">
            {viewMode === 'calendar' && (
              <>
                <button
                  type="button"
                  onClick={handlePreviousMonth}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <ChevronLeft size={16} className="text-[#313863]" />
                </button>
                <button
                  type="button"
                  onClick={handleHeaderClick}
                  className="px-2 py-1 text-sm font-bold text-[--text] hover:bg-gray-100 rounded transition-colors"
                >
                  {monthNames[displayMonth.getMonth()]} {displayMonth.getFullYear()}
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <ChevronRight size={16} className="text-[#313863]" />
                </button>
              </>
            )}
            {viewMode === 'month' && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    const newYear = displayMonth.getFullYear() - 1;
                    const { startYear } = getYearRange();
                    if (newYear >= startYear) {
                      setDisplayMonth(new Date(newYear, displayMonth.getMonth(), 1));
                    }
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <ChevronLeft size={16} className="text-[#313863]" />
                </button>
                <button
                  type="button"
                  onClick={handleHeaderClick}
                  className="px-2 py-1 text-sm font-bold text-[--text] hover:bg-gray-100 rounded transition-colors"
                >
                  {displayMonth.getFullYear()}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const newYear = displayMonth.getFullYear() + 1;
                    const { endYear } = getYearRange();
                    if (newYear <= endYear) {
                      setDisplayMonth(new Date(newYear, displayMonth.getMonth(), 1));
                    }
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <ChevronRight size={16} className="text-[#313863]" />
                </button>
              </>
            )}
            {viewMode === 'year' && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    const { startYear } = getYearRange();
                    const currentYear = displayMonth.getFullYear();
                    const newYear = Math.max(startYear, currentYear - 12);
                    setDisplayMonth(new Date(newYear, displayMonth.getMonth(), 1));
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <ChevronLeft size={16} className="text-[#313863]" />
                </button>
                <div className="px-2 py-1 text-sm font-bold text-[--text]">
                  {getYearRange().startYear} - {getYearRange().endYear}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const { endYear } = getYearRange();
                    const currentYear = displayMonth.getFullYear();
                    const newYear = Math.min(endYear, currentYear + 12);
                    setDisplayMonth(new Date(newYear, displayMonth.getMonth(), 1));
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <ChevronRight size={16} className="text-[#313863]" />
                </button>
              </>
            )}
          </div>

          {/* Month Picker View */}
          {viewMode === 'month' && (
            <div className="grid grid-cols-3 gap-1 px-1">
              {monthNames.map((month, index) => {
                const monthDate = new Date(displayMonth.getFullYear(), index, 1);
                const isDisabled = minDate && monthDate < new Date(minDate.getFullYear(), minDate.getMonth(), 1) ||
                                  maxDate && monthDate > new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 0);
                const isSelected = selectedDate && 
                                  selectedDate.getMonth() === index && 
                                  selectedDate.getFullYear() === displayMonth.getFullYear();
                
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleMonthSelect(index)}
                    disabled={isDisabled}
                    className={`
                      py-2 px-3 text-xs font-medium rounded
                      transition-all duration-150
                      ${isDisabled
                        ? 'text-gray-300 cursor-not-allowed'
                        : isSelected
                          ? 'bg-[#313863] text-white font-bold'
                          : 'text-[--text] hover:bg-gray-100 active:bg-gray-200'
                      }
                    `}
                  >
                    {month.slice(0, 3)}
                  </button>
                );
              })}
            </div>
          )}

          {/* Year Picker View */}
          {viewMode === 'year' && (
            <div className="grid grid-cols-4 gap-1 px-1 max-h-[200px] overflow-y-auto">
              {getYearsForPicker().map((year) => {
                const isDisabled = minDate && year < minDate.getFullYear() ||
                                  maxDate && year > maxDate.getFullYear();
                const isSelected = selectedDate && selectedDate.getFullYear() === year;
                const isCurrentYear = year === new Date().getFullYear();
                
                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() => handleYearSelect(year)}
                    disabled={isDisabled}
                    className={`
                      py-2 px-3 text-xs font-medium rounded
                      transition-all duration-150
                      ${isDisabled
                        ? 'text-gray-300 cursor-not-allowed'
                        : isSelected
                          ? 'bg-[#313863] text-white font-bold'
                          : isCurrentYear
                            ? 'bg-blue-50 text-[#313863] font-semibold border border-[#313863]'
                            : 'text-[--text] hover:bg-gray-100 active:bg-gray-200'
                      }
                    `}
                  >
                    {year}
                  </button>
                );
              })}
            </div>
          )}

          {/* Calendar Days View */}
          {viewMode === 'calendar' && (
            <>
              {/* Day Names */}
              <div className="grid grid-cols-7 gap-0.5 mb-1.5 px-1">
                {dayNames.map((day) => (
                  <div
                    key={day}
                    className="text-center text-[10px] font-semibold text-gray-600 py-1"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-0.5 px-1">
                {days.map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} className="aspect-square" />;
                  }

                  const date = new Date(displayMonth.getFullYear(), displayMonth.getMonth(), day);
                  const disabled = isDateDisabled(date);
                  const today = isToday(date);
                  const selected = isSelected(date);

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDateSelect(day)}
                      disabled={disabled}
                      className={`
                        aspect-square rounded text-xs font-medium min-w-[28px] min-h-[28px]
                        transition-all duration-150
                        ${disabled
                          ? 'text-gray-300 cursor-not-allowed'
                          : selected
                            ? 'bg-[#313863] text-white font-bold'
                            : today
                              ? 'bg-blue-50 text-[#313863] font-semibold border border-[#313863]'
                              : 'text-[--text] hover:bg-gray-100 active:bg-gray-200'
                        }
                      `}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* Today Button */}
          <div className="mt-2 pt-2 border-t border-gray-200">
            <button
              type="button"
              onClick={handleTodayClick}
              disabled={isDateDisabled(new Date())}
              className="w-full px-3 py-1.5 text-xs font-medium text-[#313863] hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;

