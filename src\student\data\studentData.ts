export interface StudentProfileData {
  name: string;
  course: string;
  branch: string;
  semester: string;
  skills: string[];
  interests: string[];
  careerGoal: string;
  studyHours: number;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
}

export const DEFAULT_PROFILE: StudentProfileData = {
  name: 'Arjun Sharma',
  course: 'B.Tech',
  branch: 'Computer Science & Engineering',
  semester: '5th Semester',
  skills: ['Python', 'JavaScript', 'HTML/CSS', 'React', 'SQL'],
  interests: ['Artificial Intelligence', 'Web Development', 'Data Science'],
  careerGoal: 'AI/ML Engineer',
  studyHours: 4,
  experienceLevel: 'intermediate',
};

// --- Roadmap Types & Data ---
export type RoadmapStatus = 'completed' | 'current' | 'upcoming';

export interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  status: RoadmapStatus;
  skills: string[];
}

export const ROADMAP_STEPS: RoadmapStep[] = [
  { id: 1, title: 'Current Level Assessment', description: 'Understand your baseline skills and knowledge gaps', status: 'completed', skills: ['Self Assessment', 'Profile Setup'] },
  { id: 2, title: 'Programming Fundamentals', description: 'Master Python, data types, control flow, and OOP', status: 'completed', skills: ['Python', 'OOP', 'Git'] },
  { id: 3, title: 'Data Structures & Algorithms', description: 'Arrays, Trees, Graphs, Sorting, and Dynamic Programming', status: 'completed', skills: ['DSA', 'Problem Solving'] },
  { id: 4, title: 'Mathematics for AI', description: 'Linear Algebra, Probability, Statistics, and Calculus', status: 'current', skills: ['Linear Algebra', 'Probability', 'Statistics'] },
  { id: 5, title: 'Machine Learning', description: 'Supervised, Unsupervised learning, Scikit-learn, Feature Engineering', status: 'upcoming', skills: ['Scikit-learn', 'Pandas', 'NumPy'] },
  { id: 6, title: 'Deep Learning', description: 'Neural Networks, CNNs, RNNs, Transformers with PyTorch', status: 'upcoming', skills: ['PyTorch', 'TensorFlow', 'Neural Networks'] },
  { id: 7, title: 'Projects & Portfolio', description: 'Build 3-5 real-world AI projects for your portfolio', status: 'upcoming', skills: ['Portfolio', 'GitHub', 'Documentation'] },
  { id: 8, title: 'Internship Preparation', description: 'Resume, interviews, coding rounds, and system design', status: 'upcoming', skills: ['Resume', 'Interview Prep', 'System Design'] },
  { id: 9, title: 'AI Engineer Role', description: 'Land your dream AI/ML Engineer position', status: 'upcoming', skills: ['Career Ready'] },
];

// --- Study Planner Types & Data ---
export type TaskPriority = 'high' | 'medium' | 'low';

export interface StudyTask {
  id: string;
  title: string;
  priority: TaskPriority;
  completed: boolean;
  category: string;
}

export interface WeeklyGoal {
  id: string;
  title: string;
  target: number;
  current: number;
}

export const DEFAULT_TASKS: StudyTask[] = [
  { id: 't1', title: 'Complete Linear Algebra Chapter 4 — Eigenvalues', priority: 'high', completed: false, category: 'Mathematics' },
  { id: 't2', title: 'Solve 5 DSA problems on LeetCode', priority: 'high', completed: false, category: 'Practice' },
  { id: 't3', title: 'Watch Stanford CS229 Lecture 7', priority: 'medium', completed: true, category: 'ML Theory' },
  { id: 't4', title: 'Read research paper on Attention Mechanism', priority: 'medium', completed: false, category: 'Deep Learning' },
  { id: 't5', title: 'Push updated portfolio project to GitHub', priority: 'low', completed: true, category: 'Projects' },
  { id: 't6', title: 'Review Probability distributions notes', priority: 'medium', completed: false, category: 'Mathematics' },
  { id: 't7', title: 'Practice Python pandas data manipulation', priority: 'high', completed: false, category: 'Practice' },
  { id: 't8', title: 'Write blog post on gradient descent', priority: 'low', completed: false, category: 'Writing' },
];

export const DEFAULT_WEEKLY_GOALS: WeeklyGoal[] = [
  { id: 'wg1', title: 'Study Hours', target: 28, current: 16 },
  { id: 'wg2', title: 'Problems Solved', target: 20, current: 12 },
  { id: 'wg3', title: 'Chapters Read', target: 5, current: 3 },
  { id: 'wg4', title: 'Projects Worked', target: 2, current: 1 },
];

