import React from 'react';
import { Settings, Laptop, Cpu, Compass, Bell } from 'lucide-react';

export const SkillOrbit: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[210px] rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-md p-6 relative overflow-hidden dark-grid-bg select-none shadow-lg shadow-black/45">
      
      {/* 📡 Diagnostic Labels (Top-Left & Bottom-Right) */}
      <div className="absolute top-4 left-4 text-[9px] font-mono font-bold tracking-widest text-slate-500 uppercase">
        SYS_ACTIVE
      </div>
      <div className="absolute bottom-4 right-4 text-[9px] font-mono font-bold tracking-widest text-slate-500 uppercase">
        LOGS_OK
      </div>

      {/* Outer Dashed Orbit Path Tracker */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[190px] h-[190px] rounded-full border border-dashed border-slate-800 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] rounded-full border border-dashed border-slate-800/40 pointer-events-none" />

      {/* 🌌 Orbiting Skill Synapses Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        
        {/* ================= CENTRAL GLOWING CORE ================= */}
        <div className="relative w-20 h-20 rounded-full bg-slate-950/80 border border-slate-800 flex items-center justify-center shadow-xl shadow-cyan-500/5">
          {/* Pulsing Aura Rings */}
          <div className="absolute -inset-1 rounded-full border border-cyan-500/20 animate-ping opacity-25" />
          <div className="absolute -inset-3 rounded-full border border-indigo-500/10 animate-pulse opacity-40" />
          
          {/* Concentric rotating border rings */}
          <div className="absolute inset-1 rounded-full border border-t-cyan-400 border-r-transparent border-b-cyan-400 border-l-transparent animate-spin" />
          <div className="absolute inset-2.5 rounded-full border border-r-indigo-400 border-t-transparent border-b-indigo-400 border-l-transparent animate-spin [animation-direction:reverse]" />

          {/* Central Spinning Gear Icon */}
          <Settings className="w-8 h-8 text-cyan-400 animate-spin-slow" />
        </div>

        {/* Small floating Bell decoration inside orbit ring */}
        <div className="absolute translate-x-[60px] translate-y-[20px] p-1.5 rounded-full bg-slate-950 border border-slate-800 text-amber-400 shadow-md">
          <Bell className="w-3 h-3 animate-bounce" />
        </div>

        {/* ================= ORBITING NODE 1: WEB DEV (Yellow) ================= */}
        <div className="absolute animate-orbit-1 pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-slate-950 border border-amber-500/30 flex flex-col items-center justify-center p-2 shadow-lg shadow-amber-500/5 pointer-events-auto cursor-pointer hover:border-amber-400/80 transition-colors duration-300">
            {/* Tiny satellite badge */}
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-slate-900 border border-amber-500/40 text-amber-500 flex items-center justify-center text-[7px] font-mono font-bold animate-pulse">
              &lt;&gt;
            </div>
            <Laptop className="w-4 h-4 text-amber-500 mb-0.5" />
            <span className="text-[8px] font-bold text-slate-300 tracking-wide">Web Dev</span>
          </div>
        </div>

        {/* ================= ORBITING NODE 2: AI & ML (Green/Sky) ================= */}
        <div className="absolute animate-orbit-2 pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-slate-950 border border-emerald-500/30 flex flex-col items-center justify-center p-2 shadow-lg shadow-emerald-500/5 pointer-events-auto cursor-pointer hover:border-emerald-400/80 transition-colors duration-300">
            {/* Tiny green signal indicator */}
            <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 rounded-full bg-emerald-500/70 border border-slate-950 animate-ping" />
            <Cpu className="w-4 h-4 text-emerald-500 mb-0.5" />
            <span className="text-[8px] font-bold text-slate-300 tracking-wide">AI & ML</span>
          </div>
        </div>

        {/* ================= ORBITING NODE 3: AUTOMATION (Purple) ================= */}
        <div className="absolute animate-orbit-3 pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-slate-950 border border-purple-500/30 flex flex-col items-center justify-center p-2 shadow-lg shadow-purple-500/5 pointer-events-auto cursor-pointer hover:border-purple-400/80 transition-colors duration-300">
            <Compass className="w-4 h-4 text-purple-500 mb-0.5" />
            <span className="text-[8px] font-bold text-slate-300 tracking-wide">Career AI</span>
          </div>
        </div>

      </div>

    </div>
  );
};
