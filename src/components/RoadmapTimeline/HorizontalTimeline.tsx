import React, { useRef, useState, useEffect, TouchEvent } from 'react';
import { roadmapData } from './roadmapData';
import { RoadmapItem } from './types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HorizontalTimelineProps {
  activeIndex: number | null;
  onNodeClick: (index: number) => void;
}

export const HorizontalTimeline: React.FC<HorizontalTimelineProps> = ({ 
  activeIndex, 
  onNodeClick 
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const currentDate = new Date();

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && activeIndex !== null && activeIndex < roadmapData.length - 1) {
      onNodeClick(activeIndex + 1);
    }
    if (isRightSwipe && activeIndex !== null && activeIndex > 0) {
      onNodeClick(activeIndex - 1);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const targetScroll = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
    
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  const updateArrowVisibility = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', updateArrowVisibility);
    window.addEventListener('resize', updateArrowVisibility);

    return () => {
      container.removeEventListener('scroll', updateArrowVisibility);
      window.removeEventListener('resize', updateArrowVisibility);
    };
  }, []);

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

  const isFirstMonthOccurrence = (index: number) => {
    return !roadmapData.slice(0, index).some(
      prev => prev.date.year === roadmapData[index].date.year &&
             prev.date.quarter === roadmapData[index].date.quarter &&
             prev.date.month === roadmapData[index].date.month
    );
  };

  return (
    <div className="fixed top-36 sm:top-44 left-0 right-0 z-20 bg-gradient-to-b from-gray-900/80 to-transparent pb-8 sm:pb-12">
      <div className="relative container mx-auto px-4">
        {/* Navigation Arrows */}
        <button
          onClick={() => scroll('left')}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-gray-900/50 text-white backdrop-blur-sm
            transition-opacity duration-300 hover:bg-gray-900/70 focus:outline-none focus:ring-2 focus:ring-purple-500
            ${showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            md:hidden`}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => scroll('right')}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-gray-900/50 text-white backdrop-blur-sm
            transition-opacity duration-300 hover:bg-gray-900/70 focus:outline-none focus:ring-2 focus:ring-purple-500
            ${showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            md:hidden`}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Timeline Container */}
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto hide-scrollbar"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Timeline Markers */}
          <div className="flex justify-between min-w-[640px] max-w-4xl mx-auto mb-1">
            {roadmapData.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                {/* Year */}
                {idx === 0 || item.date.year !== roadmapData[idx - 1].date.year ? (
                  <div className="text-xs sm:text-sm font-bold text-purple-400 mb-1">
                    {item.date.year}
                  </div>
                ) : <div className="mb-1" />}
                
                {/* Quarter */}
                {idx === 0 || 
                 item.date.year !== roadmapData[idx - 1].date.year ||
                 item.date.quarter !== roadmapData[idx - 1].date.quarter ? (
                  <div className="text-xs sm:text-sm font-medium text-gray-400">
                    Q{item.date.quarter}
                  </div>
                ) : <div className="invisible text-xs sm:text-sm">Q{item.date.quarter}</div>}
                
                {/* Month - Only show for first occurrence */}
                {isFirstMonthOccurrence(idx) && (
                  <div className={`text-[10px] sm:text-xs font-medium mt-1 transition-colors duration-300
                    ${isCurrentPeriod(item.date) ? 'text-purple-300' : 'text-gray-500'}
                  `}>
                    {item.date.month}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative flex items-center justify-between min-w-[640px] max-w-4xl mx-auto mt-4">
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
    </div>
  );
};