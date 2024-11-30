import React from 'react';

interface TimelineNodeProps {
  status: 'not-started' | 'in-progress' | 'completed';
  isActive: boolean;
}

export const TimelineNode: React.FC<TimelineNodeProps> = ({ status, isActive }) => {
  const getStatusClasses = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      default:
        return 'border-2 border-purple-400 bg-transparent';
    }
  };

  return (
    <div className="relative z-10">
      <div
        className={`
          w-6 h-6 rounded-full transition-all duration-500
          ${getStatusClasses()}
          ${isActive ? 'scale-125' : 'scale-100'}
        `}
      />
      {isActive && (
        <div className="absolute w-10 h-10 rounded-full border-2 border-purple-400 -top-2 -left-2 animate-ping" />
      )}
    </div>
  );
};