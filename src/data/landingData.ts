export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
}

export interface StepItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export const STUDENT_FEATURES: FeatureItem[] = [
  {
    id: 'ai-guidance',
    title: 'AI Guidance',
    description: 'Ask DISHA anything about your career path. Receive personalized, context-aware advice tailormade for your current skill level.',
    iconName: 'Sparkles',
    badge: 'Popular'
  },
  {
    id: 'career-roadmap',
    title: 'Career Roadmap',
    description: 'Generate step-by-step career path visuals. Understand exactly what skills, projects, and languages you need to master your goal.',
    iconName: 'Compass'
  },
  {
    id: 'study-planner',
    title: 'Study Planner',
    description: 'Intelligent AI planner that spaces out learning resources, tasks, and revisions based on your schedules and college exams.',
    iconName: 'Calendar'
  },
  {
    id: 'ai-quiz',
    title: 'AI Quiz & Feedback',
    description: 'Validate your understanding with dynamically generated quick assessments that identify your weaknesses and suggest recap notes.',
    iconName: 'GraduationCap'
  },
  {
    id: 'smart-notes',
    title: 'Smart Notes',
    description: 'Summarize lectures, clean up draft markdown notes, and generate quick cheat sheets or flashcards from your study materials.',
    iconName: 'FileText'
  },
  {
    id: 'project-guidance',
    title: 'Project Guidance',
    description: 'Get project ideas matched to your learning path. Includes structural breakdowns, feature roadmaps, and architectural suggestions.',
    iconName: 'Code'
  },
  {
    id: 'resume-guidance',
    title: 'Resume Analyzer',
    description: 'Compare your resume against your target job descriptions. Get AI feedback on gaps, formatting issues, and project descriptions.',
    iconName: 'UserCheck'
  },
  {
    id: 'progress-tracking',
    title: 'Progress Tracking',
    description: 'Track your milestones and visualize your growth with detailed metrics. See how close you are to landing your dream job.',
    iconName: 'TrendingUp'
  }
];

export const CAMPUS_FEATURES: FeatureItem[] = [
  {
    id: 'face-detection',
    title: 'AI Face Detection',
    description: 'Automated campus student identification and security check-ins using low-latency, privacy-first edge facial recognition model.',
    iconName: 'ScanFace',
    badge: 'AI Core'
  },
  {
    id: 'smart-attendance',
    title: 'Smart Attendance',
    description: 'Eliminate manual rosters. Auto-register student attendance via classroom scanners or geo-fenced campus entry points.',
    iconName: 'CheckSquare'
  },
  {
    id: 'student-analytics',
    title: 'Student Analytics',
    description: 'Comprehensive campus metrics. Identify at-risk students early, view academic statistics, and monitor overall engagement.',
    iconName: 'BarChart3'
  },
  {
    id: 'campus-assistant',
    title: 'Campus AI Assistant',
    description: 'A 24/7 smart assistant trained on campus regulations, schedules, and circulars to answer student questions in real-time.',
    iconName: 'MessageSquareText'
  }
];

export const HOW_IT_WORKS_STEPS: StepItem[] = [
  {
    number: '01',
    title: 'Understand',
    subtitle: 'Where you are',
    description: 'Input your current skills, background, projects, and target fields to establish a baseline profile.',
    iconName: 'UserRound'
  },
  {
    number: '02',
    title: 'Goal',
    subtitle: 'Define success',
    description: 'Choose your desired role (e.g., AI Researcher, Fullstack Lead) or define a custom dream career destination.',
    iconName: 'Target'
  },
  {
    number: '03',
    title: 'Roadmap',
    subtitle: 'Plan the path',
    description: 'DISHA maps out the exact tools, books, videos, and documentation needed to build your skills.',
    iconName: 'Map'
  },
  {
    number: '04',
    title: 'Action',
    subtitle: 'Build & Learn',
    description: 'Develop structured portfolio projects, read custom AI-curated guides, and write production-grade code.',
    iconName: 'Play'
  },
  {
    number: '05',
    title: 'Progress',
    subtitle: 'Track milestones',
    description: 'Take adaptive quizzes, run mock reviews, and watch your metrics climb as you prepare to land your role.',
    iconName: 'Award'
  }
];
