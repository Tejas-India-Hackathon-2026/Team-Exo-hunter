import { FolderKanban, Code, Settings } from 'lucide-react';
import { PROJECT_RECOMMENDATIONS } from '../data/studentData';

export const ProjectGuidance = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <FolderKanban className="w-8 h-8 text-indigo-400" />
          Project Recommendations
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Hand-picked portfolio projects matched to your targeted learning path.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECT_RECOMMENDATIONS.map((project) => {
          const isAdvanced = project.difficulty === 'Advanced';
          const isIntermediate = project.difficulty === 'Intermediate';

          return (
            <div
              key={project.id}
              className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-md"
            >
              <div className="space-y-4">
                {/* Header title & difficulty */}
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-white text-base font-bold leading-snug">{project.name}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border shrink-0 ${
                    isAdvanced
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      : isIntermediate
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>
                    {project.difficulty}
                  </span>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Technologies & Skills chips */}
              <div className="mt-6 space-y-3 pt-4 border-t border-slate-850">
                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                    <Settings className="w-3 h-3" /> Tech:
                  </span>
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-[10px] bg-slate-950 border border-slate-850 text-indigo-300 px-2 py-0.5 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Skills developed */}
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                    <Code className="w-3 h-3" /> Skills:
                  </span>
                  {project.skills.map((skill) => (
                    <span key={skill} className="text-[10px] bg-slate-950 border border-slate-850 text-slate-400 px-2 py-0.5 rounded-md">
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
