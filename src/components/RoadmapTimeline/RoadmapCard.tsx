import React from 'react';
import { useInView } from '../hooks/useInView';

interface RoadmapCardProps {
  title: string;
  date: string;
  description: string;
  icon: React.ReactNode;
  status: 'not-started' | 'in-progress' | 'completed';
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

  return (
    <div
      ref={ref}
      className="min-h-[100svh] flex items-center justify-center relative snap-center px-4 sm:px-6 md:px-8"
    >
      <div
        className={`
          max-w-xl w-full bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 
          shadow-xl border border-white/20 transition-all duration-700
          ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}
          ${isPrevious ? '-translate-y-full opacity-0' : ''}
        `}
      >
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="p-2 sm:p-3 bg-purple-600 rounded-lg text-white">
            {icon}
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{title}</h3>
            <p className="text-sm sm:text-base text-purple-300">{date}</p>
          </div>
        </div>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}