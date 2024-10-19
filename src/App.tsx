import React, { useState } from 'react';
import { CalendarDays, CalendarIcon } from 'lucide-react';
import CalendarTab from './components/CalendarTab';
import CurrentDayTab from './components/CurrentDayTab';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'month' | 'currentDay'>('month');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex border-b">
          <button
            className={`flex-1 py-4 px-6 text-lg font-semibold ${
              activeTab === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setActiveTab('month')}
          >
            <CalendarIcon className="inline-block mr-2" /> Month
          </button>
          <button
            className={`flex-1 py-4 px-6 text-lg font-semibold ${
              activeTab === 'currentDay' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setActiveTab('currentDay')}
          >
            <CalendarDays className="inline-block mr-2" /> Current Day
          </button>
        </div>
        <div className="p-6">
          {activeTab === 'month' ? <CalendarTab /> : <CurrentDayTab />}
        </div>
      </div>
    </div>
  );
};

export default App;