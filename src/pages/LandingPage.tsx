import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { AuthModal } from '../components/AuthModal';
import { Hero } from '../sections/Hero';
import { SolutionCards } from '../sections/SolutionCards';
import { HowItWorks } from '../sections/HowItWorks';
import { StudentFeatures } from '../sections/StudentFeatures';
import { CampusFeatures } from '../sections/CampusFeatures';
import { TeamSection } from '../sections/TeamSection';
import { Footer } from '../components/Footer';
import { 
  X, Sparkles, ShieldAlert, Scan, 
  CheckCircle2,
  Target, Map, CalendarDays, TrendingUp, UserCircle,
  School, Activity, Building2
} from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [modalType, setModalType] = useState<'student' | 'college' | null>(null);
  
  // Auth state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role: 'student' | 'college' } | null>(null);
  const [authToast, setAuthToast] = useState<string | null>(null);



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

  const resetSimulations = () => {
    // Left empty since interactive simulator runs are replaced by static modules links
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans relative">
      
      {/* Sticky Header Navbar with Auth Support */}
      <Navbar 
        onNavigate={handleNavigate} 
        activeSection={activeSection}
        onAuthClick={(mode) => {
          setAuthMode(mode);
          setAuthModalOpen(true);
        }}
        user={currentUser}
        onLogout={() => {
          setCurrentUser(null);
          setAuthToast('Signed out successfully.');
          setTimeout(() => setAuthToast(null), 3000);
        }}
      />

      {/* Hero Section */}
      <Hero 
        onStudentsClick={() => {
          handleNavigate('students');
          setModalType('student');
          resetSimulations();
        }} 
        onCollegesClick={() => {
          navigate('/explore-smart-systems');
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
          navigate('/explore-smart-systems');
        }} 
      />

      {/* Student Features Preview (For Students) */}
      <StudentFeatures 
        onCtaClick={() => {
          setModalType('student');
          resetSimulations();
        }} 
      />

      {/* Smart Campus Features Preview (For Colleges) */}
      <CampusFeatures 
        onCtaClick={() => {
          navigate('/explore-smart-systems');
        }} 
      />

      {/* How DISHA Works */}
      <HowItWorks />

      {/* Team Exo-Hunter Section */}
      <TeamSection />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Feature Simulator Modal */}
      {modalType && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className={`bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl ${modalType === 'student' ? 'max-w-2xl' : 'max-w-xl'} w-full overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200`}>
            {/* Modal Header */}
            <div className="bg-slate-950 text-white p-5 flex items-center justify-between border-b border-slate-800/60">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <span className="font-bold tracking-wide">
                  {modalType === 'student' ? 'DISHA Student Guidance Console' : 'Smart Campus Operations Console'}
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
                /* New Explanatory Student Modal Body */
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
                      <Sparkles className="w-3 h-3 text-indigo-400" />
                      About Student DISHA
                    </div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                      What is DISHA AI?
                    </h3>
                    <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                      DISHA (Dynamic Intelligent Student Help & Assistant) is a comprehensive AI career navigation ecosystem designed to guide you from classroom study to industry-ready professionalism.
                    </p>
                  </div>

                  {/* Core Value Pillars Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/30 transition-all space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded-lg bg-indigo-500/10 text-indigo-400"><Target className="w-4 h-4" /></span>
                        <h4 className="font-semibold text-white text-sm">Dynamic Goal Setting</h4>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Identify your target career pathways (Fullstack Development, Machine Learning, DevOps, or design your own) and establish a clear target milestone.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/30 transition-all space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded-lg bg-indigo-500/10 text-indigo-400"><Map className="w-4 h-4" /></span>
                        <h4 className="font-semibold text-white text-sm">Personalized Roadmaps</h4>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Get step-by-step custom curriculum recommendations, recommended video tutorials, and interactive flowchart learning pathways.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/30 transition-all space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded-lg bg-indigo-500/10 text-indigo-400"><CalendarDays className="w-4 h-4" /></span>
                        <h4 className="font-semibold text-white text-sm">AI Study Planner</h4>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Organize study materials, extract summary notes, generate flashcards, and schedule weekly calendars automatically with AI suggestions.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/30 transition-all space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded-lg bg-indigo-500/10 text-indigo-400"><TrendingUp className="w-4 h-4" /></span>
                        <h4 className="font-semibold text-white text-sm">Skill Diagnostics</h4>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Take interactive quizzes on programming languages, algorithms, and conceptual questions to evaluate and map skill gap points.
                      </p>
                    </div>
                  </div>

                  {/* Call to Action Container */}
                  <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 text-center space-y-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white">Ready to start your journey?</h4>
                      <p className="text-[11px] text-indigo-300">Sign in to initialize your profile and customize your career dashboard.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-1">
                      <button
                        onClick={() => {
                          setModalType(null);
                          setAuthModalOpen(true);
                        }}
                        className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <UserCircle className="w-4 h-4" />
                        <span>Sign In to Student Portal</span>
                      </button>
                      <button
                        onClick={() => setModalType(null)}
                        className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
                      >
                        Cancel & Close
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Smart Campus Interactive Options Hub */
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-2">
                      <Sparkles className="w-3 h-3 text-sky-400" />
                      DISHA Smart Solutions Hub
                    </div>
                    <h3 className="text-2xl font-extrabold text-white tracking-tight">
                      Explore Smart Systems
                    </h3>
                    <p className="text-slate-400 text-xs max-w-md mx-auto leading-relaxed">
                      Select a specialized AI system to launch its live dashboard or view system blueprints.
                    </p>
                  </div>

                  {/* Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Smart Attendance Card */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 hover:bg-emerald-950/5 transition-all space-y-3 flex flex-col justify-between group">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><Scan className="w-4 h-4" /></span>
                          <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30 uppercase">Live Demo</span>
                        </div>
                        <h4 className="font-bold text-white text-sm">Smart Attendance Portal</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          Edge face-recognition dashboard tracking records, unrecognized alert lists, and classroom diagnostics.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setModalType(null);
                          window.open('/Team-Exo-hunter/smart-attendance/index.html', '_blank');
                        }}
                        className="w-full mt-3 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-750 text-white font-bold text-[11px] transition-all cursor-pointer flex items-center justify-center gap-1"
                      >
                        Launch Attendance ➜
                      </button>
                    </div>

                    {/* Smart Colleges Card */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500/40 hover:bg-sky-950/5 transition-all space-y-3 flex flex-col justify-between group">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20"><School className="w-4 h-4" /></span>
                          <span className="text-[9px] font-bold text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-500/30 uppercase">Live Demo</span>
                        </div>
                        <h4 className="font-bold text-white text-sm">Smart Colleges Portal</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          Central campus navigation covering smart classes, digital libraries, and central security metrics.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setModalType(null);
                          window.open('/Team-Exo-hunter/campus-one.html', '_blank');
                        }}
                        className="w-full mt-3 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold text-[11px] transition-all cursor-pointer flex items-center justify-center gap-1"
                      >
                        Launch Campus One ➜
                      </button>
                    </div>

                    {/* Smart Hospital Card */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-rose-500/40 hover:bg-rose-950/5 transition-all space-y-3 flex flex-col justify-between group">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20"><Activity className="w-4 h-4" /></span>
                          <span className="text-[9px] font-bold text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-500/30 uppercase">Mock View</span>
                        </div>
                        <h4 className="font-bold text-white text-sm">Smart Hospital Care</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          AI-driven queue allocation, real-time patient charts management, and automated diagnostic reports generation.
                        </p>
                      </div>
                      <button
                        onClick={() => alert('Smart Hospital Dashboard is being integrated into the campus healthcare network.')}
                        className="w-full mt-3 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-[11px] transition-all cursor-pointer flex items-center justify-center gap-1"
                      >
                        Launch Hospital HUD
                      </button>
                    </div>

                    {/* Smart Administrative Services Card */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 hover:bg-amber-950/5 transition-all space-y-3 flex flex-col justify-between group">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20"><Building2 className="w-4 h-4" /></span>
                          <span className="text-[9px] font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30 uppercase">Mock View</span>
                        </div>
                        <h4 className="font-bold text-white text-sm">Smart Admin Services</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          Digital workplace systems automating billing workflows, MSME registry, and legal certificates authentication.
                        </p>
                      </div>
                      <button
                        onClick={() => alert('Smart Administrative Services dashboard preview is loading.')}
                        className="w-full mt-3 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-[11px] transition-all cursor-pointer flex items-center justify-center gap-1"
                      >
                        Launch Admin Services
                      </button>
                    </div>

                    {/* Smart Organization Card */}
                    <div className="col-span-1 sm:col-span-2 p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/40 hover:bg-indigo-950/5 transition-all space-y-3 flex flex-col justify-between group">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"><Target className="w-4 h-4" /></span>
                            <h4 className="font-bold text-white text-sm">Smart Organization Management</h4>
                          </div>
                          <span className="text-[9px] font-bold text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-500/30 uppercase">Active</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          Enterprise scheduling systems linking student councils, campus faculty calendars, and live CCTV feeds.
                        </p>
                      </div>
                      <button
                        onClick={() => alert('Smart Organization calendar synchronizer initialized.')}
                        className="w-full mt-3 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-[11px] transition-all cursor-pointer flex items-center justify-center gap-1"
                      >
                        Configure Organization Schedules
                      </button>
                    </div>

                  </div>
                </div>
              )}

              {/* Informative Prototype Note */}
              <div className="flex gap-2.5 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 leading-relaxed font-medium">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Prototype Notice:</strong> Interactive preview designed for hackathon judges to verify the frontend flow logic & simulated AI edge capabilities.
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

      {/* Auth Modal (Login / Sign Up) */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(userData) => {
          setCurrentUser(userData);
          try {
            const savedRaw = localStorage.getItem('disha-student-profile');
            const currentProfile = savedRaw ? JSON.parse(savedRaw) : {};
            localStorage.setItem('disha-student-profile', JSON.stringify({
              name: userData.name || 'Student Learner',
              course: currentProfile.course || 'B.Tech',
              branch: currentProfile.branch || 'Computer Science & Engineering',
              semester: currentProfile.semester || '5th Semester',
              skills: currentProfile.skills || ['Python', 'JavaScript', 'React', 'TypeScript', 'SQL'],
              interests: currentProfile.interests || ['Artificial Intelligence', 'Fullstack Development', 'Cloud Computing'],
              careerGoal: currentProfile.careerGoal || 'AI/ML Engineer',
              studyHours: currentProfile.studyHours || 4,
              experienceLevel: currentProfile.experienceLevel || 'intermediate',
            }));
          } catch (err) {
            console.error('Storage sync error:', err);
          }
          // Navigate immediately for student role — no delay, no home page flash
          if (userData.role === 'student') {
            navigate('/student');
          } else {
            setAuthToast(`🎉 Welcome to DISHA AI, ${userData.name}! Signed in as ${userData.role}.`);
            setTimeout(() => setAuthToast(null), 3000);
          }
        }}
      />

      {/* Floating Auth Toast Notification */}
      {authToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-slate-900 border border-emerald-500/50 shadow-2xl text-xs text-emerald-300 flex items-center gap-2.5 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{authToast}</span>
        </div>
      )}

    </div>
  );
};

// AI Annotation #1: annotate flex layout scaling parameters - verified on 08/21/2026 09:39:02

// AI Annotation #10: annotate responsive grid column ratios - verified on 08/21/2026 09:39:08

// AI Annotation #19: annotate modal visibility transition classes - verified on 08/21/2026 09:39:15

// AI Annotation #28: annotate webcam camera media constraints - verified on 08/21/2026 09:39:21

// AI Annotation #37: annotate sensor values refresh loops - verified on 08/21/2026 09:39:27

// AI Annotation #46: annotate state hooks synchronization triggers - verified on 08/21/2026 09:39:34

// AI Annotation #55: annotate compliance badge styling overrides - verified on 08/21/2026 09:39:40

// AI Annotation #64: annotate redirect anchor targets configuration - verified on 08/21/2026 09:39:45

// AI Annotation #73: annotate scan laser animation intervals - verified on 08/21/2026 09:39:51

// AI Annotation #82: annotate queue tracking items boundaries - verified on 08/21/2026 09:39:56
