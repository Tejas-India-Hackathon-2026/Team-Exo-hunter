import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Sparkles, Scan, School, Activity, 
  Building2, Target 
} from 'lucide-react';

export const ExploreSmartSystems = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Decorative ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] aspect-square rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square rounded-full bg-sky-900/10 blur-[120px] pointer-events-none" />

      {/* Top Header / Navigation */}
      <header className="border-b border-slate-900 bg-slate-950/60 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/')}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center justify-center"
            title="Back to Landing Page"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
              DISHA AI
            </span>
            <span className="text-slate-600 text-xs">|</span>
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
              Smart Solutions
            </span>
          </div>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          Back to Home
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-12 md:py-20 flex flex-col gap-10 relative z-10">
        
        {/* Intro Hero Section */}
        <section className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-bold uppercase tracking-widest animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
            DISHA Smart Solutions Hub
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
            Explore Smart Systems
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Select a specialized AI modules prototype to launch its live dashboard or execute simulated operations templates.
          </p>
        </section>

        {/* Systems Selector Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Smart Attendance Card */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-900 hover:border-emerald-500/40 hover:bg-emerald-950/5 transition-all duration-300 flex flex-col justify-between group shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><Scan className="w-5 h-5" /></span>
                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30 uppercase tracking-wider">Live Demo</span>
              </div>
              <h3 className="font-extrabold text-white text-lg tracking-tight">Smart Attendance Portal</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Edge face-recognition dashboard tracking classroom records, unrecognized security lists, and real-time statistics reports.
              </p>
            </div>
            <button
              onClick={() => window.open('/Team-Exo-hunter/smart-attendance/index.html', '_blank')}
              className="w-full mt-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/10"
            >
              <span>Launch Attendance</span>
              <span>➜</span>
            </button>
          </div>

          {/* Smart Colleges Card */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-900 hover:border-sky-500/40 hover:bg-sky-950/5 transition-all duration-300 flex flex-col justify-between group shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="p-3 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20"><School className="w-5 h-5" /></span>
                <span className="text-[9px] font-bold text-sky-400 bg-sky-950/80 px-2.5 py-1 rounded-full border border-sky-500/30 uppercase tracking-wider">Live Demo</span>
              </div>
              <h3 className="font-extrabold text-white text-lg tracking-tight">Smart Colleges Portal</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Centralized campus layout map covering smart classroom metrics, digital libraries, and centralized administrative controls.
              </p>
            </div>
            <button
              onClick={() => window.open('/Team-Exo-hunter/campus-one.html', '_blank')}
              className="w-full mt-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-sky-600/10"
            >
              <span>Launch Campus One</span>
              <span>➜</span>
            </button>
          </div>

          {/* Smart Hospital Card */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-900 hover:border-rose-500/40 hover:bg-rose-950/5 transition-all duration-300 flex flex-col justify-between group shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="p-3 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20"><Activity className="w-5 h-5" /></span>
                <span className="text-[9px] font-bold text-rose-400 bg-rose-950/80 px-2.5 py-1 rounded-full border border-rose-500/30 uppercase tracking-wider">Mock View</span>
              </div>
              <h3 className="font-extrabold text-white text-lg tracking-tight">Smart Hospital Care</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                AI clinical queue allocation, real-time patient status dashboards, and automated healthcare parameters updates.
              </p>
            </div>
            <button
              onClick={() => alert('Smart Hospital Dashboard is being integrated into the campus healthcare network.')}
              className="w-full mt-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-all cursor-pointer flex items-center justify-center"
            >
              Launch Hospital HUD
            </button>
          </div>

          {/* Smart Administrative Services Card */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-900 hover:border-amber-500/40 hover:bg-amber-950/5 transition-all duration-300 flex flex-col justify-between group shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20"><Building2 className="w-5 h-5" /></span>
                <span className="text-[9px] font-bold text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/30 uppercase tracking-wider">Mock View</span>
              </div>
              <h3 className="font-extrabold text-white text-lg tracking-tight">Smart Admin Services</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Digital invoice processing, MSME registration workflows, automated credential verification, and legal seals.
              </p>
            </div>
            <button
              onClick={() => alert('Smart Administrative Services dashboard preview is loading.')}
              className="w-full mt-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-all cursor-pointer flex items-center justify-center"
            >
              Launch Admin Services
            </button>
          </div>

          {/* Smart Organization Card */}
          <div className="md:col-span-2 p-6 rounded-2xl bg-slate-900/40 border border-slate-900 hover:border-indigo-500/40 hover:bg-indigo-950/5 transition-all duration-300 flex flex-col justify-between group shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"><Target className="w-5 h-5" /></span>
                  <h3 className="font-extrabold text-white text-lg tracking-tight">Smart Organization Management</h3>
                </div>
                <span className="text-[9px] font-bold text-indigo-400 bg-indigo-950/80 px-2.5 py-1 rounded-full border border-indigo-500/30 uppercase tracking-wider">Active System</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Unified workspace managing employee directories, staff calendars, dynamic project tracking grids, and workplace CCTV streams coordination.
              </p>
            </div>
            <button
              onClick={() => alert('Smart Organization calendar synchronizer initialized.')}
              className="w-full mt-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-all cursor-pointer flex items-center justify-center"
            >
              Configure Organization Schedules
            </button>
          </div>

        </section>

        {/* Prototype note footer block */}
        <footer className="mt-8 p-4 rounded-xl bg-amber-500/5 border border-amber-500/15 text-center text-[11px] text-amber-200/80 max-w-xl mx-auto">
          <strong>Prototype Note:</strong> Selection preview interface designed for hackathon evaluation models. All referenced link redirections execute dynamically in real-time.
        </footer>

      </main>
    </div>
  );
};
