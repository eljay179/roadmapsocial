import React, { useState, useRef, useEffect } from 'react';
import { RoadmapCard } from './RoadmapCard';
import { roadmapData } from './roadmapData';
import { Header } from './Header';
import { HorizontalTimeline } from './HorizontalTimeline';

export const RoadmapTimeline: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Find the current or next upcoming roadmap item based on date
    const currentDate = new Date();
    const initialIndex = roadmapData.findIndex(item => {
      const [quarter, year] = item.date.split(' ')[0].split('Q');
      const itemDate = new Date(parseInt(year), (parseInt(quarter) - 1) * 3, 1);
      return itemDate >= currentDate;
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
    <div className="relative pt-80">
      <Header />
      <HorizontalTimeline 
        activeIndex={activeIndex} 
        onNodeClick={scrollToCard}
      />

      {/* Cards Container */}
      <div 
        ref={containerRef}
        className="pb-[100vh] px-4"
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
  );
};