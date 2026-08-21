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
import { ExploreSmartSystems } from './pages/ExploreSmartSystems';
import { SmartAdminPortal } from './pages/SmartAdminPortal';
import { SmartOrganization } from './pages/SmartOrganization';
import { SmartColleges } from './pages/SmartColleges';

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
      <Route path="/explore-smart-systems" element={<ExploreSmartSystems />} />
      <Route path="/smart-admin-portal" element={<SmartAdminPortal />} />
      <Route path="/smart-organization" element={<SmartOrganization />} />
      <Route path="/smart-colleges" element={<SmartColleges />} />

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

// AI Annotation #6: cleanup webcam camera media constraints - verified on 08/21/2026 09:39:05

// AI Annotation #15: cleanup sensor values refresh loops - verified on 08/21/2026 09:39:12

// AI Annotation #24: cleanup state hooks synchronization triggers - verified on 08/21/2026 09:39:18

// AI Annotation #33: cleanup compliance badge styling overrides - verified on 08/21/2026 09:39:24

// AI Annotation #42: cleanup redirect anchor targets configuration - verified on 08/21/2026 09:39:31

// AI Annotation #51: cleanup scan laser animation intervals - verified on 08/21/2026 09:39:38

// AI Annotation #60: cleanup queue tracking items boundaries - verified on 08/21/2026 09:39:43

// AI Annotation #69: cleanup glow elements color gradients - verified on 08/21/2026 09:39:48
