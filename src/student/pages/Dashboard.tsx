import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Target, 
  Map, 
  CalendarDays, 
  TrendingUp, 
  Search, 
  Sparkles, 
  GripVertical, 
  BellOff, 
  Bell, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Move
} from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { 
  DEFAULT_PROFILE, 
  SUGGESTED_PROMPTS, 
  ROADMAP_STEPS, 
  DEFAULT_TASKS, 
  DEFAULT_PROGRESS,
  type StudyTask
} from '../data/studentData';

type CardId = 'goal' | 'roadmap' | 'actions' | 'progress';

const DEFAULT_CARD_ORDER: CardId[] = ['goal', 'roadmap', 'actions', 'progress'];

export const Dashboard = () => {
  const [profile] = useLocalStorage('disha-student-profile', DEFAULT_PROFILE);
  const [tasks, setTasks] = useLocalStorage<StudyTask[]>('disha-study-tasks', DEFAULT_TASKS);
  const [cardOrder, setCardOrder] = useLocalStorage<CardId[]>('disha-dashboard-card-order', DEFAULT_CARD_ORDER);
  
  // Drag and Drop (DnD) State for Cards
  const [draggedCardId, setDraggedCardId] = useState<CardId | null>(null);
  const [dragOverCardId, setDragOverCardId] = useState<CardId | null>(null);

  // Drag and Drop (DnD) State for Tasks
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [dragOverTaskId, setDragOverTaskId] = useState<string | null>(null);

  // Do Not Disturb (DND) / Focus Mode State
  const [dndActive, setDndActive] = useLocalStorage('disha-dnd-mode', false);
  const [focusSeconds, setFocusSeconds] = useState(25 * 60); // 25 min default Pomodoro
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<'work' | 'break'>('work');

  const [searchQuery, setSearchQuery] = useState('');
  const [greeting, setGreeting] = useState('Good Morning');
  const navigate = useNavigate();

  // Time-based greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  // Pomodoro Focus Timer ticking logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTimerRunning && focusSeconds > 0) {
      interval = setInterval(() => {
        setFocusSeconds(prev => prev - 1);
      }, 1000);
    } else if (focusSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      if (timerMode === 'work') {
        setTimerMode('break');
        setFocusSeconds(5 * 60);
      } else {
        setTimerMode('work');
        setFocusSeconds(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, focusSeconds, timerMode]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/student/disha-ai?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handlePromptClick = (prompt: string) => {
    navigate(`/student/disha-ai?q=${encodeURIComponent(prompt)}`);
  };

  // ── Drag and Drop (DnD) Handlers for Dashboard Cards ────────────
  const handleCardDragStart = (e: React.DragEvent, id: CardId) => {
    setDraggedCardId(id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
  };

  const handleCardDragOver = (e: React.DragEvent, id: CardId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverCardId !== id) {
      setDragOverCardId(id);
    }
  };

  const handleCardDragLeave = () => {
    setDragOverCardId(null);
  };

  const handleCardDrop = (e: React.DragEvent, targetId: CardId) => {
    e.preventDefault();
    if (!draggedCardId || draggedCardId === targetId) {
      setDraggedCardId(null);
      setDragOverCardId(null);
      return;
    }

    const newOrder = [...cardOrder];
    const sourceIndex = newOrder.indexOf(draggedCardId);
    const targetIndex = newOrder.indexOf(targetId);

    if (sourceIndex !== -1 && targetIndex !== -1) {
      newOrder.splice(sourceIndex, 1);
      newOrder.splice(targetIndex, 0, draggedCardId);
      setCardOrder(newOrder);
    }

    setDraggedCardId(null);
    setDragOverCardId(null);
  };

  const handleCardDragEnd = () => {
    setDraggedCardId(null);
    setDragOverCardId(null);
  };

  const resetCardOrder = () => {
    setCardOrder(DEFAULT_CARD_ORDER);
  };

  // ── Drag and Drop (DnD) Handlers for Quick Action Tasks ─────────
  const handleTaskDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleTaskDragOver = (e: React.DragEvent, taskId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverTaskId !== taskId) {
      setDragOverTaskId(taskId);
    }
  };

  const handleTaskDrop = (e: React.DragEvent, targetTaskId: string) => {
    e.preventDefault();
    if (!draggedTaskId || draggedTaskId === targetTaskId) {
      setDraggedTaskId(null);
      setDragOverTaskId(null);
      return;
    }

    const newTasks = [...tasks];
    const sourceIndex = newTasks.findIndex(t => t.id === draggedTaskId);
    const targetIndex = newTasks.findIndex(t => t.id === targetTaskId);

    if (sourceIndex !== -1 && targetIndex !== -1) {
      const [movedItem] = newTasks.splice(sourceIndex, 1);
      newTasks.splice(targetIndex, 0, movedItem);
      setTasks(newTasks);
    }

    setDraggedTaskId(null);
    setDragOverTaskId(null);
  };

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  // Metrics for cards
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const taskProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const completedSteps = ROADMAP_STEPS.filter(s => s.status === 'completed').length;
  const totalSteps = ROADMAP_STEPS.length;
  const roadmapProgressPercent = Math.round((completedSteps / totalSteps) * 100);

  // Render specific card based on ID
  const renderDashboardCard = (cardId: CardId) => {
    switch (cardId) {
      case 'goal':
        return (
          <div
            key="goal"
            draggable
            onDragStart={(e) => handleCardDragStart(e, 'goal')}
            onDragOver={(e) => handleCardDragOver(e, 'goal')}
            onDragLeave={handleCardDragLeave}
            onDrop={(e) => handleCardDrop(e, 'goal')}
            onDragEnd={handleCardDragEnd}
            onClick={() => !draggedCardId && navigate('/student/goal')}
            className={`relative bg-slate-900/50 hover:bg-slate-900/80 border rounded-2xl p-5 shadow-lg transition-all duration-200 cursor-grab active:cursor-grabbing group select-none ${
              draggedCardId === 'goal' 
                ? 'opacity-40 scale-95 border-dashed border-indigo-500 ring-2 ring-indigo-500/50' 
                : dragOverCardId === 'goal'
                ? 'border-indigo-400 bg-indigo-950/30 scale-[1.02] shadow-indigo-500/20 shadow-xl'
                : 'border-slate-800 hover:border-indigo-500/40 hover:-translate-y-1'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2.5 rounded-xl bg-indigo-500/15 text-indigo-400 group-hover:scale-110 transition-transform">
                  <Target className="w-5 h-5" />
                </div>
                <div className="text-slate-500 hover:text-slate-300 p-1 cursor-grab" title="Drag to reorder card">
                  <GripVertical className="w-4 h-4" />
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/25 uppercase tracking-wider">
                Goal
              </span>
            </div>
            <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider">My Target Goal</h3>
            <p className="text-white text-base font-bold mt-1 group-hover:text-indigo-300 transition-colors truncate">
              {profile.careerGoal}
            </p>
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
              <span>Required skills review</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        );

      case 'roadmap':
        return (
          <div
            key="roadmap"
            draggable
            onDragStart={(e) => handleCardDragStart(e, 'roadmap')}
            onDragOver={(e) => handleCardDragOver(e, 'roadmap')}
            onDragLeave={handleCardDragLeave}
            onDrop={(e) => handleCardDrop(e, 'roadmap')}
            onDragEnd={handleCardDragEnd}
            onClick={() => !draggedCardId && navigate('/student/roadmap')}
            className={`relative bg-slate-900/50 hover:bg-slate-900/80 border rounded-2xl p-5 shadow-lg transition-all duration-200 cursor-grab active:cursor-grabbing group select-none ${
              draggedCardId === 'roadmap' 
                ? 'opacity-40 scale-95 border-dashed border-sky-500 ring-2 ring-sky-500/50' 
                : dragOverCardId === 'roadmap'
                ? 'border-sky-400 bg-sky-950/30 scale-[1.02] shadow-sky-500/20 shadow-xl'
                : 'border-slate-800 hover:border-sky-500/40 hover:-translate-y-1'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2.5 rounded-xl bg-sky-500/15 text-sky-400 group-hover:scale-110 transition-transform">
                  <Map className="w-5 h-5" />
                </div>
                <div className="text-slate-500 hover:text-slate-300 p-1 cursor-grab" title="Drag to reorder card">
                  <GripVertical className="w-4 h-4" />
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/25 uppercase tracking-wider">
                Roadmap
              </span>
            </div>
            <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider">My Roadmap</h3>
            <p className="text-white text-base font-bold mt-1 group-hover:text-sky-300 transition-colors">
              {roadmapProgressPercent}% Complete
            </p>
            <div className="w-full bg-slate-950 h-2 rounded-full mt-3 overflow-hidden border border-slate-800/80">
              <div className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full transition-all duration-500" style={{ width: `${roadmapProgressPercent}%` }} />
            </div>
          </div>
        );

      case 'actions':
        return (
          <div
            key="actions"
            draggable
            onDragStart={(e) => handleCardDragStart(e, 'actions')}
            onDragOver={(e) => handleCardDragOver(e, 'actions')}
            onDragLeave={handleCardDragLeave}
            onDrop={(e) => handleCardDrop(e, 'actions')}
            onDragEnd={handleCardDragEnd}
            onClick={() => !draggedCardId && navigate('/student/study-planner')}
            className={`relative bg-slate-900/50 hover:bg-slate-900/80 border rounded-2xl p-5 shadow-lg transition-all duration-200 cursor-grab active:cursor-grabbing group select-none ${
              draggedCardId === 'actions' 
                ? 'opacity-40 scale-95 border-dashed border-emerald-500 ring-2 ring-emerald-500/50' 
                : dragOverCardId === 'actions'
                ? 'border-emerald-400 bg-emerald-950/30 scale-[1.02] shadow-emerald-500/20 shadow-xl'
                : 'border-slate-800 hover:border-emerald-500/40 hover:-translate-y-1'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 group-hover:scale-110 transition-transform">
                  <CalendarDays className="w-5 h-5" />
                </div>
                <div className="text-slate-500 hover:text-slate-300 p-1 cursor-grab" title="Drag to reorder card">
                  <GripVertical className="w-4 h-4" />
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 uppercase tracking-wider">
                Planner
              </span>
            </div>
            <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Today's Tasks</h3>
            <p className="text-white text-base font-bold mt-1 group-hover:text-emerald-300 transition-colors">
              {completedTasks} of {totalTasks} Completed
            </p>
            <div className="w-full bg-slate-950 h-2 rounded-full mt-3 overflow-hidden border border-slate-800/80">
              <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${taskProgress}%` }} />
            </div>
          </div>
        );

      case 'progress':
        return (
          <div
            key="progress"
            draggable
            onDragStart={(e) => handleCardDragStart(e, 'progress')}
            onDragOver={(e) => handleCardDragOver(e, 'progress')}
            onDragLeave={handleCardDragLeave}
            onDrop={(e) => handleCardDrop(e, 'progress')}
            onDragEnd={handleCardDragEnd}
            onClick={() => !draggedCardId && navigate('/student/progress')}
            className={`relative bg-slate-900/50 hover:bg-slate-900/80 border rounded-2xl p-5 shadow-lg transition-all duration-200 cursor-grab active:cursor-grabbing group select-none ${
              draggedCardId === 'progress' 
                ? 'opacity-40 scale-95 border-dashed border-violet-500 ring-2 ring-violet-500/50' 
                : dragOverCardId === 'progress'
                ? 'border-violet-400 bg-violet-950/30 scale-[1.02] shadow-violet-500/20 shadow-xl'
                : 'border-slate-800 hover:border-violet-500/40 hover:-translate-y-1'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2.5 rounded-xl bg-violet-500/15 text-violet-400 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="text-slate-500 hover:text-slate-300 p-1 cursor-grab" title="Drag to reorder card">
                  <GripVertical className="w-4 h-4" />
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-400 border border-violet-500/25 uppercase tracking-wider">
                Progress
              </span>
            </div>
            <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Overall Progress</h3>
            <p className="text-white text-base font-bold mt-1 group-hover:text-violet-300 transition-colors">
              {DEFAULT_PROGRESS.overallProgress}% Overall
            </p>
            <div className="w-full bg-slate-950 h-2 rounded-full mt-3 overflow-hidden border border-slate-800/80">
              <div className="bg-gradient-to-r from-violet-500 to-indigo-500 h-full transition-all duration-500" style={{ width: `${DEFAULT_PROGRESS.overallProgress}%` }} />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-6xl pb-10">
      {/* ── Top Header with Greeting & DND Focus Mode Toggle ──────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 shadow-xl">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            {greeting}, {profile.name} 👋
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Let's find your direction, focus without distractions, and take the next step.
          </p>
        </div>

        {/* DND / Focus Mode Quick Toggle Widget */}
        <div className="flex items-center gap-3 bg-slate-950/80 border border-slate-800 px-4 py-3 rounded-2xl">
          <button
            onClick={() => setDndActive(!dndActive)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              dndActive 
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-lg shadow-rose-500/10' 
                : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
            }`}
          >
            {dndActive ? (
              <>
                <BellOff className="w-4 h-4 text-rose-400 animate-pulse" />
                <span>DND Mode: ON</span>
              </>
            ) : (
              <>
                <Bell className="w-4 h-4 text-slate-400" />
                <span>DND Mode: OFF</span>
              </>
            )}
          </button>

          {/* Pomodoro Timer Controls */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <Clock className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-mono font-bold text-white min-w-[45px]">
              {formatTime(focusSeconds)}
            </span>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer"
              title={isTimerRunning ? 'Pause Focus Timer' : 'Start Focus Timer'}
            >
              {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => {
                setIsTimerRunning(false);
                setFocusSeconds(timerMode === 'work' ? 25 * 60 : 5 * 60);
              }}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              title="Reset Timer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Active DND Focus Banner ────────────────────────────────── */}
      {dndActive && (
        <div className="bg-rose-950/30 border border-rose-500/30 rounded-2xl p-4 flex items-center justify-between gap-4 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-rose-200 flex items-center gap-2">
                🔕 Do Not Disturb (DND) Active
                <span className="text-[10px] uppercase tracking-wider bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full border border-rose-500/30">
                  {timerMode === 'work' ? 'Deep Work Session' : 'Short Break'}
                </span>
              </h4>
              <p className="text-xs text-rose-300/80 mt-0.5">
                All platform notifications & popups are silenced. Focus on your tasks.
              </p>
            </div>
          </div>
          <button
            onClick={() => setDndActive(false)}
            className="text-xs text-rose-300 hover:text-white px-3 py-1.5 rounded-lg bg-rose-900/50 hover:bg-rose-900 border border-rose-700/50 transition-colors cursor-pointer whitespace-nowrap"
          >
            End DND Session
          </button>
        </div>
      )}

      {/* ── AI Search Bar ─────────────────────────────────────────── */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 shadow-xl">
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
            placeholder="e.g. How can I master Data Structures or prepare for AI internships?"
            className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl py-3.5 pl-12 pr-28 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
          />
          <button
            type="submit"
            className="absolute right-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-md cursor-pointer transition-colors"
          >
            Ask AI
          </button>
        </form>

        {/* Suggested Prompt Chips */}
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

      {/* ── Draggable Dashboard Cards Section ──────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-400" />
              Customizable Dashboard Cards
            </h2>
            <span className="text-[11px] text-slate-500 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-md flex items-center gap-1">
              <Move className="w-3 h-3 text-indigo-400" /> Drag &amp; drop to reorder
            </span>
          </div>
          {JSON.stringify(cardOrder) !== JSON.stringify(DEFAULT_CARD_ORDER) && (
            <button
              onClick={resetCardOrder}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Reset Grid Order
            </button>
          )}
        </div>

        {/* Drag & Drop Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cardOrder.map((cardId) => renderDashboardCard(cardId))}
        </div>
      </div>

      {/* ── Interactive Drag & Drop Task Reordering Widget ────────── */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-emerald-400" />
              Today's Focus Tasks (Interactive DnD Priority)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Drag tasks up or down to re-prioritize your study schedule. Check them off as you finish!
            </p>
          </div>
          <button
            onClick={() => navigate('/student/study-planner')}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
          >
            Open Planner <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Draggable Task List */}
        <div className="space-y-2.5">
          {tasks.slice(0, 5).map((task) => {
            const isDragging = draggedTaskId === task.id;
            const isOver = dragOverTaskId === task.id;

            return (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => handleTaskDragStart(e, task.id)}
                onDragOver={(e) => handleTaskDragOver(e, task.id)}
                onDragLeave={() => setDragOverTaskId(null)}
                onDrop={(e) => handleTaskDrop(e, task.id)}
                onDragEnd={() => { setDraggedTaskId(null); setDragOverTaskId(null); }}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 cursor-grab active:cursor-grabbing select-none ${
                  isDragging
                    ? 'opacity-40 bg-indigo-950/20 border-dashed border-indigo-500 scale-[0.98]'
                    : isOver
                    ? 'border-indigo-400 bg-indigo-950/40 scale-[1.01] shadow-lg'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-950'
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="text-slate-600 hover:text-slate-400 cursor-grab p-0.5" title="Drag to reorder priority">
                    <GripVertical className="w-4 h-4" />
                  </div>
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="cursor-pointer text-slate-500 hover:text-indigo-400 transition-colors"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>
                  <span className={`text-sm truncate ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                    {task.title}
                  </span>
                </div>

                <div className="flex items-center gap-2 pl-3 flex-shrink-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border ${
                    task.priority === 'high'
                      ? 'bg-rose-500/15 text-rose-400 border-rose-500/25'
                      : task.priority === 'medium'
                      ? 'bg-amber-500/15 text-amber-400 border-amber-500/25'
                      : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25'
                  }`}>
                    {task.priority}
                  </span>
                  <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800 hidden sm:inline-block">
                    {task.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
