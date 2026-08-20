import { TrendingUp } from 'lucide-react';
import { DEFAULT_PROGRESS } from '../data/studentData';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// --- Circular Progress SVG Component ---
const CircularProgress = ({ value, size = 96, strokeWidth = 8 }: { value: number; size?: number; strokeWidth?: number }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const center = size / 2;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {/* Background circle */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-slate-700/50"
      />
      {/* Progress arc */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="url(#progressGradient)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="transition-all duration-700 ease-out"
      />
      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// --- Small Horizontal Progress Bar ---
const ProgressBar = ({ value, max, className = '' }: { value: number; max: number; className?: string }) => {
  const pct = Math.round((value / max) * 100);
  return (
    <div className={`w-full h-2 rounded-full bg-slate-700/50 overflow-hidden ${className}`}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 transition-all duration-700 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
};

// --- Stat Card Wrapper ---
const StatCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-md p-5 flex flex-col gap-3 ${className}`}>
    {children}
  </div>
);

export const Progress = () => {
  const data = DEFAULT_PROGRESS;
  const maxHours = Math.max(...data.weeklyStudyHours);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 md:pb-4">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-indigo-600/15 border border-indigo-500/20">
          <TrendingUp className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Your Progress</h1>
          <p className="text-sm text-slate-400 mt-0.5">Track your learning journey and milestones</p>
        </div>
      </div>

      {/* ====== Stats Grid (2×3 desktop, 1 col mobile) ====== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* 1 — Overall Progress (circular) */}
        <StatCard className="items-center justify-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Overall Progress</p>
          <div className="relative flex items-center justify-center">
            <CircularProgress value={data.overallProgress} size={112} strokeWidth={10} />
            <span className="absolute text-2xl font-bold text-white">{data.overallProgress}%</span>
          </div>
        </StatCard>

        {/* 2 — Roadmap Progress */}
        <StatCard>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Roadmap Progress</p>
          <p className="text-3xl font-bold text-white">{data.roadmapProgress}%</p>
          <ProgressBar value={data.roadmapProgress} max={100} />
        </StatCard>

        {/* 3 — Skills Learned */}
        <StatCard>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Skills Learned</p>
          <p className="text-3xl font-bold text-white">
            {data.skillsLearned}
            <span className="text-base font-medium text-slate-500">/{data.totalSkills}</span>
          </p>
          <ProgressBar value={data.skillsLearned} max={data.totalSkills} />
        </StatCard>

        {/* 4 — Projects Completed */}
        <StatCard>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Projects Completed</p>
          <p className="text-3xl font-bold text-white">
            {data.projectsCompleted}
            <span className="text-base font-medium text-slate-500">/{data.totalProjects}</span>
          </p>
          <ProgressBar value={data.projectsCompleted} max={data.totalProjects} />
        </StatCard>

        {/* 5 — Quiz Score */}
        <StatCard className="items-start">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Quiz Score</p>
          <p className="text-3xl font-bold text-white">{data.quizScore}%</p>
          <div className="flex items-center gap-2 text-sm">
            <span className={`inline-block w-2 h-2 rounded-full ${data.quizScore >= 70 ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            <span className="text-slate-400">{data.quizScore >= 70 ? 'Good standing' : 'Needs improvement'}</span>
          </div>
        </StatCard>

        {/* 6 — Study Streak */}
        <StatCard>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Study Streak</p>
          <p className="text-3xl font-bold text-white">
            {data.studyStreak} <span className="text-2xl">🔥</span>
          </p>
          <p className="text-sm text-slate-400">consecutive days</p>
        </StatCard>
      </div>

      {/* ====== Weekly Study Hours (Bar Chart) ====== */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-md p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-6">Weekly Study Hours</h2>

        <div className="flex items-end justify-between gap-2 h-48">
          {data.weeklyStudyHours.map((hours, i) => {
            const heightPct = maxHours > 0 ? (hours / maxHours) * 100 : 0;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                {/* Hours label */}
                <span className="text-xs font-medium text-slate-300">{hours}h</span>
                {/* Bar */}
                <div className="w-full flex justify-center" style={{ height: '140px' }}>
                  <div className="relative w-full max-w-[40px] flex items-end">
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-indigo-600 to-sky-500 transition-all duration-500 ease-out hover:from-indigo-500 hover:to-sky-400"
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                </div>
                {/* Day label */}
                <span className="text-xs font-medium text-slate-500">{DAYS[i]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ====== Skills Breakdown ====== */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-md p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-6">Skills Breakdown</h2>

        <div className="space-y-4">
          {data.skillsBreakdown.map((skill) => (
            <div key={skill.name} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-200">{skill.name}</span>
                <span className="text-xs font-semibold text-indigo-400">{skill.level}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-700/50 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 transition-all duration-700 ease-out"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
