import React, { useState, useRef, useEffect } from 'react';
import { RoadmapCard } from './RoadmapCard';
import { roadmapData } from './roadmapData';
import { Header } from './Header';
import { HorizontalTimeline } from './HorizontalTimeline';

export const RoadmapTimeline: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastCardRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        setHeaderHeight(height);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []);

  useEffect(() => {
    // Find the current or next upcoming roadmap item based on date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentQuarter = Math.floor(currentDate.getMonth() / 3) + 1;
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });

    const initialIndex = roadmapData.findIndex(item => {
      if (item.date.year > currentYear) return true;
      if (item.date.year === currentYear && item.date.quarter > currentQuarter) return true;
      if (item.date.year === currentYear && 
          item.date.quarter === currentQuarter && 
          item.date.month >= currentMonth) return true;
      return false;
    });
    
    if (initialIndex !== -1) {
      setActiveIndex(initialIndex);
      scrollToCard(initialIndex);
    }
  }, []);

  const scrollToCard = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    
    const cards = container.children;
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (!lastCardRef.current) return;

      const lastCard = lastCardRef.current;
      const rect = lastCard.getBoundingClientRect();
      const isLastCardInView = rect.top >= window.innerHeight * 0.1 && 
                              rect.bottom <= window.innerHeight * 0.9;

      if (isLastCardInView && e.deltaY > 0) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <div className="relative">
      <div ref={headerRef}>
        <Header />
      </div>

      {/* Dynamic spacing based on header height */}
      <div style={{ paddingTop: `${headerHeight + 32}px` }}>
        <HorizontalTimeline 
          activeIndex={activeIndex} 
          onNodeClick={scrollToCard}
        />

        {/* Cards Container */}
        <div 
          ref={containerRef}
          className="pb-[100vh] px-4 pt-32"
        >
          {roadmapData.map((item, index) => (
            <div
              key={index}
              ref={index === roadmapData.length - 1 ? lastCardRef : null}
              className="flex justify-center"
            >
              <RoadmapCard
                {...item}
                isNext={activeIndex !== null && index === activeIndex + 1}
                isPrevious={activeIndex !== null && index === activeIndex - 1}
                onInView={(isInView) => {
                  if (isInView) {
                    setActiveIndex(index);
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};