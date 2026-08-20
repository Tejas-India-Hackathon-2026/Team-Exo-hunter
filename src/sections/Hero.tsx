import React, { useState, useEffect } from 'react';
import { ArrowRight, Compass, Brain, GraduationCap, Cpu, Terminal } from 'lucide-react';
import { Button } from '../components/Button';

interface HeroProps {
  onStudentsClick: () => void;
  onCollegesClick: () => void;
}

/**
 * SIMULATED_LOGS: Datastructure containing sample background tasks
 * that are streamed to the Live terminal console in the Hero mockup.
 * This simulates live API services (FastAPI/TensorFlow) during Milestone 1.
 */
const SIMULATED_LOGS = [
  { tag: 'SYS-AI', color: 'text-indigo-400', text: 'Analyzing student skill baseline...' },
  { tag: 'ROADMAP', color: 'text-purple-400', text: 'Generating dynamic career path for Fullstack Developer...' },
  { tag: 'CAMPUS', color: 'text-sky-400', text: 'Classroom 402: Facial recognition scan initiated...' },
  { tag: 'FACE-ID', color: 'text-emerald-400', text: 'ID DISHA-4819 verified (99.6% match, attendance updated)' },
  { tag: 'ANALYTICS', color: 'text-pink-400', text: 'Syncing student engagement metrics with College Admin Console...' },
  { tag: 'QUIZ-GEN', color: 'text-amber-400', text: 'Generating 5 adaptive questions on React state & context...' },
  { tag: 'SMART-NOTE', color: 'text-indigo-400', text: 'Summarizing audio transcript: "Lecture on Deep Learning Foundations"...' },
  { tag: 'RESUME', color: 'text-rose-400', text: 'Analyzing resume gaps against Senior Frontend Engineer JD...' },
  { tag: 'PLANNER', color: 'text-emerald-400', text: 'Space-repetition calendar updated: added 2 review tasks...' },
  { tag: 'SYS-AI', color: 'text-indigo-400', text: 'DISHA AI Core listening on port 8080 (FastAPI engine online)...' }
];

