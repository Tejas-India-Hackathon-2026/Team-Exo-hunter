import React from 'react';
import { UserRound, Target, Map, Play, Award, ArrowRight } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../data/landingData';

// Map icon names to Lucide icons
const iconMap: Record<string, React.ComponentType<any>> = {
  UserRound,
  Target,
  Map,
  Play,
  Award,
};

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-slate-950 relative overflow-hidden dark-grid-bg">
      {/* ⚡ Glowing data flow connector lines */}
      <div className="absolute top-24 left-0 right-0 h-[2px] glowing-timeline-line hidden lg:block pointer-events-none opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            How DISHA Works
          </h2>
          <p className="text-slate-400 text-base md:text-lg">
            Our systematic framework guides students from initial skills assessment to achieving their career goals.
          </p>
        </div>

        {/* Visual Timeline Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4 relative">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const Icon = iconMap[step.iconName] || UserRound;
            const isLast = index === HOW_IT_WORKS_STEPS.length - 1;

            return (
              <div key={step.number} className="flex flex-col items-center text-center group relative px-4">
                {/* Connector arrow for smaller layouts */}
                {!isLast && (
                  <div className="absolute top-10 -right-2 translate-x-1/2 text-indigo-400 hidden lg:block group-hover:translate-x-3 transition-transform duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}

                {/* Step Circle with Icon */}
                <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800/80 shadow-lg flex items-center justify-center relative mb-6 group-hover:border-indigo-500 group-hover:shadow-indigo-500/20 transition-all duration-300">
                  <div className="p-3 bg-slate-950 rounded-full text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  {/* Step Number Badge */}
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-slate-800 text-slate-100 font-mono text-xs font-bold flex items-center justify-center shadow-md border border-slate-700/60">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-1 leading-snug">
                  {step.title}
                </h3>
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2 block">
                  {step.subtitle}
                </span>
                <p className="text-slate-400 text-xs leading-relaxed max-w-[200px]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
