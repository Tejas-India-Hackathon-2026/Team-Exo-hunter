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
import { CAREER_TRACKS, QUIZ_SAMPLES } from '../data/landingData';
import { 
  X, Sparkles, Brain, Award, ShieldAlert, Scan, 
  BarChart3, FileText, Check, HelpCircle, CheckCircle2
} from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [modalType, setModalType] = useState<'student' | 'college' | null>(null);
  const [studentTab, setStudentTab] = useState<'roadmap' | 'quiz' | 'notes'>('roadmap');
  
  // Auth state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role: 'student' | 'college' } | null>(null);
  const [authToast, setAuthToast] = useState<string | null>(null);

  // Interactive Simulator States
  const [studentRole, setStudentRole] = useState('fullstack');
  const [generatingRoadmap, setGeneratingRoadmap] = useState(false);
  const [roadmapOutput, setRoadmapOutput] = useState<string[] | null>(null);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Campus Simulator States
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
      const track = CAREER_TRACKS[studentRole] || CAREER_TRACKS.fullstack;
      setRoadmapOutput(track.steps);
    }, 1200);
  };

  // Mock Face Detection Simulator
  const runFaceSimulation = () => {
    setCampusActivity('scanning');
    setTimeout(() => {
      setCampusActivity('success');
      setAnalyticsData({ present: 43, absent: 2, rate: '95%' });
    }, 1800);
  };

  const resetSimulations = () => {
    setRoadmapOutput(null);
    setGeneratingRoadmap(false);
    setCampusActivity('idle');
    setStudentTab('roadmap');
    setSelectedAnswers({});
    setQuizSubmitted(false);
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

      {/* Team Exo-Hunter Section */}
      <TeamSection />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Feature Simulator Modal */}
      {modalType && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
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
                /* Student Interactive Demo */
                <div className="space-y-4">
                  {/* Tab Selector */}
                  <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                    <button
                      onClick={() => setStudentTab('roadmap')}
                      className={`flex-1 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                        studentTab === 'roadmap'
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      AI Roadmap
                    </button>
                    <button
                      onClick={() => setStudentTab('quiz')}
                      className={`flex-1 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                        studentTab === 'quiz'
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Skill Diagnostic Quiz
                    </button>
                    <button
                      onClick={() => setStudentTab('notes')}
                      className={`flex-1 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                        studentTab === 'notes'
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Smart Notes
                    </button>
                  </div>

                  {studentTab === 'roadmap' && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-base font-bold text-white mb-1 flex items-center gap-1.5">
                          <Brain className="w-4 h-4 text-indigo-400" />
                          Dynamic Learning Path Generator
                        </h3>
                        <p className="text-slate-400 text-xs">
                          Select a target discipline to calculate milestone roadmaps and curated tutorials.
                        </p>
                      </div>

                      {/* Form Options */}
                      <div className="space-y-2">
                        <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                          Target Career Path:
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            { id: 'fullstack', label: 'Fullstack Dev' },
                            { id: 'ai', label: 'AI Engineer' },
                            { id: 'devops', label: 'DevOps & Cloud' },
                            { id: 'uiux', label: 'UI/UX Designer' }
                          ].map((t) => (
                            <button
                              key={t.id}
                              onClick={() => { setStudentRole(t.id); setRoadmapOutput(null); }}
                              className={`px-2.5 py-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                                studentRole === t.id
                                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/20'
                                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Track Details Card */}
                      {CAREER_TRACKS[studentRole] && (
                        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
                          <div className="flex justify-between items-center text-slate-300">
                            <span className="font-semibold text-indigo-400">{CAREER_TRACKS[studentRole].title}</span>
                            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-mono">
                              Est: {CAREER_TRACKS[studentRole].duration}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {CAREER_TRACKS[studentRole].keyTools.map((tool, i) => (
                              <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <button
                        onClick={runRoadmapSimulation}
                        disabled={generatingRoadmap}
                        className="w-full py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 cursor-pointer disabled:opacity-50"
                      >
                        {generatingRoadmap ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Synthesizing competency nodes & materials...
                          </>
                        ) : (
                          'Generate Dynamic Roadmap'
                        )}
                      </button>

                      {/* Simulator Results Output */}
                      {roadmapOutput && (
                        <div className="space-y-2 animate-in slide-in-from-bottom-2 duration-300">
                          <div className="flex justify-between items-center text-[10px] text-indigo-400 font-mono px-1 pb-1 border-b border-indigo-900/40">
                            <span>// ROADMAP OUTPUT</span>
                            <span className="text-emerald-400 font-bold uppercase tracking-widest">SUCCESS</span>
                          </div>
                          {roadmapOutput.map((step, idx) => (
                            <div
                              key={idx}
                              className="group relative flex items-start gap-3 p-3 rounded-xl border border-slate-800 bg-slate-950/80
                                         cursor-default transition-all duration-200 ease-out
                                         hover:scale-[1.025] hover:-translate-y-0.5
                                         hover:border-indigo-500/60 hover:bg-indigo-950/30
                                         hover:shadow-lg hover:shadow-indigo-600/20"
                            >
                              {/* Step badge */}
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600/20 border border-indigo-500/40
                                               flex items-center justify-center text-[10px] font-bold text-indigo-300
                                               group-hover:bg-indigo-600/40 group-hover:border-indigo-400 transition-colors duration-200">
                                {idx + 1}
                              </span>
                              {/* Step text */}
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors duration-200 leading-relaxed">
                                  {step}
                                </p>
                                <div className="mt-1.5 flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/60 group-hover:bg-indigo-400 transition-colors" />
                                  <span className="text-[9px] font-mono text-slate-600 group-hover:text-indigo-400 transition-colors uppercase tracking-wider">
                                    Goal {idx + 1}
                                  </span>
                                </div>
                              </div>
                              {/* Right glow dot */}
                              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1 bg-slate-700 group-hover:bg-indigo-400 group-hover:shadow-sm group-hover:shadow-indigo-400/50 transition-all duration-200" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {studentTab === 'quiz' && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-base font-bold text-white mb-1 flex items-center gap-1.5">
                          <HelpCircle className="w-4 h-4 text-indigo-400" />
                          Adaptive Diagnostic Assessment
                        </h3>
                        <p className="text-slate-400 text-xs">
                          Test baseline fundamentals to highlight knowledge gaps before job interviews.
                        </p>
                      </div>

                      <div className="space-y-3">
                        {QUIZ_SAMPLES.map((q) => (
                          <div key={q.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                            <div className="text-[10px] font-mono text-indigo-400 uppercase font-semibold">
                              Topic: {q.topic}
                            </div>
                            <div className="text-white font-medium">
                              {q.question}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                              {q.options.map((opt, oIdx) => {
                                const isSelected = selectedAnswers[q.id] === oIdx;
                                const isCorrect = q.correct === oIdx;
                                return (
                                  <button
                                    key={oIdx}
                                    onClick={() => setSelectedAnswers(prev => ({ ...prev, [q.id]: oIdx }))}
                                    className={`p-2 rounded-lg text-left text-xs border transition-all cursor-pointer ${
                                      isSelected
                                        ? quizSubmitted
                                          ? isCorrect
                                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                                            : 'bg-rose-950/80 border-rose-500 text-rose-300'
                                          : 'bg-indigo-600/30 border-indigo-500 text-white'
                                        : 'bg-slate-900 border-slate-800/80 text-slate-400 hover:bg-slate-800'
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => setQuizSubmitted(true)}
                        className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer shadow-lg shadow-emerald-600/25"
                      >
                        Submit & View AI Feedback Analysis
                      </button>
                    </div>
                  )}

                  {studentTab === 'notes' && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-base font-bold text-white mb-1 flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-indigo-400" />
                          AI Smart Notes & Flashcard Generator
                        </h3>
                        <p className="text-slate-400 text-xs">
                          Convert complex lecture audios and markdown documents into structured study flashcards.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-2.5 shadow-inner">
                        <div className="text-[10px] text-indigo-400 border-b border-slate-800 pb-1.5 flex justify-between">
                          <span>// GENERATED SMART SUMMARY</span>
                          <span className="text-emerald-400">MARKDOWN READY</span>
                        </div>
                        <div className="text-indigo-200 font-semibold text-xs">
                          # Deep Learning & Neural Architectures (Summary)
                        </div>
                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          - <strong>Backpropagation:</strong> Optimization technique computing gradient of loss function with respect to weights using chain rule.
                        </p>
                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          - <strong>Activation Functions:</strong> ReLU, LeakyReLU avoid vanishing gradients in deeper layers compared to Sigmoid.
                        </p>
                        <div className="p-2 rounded bg-indigo-950/40 border border-indigo-900/50 text-[10px] text-indigo-300 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Generated 8 spaced-repetition flashcards for your daily review calendar.</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Smart Campus Interactive Demo */
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-white mb-1 flex items-center gap-1.5">
                      <Scan className="w-4 h-4 text-sky-400" />
                      Attendance Camera Simulation HUD
                    </h3>
                    <p className="text-slate-400 text-xs">
                      Simulate classroom hardware scanning student faces to mark attendance on the centralized server.
                    </p>
                  </div>

                  {/* Simulated Frame */}
                  <div className="aspect-video w-full rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center relative overflow-hidden">
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
                        <div className="w-10 h-10 border-3 border-sky-400 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                        <span className="text-xs text-sky-400 font-mono animate-pulse block">Detecting Face Keypoints...</span>
                      </div>
                    )}

                    {campusActivity === 'success' && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 p-4">
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
                        <span className="text-base font-extrabold text-white">{analyticsData.present}</span>
                      </div>
                      <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg">
                        <span className="text-[10px] text-slate-500 block font-semibold">Absent</span>
                        <span className="text-base font-extrabold text-rose-500">{analyticsData.absent}</span>
                      </div>
                      <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg">
                        <span className="text-[10px] text-slate-500 block font-semibold">Ratio</span>
                        <span className="text-base font-extrabold text-indigo-400">{analyticsData.rate}</span>
                      </div>
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
