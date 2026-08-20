import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../sections/Hero';
import { SolutionCards } from '../sections/SolutionCards';
import { HowItWorks } from '../sections/HowItWorks';
import { StudentFeatures } from '../sections/StudentFeatures';
import { CampusFeatures } from '../sections/CampusFeatures';
import { TeamSection } from '../sections/TeamSection';
import { Footer } from '../components/Footer';
import { X, Sparkles, Brain, Award, ShieldAlert, Scan, BarChart3 } from 'lucide-react';

export const LandingPage = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [modalType, setModalType] = useState<'student' | 'college' | null>(null);

  // Interactive Simulator States
  const [studentRole, setStudentRole] = useState('fullstack');
  const [generatingRoadmap, setGeneratingRoadmap] = useState(false);
  const [roadmapOutput, setRoadmapOutput] = useState<string[] | null>(null);

  const [campusActivity, setCampusActivity] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [analyticsData, setAnalyticsData] = useState({ present: 42, absent: 3, rate: '93%' });

  // Scroll handler to highlight active navbar section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'students', 'colleges', 'how-it-works', 'team'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
    }
  };

  // Mock Roadmap Generator
  const runRoadmapSimulation = () => {
    setGeneratingRoadmap(true);
    setRoadmapOutput(null);
    setTimeout(() => {
      setGeneratingRoadmap(false);
      if (studentRole === 'fullstack') {
        setRoadmapOutput([
          'Step 1: Master modern CSS with Tailwind and responsive layout rules.',
          'Step 2: Learn React 19 hooks, state context, and component design patterns.',
          'Step 3: Build a Node.js + Express backend with Postgres integration.',
          'Step 4: Configure GitHub Actions CI/CD to render clean deployments.',
        ]);
      } else if (studentRole === 'ai') {
        setRoadmapOutput([
          'Step 1: Review Linear Algebra, Probability, and basic Python NumPy tools.',
          'Step 2: Understand Supervised Learning and build regression models.',
          'Step 3: Dive into PyTorch foundations, tensor operations, and backpropagation.',
          'Step 4: Fine-tune small language models (SLMs) and build retrieval apps (RAG).'
        ]);
      } else {
        setRoadmapOutput([
          'Step 1: Learn UI/UX styling principles, grid theory, and typography ratios.',
          'Step 2: Master Figma styles, responsive layout prototyping, and auto-layout.',
          'Step 3: Design high-fidelity wireframes, interactive transitions, and component guides.',
          'Step 4: Conduct user testing interviews and build responsive portofolios.'
        ]);
      }
    }, 1500);
  };

  // Mock Face Detection Simulator
  const runFaceSimulation = () => {
    setCampusActivity('scanning');
    setTimeout(() => {
      setCampusActivity('success');
      setAnalyticsData({ present: 43, absent: 2, rate: '95%' });
    }, 2000);
  };

  const resetSimulations = () => {
    setRoadmapOutput(null);
    setGeneratingRoadmap(false);
    setCampusActivity('idle');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      
      {/* Sticky Header Navbar */}
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Hero Section */}
      <Hero 
        onStudentsClick={() => {
          handleNavigate('students');
          setModalType('student');
          resetSimulations();
        }} 
        onCollegesClick={() => {
          handleNavigate('colleges');
          setModalType('college');
          resetSimulations();
        }} 
      />

      {/* Solution Cards */}
      <SolutionCards 
        onStudentsClick={() => {
          handleNavigate('students');
          setModalType('student');
          resetSimulations();
        }} 
        onCollegesClick={() => {
          handleNavigate('colleges');
          setModalType('college');
          resetSimulations();
        }} 
      />

      {/* How DISHA Works */}
      <HowItWorks />

      {/* Student Features Preview */}
      <StudentFeatures 
        onCtaClick={() => {
          setModalType('student');
          resetSimulations();
        }} 
      />

      {/* Smart Campus Features Preview */}
      <CampusFeatures 
        onCtaClick={() => {
          setModalType('college');
          resetSimulations();
        }} 
      />

      {/* Team Showcase */}
      <TeamSection />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Feature Simulator Modal */}
      {modalType && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-slate-950 text-white p-5 flex items-center justify-between border-b border-slate-800/60">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <span className="font-bold tracking-wide">
                  {modalType === 'student' ? 'Student DISHA Simulator' : 'Smart Campus Console'}
                </span>
              </div>
              <button 
                onClick={() => setModalType(null)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-900/60 text-slate-300">
              
              {modalType === 'student' ? (
                /* Student Interactive Demo */
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-1.5">
                      <Brain className="w-5 h-5 text-indigo-400" />
                      AI Roadmap Generator Preview
                    </h3>
                    <p className="text-slate-400 text-xs">
                      Choose a career goal and let DISHA create a dynamic learning roadmap immediately.
                    </p>
                  </div>

                  {/* Form Options */}
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Select Target Career Path:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => { setStudentRole('fullstack'); setRoadmapOutput(null); }}
                        className={`px-3 py-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                          studentRole === 'fullstack'
                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/20'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        Fullstack Dev
                      </button>
                      <button
                        onClick={() => { setStudentRole('ai'); setRoadmapOutput(null); }}
                        className={`px-3 py-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                          studentRole === 'ai'
                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/20'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        AI Engineer
                      </button>
                      <button
                        onClick={() => { setStudentRole('ui'); setRoadmapOutput(null); }}
                        className={`px-3 py-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                          studentRole === 'ui'
                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/20'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        UI/UX Designer
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <button
                    onClick={runRoadmapSimulation}
                    disabled={generatingRoadmap}
                    className="w-full py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 cursor-pointer disabled:opacity-50"
                  >
                    {generatingRoadmap ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Analyzing skill gaps & resources...
                      </>
                    ) : (
                      'Generate Roadmap'
                    )}
                  </button>

                  {/* Simulator Results Output */}
                  {roadmapOutput && (
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-indigo-300 space-y-3 shadow-inner animate-in slide-in-from-bottom-2 duration-300">
                      <div className="flex justify-between items-center text-[10px] text-indigo-400 border-b border-indigo-900/50 pb-2">
                        <span>// ROADMAP OUTPUT</span>
                        <span className="text-emerald-400 font-bold uppercase">SUCCESS</span>
                      </div>
                      <div className="space-y-2 text-left">
                        {roadmapOutput.map((step, idx) => (
                          <div key={idx} className="flex gap-2 leading-relaxed">
                            <span className="text-indigo-400 font-semibold">{idx + 1}.</span>
                            <span className="text-indigo-100">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Smart Campus Interactive Demo */
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-1.5">
                      <Scan className="w-5 h-5 text-sky-400" />
                      Attendance Camera Simulation
                    </h3>
                    <p className="text-slate-400 text-xs">
                      Simulate classroom hardware scanning student faces to mark attendance on the centralized server.
                    </p>
                  </div>

                  {/* Simulated Frame */}
                  <div className="aspect-video w-full rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center relative overflow-hidden">
                    
                    {/* Laser scanning sweep animation in modal camera */}
                    {campusActivity === 'scanning' && (
                      <div className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-sky-400 to-transparent pointer-events-none z-20 scan-laser" />
                    )}

                    {campusActivity === 'idle' && (
                      <div className="text-center space-y-2 p-4">
                        <span className="text-xs text-slate-500 block">Classroom Camera Feed Offline</span>
                        <button 
                          onClick={runFaceSimulation}
                          className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-xs font-semibold text-white cursor-pointer shadow-md shadow-sky-500/25"
                        >
                          Simulate Camera Scan
                        </button>
                      </div>
                    )}

                    {campusActivity === 'scanning' && (
                      <div className="space-y-2 text-center p-4">
                        <div className="w-12 h-12 border-4 border-sky-400 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                        <span className="text-xs text-sky-400 font-mono animate-pulse block">Detecting Face Keypoints...</span>
                      </div>
                    )}

                    {campusActivity === 'success' && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 p-4">
                        {/* Green Verified indicator */}
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center text-emerald-400 mb-2">
                          <Award className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-semibold text-white">Face Matches: 1 student verified</span>
                        <span className="text-[10px] text-slate-500 mt-0.5">Updated: Student ID #4819 marked present.</span>
                        <button
                          onClick={() => setCampusActivity('idle')}
                          className="text-[9px] text-sky-400 hover:underline mt-4 uppercase tracking-wider font-semibold cursor-pointer"
                        >
                          Scan Again
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Attendance Analytics Metrics */}
                  <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <BarChart3 className="w-4 h-4 text-sky-400" />
                      Classroom Statistics
                    </h4>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg">
                        <span className="text-[10px] text-slate-500 block font-semibold">Present</span>
                        <span className="text-lg font-extrabold text-white">{analyticsData.present}</span>
                      </div>
                      <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg">
                        <span className="text-[10px] text-slate-500 block font-semibold">Absent</span>
                        <span className="text-lg font-extrabold text-rose-500">{analyticsData.absent}</span>
                      </div>
                      <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg">
                        <span className="text-[10px] text-slate-500 block font-semibold">Ratio</span>
                        <span className="text-lg font-extrabold text-indigo-400">{analyticsData.rate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Informative Prototype Note */}
              <div className="flex gap-2.5 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 leading-relaxed font-medium">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Prototype Notice:</strong> This is a simulation panel designed for hackathon judges to verify the frontend flow logic. Milestone 2 will hook this panel to our local Python face detector and REST database.
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-950 border-t border-slate-800/80 p-4 flex justify-end">
              <button 
                onClick={() => setModalType(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
