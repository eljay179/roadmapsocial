import React from 'react';
import { roadmapData } from './roadmapData';

interface HorizontalTimelineProps {
  activeIndex: number | null;
  onNodeClick: (index: number) => void;
}

export const HorizontalTimeline: React.FC<HorizontalTimelineProps> = ({ 
  activeIndex, 
  onNodeClick 
}) => {
  const currentDate = new Date();
  const quarters = Array.from(new Set(roadmapData.map(item => item.date.split(' - ')[0])));

  const isCurrentQuarter = (quarter: string) => {
    const [q, year] = quarter.split(' ');
    const quarterNum = parseInt(q[1]);
    const currentQuarter = Math.floor(currentDate.getMonth() / 3) + 1;
    return parseInt(year) === currentDate.getFullYear() && quarterNum === currentQuarter;
  };

  return (
    <div className="fixed top-48 sm:top-64 left-0 right-0 z-20 bg-gradient-to-b from-gray-900/80 to-transparent pb-8 sm:pb-12 overflow-x-auto">
      <div className="container mx-auto px-4">
        {/* Quarter Indicators */}
        <div className="flex justify-between max-w-4xl mx-auto mb-4 min-w-[640px]">
          {quarters.map((quarter, idx) => (
            <div 
              key={idx}
              className={`text-xs sm:text-sm font-medium transition-colors duration-300 px-2
                ${isCurrentQuarter(quarter) ? 'text-purple-400' : 'text-gray-400'}
              `}
            >
              {quarter}
            </div>
          ))}
        </div>

        <div className="relative flex items-center justify-between max-w-4xl mx-auto min-w-[640px]">
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
                <div className="absolute w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-purple-400 -top-1.5 -left-1.5 sm:-top-2 sm:-left-2 animate-ping" />
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