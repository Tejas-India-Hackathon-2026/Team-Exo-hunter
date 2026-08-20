import React from 'react';
import { Users, Sparkles, CheckCircle2, Code2, Cpu, BrainCircuit, Activity } from 'lucide-react';
import { Card } from '../components/Card';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  memberNo: string;
  githubUsername?: string;
  githubUrl?: string;
  skills: string[];
  status: 'Active' | 'In Progress';
  contributions: string[];
  icon: React.ReactNode;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'member-1',
    name: 'Team Member 1',
    role: 'Lead Architect & Fullstack Core',
    memberNo: 'Member 01',
    skills: ['System Architecture', 'React 19', 'FastAPI', 'Cloud Infra'],
    status: 'Active',
    contributions: ['Project Foundation & Setup', 'Core UI/UX Structure'],
    icon: <Cpu className="w-5 h-5 text-indigo-400" />
  },
  {
    id: 'member-2',
    name: 'Team Member 2',
    role: 'AI & Smart Campus Logic Specialist',
    memberNo: 'Member 02',
    skills: ['Computer Vision', 'Edge AI', 'Face Recognition', 'Analytics'],
    status: 'Active',
    contributions: ['Smart Attendance Pipeline', 'Camera AI Simulators'],
    icon: <BrainCircuit className="w-5 h-5 text-sky-400" />
  },
  {
    id: 'member-3',
    name: 'Jyoti (Team Member 3)',
    role: 'Frontend & Student AI Guidance Systems',
    memberNo: 'Member 03',
    githubUsername: 'jyotijio745-afk',
    githubUrl: 'https://github.com/jyotijio745-afk',
    skills: ['React / TypeScript', 'Tailwind CSS', 'AI Roadmaps', 'Interactive UI'],
    status: 'Active',
    contributions: [
      'Live Updates Integration for Admin Review',
      'Student Roadmap & Quiz Feedback Modules',
      'UI Glassmorphism & Responsive Dashboard'
    ],
    icon: <Code2 className="w-5 h-5 text-emerald-400" />
  }
];

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-20 bg-slate-950 relative border-t border-slate-900 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            <span>Tejas India Hackathon 2026</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Meet <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-sky-400 bg-clip-text text-transparent">Team Exo-Hunter</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg">
            A collaborative multi-disciplinary team engineering DISHA AI for modern education and smart campuses.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <Card
              key={member.id}
              className={`bg-slate-900/40 border-slate-800/80 hover:border-indigo-500/50 transition-all duration-300 relative ${
                member.id === 'member-3' ? 'ring-1 ring-emerald-500/30 bg-emerald-950/10' : ''
              }`}
            >
              {/* Member Tag & Active Status */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-[11px] font-mono font-bold text-indigo-400 bg-indigo-950/60 px-2.5 py-1 rounded-md border border-indigo-800/50">
                  {member.memberNo}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/50 px-2.5 py-0.5 rounded-full border border-emerald-800/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  {member.status}
                </span>
              </div>

              {/* Header Icon + Name */}
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white shadow-inner">
                  {member.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-xs text-indigo-400 font-medium">
                    {member.role}
                  </p>
                </div>
              </div>

              {/* GitHub Handle if available */}
              {member.githubUsername && (
                <div className="mb-4">
                  <a
                    href={member.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>@{member.githubUsername}</span>
                  </a>
                </div>
              )}

              {/* Skills Tags */}
              <div className="mb-4">
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Focus Areas
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {member.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Contributions */}
              <div className="border-t border-slate-800/80 pt-3 mt-2">
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Key Live Contributions
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {member.contributions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        {/* Live Hackathon Updates Banner */}
        <div className="mt-12 p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>Live Admin Update Stream</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold uppercase">
                  Connected
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time tracking of Team Exo-Hunter contributions & milestone deliverables.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-indigo-300 font-mono bg-slate-950 px-3 py-2 rounded-lg border border-slate-800">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Latest Commit: Team Member 3 (Jyoti) Active</span>
          </div>
        </div>

      </div>
    </section>
  );
};
