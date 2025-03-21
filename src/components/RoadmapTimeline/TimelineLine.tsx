import React from 'react';

interface TimelineLineProps {
  isActive: boolean;
}

export const TimelineLine: React.FC<TimelineLineProps> = ({ isActive }) => {
  return (
    <div className="relative h-[30vh]">
      <div
        className={`
          absolute left-1/2 -translate-x-1/2 h-full transition-all duration-500
          ${isActive ? 'w-[5px] bg-purple-500' : 'w-px bg-purple-400/50'}
        `}
      />
    </div>
  );
};