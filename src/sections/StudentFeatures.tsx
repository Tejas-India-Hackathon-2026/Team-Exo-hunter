import React from 'react';
import { 
  Sparkles, Compass, Calendar, GraduationCap, 
  FileText, Code, UserCheck, TrendingUp, ArrowRight 
} from 'lucide-react';
import { STUDENT_FEATURES } from '../data/landingData';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

// Icon mapping dictionary
const iconMap: Record<string, React.ComponentType<any>> = {
  Sparkles,
  Compass,
  Calendar,
  GraduationCap,
  FileText,
  Code,
  UserCheck,
  TrendingUp,
};

interface StudentFeaturesProps {
  onCtaClick: () => void;
}

export const StudentFeatures: React.FC<StudentFeaturesProps> = ({ onCtaClick }) => {
  return (
    <section id="students" className="py-20 bg-slate-950 relative border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3">
              Student Hub
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Personalized Guidance at Every Step
            </h2>
            <p className="text-slate-400 mt-3 text-base">
              DISHA empowers you to evaluate your current skillset, identify targets, draft customized daily learning schedules, and review your progress.
            </p>
          </div>
          <div>
            <Button
              variant="outline"
              size="md"
              onClick={onCtaClick}
              icon={<ArrowRight className="w-4 h-4 text-indigo-400" />}
              className="w-full sm:w-auto border-slate-800 bg-slate-900/30 text-slate-300 hover:bg-slate-900 hover:text-white"
            >
              Start Student Assessment
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STUDENT_FEATURES.map((feature) => {
            const IconComponent = iconMap[feature.iconName] || Sparkles;
            
            return (
              <Card
                key={feature.id}
                title={feature.title}
                description={feature.description}
                icon={<IconComponent className="w-5 h-5 text-indigo-400" />}
                badge={feature.badge}
                glass={true}
                borderColor="indigo"
                className="bg-slate-900/30 border-slate-800/80"
              />
            );
          })}
        </div>

        {/* Feature Interactive Highlight (Mock) */}
        <div className="mt-16 p-8 rounded-2xl bg-indigo-950/20 text-white relative overflow-hidden shadow-xl shadow-indigo-500/5 border border-indigo-500/15">
          {/* Decorative backdrop shapes */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl -z-0 pointer-events-none" />
          <div className="absolute left-1/3 bottom-0 w-60 h-60 bg-sky-500/10 rounded-full blur-2xl -z-0 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Feature Spotlight</span>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                AI Roadmap Builder
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
                Tired of searching YouTube and documentation without direction? Type your target job role, and DISHA AI builds an interactive flowchart path. Read recommended tutorials, take skill assessments, and complete projects to advance your career.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-slate-300 font-medium">Dynamic Skill Nodes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-slate-300 font-medium">Adaptive Difficulty</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-slate-300 font-medium">Auto-Curated Material</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-950/80 rounded-xl border border-indigo-500/20 p-5 backdrop-blur-xs font-mono text-xs text-indigo-300 space-y-4 shadow-inner">
              <div className="flex justify-between text-[10px] text-indigo-400 border-b border-indigo-900/50 pb-2">
                <span>// GENERATING ROADMAP</span>
                <span>STATUS: READY</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-indigo-100 font-semibold">
                  <span className="text-indigo-400">1.</span>
                  <span>React Foundations (state, hooks, context)</span>
                </div>
                <div className="pl-5 text-indigo-400">
                  └─ <span className="text-emerald-400">Project:</span> Build an AI Landing page UI
                </div>
                
                <div className="flex items-center gap-2 text-indigo-100 font-semibold">
                  <span className="text-indigo-400">2.</span>
                  <span>Backend Integration (REST APIs, CORS)</span>
                </div>
                <div className="pl-5 text-indigo-400">
                  └─ <span className="text-emerald-400">Project:</span> Mock login & JSON Server database
                </div>

                <div className="flex items-center gap-2 text-slate-600 italic">
                  <span>3. Production Deployment (CI/CD pipelines)</span>
                </div>
              </div>
              <div className="pt-2 border-t border-indigo-900/50 text-[10px] text-indigo-400 flex justify-between">
                <span>ESTIMATED DURATION: 4 WEEKS</span>
                <span className="text-emerald-400 cursor-pointer hover:underline">START ROADMAP →</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
