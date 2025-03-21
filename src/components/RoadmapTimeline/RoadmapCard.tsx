import React from 'react';
import { useInView } from '../hooks/useInView';
import { RoadmapItem } from './types';

interface RoadmapCardProps extends RoadmapItem {
  onInView: (isInView: boolean) => void;
  isNext: boolean;
  isPrevious: boolean;
}

export const RoadmapCard: React.FC<RoadmapCardProps> = ({
  title,
  date,
  description,
  icon,
  status,
  onInView,
  isNext,
  isPrevious,
}) => {
  const { ref, isInView } = useInView({ 
    threshold: 0.5,
    rootMargin: '-45% 0px -45% 0px'
  });

  React.useEffect(() => {
    onInView(isInView);
  }, [isInView, onInView]);

  const getStatusStyles = () => {
    switch (status) {
      case 'completed':
        return 'border-green-500/50 bg-gradient-to-br from-white/10 to-green-500/5';
      case 'in-progress':
        return 'border-blue-500/50 bg-gradient-to-br from-white/10 to-blue-500/5';
      default:
        return 'border-white/20 bg-white/10';
    }
  };

  const getStatusIconColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-600';
      case 'in-progress':
        return 'bg-blue-600';
      default:
        return 'bg-purple-600';
    }
  };

  const formatDate = (date: RoadmapItem['date']) => {
    return `Q${date.quarter} ${date.year} - ${date.month}`;
  };

  return (
    <div
      ref={ref}
      className="min-h-[100svh] flex items-center justify-center relative snap-center px-4 sm:px-6 md:px-8"
    >
      <div
        className={`
          max-w-xl w-full backdrop-blur-lg rounded-2xl p-6 sm:p-8 
          shadow-xl border transition-all duration-700
          ${getStatusStyles()}
          ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}
          ${isPrevious ? '-translate-y-full opacity-0' : ''}
        `}
      >
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className={`p-2 sm:p-3 rounded-lg text-white ${getStatusIconColor()}`}>
            {icon}
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{title}</h3>
            <p className="text-sm sm:text-base text-purple-300">{formatDate(date)}</p>
          </div>
        </div>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};