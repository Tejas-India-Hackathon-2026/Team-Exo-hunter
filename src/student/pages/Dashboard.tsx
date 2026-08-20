import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Map, CalendarDays, TrendingUp, Search, Sparkles } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DEFAULT_PROFILE, SUGGESTED_PROMPTS, ROADMAP_STEPS, DEFAULT_TASKS, DEFAULT_PROGRESS } from '../data/studentData';

export const Dashboard = () => {
  const [profile] = useLocalStorage('disha-student-profile', DEFAULT_PROFILE);
  const [tasks] = useLocalStorage('disha-study-tasks', DEFAULT_TASKS);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const [greeting, setGreeting] = useState('Good Morning');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 17) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/student/disha-ai?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handlePromptClick = (prompt: string) => {
    navigate(`/student/disha-ai?q=${encodeURIComponent(prompt)}`);
  };

  // Calculations for cards
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const taskProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const completedSteps = ROADMAP_STEPS.filter(s => s.status === 'completed').length;
  const totalSteps = ROADMAP_STEPS.length;
  const roadmapProgressPercent = Math.round((completedSteps / totalSteps) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Greeting */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          {greeting}, {profile.name} 👋
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Let's find your direction and take the next step.
        </p>
      </div>

      {/* AI Search Box */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 shadow-xl max-w-3xl">
        <h2 className="text-base font-bold text-white mb-3 flex items-center gap-1.5">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          Ask DISHA anything...
        </h2>
        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="e.g. How can I become an AI Engineer?"
            className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl py-3.5 pl-12 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
          />
          <button
            type="submit"
            className="absolute right-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-md cursor-pointer transition-colors"
          >
            Ask AI
          </button>
        </form>

        {/* Suggested Prompts */}
        <div className="mt-4 flex flex-wrap gap-2 items-center">
          <span className="text-xs text-slate-500 mr-1">Suggested:</span>
          {SUGGESTED_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handlePromptClick(prompt)}
              className="text-xs bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: My Goal */}
        <div
          onClick={() => navigate('/student/goal')}
          className="bg-slate-900/40 hover:bg-slate-900/60 border border-slate-850 hover:border-indigo-500/30 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:scale-105 transition-transform">
              <Target className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
              Goal
            </span>
          </div>
          <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider">My Goal</h3>
          <p className="text-white text-lg font-bold mt-1 group-hover:text-indigo-400 transition-colors">
            {profile.careerGoal}
          </p>
          <p className="text-[11px] text-slate-500 mt-2">Click to review requirements</p>
        </div>

        {/* Card 2: My Roadmap */}
        <div
          onClick={() => navigate('/student/roadmap')}
          className="bg-slate-900/40 hover:bg-slate-900/60 border border-slate-850 hover:border-indigo-500/30 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-400 group-hover:scale-105 transition-transform">
              <Map className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 uppercase tracking-wider">
              Roadmap
            </span>
          </div>
          <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider">My Roadmap</h3>
          <p className="text-white text-lg font-bold mt-1 group-hover:text-sky-400 transition-colors">
            {roadmapProgressPercent}% Complete
          </p>
          <div className="w-full bg-slate-950 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-sky-500 h-full transition-all duration-500" style={{ width: `${roadmapProgressPercent}%` }} />
          </div>
        </div>

        {/* Card 3: Today's Actions */}
        <div
          onClick={() => navigate('/student/study-planner')}
          className="bg-slate-900/40 hover:bg-slate-900/60 border border-slate-850 hover:border-indigo-500/30 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform">
              <CalendarDays className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
              Planner
            </span>
          </div>
          <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Today's Actions</h3>
          <p className="text-white text-lg font-bold mt-1 group-hover:text-emerald-400 transition-colors">
            {completedTasks} / {totalTasks} Tasks
          </p>
          <div className="w-full bg-slate-950 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${taskProgress}%` }} />
          </div>
        </div>

        {/* Card 4: My Progress */}
        <div
          onClick={() => navigate('/student/progress')}
          className="bg-slate-900/40 hover:bg-slate-900/60 border border-slate-850 hover:border-indigo-500/30 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 rounded-lg bg-violet-500/10 text-violet-400 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 uppercase tracking-wider">
              Stats
            </span>
          </div>
          <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider">My Progress</h3>
          <p className="text-white text-lg font-bold mt-1 group-hover:text-violet-400 transition-colors">
            {DEFAULT_PROGRESS.overallProgress}% Overall
          </p>
          <div className="w-full bg-slate-950 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-violet-500 h-full transition-all duration-500" style={{ width: `${DEFAULT_PROGRESS.overallProgress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};
