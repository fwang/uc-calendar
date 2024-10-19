import React, { useState, useEffect } from 'react';
import { format, addDays, isWeekend } from 'date-fns';

const START_DATE = new Date(2024, 8, 4); // Sep 3, 2024
const END_DATE = new Date(2025, 5, 24); // Jun 24, 2025
const GRAYED_OUT_DATES = [
  '2024-10-14', '2024-10-21', '2024-11-15', '2024-12-06','2024-12-23','2024-12-24','2024-12-25','2024-12-26','2024-12-27','2024-12-28','2024-12-29','2024-12-30','2024-12-31','2025-01-01','2025-01-02','2025-01-03',
  '2025-01-17', '2025-02-14', '2025-02-17', '2025-03-07', '2025-03-10', '2025-03-11', '2025-03-12', '2025-03-13', '2025-03-14', '2025-03-17', '2025-04-18', '2025-04-21', '2025-05-05', '2025-05-19', '2025-06-09'
];

const CurrentDayTab: React.FC = () => {
  const [currentDay, setCurrentDay] = useState<Date>(new Date());
  const [dayNumber, setDayNumber] = useState<number | null>(null);

  const isGrayedOut = (date: Date) => {
    return (
      isWeekend(date) ||
      date < START_DATE ||
      date > END_DATE ||
      GRAYED_OUT_DATES.includes(format(date, 'yyyy-MM-dd'))
    );
  };

  const getDayNumber = (date: Date) => {
    if (date < START_DATE) return null;
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

  useEffect(() => {
    const findNextValidDay = (date: Date): Date => {
      if (!isGrayedOut(date)) {
        return date;
      }
      return findNextValidDay(addDays(date, 1));
    };

    const nextValidDay = findNextValidDay(currentDay);
    setCurrentDay(nextValidDay);
    setDayNumber(getDayNumber(nextValidDay));
  }, []);

  return (
    <div className="text-center space-y-6">
      <h2 className="text-3xl font-bold text-blue-600">Today's School Day</h2>
      <div className="bg-white rounded-lg shadow-lg p-8 inline-block">
        <p className="text-xl mb-2">Date:</p>
        <p className="text-4xl font-bold mb-6">{format(currentDay, 'MMMM d, yyyy')}</p>
        <p className="text-xl mb-2">School Day:</p>
        <p className="text-6xl font-bold text-blue-500">Day {dayNumber}</p>
      </div>
      <p className="text-gray-600 italic">
        {currentDay.toDateString() !== new Date().toDateString() && 
          "Note: Showing the next school day, as today is not a school day."}
      </p>
    </div>
  );
};

export default CurrentDayTab;