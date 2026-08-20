# DISHA AI 🌟

**Your Direction. Your Growth. Your Future.**

DISHA AI is a premium, AI-powered platform built for **students** and **colleges/campuses**. It acts as a comprehensive student guidance system and a next-generation smart campus operations solution.

---

## 📌 Problem Statement

1. **For Students:** The modern educational landscape is overflowing with documentation, tutorials, and career options. However, students lack a structured, personalized path to map their current competencies to professional job roles. Learning is often fragmented and lacks direction.
2. **For Colleges & Smart Campuses:** Colleges still rely on outdated, manual processes for student attendance, security validation, and classroom analytics. These manual processes waste valuable lecture time, compromise security, and fail to provide early intervention insights for struggling students.

---

## 💡 The Solution

DISHA AI bridges this gap with a dual-sided ecosystem:

### 1. Student Guidance System (Primary Identity)
Helps students answer: *Where am I now? What is my goal? What skills do I need? What should I build and learn next?*
* **Understand:** Establish a baseline profile by assessing current skills and background.
* **Goal:** Choose or define custom career destinations (e.g., Fullstack Developer, AI Researcher).
* **Roadmap:** Generate structured learning plans with curated resources.
* **Action:** Build real-world portfolio projects and practice adaptive assessments.
* **Progress:** Monitor metrics and track alignment with market expectations.

### 2. College & Smart Campus Solutions (Campus Extension)
Introduces modern edge-AI logic to digitize campus administrative operations.
* **AI Face Detection:** Low-latency localized identification of students.
* **Smart Attendance:** Automated geofenced or camera-based roll call systems.
* **Student Analytics:** Engagement and academic dashboards to spot at-risk profiles early.
* **Campus AI Assistant:** A 24/7 assistant trained on campus regulations, course catalogs, and circulars.

---

## 🛠 Technology Stack

* **Frontend Framework:** React 19 (TypeScript)
* **Build Tool:** Vite 8
* **Styling Engine:** Tailwind CSS v4 (native Vite integration)
* **Icon Library:** Lucide React (premium SVG icon set)
* **Linter:** Oxlint (high-performance lint compiler)

---

## 📁 Repository Structure

```text
src/
├── components/          # Reusable UI component blocks
│   ├── Button.tsx       # Standardized premium buttons (primary, secondary, etc.)
│   ├── Card.tsx         # Soft glassmorphic containers with hover states
│   ├── Navbar.tsx       # Responsive navigation header
│   └── Footer.tsx       # Standardized footers with hackathon badges
├── data/                # Static data models to keep files tidy
│   └── landingData.ts   # Navigation, features, and timeline configs
├── sections/            # Component-level landing page layout segments
│   ├── Hero.tsx         # Modern hero layout with dashboard code-mockup
│   ├── SolutionCards.tsx# Dual module cards (Student vs. Smart Campus)
│   ├── HowItWorks.tsx   # Connective 5-step flow roadmap
│   ├── StudentFeatures.tsx# 8 student feature preview grid + interactive simulator hook
│   └── CampusFeatures.tsx # 4 smart campus preview grid + face recognition camera mock
├── App.tsx              # Application layout controller and simulator states
├── index.css            # Tailwind CSS configuration and glassmorphic designs
└── main.tsx             # Root react app launcher
```

---

## 🚀 How to Run the Project

### Prerequisites
Make sure you have Node.js (v18+) and npm installed.

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
*Open [http://localhost:5173](http://localhost:5173) in your browser.*

### 3. Build for Production
```bash
npm run build
```

### 4. Run Linter Check
```bash
npm run lint
```

---

## 🌟 Milestone 2: Student DISHA Guidance Module (Completed)

We have built the student-facing guidance module as specified in Milestone 2. 

### Key Features Implemented:
1. **Student Dashboard (`/student/dashboard`)**:
   - Welcome greeting customized dynamically by time of day.
   - Quick search input "Ask DISHA anything..." which links directly to the AI Assistant.
   - Suggested prompts chips for fast navigation.
   - Summary cards displaying target goals, roadmap status, planner actions, and metrics.
2. **Student Profile (`/student/profile`)**:
   - Save and retrieve profile attributes: Name, Course, Branch, Semester, Skills, Interests, Career Goal, Available Study Hours, and Experience Level.
   - Saves persistent data directly to `localStorage`.
3. **DISHA AI Chat Assistant (`/student/disha-ai`)**:
   - Premium chat interface supporting message templates, markdown highlights, and quick questions.
   - Structured mock AI response system (`mockAiService.ts`) setup to be cleanly swappable with real LLM API pipelines later.
4. **Personalized Roadmap (`/student/roadmap`)**:
   - A step-by-step career timeline showing completed, active, and upcoming milestones.
   - Real-time progress bar computing milestones completed.
5. **Study Planner (`/student/study-planner`)**:
   - Daily task checklist showing priorities (High, Medium, Low) and categories.
   - Syncs checklist status to local storage.
   - Weekly goals grid tracking study metrics.
6. **Career Guidance (`/student/career`)**:
   - Expanding cards for 6 default tech careers (AI/ML, Web Dev, Cloud, Data Science, etc.).
   - Lists prerequisites, target paths, portfolio projects, and preparation guides.
7. **Project Guidance (`/student/projects`)**:
   - Hand-picked project recommendation deck filtered by difficulty and skill requirements.
8. **Progress Tracker (`/student/progress`)**:
   - Interactive SVG stats, study streak trackers, weekly hours distributions, and skills heatmaps.
9. **Responsive Sidebar Layout (`/student`)**:
   - Premium sidebar navigation on desktop transitioning to an intuitive bottom navigation layout on mobile.

---

## 🔮 Future Roadmap

* **Milestone 1 (Completed):** Establish modern, scalable React/Vite/Tailwind framework and build a premium landing page with interactive simulator previews.
* **Milestone 2 (Completed):** Complete the Student DISHA Guidance Module using local states, mocks, and full storage integrations.
* **Milestone 3 (Future):** Embed local face detection logic in the client utilizing TensorFlow.js or a Python FastAPI camera server.
