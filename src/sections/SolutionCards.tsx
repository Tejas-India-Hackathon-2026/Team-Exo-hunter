import React from 'react';
import { ArrowRight, GraduationCap, School } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

interface SolutionCardsProps {
  onStudentsClick: () => void;
  onCollegesClick: () => void;
}

export const SolutionCards: React.FC<SolutionCardsProps> = ({
  onStudentsClick,
  onCollegesClick,
}) => {
  return (
    <section className="py-20 bg-slate-950 relative border-t border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            One Platform. Dual Solutions.
          </h2>
          <p className="text-slate-400 text-base md:text-lg">
            Empowering students to unlock their professional potential while providing colleges with next-generation smart tools for campus automation.
          </p>
        </div>

        {/* Dual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Student Card */}
          <Card
            glass={true}
            borderColor="indigo"
            className="p-8 rounded-2xl flex flex-col justify-between h-full bg-slate-900/30 backdrop-blur-md"
            icon={<GraduationCap className="w-7 h-7 text-indigo-400" />}
            badge="Primary Module"
          >
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-white mb-3">
                DISHA for Students
              </h3>
              <p className="text-slate-400 leading-relaxed text-base mb-6">
                Personalized AI guidance that helps students plan their studies, discover career paths, build skills, create high-quality portfolio projects, and navigate directly toward their professional goals.
              </p>
            </div>
            
            <div className="mt-auto">
              <div className="flex flex-wrap gap-2 mb-6">
                {['Career Roadmap', 'Study Planner', 'Resume Analyzer', 'Skill Analytics'].map((tag) => (
                  <span 
                    key={tag} 
                    className="text-xs font-semibold px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Button
                variant="primary"
                size="md"
                onClick={onStudentsClick}
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto shadow-lg shadow-indigo-600/20"
              >
                Explore Student DISHA
              </Button>
            </div>
          </Card>

          {/* College Card */}
          <Card
            glass={true}
            borderColor="sky"
            className="p-8 rounded-2xl flex flex-col justify-between h-full bg-slate-900/30 backdrop-blur-md"
            icon={<School className="w-7 h-7 text-sky-400" />}
            badge="Smart Campus"
          >
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-white mb-3">
                DISHA for Smart Campus
              </h3>
              <p className="text-slate-400 leading-relaxed text-base mb-6">
                AI-powered campus solutions that modernize administrative operations with automated student management, face recognition attendance tracking, and actionable engagement analytics.
              </p>
            </div>

            <div className="mt-auto">
              <div className="flex flex-wrap gap-2 mb-6">
                {['Face Attendance', 'Admin Console', 'Student Metrics', 'Campus AI Assistant'].map((tag) => (
                  <span 
                    key={tag} 
                    className="text-xs font-semibold px-2.5 py-1 rounded bg-sky-500/10 border border-sky-500/20 text-sky-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Button
                variant="secondary"
                size="md"
                onClick={onCollegesClick}
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto shadow-lg shadow-sky-500/20"
              >
                Explore Smart Campus
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
