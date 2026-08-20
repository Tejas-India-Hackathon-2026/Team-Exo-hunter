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

export interface CareerTrack {
  id: string;
  title: string;
  badge: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  steps: string[];
  recommendedProjects: string[];
  keyTools: string[];
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
    iconName: 'GraduationCap',
    badge: 'Interactive'
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

export const CAREER_TRACKS: Record<string, CareerTrack> = {
  fullstack: {
    id: 'fullstack',
    title: 'Fullstack Web Engineer',
    badge: 'High Demand',
    duration: '16 Weeks',
    difficulty: 'Intermediate',
    steps: [
      'Master modern CSS with Tailwind CSS v4 & responsive UI layouts.',
      'Learn React 19 hooks, state context, and concurrent component design patterns.',
      'Build a robust REST & GraphQL backend with Node.js, Express, and PostgreSQL.',
      'Configure CI/CD deployment pipelines using GitHub Actions & Docker containers.'
    ],
    recommendedProjects: [
      'DISHA AI Student Portfolio & Roadmap Hub',
      'Real-time Collaborative Whiteboard & Chat Engine',
      'Campus E-Commerce & Event Ticketing Platform'
    ],
    keyTools: ['React 19', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Docker', 'Vite']
  },
  ai: {
    id: 'ai',
    title: 'AI & Machine Learning Specialist',
    badge: 'Core AI',
    duration: '20 Weeks',
    difficulty: 'Advanced',
    steps: [
      'Review Linear Algebra, Multivariate Calculus, Probability, and Python NumPy/Pandas.',
      'Understand Supervised & Unsupervised Learning; train regression and classification models.',
      'Dive into PyTorch fundamentals, custom Neural Networks, and CNN/Transformer architectures.',
      'Build Retrieval-Augmented Generation (RAG) pipelines and fine-tune open SLMs.'
    ],
    recommendedProjects: [
      'Edge Camera Student Facial Recognition Attendance Pipeline',
      'Context-Aware AI Career Advisory Chatbot using RAG',
      'Adaptive Knowledge Gap Diagnostic Model'
    ],
    keyTools: ['Python', 'PyTorch', 'FastAPI', 'OpenCV', 'LangChain', 'ChromaDB']
  },
  devops: {
    id: 'devops',
    title: 'DevOps & Cloud Architect',
    badge: 'Infrastructure',
    duration: '14 Weeks',
    difficulty: 'Advanced',
    steps: [
      'Master Linux server administration, Bash scripting, and networking fundamentals.',
      'Containerize distributed applications using Docker and compose multi-service stacks.',
      'Orchestrate workloads with Kubernetes, Helm charts, and ingress controllers.',
      'Implement Infrastructure-as-Code (Terraform) and automated CI/CD security scanning.'
    ],
    recommendedProjects: [
      'Zero-Downtime Microservices Cluster on AWS EKS',
      'Automated Security & Linting Pipeline for Open Source Repos',
      'Centralized Prometheus & Grafana Monitoring Dashboard'
    ],
    keyTools: ['Linux', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'AWS']
  },
  uiux: {
    id: 'uiux',
    title: 'UI/UX Product Designer',
    badge: 'Design Lead',
    duration: '12 Weeks',
    difficulty: 'Beginner',
    steps: [
      'Learn user-centered design principles, typography hierarchies, and contrast standards.',
      'Master Figma component libraries, auto-layout, design tokens, and interactive variants.',
      'Design high-fidelity wireframes, mobile-first responsive prototypes, and micro-interactions.',
      'Conduct usability testing interviews and build a live design system showcase.'
    ],
    recommendedProjects: [
      'DISHA AI Student Companion Mobile App UI',
      'Smart Campus Interactive Security HUD Design System',
      'Gamified Student Learning & Quiz Interface'
    ],
    keyTools: ['Figma', 'FigJam', 'Design Tokens', 'Tailwind', 'Prototyping', 'Storybook']
  }
};

export const QUIZ_SAMPLES = [
  {
    id: 'q1',
    topic: 'React 19 Hooks',
    question: 'Which React hook is optimal for managing complex interdependent state transitions?',
    options: ['useState', 'useReducer', 'useEffect', 'useMemo'],
    correct: 1,
    explanation: 'useReducer is best suited for complex state logic involving multiple sub-values.'
  },
  {
    id: 'q2',
    topic: 'Edge AI & Facial Detection',
    question: 'What technique allows low-latency face recognition directly in client browser devices?',
    options: ['Cloud Batch Processing', 'TensorFlow.js WebGL Acceleration', 'Server Polling', 'JSON RPC'],
    correct: 1,
    explanation: 'TensorFlow.js leverages client GPU WebGL acceleration for real-time edge face detection.'
  },
  {
    id: 'q3',
    topic: 'Modern CSS Frameworks',
    question: 'What is the primary benefit of Tailwind CSS v4 native Vite integration?',
    options: ['Heavier CSS bundles', 'Lightning fast Rust-based CSS engine without PostCSS overhead', 'Only supports inline styles', 'Requires slow webpack compilers'],
    correct: 1,
    explanation: 'Tailwind CSS v4 introduces a high-performance engine natively integrated into Vite.'
  }
];
