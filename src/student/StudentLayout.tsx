import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, MessageSquareText, Target, Map, CalendarDays,
  Briefcase, FolderKanban, TrendingUp, UserCircle, Sparkles,
  Menu, ChevronRight, LogOut, AlertTriangle, CheckCircle2,
  HelpCircle, ArrowLeft
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
  { label: 'DISHA AI', path: '/student/disha-ai', icon: MessageSquareText },
  { label: 'Smart Attendance', path: '/student/smart-attendance', icon: CheckCircle2 },
  { label: 'My Goal', path: '/student/goal', icon: Target },
  { label: 'Roadmap', path: '/student/roadmap', icon: Map },
  { label: 'Study Planner', path: '/student/study-planner', icon: CalendarDays },
  { label: 'Career', path: '/student/career', icon: Briefcase },
  { label: 'Projects', path: '/student/projects', icon: FolderKanban },
  { label: 'Progress', path: '/student/progress', icon: TrendingUp },
  { label: 'Profile', path: '/student/profile', icon: UserCircle },
];

export const StudentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showBackConfirmModal, setShowBackConfirmModal] = useState(false);
  const [logoutToast, setLogoutToast] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Browser back navigation interception guard
  useEffect(() => {
    window.history.pushState({ protected: true }, '');

    const handlePopState = () => {
      window.history.pushState({ protected: true }, '');
      setShowBackConfirmModal(true);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const isActive = (path: string) => {
    if (path === '/student/dashboard') {
      return location.pathname === '/student' || location.pathname === '/student/dashboard';
    }
    return location.pathname === path;
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    setLogoutToast(true);
    setTimeout(() => {
      navigate('/');
    }, 900);
  };

  const handleConfirmBack = () => {
    setShowBackConfirmModal(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex relative">
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-slate-900 border-r border-slate-800
        flex flex-col transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-800">
          <button 
            onClick={() => setShowBackConfirmModal(true)} 
            className="flex items-center gap-2 group cursor-pointer text-left w-full"
          >
            <div className="p-1.5 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/35 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              DISHA <span className="text-indigo-400">AI</span>
            </span>
          </button>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-semibold">Student Portal</p>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                  transition-all duration-200 cursor-pointer group
                  ${active
                    ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-white border border-transparent'
                  }
                `}
              >
                <Icon className={`w-4.5 h-4.5 ${active ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                <span className="flex-1 text-left">{item.label}</span>
                {active && <ChevronRight className="w-3.5 h-3.5 text-indigo-400" />}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer with Log Out */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all cursor-pointer shadow-sm group"
          >
            <LogOut className="w-4 h-4 text-rose-400 group-hover:-translate-x-0.5 transition-transform" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar (mobile) */}
        <header className="md:hidden sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-bold text-white">DISHA <span className="text-indigo-400">AI</span></span>
          </div>
          <div className="w-9" /> {/* Spacer for centering */}
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-900/95 backdrop-blur-md border-t border-slate-800">
        <div className="flex justify-around items-center py-2">
          {NAV_ITEMS.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg cursor-pointer transition-colors ${
                  active ? 'text-indigo-400' : 'text-slate-500'
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                <span className="text-[9px] font-medium">{item.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </nav>
      {/* Back to Home Navigation Confirmation Modal */}
      {showBackConfirmModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl max-w-sm w-full p-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/20">
              <HelpCircle className="w-6 h-6" />
            </div>
            
            <h3 className="text-base font-bold text-white mb-2">
              Leave Student Workspace?
            </h3>
            
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Kya aap sach me wapas Home page par jana chahte hain? Aap kabhi bhi login karke apne dashboard par wapas aa sakte hain.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowBackConfirmModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
              >
                No, Stay Here
              </button>
              <button
                onClick={handleConfirmBack}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Yes, Go Back</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Log Out Confirmation Pop-up Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl max-w-sm w-full p-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-500/20">
              <AlertTriangle className="w-6 h-6" />
            </div>
            
            <h3 className="text-base font-bold text-white mb-2">
              Sign Out of DISHA AI?
            </h3>
            
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Are you sure you want to log out of your student portal session? Your active career roadmap and notes are securely saved.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white shadow-lg shadow-rose-600/30 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Yes, Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Logout Success Toast */}
      {logoutToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-slate-900 border border-emerald-500/50 shadow-2xl text-xs text-emerald-300 flex items-center gap-2.5 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Logged out successfully. Returning to Home...</span>
        </div>
      )}

    </div>
  );
};

