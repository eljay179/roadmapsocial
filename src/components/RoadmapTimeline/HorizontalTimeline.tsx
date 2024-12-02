import React from 'react';
import { roadmapData } from './roadmapData';
import { RoadmapItem } from './types';

interface HorizontalTimelineProps {
  activeIndex: number | null;
  onNodeClick: (index: number) => void;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const HorizontalTimeline: React.FC<HorizontalTimelineProps> = ({ 
  activeIndex, 
  onNodeClick 
}) => {
  const currentDate = new Date();
  
  // Create markers based on the actual roadmap data points
  const markers = roadmapData.map((item, index) => ({
    ...item.date,
    index,
    isFirstOccurrence: !roadmapData.slice(0, index).some(
      prev => prev.date.year === item.date.year &&
             prev.date.quarter === item.date.quarter &&
             prev.date.month === item.date.month
    )
  }));

  const isCurrentPeriod = (date: RoadmapItem['date']) => {
    const currentYear = currentDate.getFullYear();
    const currentQuarter = Math.floor(currentDate.getMonth() / 3) + 1;
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });

    return date.year === currentYear && 
           date.quarter === currentQuarter && 
           date.month === currentMonth;
  };

  const getStatusClasses = (status: 'not-started' | 'in-progress' | 'completed') => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      default:
        return 'border-2 border-purple-400 bg-transparent';
    }
  };

  const getAnimationBorderColor = (status: 'not-started' | 'in-progress' | 'completed') => {
    switch (status) {
      case 'completed':
        return 'border-green-500';
      case 'in-progress':
        return 'border-blue-500';
      default:
        return 'border-purple-400';
    }
  };

  return (
    <div className="fixed top-36 sm:top-44 left-0 right-0 z-20 bg-gradient-to-b from-gray-900/80 to-transparent pb-8 sm:pb-12 overflow-x-auto">
      <div className="container mx-auto px-4">
        {/* Timeline Markers */}
        <div className="flex justify-between max-w-4xl mx-auto mb-1 min-w-[640px]">
          {roadmapData.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              {/* Year (only show if it's the first occurrence in this year) */}
              {idx === 0 || item.date.year !== roadmapData[idx - 1].date.year ? (
                <div className="text-xs sm:text-sm font-bold text-purple-400 mb-1">
                  {item.date.year}
                </div>
              ) : <div className="mb-1" />}
              
              {/* Quarter (only show if it's the first occurrence in this quarter) */}
              {idx === 0 || 
               item.date.year !== roadmapData[idx - 1].date.year ||
               item.date.quarter !== roadmapData[idx - 1].date.quarter ? (
                <div className="text-xs sm:text-sm font-medium text-gray-400">
                  Q{item.date.quarter}
                </div>
              ) : <div className="invisible text-xs sm:text-sm">Q{item.date.quarter}</div>}
              
              {/* Month (only show if it's the first occurrence of this month) */}
              {!roadmapData.slice(0, idx).some(
                prev => prev.date.year === item.date.year &&
                       prev.date.quarter === item.date.quarter &&
                       prev.date.month === item.date.month
              ) && (
                <div className={`text-[10px] sm:text-xs font-medium mt-1 transition-colors duration-300
                  ${isCurrentPeriod(item.date) ? 'text-purple-300' : 'text-gray-500'}
                `}>
                  {item.date.month}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="relative flex items-center justify-between max-w-4xl mx-auto min-w-[640px] mt-4">
          {/* Timeline Line */}
          <div className="absolute h-0.5 bg-purple-400/30 w-full" />
          
          {/* Timeline Nodes */}
          {roadmapData.map((item, index) => (
            <div 
              key={index} 
              className="relative z-10"
              onClick={() => onNodeClick(index)}
            >
              <button
                className={`
                  w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-500
                  hover:scale-150 cursor-pointer touch-manipulation
                  ${getStatusClasses(item.status)}
                  ${activeIndex === index ? 'scale-150' : 'scale-100'}
                `}
                aria-label={`Go to ${item.title}`}
              />
              {activeIndex === index && (
                <div className={`
                  absolute w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 
                  -top-1.5 -left-1.5 sm:-top-2 sm:-left-2 animate-ping
                  ${getAnimationBorderColor(item.status)}
                `} />
              )}
              
              {/* Tooltip */}
              <div className={`
                absolute -bottom-8 left-1/2 -translate-x-1/2 
                transition-all duration-300 px-2
                ${activeIndex === index ? 'opacity-100' : 'opacity-0'}
                whitespace-nowrap text-[10px] sm:text-xs text-purple-200
              `}>
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};