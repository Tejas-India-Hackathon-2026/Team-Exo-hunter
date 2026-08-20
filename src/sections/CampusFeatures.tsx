import React from 'react';
import {
  ScanFace, CheckSquare, BarChart3, ArrowRight,
  Fingerprint, BookOpen, Brain, CalendarCheck,
  ClipboardList, Megaphone, Briefcase, QrCode,
  Bell, IdCard, Rocket
} from 'lucide-react';
import { CAMPUS_FEATURES } from '../data/landingData';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

// Icon mapping dictionary
const iconMap: Record<string, React.ComponentType<any>> = {
  ScanFace,
  CheckSquare,
  BarChart3,
  Fingerprint,
  BookOpen,
  Brain,
  CalendarCheck,
  ClipboardList,
  Megaphone,
  Briefcase,
  QrCode,
  Bell,
  IdCard,
  Rocket
};

interface CampusFeaturesProps {
  onCtaClick: () => void;
}

export const CampusFeatures: React.FC<CampusFeaturesProps> = ({ onCtaClick }) => {
  return (
    <section id="colleges" className="py-20 bg-slate-950 relative border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-3">
              College & Campus
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Intelligent Campus Solutions
            </h2>
            <p className="text-slate-400 mt-3 text-base">
              Optimize college administration, automate boring attendance sheets, monitor student engagement, and provide instant AI-driven student help desks.
            </p>
          </div>
          <div>
            <Button
              variant="outline"
              size="md"
              onClick={onCtaClick}
              icon={<ArrowRight className="w-4 h-4 text-sky-400" />}
              className="w-full sm:w-auto border-slate-800 bg-slate-900/30 text-slate-300 hover:bg-slate-900 hover:text-white"
            >
              Explore Solutions Console
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAMPUS_FEATURES.map((feature) => {
            const IconComponent = iconMap[feature.iconName] || ScanFace;
            
            return (
              <Card
                key={feature.id}
                title={feature.title}
                description={feature.description}
                icon={<IconComponent className="w-5 h-5 text-sky-400" />}
                badge={feature.badge}
                glass={true}
                borderColor="sky"
                className="bg-slate-900/30 border-slate-800/80"
              />
            );
          })}
        </div>

        {/* Feature Interactive Highlight (Mock) */}
        <div className="mt-16 p-8 rounded-2xl bg-slate-900/40 text-white relative overflow-hidden shadow-xl shadow-sky-500/5 border border-sky-500/15">
          {/* Decorative backdrop shapes */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-sky-600/15 rounded-full blur-3xl -z-0 pointer-events-none" />
          <div className="absolute left-10 bottom-0 w-60 h-60 bg-indigo-500/5 rounded-full blur-2xl -z-0 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Security & Convenience</span>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                Privacy-First Smart Attendance
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
                Tired of calling out roll numbers for 15 minutes of every lecture? DISHA integrates face detection logic that registers student presence instantly. Runs on offline localized devices to respect student privacy and data regulations.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  <span className="text-xs text-slate-300 font-medium">99.8% Recognition Accuracy</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  <span className="text-xs text-slate-300 font-medium">Auto-Synced Attendance Sync</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  <span className="text-xs text-slate-300 font-medium">Local Privacy Safeguard</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-950/80 rounded-xl border border-sky-500/20 p-5 font-mono text-xs text-slate-300 space-y-4 shadow-inner relative overflow-hidden">
              
              {/* Scanline laser sweep line */}
              <div className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-sky-400/40 to-transparent pointer-events-none z-20 scan-laser" />

              <div className="flex justify-between items-center text-[10px] text-sky-400 border-b border-slate-900 pb-2">
                <span>// DETECTING FACES</span>
                <span className="px-2 py-0.5 rounded bg-sky-400/10 text-[9px] font-bold text-sky-400 uppercase">ACTIVE CAMERA</span>
              </div>
              <div className="aspect-video w-full rounded bg-slate-900/60 border border-slate-800 flex items-center justify-center relative overflow-hidden">
                {/* SVG mock camera face finder */}
                <div className="absolute inset-4 border border-dashed border-sky-400/30 rounded" />
                <div className="absolute w-24 h-24 border-2 border-sky-400 rounded-full flex items-center justify-center animate-pulse">
                  <ScanFace className="w-8 h-8 text-sky-400" />
                </div>
                {/* Simulated detections tags */}
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-slate-950 text-[9px] text-slate-400 border border-slate-800">
                  Student ID: DISHA-4819
                </span>
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-emerald-400 font-bold">
                  VERIFIED: 99.4% MATCH
                </span>
              </div>
              <div className="pt-2 text-[10px] text-slate-500 flex justify-between">
                <span>INTEGRATION: RASPBERRY PI + JS</span>
                <span className="text-sky-400">CLASSROOM MOCKUP ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
