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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4">
            Systematic Framework
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            How DISHA Works
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            Our 5-step systematic framework guides students from <span className="text-indigo-400 font-semibold">understanding</span> baseline skills to setting <span className="text-indigo-400 font-semibold">goals</span>, generating a <span className="text-indigo-400 font-semibold">roadmap</span>, taking hands-on <span className="text-indigo-400 font-semibold">action</span>, and tracking measurable <span className="text-indigo-400 font-semibold">progress</span>.
          </p>
        </div>

        {/* Visual Timeline Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4 relative">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const Icon = iconMap[step.iconName] || UserRound;
            const isLast = index === HOW_IT_WORKS_STEPS.length - 1;

            return (
              <div 
                key={step.number} 
                className="flex flex-col items-center text-center group relative p-5 rounded-2xl bg-slate-900/30 border border-slate-800/80 hover:border-indigo-500/50 hover:bg-slate-900/60 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Connector arrow for larger layouts */}
                {!isLast && (
                  <div className="absolute top-12 -right-3 translate-x-1/2 text-indigo-400/50 hidden lg:block group-hover:text-indigo-400 group-hover:translate-x-4 transition-all duration-300 z-20">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}

                {/* Step Circle with Icon */}
                <div className="w-18 h-18 rounded-full bg-slate-900 border border-slate-800 shadow-lg flex items-center justify-center relative mb-5 group-hover:border-indigo-500 group-hover:shadow-indigo-500/30 group-hover:scale-110 transition-all duration-300">
                  <div className="p-3 bg-slate-950 rounded-full text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  {/* Step Number Badge */}
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-slate-800 text-indigo-300 font-mono text-xs font-bold flex items-center justify-center shadow-md border border-slate-700/60 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-1 leading-snug group-hover:text-indigo-300 transition-colors">
                  {step.title}
                </h3>
                <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider mb-2.5 block">
                  {step.subtitle}
                </span>
                <p className="text-slate-400 text-xs leading-relaxed">
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
