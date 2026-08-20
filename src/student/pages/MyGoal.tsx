import { useState } from 'react';
import { Target, CheckCircle2, AlertCircle, Compass, Brain, Code, BarChart3, PieChart, Cloud, Shield } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DEFAULT_PROFILE, CAREER_OPTIONS } from '../data/studentData';
import type { StudentProfileData } from '../data/studentData';

export const MyGoal = () => {
  const [profile, setProfile] = useLocalStorage<StudentProfileData>('disha-student-profile', DEFAULT_PROFILE);
  const [showGoalChange, setShowGoalChange] = useState(false);

  const activeGoalData = CAREER_OPTIONS.find(opt => opt.title === profile.careerGoal) || CAREER_OPTIONS[0];

  const handleGoalSelect = (goalTitle: string) => {
    setProfile(prev => ({
      ...prev,
      careerGoal: goalTitle,
    }));
    setShowGoalChange(false);
  };

  // Compare profile skills with required skills
  const profileSkills = profile.skills.map(s => s.toLowerCase());
  const matchingSkills = activeGoalData.requiredSkills.filter(skill =>
    profileSkills.includes(skill.toLowerCase())
  );
  const missingSkills = activeGoalData.requiredSkills.filter(skill =>
    !profileSkills.includes(skill.toLowerCase())
  );

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return Brain;
      case 'Code': return Code;
      case 'BarChart3': return BarChart3;
      case 'PieChart': return PieChart;
      case 'Cloud': return Cloud;
      case 'Shield': return Shield;
      default: return Compass;
    }
  };

  const GoalIcon = getIconComponent(activeGoalData.icon);

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Target className="w-8 h-8 text-indigo-400" />
            My Goal
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Focus on your target career destination and skill analysis.
          </p>
        </div>
        <button
          onClick={() => setShowGoalChange(!showGoalChange)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer"
        >
          {showGoalChange ? 'Back to Analysis' : 'Change Goal'}
        </button>
      </div>

      {showGoalChange ? (
        /* GOAL SELECTION LIST */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CAREER_OPTIONS.map((opt) => {
            const OptIcon = getIconComponent(opt.icon);
            const isSelected = opt.title === profile.careerGoal;

            return (
              <div
                key={opt.id}
                onClick={() => handleGoalSelect(opt.title)}
                className={`bg-slate-900/60 border rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${
                  isSelected
                    ? 'border-indigo-500 bg-slate-900/90 shadow-lg shadow-indigo-500/5'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className={`p-2.5 rounded-lg ${
                    isSelected ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-950 text-slate-400'
                  }`}>
                    <OptIcon className="w-5 h-5" />
                  </div>
                  {isSelected && (
                    <span className="text-[10px] bg-indigo-500 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Current
                    </span>
                  )}
                </div>
                <h3 className="text-white text-base font-bold mb-1">{opt.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{opt.description}</p>
              </div>
            );
          })}
        </div>
      ) : (
        /* GOAL ANALYSIS DISPLAY */
        <div className="space-y-6">
          {/* Active Goal Summary Card */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
            <div className="p-4 rounded-2xl bg-indigo-600/10 text-indigo-400 self-start md:self-auto shadow-inner">
              <GoalIcon className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">Active Career Path Target</span>
              <h2 className="text-2xl font-bold text-white">{activeGoalData.title}</h2>
              <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">{activeGoalData.description}</p>
            </div>
          </div>

          {/* Skill Gap Analysis Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Matching Skills */}
            <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-850 pb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Skills You Have ({matchingSkills.length})
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Excellent! These skills in your profile match the target job requirements.
              </p>
              {matchingSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2 pt-2">
                  {matchingSkills.map((skill) => (
                    <span key={skill} className="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-xs italic">No matching skills found in profile yet.</p>
              )}
            </div>

            {/* Missing Skills */}
            <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-850 pb-3">
                <AlertCircle className="w-5 h-5 text-amber-400" />
                Skills to Develop ({missingSkills.length})
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Add these skills to your study planner or roadmap to close the competency gap.
              </p>
              {missingSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2 pt-2">
                  {missingSkills.map((skill) => (
                    <span key={skill} className="text-xs bg-amber-500/10 border border-amber-500/20 text-amber-300 px-3 py-1.5 rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-emerald-400 text-xs font-semibold">🎉 All required skills developed!</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
