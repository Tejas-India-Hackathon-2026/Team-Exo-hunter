import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { StudentLayout } from './student/StudentLayout';
import { Dashboard } from './student/pages/Dashboard';
import { StudentProfile } from './student/pages/StudentProfile';
import { DishaAiChat } from './student/pages/DishaAiChat';
import { Roadmap } from './student/pages/Roadmap';
import { MyGoal } from './student/pages/MyGoal';
import { StudyPlanner } from './student/pages/StudyPlanner';
import { CareerGuidance } from './student/pages/CareerGuidance';
import { ProjectGuidance } from './student/pages/ProjectGuidance';
import { Progress } from './student/pages/Progress';

import './App.css';

const SmartAttendanceRedirect = () => {
  useEffect(() => {
    window.location.replace('/Team-Exo-hunter/smart-attendance/index.html');
  }, []);
  return null;
};

function App() {
  return (
    <Routes>
      {/* Milestone 1 — Landing Page (fully preserved) */}
      <Route path="/" element={<LandingPage />} />

      {/* Milestone 2 — Student DISHA Module */}
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="disha-ai" element={<DishaAiChat />} />
        <Route path="goal" element={<MyGoal />} />
        <Route path="roadmap" element={<Roadmap />} />
        <Route path="study-planner" element={<StudyPlanner />} />
        <Route path="career" element={<CareerGuidance />} />
        <Route path="projects" element={<ProjectGuidance />} />
        <Route path="progress" element={<Progress />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="smart-attendance" element={<SmartAttendanceRedirect />} />
      </Route>
    </Routes>
  );
}

export default App;
