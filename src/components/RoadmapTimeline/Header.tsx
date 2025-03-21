import React from 'react';

export const Header: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-b from-gray-900 to-transparent z-20">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="text-center">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            Our Vision & Roadmap
          </h1>
          <p className="text-sm xs:text-base sm:text-lg text-purple-200 max-w-2xl mx-auto leading-relaxed">
            Discover our journey towards building the next generation of blockchain technology.
            Scroll to explore our ambitious roadmap and milestones.
          </p>
        </div>
      </div>
    </div>
  );
}