// --- Career Guidance Data ---
export interface CareerOption {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  requiredSkills: string[];
  learningPath: string[];
  projects: string[];
  internshipPrep: string[];
  interviewPrep: string[];
}

export const CAREER_OPTIONS: CareerOption[] = [
  {
    id: 'ai-ml',
    title: 'AI/ML Engineer',
    icon: 'Brain',
    color: 'indigo',
    description: 'Design and deploy machine learning models and AI systems that solve real-world problems.',
    requiredSkills: ['Python', 'PyTorch/TensorFlow', 'Mathematics', 'Statistics', 'Data Processing', 'MLOps'],
    learningPath: ['Python Mastery', 'Mathematics (LA, Prob, Stats)', 'ML Fundamentals', 'Deep Learning', 'NLP/CV Specialization', 'MLOps & Deployment'],
    projects: ['Image Classifier', 'Sentiment Analyzer', 'Recommendation Engine', 'Chatbot with RAG'],
    internshipPrep: ['Build GitHub portfolio', 'Contribute to open-source ML', 'Kaggle competitions', 'Research paper reading'],
    interviewPrep: ['ML theory fundamentals', 'Coding rounds (DSA)', 'System design for ML', 'Case studies'],
  },
  {
    id: 'sde',
    title: 'Software Developer',
    icon: 'Code',
    color: 'emerald',
    description: 'Build scalable software applications across the full technology stack.',
    requiredSkills: ['DSA', 'System Design', 'JavaScript/TypeScript', 'React/Node.js', 'SQL/NoSQL', 'Git/CI-CD'],
    learningPath: ['Programming Fundamentals', 'DSA Mastery', 'Web Development', 'Backend & APIs', 'System Design', 'DevOps Basics'],
    projects: ['Full-stack Web App', 'REST API Server', 'Real-time Chat App', 'E-commerce Platform'],
    internshipPrep: ['LeetCode 300+ problems', 'Open-source contributions', 'Build 3+ projects', 'Technical blog'],
    interviewPrep: ['DSA problem solving', 'System design', 'OOP concepts', 'Behavioral questions'],
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    icon: 'BarChart3',
    color: 'violet',
    description: 'Extract insights from data using statistics, ML, and visualization techniques.',
    requiredSkills: ['Python/R', 'Statistics', 'SQL', 'Tableau/PowerBI', 'Scikit-learn', 'Communication'],
    learningPath: ['Statistics & Probability', 'Python for Data Science', 'SQL & Databases', 'ML Algorithms', 'Data Visualization', 'Business Analytics'],
    projects: ['EDA on Real Dataset', 'Predictive Model', 'Dashboard Creation', 'A/B Testing Analysis'],
    internshipPrep: ['Kaggle profile', 'Data storytelling', 'Business case studies', 'Portfolio website'],
    interviewPrep: ['Statistics questions', 'SQL queries', 'ML concepts', 'Case study presentations'],
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    icon: 'PieChart',
    color: 'amber',
    description: 'Analyze and interpret complex datasets to help organizations make data-driven decisions.',
    requiredSkills: ['Excel', 'SQL', 'Python/R', 'Tableau/PowerBI', 'Statistics', 'Communication'],
    learningPath: ['Excel Advanced', 'SQL Mastery', 'Python Basics', 'Data Visualization', 'Statistics', 'Business Intelligence'],
    projects: ['Sales Dashboard', 'Customer Segmentation', 'Survey Analysis', 'Financial Report Automation'],
    internshipPrep: ['Build Tableau portfolio', 'Practice SQL challenges', 'Case study practice', 'Certification courses'],
    interviewPrep: ['SQL scenarios', 'Excel functions', 'Data interpretation', 'Presentation skills'],
  },
  {
    id: 'cloud',
    title: 'Cloud Engineer',
    icon: 'Cloud',
    color: 'sky',
    description: 'Design, deploy, and manage cloud infrastructure and services at scale.',
    requiredSkills: ['AWS/Azure/GCP', 'Linux', 'Docker/Kubernetes', 'Terraform', 'Networking', 'CI/CD'],
    learningPath: ['Linux Fundamentals', 'Networking Basics', 'Cloud Platform (AWS/Azure)', 'Containers & K8s', 'IaC with Terraform', 'Security & Monitoring'],
    projects: ['Cloud-hosted Web App', 'CI/CD Pipeline', 'Serverless API', 'Multi-region Architecture'],
    internshipPrep: ['AWS/Azure certification', 'Hands-on labs', 'Personal cloud projects', 'Tech community participation'],
    interviewPrep: ['Cloud architecture', 'Networking concepts', 'Security best practices', 'Troubleshooting scenarios'],
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Engineer',
    icon: 'Shield',
    color: 'rose',
    description: 'Protect systems and networks from cyber threats through security analysis and implementation.',
    requiredSkills: ['Networking', 'Linux', 'Security Tools', 'Python Scripting', 'Cryptography', 'Compliance'],
    learningPath: ['Networking & Protocols', 'Linux Administration', 'Security Fundamentals', 'Ethical Hacking', 'Incident Response', 'Compliance & Governance'],
    projects: ['Vulnerability Scanner', 'Network Monitor', 'Encrypted Chat App', 'Security Audit Report'],
    internshipPrep: ['CEH/CompTIA prep', 'CTF competitions', 'Bug bounty programs', 'Security blog writing'],
    interviewPrep: ['Security concepts', 'Network protocols', 'Incident response scenarios', 'Cryptography basics'],
  },
];

