import React, { useState } from 'react';
import { UserCircle, Save, Edit3, Check } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DEFAULT_PROFILE } from '../data/studentData';
import type { StudentProfileData } from '../data/studentData';

export const StudentProfile = () => {
  const [profile, setProfile] = useLocalStorage<StudentProfileData>('disha-student-profile', DEFAULT_PROFILE);
  const [editMode, setEditMode] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Form states
  const [formData, setFormData] = useState<StudentProfileData>({ ...profile });
  const [skillsInput, setSkillsInput] = useState(profile.skills.join(', '));
  const [interestsInput, setInterestsInput] = useState(profile.interests.join(', '));

  const handleEditClick = () => {
    setFormData({ ...profile });
    setSkillsInput(profile.skills.join(', '));
    setInterestsInput(profile.interests.join(', '));
    setEditMode(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedSkills = skillsInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);
    const updatedInterests = interestsInput
      .split(',')
      .map(i => i.trim())
      .filter(i => i.length > 0);

    const updatedProfile: StudentProfileData = {
      ...formData,
      skills: updatedSkills,
      interests: updatedInterests,
    };

    setProfile(updatedProfile);
    setEditMode(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'studyHours' ? Number(value) : value,
    }));
  };

  const careerOptions = [
    'AI/ML Engineer',
    'Software Developer',
    'Data Scientist',
    'Data Analyst',
    'Cloud Engineer',
    'Cybersecurity Engineer',
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-4 bg-emerald-500 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 z-50 animate-in slide-in-from-top-4 duration-300 text-sm font-semibold">
          <Check className="w-4 h-4" />
          Profile updated successfully!
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <UserCircle className="w-8 h-8 text-indigo-400" />
            Student Profile
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage your academic details, skills, and goals.
          </p>
        </div>
        {!editMode && (
          <button
            onClick={handleEditClick}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </button>
        )}
      </div>

      {editMode ? (
        /* EDIT MODE FORM */
        <form onSubmit={handleSave} className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
          <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Edit Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none transition-all"
              />
            </div>

            {/* Career Goal */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Career Goal</label>
              <select
                name="careerGoal"
                value={formData.careerGoal}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none transition-all"
              >
                {careerOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Course */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Course</label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none transition-all"
              />
            </div>

            {/* Branch */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Branch</label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                required
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none transition-all"
              />
            </div>

            {/* Semester */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Semester</label>
              <input
                type="text"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                required
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none transition-all"
              />
            </div>

            {/* Study Hours */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Daily Study Hours</label>
              <input
                type="number"
                name="studyHours"
                value={formData.studyHours}
                onChange={handleChange}
                min="1"
                max="24"
                required
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none transition-all"
              />
            </div>

            {/* Skills */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Skills (comma-separated)</label>
              <input
                type="text"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                placeholder="Python, React, TypeScript..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none transition-all"
              />
            </div>

            {/* Interests */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Interests (comma-separated)</label>
              <input
                type="text"
                value={interestsInput}
                onChange={(e) => setInterestsInput(e.target.value)}
                placeholder="Artificial Intelligence, Web Security, UI design..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none transition-all"
              />
            </div>

            {/* Experience Level */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Experience Level</label>
              <div className="flex gap-6">
                {['beginner', 'intermediate', 'advanced'].map((lvl) => (
                  <label key={lvl} className="flex items-center gap-2 cursor-pointer text-sm text-slate-300 hover:text-white capitalize">
                    <input
                      type="radio"
                      name="experienceLevel"
                      value={lvl}
                      checked={formData.experienceLevel === lvl}
                      onChange={handleChange}
                      className="w-4 h-4 accent-indigo-500 focus:ring-indigo-500 bg-slate-950 border-slate-800"
                    />
                    {lvl}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer shadow-lg shadow-indigo-600/25"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        /* VIEW MODE CARD */
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 md:p-8 space-y-8">
          {/* Profile Name & Primary Goal */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
              <p className="text-indigo-400 text-sm font-semibold mt-0.5">{profile.course} in {profile.branch}</p>
            </div>
            <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-xl p-3.5 flex items-center gap-3">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold">Target Career</span>
                <span className="text-sm font-bold text-white">{profile.careerGoal}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Academic Info */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-850 pb-2">Academic & Study Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm py-1 border-b border-slate-850">
                  <span className="text-slate-400">Semester:</span>
                  <span className="text-white font-semibold">{profile.semester}</span>
                </div>
                <div className="flex justify-between text-sm py-1 border-b border-slate-850">
                  <span className="text-slate-400">Daily Study Hours:</span>
                  <span className="text-white font-semibold">{profile.studyHours} Hours / day</span>
                </div>
                <div className="flex justify-between text-sm py-1">
                  <span className="text-slate-400">Experience Level:</span>
                  <span className="text-indigo-400 font-bold capitalize">{profile.experienceLevel}</span>
                </div>
              </div>
            </div>

            {/* Skills & Interests */}
            <div className="space-y-5">
              {/* Skills */}
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-850 pb-2 mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <span key={skill} className="text-xs bg-slate-950 border border-slate-850 text-slate-300 px-3 py-1.5 rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-850 pb-2 mb-3">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest) => (
                    <span key={interest} className="text-xs bg-slate-950 border border-slate-850 text-slate-300 px-3 py-1.5 rounded-lg">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
