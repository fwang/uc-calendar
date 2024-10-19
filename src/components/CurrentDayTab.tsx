import React, { useState, useEffect } from "react";
import { format, addDays, isWeekend } from "date-fns";

const START_DATE = new Date(2024, 8, 4); // Sep 3, 2024
const END_DATE = new Date(2025, 5, 24); // Jun 24, 2025
const GRAYED_OUT_DATES = [
  "2024-10-14",
  "2024-10-21",
  "2024-11-15",
  "2024-12-06",
  "2024-12-23",
  "2024-12-24",
  "2024-12-25",
  "2024-12-26",
  "2024-12-27",
  "2024-12-28",
  "2024-12-29",
  "2024-12-30",
  "2024-12-31",
  "2025-01-01",
  "2025-01-02",
  "2025-01-03",
  "2025-01-17",
  "2025-02-14",
  "2025-02-17",
  "2025-03-07",
  "2025-03-10",
  "2025-03-11",
  "2025-03-12",
  "2025-03-13",
  "2025-03-14",
  "2025-03-17",
  "2025-04-18",
  "2025-04-21",
  "2025-05-05",
  "2025-05-19",
  "2025-06-09",
];
const PERIODS = [
  "8:20-9:00",
  "9:00-9:40",
  "9:40-10:00",
  "10:00-10:40",
  "10:40-11:20",
  "11:20-12:00",
  "12:00-12:40",
  "12:40-1:20",
  "1:20-1:40",
  "1:40-2:20",
  "2:20-3:00",
];
const CLASSES = {
  1: [
    "Language",
    "Language",
    "Recess",
    "Math",
    "Math",
    "Lunch",
    "Science",
    "Science",
    "Recess",
    "Tech",
    "French",
  ],
  2: [
    "Language",
    "Language",
    "Recess",
    "Math",
    "Math",
    "Lunch",
    "Library",
    "Language",
    "Recess",
    "Music",
    "Social",
  ],
  3: [
    "Language",
    "Language",
    "Recess",
    "Math",
    "Math",
    "Lunch",
    "Language",
    "French",
    "Recess",
    "Drama",
    "Science",
  ],
  4: [
    "Language",
    "Language",
    "Recess",
    "Math",
    "Math",
    "Lunch",
    "Language",
    "Gym",
    "Recess",
    "Science",
    "Tech",
  ],
  5: [
    "Language",
    "Language",
    "Recess",
    "Math",
    "Math",
    "Lunch",
    "Social",
    "Social",
    "Recess",
    "French",
    "Music",
  ],
  6: [
    "Language",
    "Language",
    "Recess",
    "Math",
    "Math",
    "Lunch",
    "Gym",
    "Social",
    "Recess",
    "Art",
    "Art",
  ],
};

const SUBJECT_COLORS = {
  Recess: "bg-gray-200",
  Lunch: "bg-gray-200",
  Library: "bg-purple-100",
  Tech: "bg-green-100",
  French: "bg-yellow-100",
  Music: "bg-pink-100",
  Drama: "bg-blue-100",
  Art: "bg-red-100",
  Gym: "bg-orange-100",
};

// Add this new constant
const GRAY_PERIODS = ["9:40-10:00", "11:20-12:00", "1:20-1:40"];

const CurrentDayTab: React.FC = () => {
  const [currentDay, setCurrentDay] = useState<Date>(new Date());
  const [dayNumber, setDayNumber] = useState<number | null>(null);

  const isGrayedOut = (date: Date) => {
    return (
      isWeekend(date) ||
      date < START_DATE ||
      date > END_DATE ||
      GRAYED_OUT_DATES.includes(format(date, "yyyy-MM-dd"))
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
      <div className="bg-white rounded-lg shadow-lg p-8 inline-block">
        <p className="text-4xl font-bold mb-6">
          {format(currentDay, "EEEE, MMMM d, yyyy")}
        </p>
        <p className="text-6xl font-bold text-blue-500 mb-8">Day {dayNumber}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-3 text-left"></th>
              {[1, 2, 3, 4, 5, 6].map((day) => (
                <th key={day} className="p-3 text-center">
                  Day {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERIODS.map((period, index) => (
              <tr key={period}>
                <td
                  className={`p-3 border-t ${
                    GRAY_PERIODS.includes(period) ? "bg-gray-200" : ""
                  }`}
                >
                  {period}
                </td>
                {[1, 2, 3, 4, 5, 6].map((day) => {
                  const subject = CLASSES[day as keyof typeof CLASSES][index];
                  const bgColor =
                    SUBJECT_COLORS[subject as keyof typeof SUBJECT_COLORS] ||
                    "";
                  return (
                    <td
                      key={day}
                      className={`p-3 border-t text-center ${bgColor} ${
                        GRAY_PERIODS.includes(period) ? "bg-gray-200" : ""
                      }`}
                    >
                      {subject}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrentDayTab;
