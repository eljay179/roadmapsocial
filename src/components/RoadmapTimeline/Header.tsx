import React from 'react';

export const Header: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-b from-gray-900 to-transparent pt-8 sm:pt-12 pb-20 sm:pb-24 z-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Our Vision & Roadmap
          </h1>
          <p className="text-purple-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Discover our journey towards building the next generation of blockchain technology.
            Scroll to explore our ambitious roadmap and milestones.
          </p>
        </div>
      </div>
    </div>
  );
}