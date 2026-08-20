import { useState } from 'react';
import { Briefcase, Brain, Code, BarChart3, PieChart, Cloud, Shield, ChevronRight, ArrowLeft, Target, BookOpen, Star, Compass } from 'lucide-react';
import { CAREER_OPTIONS } from '../data/studentData';
import type { CareerOption } from '../data/studentData';

export const CareerGuidance = () => {
  const [selectedCareer, setSelectedCareer] = useState<CareerOption | null>(null);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return Brain;
      case 'Code': return Code;
      case 'BarChart3': return BarChart3;
      case 'PieChart': return PieChart;
      case 'Cloud': return Cloud;
      case 'Shield': return Shield;
      default: return Compass;
    }
  };

  const getColorClasses = (colorName: string) => {
    switch (colorName) {
      case 'indigo': return { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/20', hoverBorder: 'hover:border-indigo-500/30' };
      case 'emerald': return { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', hoverBorder: 'hover:border-emerald-500/30' };
      case 'violet': return { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/20', hoverBorder: 'hover:border-violet-500/30' };
      case 'amber': return { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', hoverBorder: 'hover:border-amber-500/30' };
      case 'sky': return { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/20', hoverBorder: 'hover:border-sky-500/30' };
      case 'rose': return { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20', hoverBorder: 'hover:border-rose-500/30' };
      default: return { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/20', hoverBorder: 'hover:border-indigo-500/30' };
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Briefcase className="w-8 h-8 text-indigo-400" />
          Career Guidance
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Explore specialized paths, prepare for internships, and view interviews prep.
        </p>
      </div>

      {selectedCareer ? (
        /* EXPANDED DETAIL VIEW */
        <div className="space-y-6">
          {/* Back button */}
          <button
            onClick={() => setSelectedCareer(null)}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Careers
          </button>

          {/* Active Goal Summary Card */}
          {(() => {
            const CareerIcon = getIconComponent(selectedCareer.icon);
            const cl = getColorClasses(selectedCareer.color);
            return (
              <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
                <div className={`p-4 rounded-2xl ${cl.bg} ${cl.text} shadow-inner`}>
                  <CareerIcon className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-white">{selectedCareer.title}</h2>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">{selectedCareer.description}</p>
                </div>
              </div>
            );
          })()}

          {/* Grid layout for detailed paths */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Required Skills & Path */}
            <div className="space-y-6">
              {/* Skills */}
              <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6">
                <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-850 pb-3 mb-4">
                  <Star className="w-5 h-5 text-indigo-400" />
                  Required Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCareer.requiredSkills.map((skill) => (
                    <span key={skill} className="text-xs bg-slate-950 border border-slate-850 text-slate-300 px-3 py-1.5 rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Learning Path */}
              <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6">
                <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-850 pb-3 mb-4">
                  <BookOpen className="w-5 h-5 text-sky-400" />
                  Learning Path
                </h3>
                <ol className="space-y-3 pl-4 list-decimal text-slate-300 text-sm leading-relaxed">
                  {selectedCareer.learningPath.map((step, idx) => (
                    <li key={idx} className="marker:text-indigo-400 font-medium">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Projects & Interview / Internship */}
            <div className="space-y-6">
              {/* Projects */}
              <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6">
                <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-850 pb-3 mb-4">
                  <Code className="w-5 h-5 text-emerald-400" />
                  Key Portfolio Projects
                </h3>
                <ul className="space-y-2 pl-4 list-disc text-slate-300 text-sm">
                  {selectedCareer.projects.map((proj, idx) => (
                    <li key={idx} className="marker:text-emerald-400">
                      {proj}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prep Info */}
              <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6 space-y-6">
                {/* Internship */}
                <div>
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-amber-400" />
                    Internship Preparation
                  </h4>
                  <ul className="space-y-1.5 pl-4 list-disc text-slate-400 text-xs">
                    {selectedCareer.internshipPrep.map((item, idx) => (
                      <li key={idx} className="marker:text-amber-400">{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Interview */}
                <div>
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-rose-400" />
                    Interview Preparation
                  </h4>
                  <ul className="space-y-1.5 pl-4 list-disc text-slate-400 text-xs">
                    {selectedCareer.interviewPrep.map((item, idx) => (
                      <li key={idx} className="marker:text-rose-400">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* GRID CARDS VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAREER_OPTIONS.map((opt) => {
            const CareerIcon = getIconComponent(opt.icon);
            const cl = getColorClasses(opt.color);

            return (
              <div
                key={opt.id}
                onClick={() => setSelectedCareer(opt)}
                className={`bg-slate-900/45 hover:bg-slate-900/75 border rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between border-slate-800 ${cl.hoverBorder}`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-2.5 rounded-lg ${cl.bg} ${cl.text}`}>
                      <CareerIcon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-white text-base font-bold mb-2 leading-snug">{opt.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">{opt.description}</p>
                </div>

                <div className="flex items-center justify-between text-xs text-indigo-400 font-bold border-t border-slate-850 pt-4 mt-2">
                  <span>Explore Path</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
