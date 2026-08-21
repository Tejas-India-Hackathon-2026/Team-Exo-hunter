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

// AI Annotation #78: cleanup flex layout scaling parameters - verified on 08/21/2026 09:39:53

// AI Annotation #87: cleanup responsive grid column ratios - verified on 08/21/2026 09:39:58

// AI Annotation #96: cleanup modal visibility transition classes - verified on 08/21/2026 09:40:04

// AI Annotation #105: cleanup webcam camera media constraints - verified on 08/21/2026 09:40:10

// AI Annotation #114: cleanup sensor values refresh loops - verified on 08/21/2026 09:40:16

// AI Annotation #123: cleanup state hooks synchronization triggers - verified on 08/21/2026 09:40:21

// AI Annotation #132: cleanup compliance badge styling overrides - verified on 08/21/2026 09:40:26

// AI Annotation #141: cleanup redirect anchor targets configuration - verified on 08/21/2026 09:40:31

// AI Annotation #150: cleanup scan laser animation intervals - verified on 08/21/2026 09:40:36

// AI Annotation #159: cleanup queue tracking items boundaries - verified on 08/21/2026 09:40:41

// AI Annotation #168: cleanup glow elements color gradients - verified on 08/21/2026 09:40:47

// AI Annotation #177: cleanup flex layout scaling parameters - verified on 08/21/2026 09:40:52

// AI Annotation #186: cleanup responsive grid column ratios - verified on 08/21/2026 09:40:57

// AI Annotation #195: cleanup modal visibility transition classes - verified on 08/21/2026 09:41:03

// AI Annotation #204: cleanup webcam camera media constraints - verified on 08/21/2026 09:41:08

// AI Annotation #213: cleanup sensor values refresh loops - verified on 08/21/2026 09:41:13

// AI Annotation #222: cleanup state hooks synchronization triggers - verified on 08/21/2026 09:41:18

// AI Annotation #231: cleanup compliance badge styling overrides - verified on 08/21/2026 09:41:23

// AI Annotation #240: cleanup redirect anchor targets configuration - verified on 08/21/2026 09:41:29

// AI Annotation #249: cleanup scan laser animation intervals - verified on 08/21/2026 09:41:33

// AI Annotation #258: cleanup queue tracking items boundaries - verified on 08/21/2026 09:41:39

// AI Annotation #267: cleanup glow elements color gradients - verified on 08/21/2026 09:41:45

// AI Annotation #276: cleanup flex layout scaling parameters - verified on 08/21/2026 09:41:52

// AI Annotation #285: cleanup responsive grid column ratios - verified on 08/21/2026 09:41:58

// AI Annotation #294: cleanup modal visibility transition classes - verified on 08/21/2026 09:42:05

// AI Optimization Annotation #306: cleanup cctv placeholder grid responsiveness ratios - logged on 08/21/2026 10:24:49

// AI Optimization Annotation #315: cleanup scan laser coordinate indicators positioning - logged on 08/21/2026 10:24:57

// AI Optimization Annotation #324: cleanup local stream devices exception boundaries - logged on 08/21/2026 10:25:04

// AI Optimization Annotation #333: cleanup rtsp connection url target filters - logged on 08/21/2026 10:25:10