export const Hero: React.FC<HeroProps> = ({ onStudentsClick, onCollegesClick }) => {
  // Logs state initialized with standard boot sequences
  const [logs, setLogs] = useState<string[]>(() => [
    `[${new Date().toLocaleTimeString()}] [SYS-AI] DISHA AI Engine initialized successfully.`,
    `[${new Date().toLocaleTimeString()}] [SYS-AI] Localized face detection models loaded.`,
    `[${new Date().toLocaleTimeString()}] [SYS-AI] Awaiting interactive query...`
  ]);
  const [logIndex, setLogIndex] = useState(0);

  // Live Logs Simulator Hook
  useEffect(() => {

    const interval = setInterval(() => {
      const timeStr = new Date().toLocaleTimeString();
      const currentSim = SIMULATED_LOGS[logIndex];
      const newLog = `[${timeStr}] [${currentSim.tag}] ${currentSim.text}`;
      
      setLogs((prev) => {
        const nextLogs = [...prev, newLog];
        if (nextLogs.length > 5) {
          nextLogs.shift(); // Keep only latest 5 logs
        }
        return nextLogs;
      });

      setLogIndex((prev) => (prev + 1) % SIMULATED_LOGS.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [logIndex]);

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-950 dark-grid-bg">
      
      {/* 🌌 Neural Pulse Core Glow Aura */}
      <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-indigo-600/10 rounded-full blur-3xl -z-10 pointer-events-none neural-pulse-core" />
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] md:w-[450px] h-[250px] md:h-[450px] bg-sky-500/5 rounded-full blur-3xl -z-10 pointer-events-none neural-pulse-core" />

      {/* 🚀 Drifting AI Synapses */}
      <div className="absolute top-1/4 left-1/10 w-4 h-4 rounded-full bg-indigo-500/30 blur-[2px] float-slow hidden md:block" />
      <div className="absolute top-1/2 left-[15%] w-6 h-6 rounded-full bg-sky-500/20 blur-[3px] float-medium hidden md:block" />
      <div className="absolute bottom-1/4 left-[8%] w-3.5 h-3.5 rounded-full bg-purple-500/25 blur-[1px] float-slow hidden md:block" />
      
      <div className="absolute top-1/3 right-[12%] w-5 h-5 rounded-full bg-indigo-500/25 blur-[2px] float-medium hidden md:block" />
      <div className="absolute top-2/3 right-[8%] w-3 h-3 rounded-full bg-sky-400/30 blur-[1px] float-slow hidden md:block" />
      <div className="absolute bottom-1/3 right-[15%] w-7 h-7 rounded-full bg-purple-500/15 blur-[4px] float-medium hidden md:block" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.05),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Subtle AI Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-6 hover:bg-indigo-500/15 transition-all duration-300">
          <Cpu className="w-3.5 h-3.5 text-indigo-400 animate-spin-slow" />
          <span>Intelligent Educational Ecosystem</span>
        </div>

        {/* Main Headings */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-4 leading-none">
          DISHA <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-sky-400 bg-clip-text text-transparent">AI</span>
        </h1>
        
        <h2 className="text-xl md:text-3xl font-bold text-slate-200 tracking-wide mb-6">
          Your Direction. Your Growth. Your Future.
        </h2>

        <p className="max-w-2xl mx-auto text-slate-400 text-base md:text-lg mb-10 leading-relaxed">
          AI-powered guidance for students to plan their careers, build skills, and achieve goals, paired with intelligent automation for smart, connected college campuses.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
          <Button
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-5 h-5" />}
            onClick={onStudentsClick}
            className="w-full sm:w-auto shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Your Journey
          </Button>
          <Button
            variant="outline"
            size="lg"
            icon={<Compass className="w-5 h-5 text-indigo-400" />}
            iconPosition="left"
            onClick={onCollegesClick}
            className="w-full sm:w-auto border-slate-800 bg-slate-900/40 text-slate-300 hover:bg-slate-900 hover:text-white"
          >
            Explore Smart Campus
          </Button>
        </div>

        {/* Premium Dashboard Preview */}
        <div className="relative max-w-5xl mx-auto rounded-2xl border border-slate-800/80 bg-slate-950/30 p-2 backdrop-blur-md shadow-2xl shadow-black/80">
          
          {/* Neon shadow boundaries */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-sky-500/10 blur-xl opacity-80 pointer-events-none" />

          <div className="relative rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-inner flex flex-col aspect-video md:h-[480px] w-full text-left">
            
            {/* 🔴 Scanline laser sweep line */}
            <div className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent pointer-events-none z-20 scan-laser" />

            {/* Window chrome bar */}
            <div className="bg-slate-900 border-b border-slate-800/80 px-4 py-3 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="text-[10px] text-slate-500 font-mono bg-slate-950/80 px-4 py-1 rounded-md border border-slate-800/60">
                disha-ai-copilot://dashboard
              </div>
              <div className="w-12" />
            </div>

            {/* Window Client Area Mockup */}
            <div className="flex-1 grid grid-cols-12 bg-slate-950 text-slate-300 text-xs overflow-hidden relative">
              {/* Sidebar */}
              <div className="col-span-3 border-r border-slate-900 bg-slate-900/10 p-4 hidden md:flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">Student Dashboard</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 px-2.5 py-2 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-medium">
                      <Brain className="w-4 h-4 text-indigo-400" />
                      <span>Career Path AI</span>
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-2 rounded text-slate-500 hover:text-slate-300 cursor-pointer">
                      <GraduationCap className="w-4 h-4" />
                      <span>My Roadmap</span>
                    </div>
                  </div>
                </div>

                {/* 🔄 Spinning Neon Cyber Orb */}
                <div className="p-3 bg-slate-900/40 rounded-lg border border-slate-900 flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-full border border-indigo-500/20 flex items-center justify-center shrink-0">
                    <div className="absolute inset-0 rounded-full border border-t-indigo-400 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                    <Cpu className="w-4 h-4 text-indigo-400 animate-pulse" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-[10px]">Live Core AI</div>
                    <div className="text-[8px] text-slate-500 leading-normal">Computing cycles...</div>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="col-span-12 md:col-span-9 p-4 md:p-6 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-5">
                  {/* Dashboard Header */}
                  <div className="flex justify-between items-start border-b border-slate-900 pb-3">
                    <div>
                      <h4 className="text-sm font-semibold text-white">Welcome back, Student!</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">Active Roadmap: **AI & Machine Learning Specialist**</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold text-[10px]">
                      Profile 82% Complete
                    </span>
                  </div>

                  {/* Feature Preview layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Chat Bubble Mock */}
                    <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                        <span className="font-semibold text-[10px] text-indigo-300">DISHA AI Copilot</span>
                      </div>
                      <p className="text-slate-400 leading-relaxed text-[10px]">
                        "Based on your statistics, let's target **Deep Learning Basics** next. I have scheduled recommended practice projects."
                      </p>
                    </div>

                    {/* Progress Chart Mock */}
                    <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
                      <div className="font-semibold text-[10px] text-white flex justify-between">
                        <span>Roadmap Completion</span>
                        <span className="text-indigo-400">65%</span>
                      </div>
                      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                        <div className="bg-indigo-500 h-full rounded-full w-2/3 shadow-glow" />
                      </div>
                      <div className="text-[9px] text-slate-500 flex justify-between">
                        <span>12 of 18 competencies matched</span>
                        <span>Next test in: 2 days</span>
                      </div>
                    </div>
                  </div>

                  {/* 📟 Live Activity Console Terminal */}
                  <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-900 font-mono text-[9px] text-slate-400 space-y-2 shadow-inner">
                    <div className="text-slate-500 font-semibold uppercase tracking-wider text-[8px] pb-1.5 border-b border-slate-900 flex justify-between items-center">
                      <span className="flex items-center gap-1">
                        <Terminal className="w-3 h-3 text-indigo-400" />
                        Live AI Activity Logs
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    </div>
                    <div className="space-y-1 text-left max-h-[75px] overflow-hidden select-none">
                      {logs.map((log, index) => {
                        // Extract tag to color it differently
                        const match = log.match(/\[([^\]]+)\]\s+\[([^\]]+)\]\s+(.*)/);
                        if (match) {
                          const [_, time, tag, message] = match;
                          return (
                            <div key={index} className="flex gap-1.5 leading-relaxed truncate">
                              <span className="text-slate-600">[{time}]</span>
                              <span className="text-indigo-400 font-semibold">[{tag}]</span>
                              <span className="text-slate-300">{message}</span>
                            </div>
                          );
                        }
                        return <div key={index} className="truncate leading-relaxed">{log}</div>;
                      })}
                    </div>
                  </div>
                </div>

                {/* Status Bar */}
                <div className="border-t border-slate-900 pt-3 flex justify-between items-center text-[10px] text-slate-600 mt-3">
                  <span>DISHA Engine v1.0.0</span>
                  <span>Press 'Ctrl + Space' for chat assistance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
