import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { isWeekend, isBefore, isAfter, addDays, format } from 'date-fns';

const START_DATE = new Date(2024, 8, 4); // Sep 3, 2024
const END_DATE = new Date(2025, 5, 24); // Jun 24, 2025
const GRAYED_OUT_DATES = [
  '2024-10-14', '2024-10-21', '2024-11-15', '2024-12-06','2024-12-23','2024-12-24','2024-12-25','2024-12-26','2024-12-27','2024-12-28','2024-12-29','2024-12-30','2024-12-31','2025-01-01','2025-01-02','2025-01-03',
  '2025-01-17', '2025-02-14', '2025-02-17', '2025-03-07', '2025-03-10', '2025-03-11', '2025-03-12', '2025-03-13', '2025-03-14', '2025-03-17', '2025-04-18', '2025-04-21', '2025-05-05', '2025-05-19', '2025-06-09'
];

const CalendarTab: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);

  useEffect(() => {
    const days: Date[] = [];
    let currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    while (currentDay.getDay() !== 0) {
      currentDay = addDays(currentDay, -1);
      days.unshift(new Date(currentDay));
    }
    
    currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    while (currentDay <= lastDay) {
      days.push(new Date(currentDay));
      currentDay = addDays(currentDay, 1);
    }
    
    while (days.length < 42) {
      days.push(new Date(currentDay));
      currentDay = addDays(currentDay, 1);
    }
    
    setCalendarDays(days);
  }, [currentDate]);

  const isGrayedOut = (date: Date) => {
    return (
      isWeekend(date) ||
      isBefore(date, START_DATE) ||
      isAfter(date, END_DATE) ||
      GRAYED_OUT_DATES.includes(format(date, 'yyyy-MM-dd'))
    );
  };

  const getDayNumber = (date: Date) => {
    if (isBefore(date, START_DATE)) return null;
    let dayCount = 0;
    let currentDate = new Date(START_DATE);
    while (currentDate <= date) {
      if (!isGrayedOut(currentDate)) {
        dayCount++;
      }
      currentDate = addDays(currentDate, 1);
    }
    return ((dayCount - 1) % 6) + 1;
  };

  const handlePrevMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-200">
          <ChevronLeft />
        </button>
        <h2 className="text-2xl font-bold">{format(currentDate, 'MMMM yyyy')}</h2>
        <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-200">
          <ChevronRight />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-semibold">{day}</div>
        ))}
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`p-2 text-center ${
              isGrayedOut(day) ? 'bg-gray-200 text-gray-400' : 'bg-white'
            } ${day.getMonth() !== currentDate.getMonth() ? 'opacity-50' : ''}`}
          >
            <div>{format(day, 'd')}</div>
            {!isGrayedOut(day) && day.getMonth() === currentDate.getMonth() && (
              <div className="mt-1 text-sm font-semibold text-blue-600">
                Day {getDayNumber(day)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarTab;