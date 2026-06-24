"use client";

import { useState, useEffect, useRef } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CustomDatePickerProps {
  value: string;
  onChange: (val: string) => void;
  lang?: "vi" | "en";
}

export default function CustomDatePicker({ value, onChange, lang = "vi" }: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse value (YYYY-MM-DD)
  const parseDate = (dateStr: string) => {
    if (!dateStr) return new Date();
    const parts = dateStr.split("-");
    if (parts.length !== 3) return new Date();
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    return new Date(year, month, day);
  };

  const selectedDate = parseDate(value);
  const [viewDate, setViewDate] = useState(selectedDate);

  // States to track view mode: 'days' | 'months' | 'years'
  const [viewMode, setViewMode] = useState<"days" | "months" | "years">("days");

  // Sync viewDate when value changes from outside
  useEffect(() => {
    setViewDate(parseDate(value));
  }, [value]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setViewMode("days"); // Reset mode when closed
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth(); // 0-indexed

  // Months names
  const monthsVi = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
  const monthsEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const months = lang === "vi" ? monthsVi : monthsEn;

  // Short months names for grid
  const shortMonthsVi = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"];
  const shortMonthsEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const shortMonths = lang === "vi" ? shortMonthsVi : shortMonthsEn;

  const daysVi = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const daysEn = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const daysHeader = lang === "vi" ? daysVi : daysEn;

  // Helper calculations
  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => {
    const day = new Date(y, m, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // Month navigation
  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const handleSelectDay = (day: number) => {
    const formattedMonth = String(month + 1).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
    onChange(formattedDate);
    setIsOpen(false);
  };

  const handleSelectMonth = (mIdx: number) => {
    setViewDate(new Date(year, mIdx, 1));
    setViewMode("days");
  };

  const handleSelectYear = (selectedYear: number) => {
    setViewDate(new Date(selectedYear, month, 1));
    setViewMode("months"); // Switch to months selection after picking year
  };

  // Generate blank spaces for padding
  const blanks = Array(firstDay).fill(null);
  // Generate days array
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Generate years list (from currentYear - 45 to currentYear + 15)
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 45;
  const yearsList = Array.from({ length: 60 }, (_, i) => startYear + i);

  // Quick formatted text value for input
  const getFormattedValue = () => {
    if (!value) return lang === "vi" ? "Chọn ngày..." : "Select date...";
    const parts = value.split("-");
    if (parts.length !== 3) return value;
    return `${parts[2]}/${parts[1]}/${parts[0]}`; // DD/MM/YYYY
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#1e293b]/50 border border-white/5 focus-within:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all flex items-center justify-between cursor-pointer select-none"
      >
        <span className={value ? "text-white" : "text-slate-500"}>
          {getFormattedValue()}
        </span>
        <CalendarIcon size={16} className="text-blue-400" />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-2 left-0 bg-[#141b2b] border border-white/10 p-4 rounded-2xl shadow-2xl w-[280px]"
          >
            {/* 1. DAYS VIEW MODE */}
            {viewMode === "days" && (
              <>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <button 
                    type="button"
                    onClick={handlePrevMonth}
                    className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setViewMode("months")}
                      className="text-xs font-bold text-white uppercase tracking-wider hover:text-blue-400 hover:bg-white/5 px-2 py-1 rounded-md transition-all"
                    >
                      {months[month]}
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode("years")}
                      className="text-xs font-bold text-white uppercase tracking-wider hover:text-blue-400 hover:bg-white/5 px-2 py-1 rounded-md transition-all"
                    >
                      {year}
                    </button>
                  </div>
                  <button 
                    type="button"
                    onClick={handleNextMonth}
                    className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* Grid header (days names) */}
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {daysHeader.map((d) => (
                    <span key={d} className="text-[10px] font-bold text-slate-500">
                      {d}
                    </span>
                  ))}
                </div>

                {/* Grid days */}
                <div className="grid grid-cols-7 gap-1 text-center">
                  {blanks.map((_, i) => (
                    <div key={`blank-${i}`} className="w-8 h-8" />
                  ))}
                  {days.map((day) => {
                    const isSelected = selectedDate.getDate() === day && 
                                       selectedDate.getMonth() === month && 
                                       selectedDate.getFullYear() === year &&
                                       value !== "";
                    const isToday = new Date().getDate() === day &&
                                    new Date().getMonth() === month &&
                                    new Date().getFullYear() === year;

                    return (
                      <button
                        key={`day-${day}`}
                        type="button"
                        onClick={() => handleSelectDay(day)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                          isSelected
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-95"
                            : isToday
                              ? "border border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                              : "text-slate-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* 2. MONTHS SELECTION MODE */}
            {viewMode === "months" && (
              <>
                <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {lang === "vi" ? "Chọn Tháng" : "Select Month"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setViewMode("years")}
                    className="text-xs font-bold text-blue-400 hover:text-blue-300 hover:bg-white/5 px-2.5 py-1 rounded-md transition-all"
                  >
                    {year}
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {shortMonths.map((mName, mIdx) => {
                    const isCurrentSelected = month === mIdx;
                    return (
                      <button
                        key={mName}
                        type="button"
                        onClick={() => handleSelectMonth(mIdx)}
                        className={`py-3 px-2 rounded-xl text-xs font-bold transition-all text-center ${
                          isCurrentSelected
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {mName}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* 3. YEARS SELECTION MODE */}
            {viewMode === "years" && (
              <>
                <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {lang === "vi" ? "Chọn Năm" : "Select Year"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setViewMode("days")}
                    className="text-xs font-bold text-blue-400 hover:text-blue-300 hover:bg-white/5 px-2.5 py-1 rounded-md transition-all"
                  >
                    {lang === "vi" ? "Quay lại" : "Back"}
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-1.5 max-h-[200px] overflow-y-auto pr-1 custom-scrollbar">
                  {yearsList.map((yNum) => {
                    const isCurrentSelected = year === yNum;
                    return (
                      <button
                        key={yNum}
                        type="button"
                        onClick={() => handleSelectYear(yNum)}
                        className={`py-2 px-1 rounded-lg text-xs font-bold transition-all text-center ${
                          isCurrentSelected
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {yNum}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
