import { CalendarDays, CheckCircle2, Circle, Target } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  DEFAULT_TASKS,
  DEFAULT_WEEKLY_GOALS,
  type StudyTask,
  type WeeklyGoal,
} from '../data/studentData';

const priorityConfig = {
  high: { label: 'High', bg: 'bg-rose-500/20', text: 'text-rose-400', border: 'border-rose-500/30' },
  medium: { label: 'Medium', bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
  low: { label: 'Low', bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
};

export const StudyPlanner = () => {
  const [tasks, setTasks] = useLocalStorage<StudyTask[]>('disha-study-tasks', DEFAULT_TASKS);
  const [goals] = useLocalStorage<WeeklyGoal[]>('disha-weekly-goals', DEFAULT_WEEKLY_GOALS);

  const completedCount = tasks.filter((t) => t.completed).length;

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-10">
        {/* Page Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/20">
            <CalendarDays className="h-6 w-6 text-indigo-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Study Planner</h1>
        </div>

        {/* ── Today's Tasks ── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Today's Tasks</h2>
            <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-sm font-medium text-indigo-300">
              {completedCount} of {tasks.length} tasks completed
            </span>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => {
              const prio = priorityConfig[task.priority];
              return (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  className={`flex w-full items-center gap-4 rounded-xl border border-slate-700/60 bg-slate-900/70 px-5 py-4 text-left backdrop-blur-md transition-all hover:border-indigo-500/40 ${
                    task.completed ? 'opacity-50' : ''
                  }`}
                >
                  {/* Checkbox */}
                  {task.completed ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-indigo-400" />
                  ) : (
                    <Circle className="h-5 w-5 shrink-0 text-slate-500" />
                  )}

                  {/* Title */}
                  <span
                    className={`flex-1 text-sm font-medium ${
                      task.completed ? 'text-slate-400 line-through' : 'text-white'
                    }`}
                  >
                    {task.title}
                  </span>

                  {/* Priority Badge */}
                  <span
                    className={`rounded-md border px-2.5 py-0.5 text-xs font-semibold ${prio.bg} ${prio.text} ${prio.border}`}
                  >
                    {prio.label}
                  </span>

                  {/* Category Tag */}
                  <span className="rounded-md bg-slate-700/60 px-2.5 py-0.5 text-xs font-medium text-slate-300">
                    {task.category}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Weekly Goals ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Weekly Goals</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {goals.map((goal) => {
              const pct = Math.min(Math.round((goal.current / goal.target) * 100), 100);
              return (
                <div
                  key={goal.id}
                  className="rounded-xl border border-slate-700/60 bg-slate-900/70 p-5 backdrop-blur-md"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4 text-indigo-400" />
                    <h3 className="text-sm font-semibold text-white">{goal.title}</h3>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-slate-700/60">
                    <div
                      className="h-full rounded-full bg-indigo-500 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <p className="text-right text-xs font-medium text-slate-400">
                    {goal.current} / {goal.target}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