// --- Project Guidance Data ---
export interface ProjectRecommendation {
  id: string;
  name: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  technologies: string[];
  skills: string[];
  description: string;
}

export const PROJECT_RECOMMENDATIONS: ProjectRecommendation[] = [
  {
    id: 'p1',
    name: 'Student Performance Predictor',
    difficulty: 'Intermediate',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Flask'],
    skills: ['Machine Learning', 'Data Analysis', 'API Development'],
    description: 'Build a machine learning model that predicts student academic performance based on study habits, attendance, and demographics. Deploy as a web API.',
  },
  {
    id: 'p2',
    name: 'AI Resume Analyzer',
    difficulty: 'Intermediate',
    technologies: ['Python', 'NLP', 'React', 'FastAPI'],
    skills: ['Natural Language Processing', 'Full-stack', 'UI Design'],
    description: 'Create a tool that analyzes resumes against job descriptions using NLP. Provides match scores, missing skills, and improvement suggestions.',
  },
  {
    id: 'p3',
    name: 'College Attendance Analytics',
    difficulty: 'Beginner',
    technologies: ['React', 'Chart.js', 'Node.js', 'MongoDB'],
    skills: ['Web Development', 'Data Visualization', 'Database'],
    description: 'Build a dashboard that visualizes attendance patterns across departments. Identify at-risk students with low attendance trends.',
  },
  {
    id: 'p4',
    name: 'Campus AI Assistant',
    difficulty: 'Advanced',
    technologies: ['Python', 'LangChain', 'React', 'Vector DB'],
    skills: ['LLM Integration', 'RAG Pipeline', 'Full-stack'],
    description: 'Create an AI chatbot trained on campus rules, syllabus, and circulars using RAG (Retrieval-Augmented Generation). Students can ask questions in natural language.',
  },
  {
    id: 'p5',
    name: 'Face Recognition Attendance System',
    difficulty: 'Advanced',
    technologies: ['Python', 'OpenCV', 'TensorFlow', 'Flask'],
    skills: ['Computer Vision', 'Deep Learning', 'Edge AI'],
    description: 'Build a real-time face recognition system for automated classroom attendance. Uses webcam feed with local face detection and matching.',
  },
];

// --- Progress Data ---
export interface ProgressData {
  overallProgress: number;
  roadmapProgress: number;
  skillsLearned: number;
  totalSkills: number;
  projectsCompleted: number;
  totalProjects: number;
  quizScore: number;
  studyStreak: number;
  weeklyStudyHours: number[];
  skillsBreakdown: { name: string; level: number }[];
}

export const DEFAULT_PROGRESS: ProgressData = {
  overallProgress: 38,
  roadmapProgress: 33,
  skillsLearned: 8,
  totalSkills: 22,
  projectsCompleted: 2,
  totalProjects: 5,
  quizScore: 76,
  studyStreak: 12,
  weeklyStudyHours: [3, 4, 5, 2, 6, 4, 3],
  skillsBreakdown: [
    { name: 'Python', level: 75 },
    { name: 'JavaScript', level: 65 },
    { name: 'React', level: 60 },
    { name: 'SQL', level: 55 },
    { name: 'Machine Learning', level: 30 },
    { name: 'Deep Learning', level: 15 },
    { name: 'Statistics', level: 45 },
    { name: 'Git', level: 70 },
  ],
};

// --- Suggested Prompts for Dashboard ---
export const SUGGESTED_PROMPTS = [
  'How can I become an AI Engineer?',
  'Create my exam study plan',
  'What skills should I learn?',
  'Suggest a project for me',
  'What career is suitable for me?',
];
