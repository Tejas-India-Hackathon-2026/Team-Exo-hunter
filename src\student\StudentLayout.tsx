import { useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard, MessageSquareText, Target, Map, CalendarDays,
  Briefcase, FolderKanban, TrendingUp, UserCircle, Sparkles,
  Menu, ArrowLeft, ChevronRight
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
  { label: 'DISHA AI', path: '/student/disha-ai', icon: MessageSquareText },
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
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/student/dashboard') {
      return location.pathname === '/student' || location.pathname === '/student/dashboard';
    }
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      
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
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-1.5 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/35 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              DISHA <span className="text-indigo-400">AI</span>
            </span>
          </Link>
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

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-500 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
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
    </div>
  );
};
