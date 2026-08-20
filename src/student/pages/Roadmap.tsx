import { useState } from 'react';
import { Map, CheckCircle2, Circle, Sparkles, Loader2 } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ROADMAP_STEPS, DEFAULT_PROFILE, type RoadmapStep } from '../data/studentData';
import { generateDynamicRoadmap } from '../services/mockAiService';

export const Roadmap = () => {
  const [profile] = useLocalStorage('disha-student-profile', DEFAULT_PROFILE);
  const [steps, setSteps] = useLocalStorage<RoadmapStep[]>('disha-roadmap-steps', ROADMAP_STEPS);
  const [generating, setGenerating] = useState(false);

  const apiKey = localStorage.getItem('disha-gemini-key') || '';

  const handleAiGenerate = async () => {
    setGenerating(true);
    try {
      const generatedSteps = await generateDynamicRoadmap(
        profile.careerGoal,
        profile.skills,
        apiKey
      );
      if (Array.isArray(generatedSteps) && generatedSteps.length > 0) {
        setSteps(generatedSteps);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  const completedSteps = steps.filter(step => step.status === 'completed').length;
  const progressPercent = Math.round((completedSteps / steps.length) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl">
      {/* Header with overall progress */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3">
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Map className="w-8 h-8 text-indigo-400" />
            Your DISHA Roadmap
          </h1>
          <p className="text-slate-400 text-sm">
            Target Goal: <strong className="text-indigo-300">{profile.careerGoal}</strong>
          </p>
          <button
            onClick={handleAiGenerate}
            disabled={generating}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-650 hover:bg-indigo-600 text-xs font-semibold text-white transition-all disabled:opacity-50 cursor-pointer shadow-md select-none"
          >
            {generating ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Generating custom roadmap...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
                <span>AI Re-generate Roadmap</span>
              </>
            )}
          </button>
        </div>

        {/* Progress Bar Display */}
        <div className="w-full md:w-64 space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-400">Roadmap Progress</span>
            <span className="text-indigo-400 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-850 p-[2px]">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-500 text-right">
            {completedSteps} of {steps.length} steps completed
          </p>
        </div>
      </div>

      {/* Roadmap Timeline */}
      <div className="relative pl-6 md:pl-10 space-y-8 before:absolute before:left-[19px] md:before:left-[33px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-800">
        {steps.map((step) => {
          const isCompleted = step.status === 'completed';
          const isCurrent = step.status === 'current';

          return (
            <div
              key={step.id}
              className={`relative flex flex-col md:flex-row md:items-start gap-4 md:gap-8 group`}
            >
              {/* Timeline Indicator Node */}
              <div className="absolute -left-[27px] md:-left-[43px] top-1 z-10 flex items-center justify-center">
                {isCompleted ? (
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center text-emerald-400 shadow-md shadow-emerald-500/15">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                ) : isCurrent ? (
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 border-2 border-indigo-500 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-500/35 relative">
                    <span className="absolute inset-0 rounded-full bg-indigo-500/30 animate-ping duration-1000" />
                    <span className="text-xs font-extrabold">{step.id}</span>
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                    <Circle className="w-4.5 h-4.5" />
                  </div>
                )}
              </div>

              {/* Step Card Content */}
              <div className={`
                flex-1 bg-slate-900/40 border rounded-xl p-5 md:p-6 transition-all duration-300
                ${isCurrent 
                  ? 'border-indigo-500/40 bg-slate-900/60 shadow-lg shadow-indigo-500/5 -translate-y-[2px]' 
                  : 'border-slate-850 hover:border-slate-800'
                }
              `}>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className={`text-base font-bold transition-colors ${
                    isCurrent ? 'text-indigo-400' : 'text-white'
                  }`}>
                    {step.title}
                  </h3>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border ${
                    isCompleted
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : isCurrent
                      ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                      : 'bg-slate-950 text-slate-500 border-slate-850'
                  }`}>
                    {step.status}
                  </span>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {step.description}
                </p>

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Skills:</span>
                  {step.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`text-[11px] px-2 py-0.5 rounded-md ${
                        isCompleted
                          ? 'bg-emerald-500/5 text-emerald-300/80 border border-emerald-500/10'
                          : isCurrent
                          ? 'bg-indigo-500/10 text-indigo-200 border border-indigo-500/20'
                          : 'bg-slate-950 text-slate-500 border border-slate-850'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
