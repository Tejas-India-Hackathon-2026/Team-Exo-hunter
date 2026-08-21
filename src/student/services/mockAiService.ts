export interface AiMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// ── Gemini API Configuration ─────────────────────────────────────

// System instruction that shapes DISHA's personality and expertise
const DISHA_SYSTEM_PROMPT = `You are DISHA AI — an intelligent, friendly, and highly knowledgeable personal AI guidance assistant for students. Your full name stands for "Digital Intelligent Student Helper & Advisor".

Your core capabilities:
- Career path guidance and personalized roadmaps for students
- Study plan generation based on goals, semester, and interests
- Skill gap analysis and learning recommendations
- Project ideas matched to student's learning stage
- Resume, interview, and internship preparation tips
- General knowledge and academic subject help

Behavior guidelines:
- Be warm, encouraging, and motivational
- Use emojis sparingly but effectively (🎯 📚 💡 🛠️ 📊)
- Format responses with **bold headers** and bullet points for readability
- Keep responses concise but informative (under 300 words unless the topic needs depth)
- When a student asks something outside academics/career, still answer helpfully but gently steer back to their growth
- Always end with a follow-up question or suggestion to keep the conversation going
- If asked who made you, say you were built by Team Exo-Hunter for the Tejas India Hackathon 2026

You are speaking with a B.Tech Computer Science student interested in AI/ML and Fullstack Development.`;

// ── Intelligent Contextual Fallback Response Engine ───────────────────
function generateSmartFallback(prompt: string): string {
  const q = prompt.toLowerCase();

  if (q.includes('ai') || q.includes('ml') || q.includes('machine learning') || q.includes('deep learning')) {
    return `🎯 **AI/ML Engineer Career Roadmap & Guidance:**

To build a strong foundation in Artificial Intelligence & Machine Learning, here is your recommended path:

1. **Mathematics & Statistics (Weeks 1-3):**
   • Linear Algebra (Vectors, Matrices, Eigenvalues)
   • Probability & Statistics (Bayes Theorem, Distributions)
   • Multivariable Calculus (Gradients & Partial Derivatives)

2. **Core Programming & Tools (Weeks 4-6):**
   • Python mastery, NumPy, Pandas, Matplotlib, Seaborn
   • Jupyter Notebooks & Google Colab environments

3. **Machine Learning Algorithms (Weeks 7-10):**
   • Supervised: Linear/Logistic Regression, Decision Trees, Random Forests, XGBoost
   • Unsupervised: K-Means, PCA, Hierarchical Clustering
   • Scikit-Learn pipelines & model evaluation metrics (F1, ROC-AUC)

4. **Deep Learning & Frameworks (Weeks 11-14):**
   • Neural Networks (ANN, CNN, RNN/LSTM, Transformers)
   • PyTorch / TensorFlow & Hugging Face models

5. **Industry Projects (Weeks 15+):**
   • End-to-end RAG (Retrieval-Augmented Generation) pipeline
   • Real-time Face Recognition or Computer Vision dashboard
   • Fine-tuning Small Language Models (SLMs)

💡 *Tip: Check out the **Roadmap** and **Project Guidance** tabs in your student portal for step-by-step milestones!*`;
  }

  if (q.includes('fullstack') || q.includes('web') || q.includes('frontend') || q.includes('backend') || q.includes('react') || q.includes('node')) {
    return `🚀 **Fullstack Developer Learning Path:**

Here is a practical, industry-focused stack to master modern fullstack development:

1. **Frontend Core:**
   • HTML5, Modern CSS (TailwindCSS / Flexbox / Grid)
   • JavaScript (ES6+, Async/Await, Closures, DOM manipulation)
   • React 19 + TypeScript (Hooks, State Management, Router)

2. **Backend & APIs:**
   • Node.js & Express.js / Python FastAPI
   • RESTful API architecture, Authentication (JWT, OAuth2)
   • Middleware, CORS, and rate limiting

3. **Databases:**
   • Relational: PostgreSQL / MySQL
   • NoSQL: MongoDB / Redis (Caching)
   • ORMs: Prisma / Drizzle ORM / Mongoose

4. **DevOps & Deployment:**
   • Git/GitHub workflows, CI/CD with GitHub Actions
   • Docker containerization & cloud hosting (Vercel, Render, AWS)

🛠️ *Suggested Project: Build an AI-assisted Student Portal with real-time analytics and authentication.*`;
  }

  if (q.includes('dsa') || q.includes('algorithm') || q.includes('data structure') || q.includes('leetcode') || q.includes('coding interview')) {
    return `🧠 **DSA & Coding Interview Strategy:**

A proven step-by-step schedule to master Data Structures & Algorithms:

1. **Foundations (Weeks 1-2):**
   • Time & Space Complexity (Big-O notation)
   • Arrays, Strings, Two Pointers & Sliding Window techniques

2. **Core Linear Structures (Weeks 3-4):**
   • Linked Lists (Reversal, Fast-Slow pointers)
   • Stacks & Queues (Monotonic stack, BFS/DFS queues)

3. **Non-Linear Structures (Weeks 5-7):**
   • Trees & Binary Search Trees (Traversals, Lowest Common Ancestor)
   • Graphs (BFS, DFS, Dijkstra's algorithm, Topological Sort)

4. **Advanced Problem Solving (Weeks 8-10):**
   • Recursion & Backtracking
   • Dynamic Programming (1D, 2D, Knapsack patterns)

💡 **Daily Habit:** Solve 2-3 LeetCode problems daily (1 Easy + 1 Medium) and track your streak in the **Progress** tab!`;
  }

  if (q.includes('resume') || q.includes('interview') || q.includes('placement') || q.includes('job') || q.includes('internship')) {
    return `📄 **High-Impact Resume & Interview Tips:**

1. **Resume Structure (1 Page Rule):**
   • **Header:** Clean contact info, GitHub, LinkedIn, and Portfolio link
   • **Projects:** 2-3 impactful projects with live demo links and bullet points using the **XYZ formula** (*Accomplished [X], as measured by [Y], by doing [Z]*)
   • **Skills:** Categorized into Languages, Frameworks, Developer Tools, Databases
   • **Education:** Degree, Branch, CGPA (if > 7.5), Graduation Year

2. **Interview Preparation Checklist:**
   • Master your introduction (Elevator Pitch: 90 seconds)
   • Be ready to explain architecture decisions in your projects
   • Prepare for behavioral rounds using the **STAR method** (Situation, Task, Action, Result)

🎯 *Would you like me to analyze a specific project description for your resume?*`;
  }

  if (q.includes('study') || q.includes('schedule') || q.includes('plan') || q.includes('exam') || q.includes('time table')) {
    return `📅 **Personalized Daily Study Framework:**

For consistent daily progress, follow this structured routine:

• **Session 1 (Morning - 90 mins):** Deep Focus — Core theory & hard concepts (DSA or Architecture)
• **Session 2 (Afternoon - 60 mins):** Hands-on Coding — Implement a feature or solve 2 problems
• **Session 3 (Evening - 45 mins):** Project Development & Git commits
• **Session 4 (Night - 30 mins):** Review flashcards & revise today's key takeaways

💡 *Tip: Open the **Study Planner** tab in your DISHA portal to check off your daily tasks and track your weekly goals!*`;
  }

  if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('who are you') || q.includes('disha')) {
    return `👋 **Hello! I am DISHA AI** (Digital Intelligent Student Helper & Advisor).

I was created by **Team Exo-Hunter** to guide students in:
• 🎯 Choosing and mastering clear career roadmaps
• 📚 Crafting personalized daily study plans
• 💡 Practicing DSA, AI, and Fullstack technologies
• 📄 Preparing competitive resumes and cracking technical interviews

How can I help you accelerate your learning today?`;
  }

  return `💡 **DISHA AI Guidance on "${prompt}":**

Here are actionable steps and best practices to help you succeed:

1. **Clarify the Core Concept:**
   • Break the topic down into foundational building blocks.
   • Identify prerequisite skills and key documentation to read.

2. **Hands-On Application:**
   • Theory is only 30% of the journey — build a small working prototype.
   • Write clean, modular code with descriptive comments.

3. **Validate & Test:**
   • Test edge cases and run quick self-assessments.
   • Track your learning milestones in your DISHA Student Dashboard.

🎯 *Let me know if you would like a detailed roadmap, project recommendations, or a daily task plan for this topic!*`;
}

export async function getAiResponse(
  userMessage: string, 
  customApiKey?: string, 
  history: Array<{ role: 'user' | 'assistant'; content: string }> = []
): Promise<string> {
  const trimmed = userMessage.trim();
  if (!trimmed) return "Please ask a question to get guidance.";

  // If no API key is provided, use our intelligent contextual fallback
  if (!customApiKey || !customApiKey.trim()) {
    return generateSmartFallback(trimmed);
  }

  // Sanitize and ensure strict alternating user/model history for Gemini API
  const sanitizedContents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

  for (const m of history) {
    if (!m.content || m.content === 'KEY_NOT_CONFIGURED') continue;
    const role: 'user' | 'model' = m.role === 'user' ? 'user' : 'model';

    // Gemini requires alternating roles. If consecutive same roles occur, combine their text.
    if (sanitizedContents.length > 0 && sanitizedContents[sanitizedContents.length - 1].role === role) {
      sanitizedContents[sanitizedContents.length - 1].parts[0].text += `\n\n${m.content}`;
    } else {
      sanitizedContents.push({
        role,
        parts: [{ text: m.content }],
      });
    }
  }

  // Ensure first message is user role (if history started with assistant welcome message)
  if (sanitizedContents.length > 0 && sanitizedContents[0].role === 'model') {
    sanitizedContents.shift();
  }

  // Add the current user prompt
  if (sanitizedContents.length > 0 && sanitizedContents[sanitizedContents.length - 1].role === 'user') {
    sanitizedContents[sanitizedContents.length - 1].parts[0].text += `\n\n${trimmed}`;
  } else {
    sanitizedContents.push({
      role: 'user',
      parts: [{ text: trimmed }],
    });
  }

  // Keep last 10 turns to avoid token limits
  const contents = sanitizedContents.slice(-10);

  const apiKey = customApiKey.trim();
  const models = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-2.0-flash-lite'];
  let response: Response | null = null;
  let lastErrorStatus = 200;
  let lastErrorBody = '';

  for (const model of models) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: DISHA_SYSTEM_PROMPT }],
          },
          contents: contents,
          generationConfig: {
            temperature: 0.7,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 1024,
          },
        }),
      });

      if (response.ok) {
        break;
      } else {
        lastErrorStatus = response.status;
        lastErrorBody = await response.text();
        console.warn(`Model ${model} returned status ${response.status}`);
      }
    } catch (e) {
      console.warn(`Network error with model ${model}:`, e);
    }
  }

  // If API succeeds, return candidate text
  if (response && response.ok) {
    try {
      const data = await response.json();
      const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (aiText && aiText.trim()) {
        return aiText;
      }
    } catch (err) {
      console.error('Error parsing Gemini JSON response:', err);
    }
  }

  // If API failed due to invalid key, quota, or network, seamlessly use smart fallback
  console.warn('Gemini API request failed. Falling back to intelligent response engine. Status:', lastErrorStatus, lastErrorBody);
  return generateSmartFallback(trimmed);
}

/**
 * Generate a unique message ID
 */
export function generateMessageId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export async function generateDynamicRoadmap(
  careerGoal: string,
  currentSkills: string[],
  customApiKey?: string
): Promise<any[]> {
  if (!customApiKey) {
    return [
      { id: 1, title: 'Current Level Assessment', description: 'Understand your baseline skills and knowledge gaps', status: 'completed', skills: ['Self Assessment', 'Profile Setup'] },
      { id: 2, title: 'Programming Fundamentals', description: `Master core programming and structures for ${careerGoal}`, status: 'completed', skills: currentSkills.slice(0, 3) },
      { id: 3, title: 'Data Structures & Algorithms', description: 'Arrays, Trees, Graphs, Sorting, and Dynamic Programming', status: 'completed', skills: ['DSA', 'Problem Solving'] },
      { id: 4, title: 'Specialized Foundations', description: `Deep dive into key concepts required for ${careerGoal}`, status: 'current', skills: ['Core Theory', 'Math Foundations'] },
      { id: 5, title: 'Advanced Frameworks & Libraries', description: 'Hands-on practice with industry-standard packages', status: 'upcoming', skills: ['Frameworks', 'Practical Labs'] },
      { id: 6, title: 'System Architecture', description: `Design and optimize scalable systems for ${careerGoal}`, status: 'upcoming', skills: ['Architecture', 'Best Practices'] },
      { id: 7, title: 'Projects & Portfolio', description: 'Build 3-5 real-world projects for your portfolio', status: 'upcoming', skills: ['Portfolio', 'GitHub'] },
      { id: 8, title: 'Internship Preparation', description: 'Resume, mock interviews, and coding rounds', status: 'upcoming', skills: ['Resume', 'Interview Prep'] },
      { id: 9, title: 'Ready for Role', description: `Apply and land your dream ${careerGoal} position`, status: 'upcoming', skills: ['Career Ready'] },
    ];
  }

  const prompt = `Generate a customized 9-step learning roadmap for a student targeting the career goal: "${careerGoal}".
The student currently has these skills: ${JSON.stringify(currentSkills)}.
Return the roadmap as a JSON array of 9 steps. Each step must have exactly this JSON format:
{
  "id": number,
  "title": "Step Title",
  "description": "Short description of what the student should learn in this step.",
  "status": "completed" | "current" | "upcoming",
  "skills": ["Skill1", "Skill2"]
}
Set the first 3 steps status as "completed", step 4 status as "current", and the remaining 5 steps as "upcoming".
Return ONLY the raw JSON array, without any markdown formatting or backticks.`;

  const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
  let response: Response | null = null;

  for (const model of models) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${customApiKey}`;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' }
        })
      });
      if (response.ok) break;
    } catch (e) {
      console.warn(`Roadmap connect failed for ${model}:`, e);
    }
  }

  try {
    if (!response || !response.ok) throw new Error('All models failed');
    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return JSON.parse(text);
  } catch (error) {
    console.error('Roadmap generation error, using fallback:', error);
    return [
      { id: 1, title: 'Current Level Assessment', description: 'Understand your baseline skills and knowledge gaps', status: 'completed', skills: ['Self Assessment', 'Profile Setup'] },
      { id: 2, title: 'Programming Fundamentals', description: `Master core programming and structures for ${careerGoal}`, status: 'completed', skills: currentSkills.slice(0, 3) },
      { id: 3, title: 'Data Structures & Algorithms', description: 'Arrays, Trees, Graphs, Sorting, and Dynamic Programming', status: 'completed', skills: ['DSA', 'Problem Solving'] },
      { id: 4, title: 'Specialized Foundations', description: `Deep dive into key concepts required for ${careerGoal}`, status: 'current', skills: ['Core Theory', 'Math Foundations'] },
      { id: 5, title: 'Advanced Frameworks & Libraries', description: 'Hands-on practice with industry-standard packages', status: 'upcoming', skills: ['Frameworks', 'Practical Labs'] },
      { id: 6, title: 'System Architecture', description: `Design and optimize scalable systems for ${careerGoal}`, status: 'upcoming', skills: ['Architecture', 'Best Practices'] },
      { id: 7, title: 'Projects & Portfolio', description: 'Build 3-5 real-world projects for your portfolio', status: 'upcoming', skills: ['Portfolio', 'GitHub'] },
      { id: 8, title: 'Internship Preparation', description: 'Resume, mock interviews, and coding rounds', status: 'upcoming', skills: ['Resume', 'Interview Prep'] },
      { id: 9, title: 'Ready for Role', description: `Apply and land your dream ${careerGoal} position`, status: 'upcoming', skills: ['Career Ready'] },
    ];
  }
}

export async function generateDynamicStudyPlan(
  careerGoal: string,
  studyHours: number,
  customApiKey?: string
): Promise<any[]> {
  if (!customApiKey) {
    return [
      { id: 't1', title: `Study ${careerGoal} core theory chapter 1`, priority: 'high', completed: false, category: 'Theory' },
      { id: 't2', title: 'Solve 3 DSA problems on LeetCode', priority: 'high', completed: false, category: 'Practice' },
      { id: 't3', title: 'Watch tutorial on advanced frameworks', priority: 'medium', completed: true, category: 'Frameworks' },
      { id: 't4', title: 'Build a small prototype project component', priority: 'medium', completed: false, category: 'Projects' },
      { id: 't5', title: 'Push updated project code to GitHub', priority: 'low', completed: true, category: 'Projects' },
      { id: 't6', title: 'Review study notes and summarize key concepts', priority: 'medium', completed: false, category: 'Review' },
    ];
  }

  const prompt = `Generate a customized list of 6 study tasks for a student targeting "${careerGoal}" with ${studyHours} hours of daily study.
  Return the tasks as a JSON array of 6 objects. Each object must have exactly this JSON format:
  {
    "id": "t1",
    "title": "Task Description",
    "priority": "high" | "medium" | "low",
    "completed": boolean,
    "category": "Practice" | "Theory" | "Projects" | "Review"
  }
  Return ONLY the raw JSON array, without any markdown formatting or backticks.`;

  const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
  let response: Response | null = null;

  for (const model of models) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${customApiKey}`;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' }
        })
      });
      if (response.ok) break;
    } catch (e) {
      console.warn(`Study plan connect failed for ${model}:`, e);
    }
  }

  try {
    if (!response || !response.ok) throw new Error('All models failed');
    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return JSON.parse(text);
  } catch (error) {
    console.error('Study plan generation error, using fallback:', error);
    return [
      { id: 't1', title: `Study ${careerGoal} core theory chapter 1`, priority: 'high', completed: false, category: 'Theory' },
      { id: 't2', title: 'Solve 3 DSA problems on LeetCode', priority: 'high', completed: false, category: 'Practice' },
      { id: 't3', title: 'Watch tutorial on advanced frameworks', priority: 'medium', completed: true, category: 'Frameworks' },
      { id: 't4', title: 'Build a small prototype project component', priority: 'medium', completed: false, category: 'Projects' },
      { id: 't5', title: 'Push updated project code to GitHub', priority: 'low', completed: true, category: 'Projects' },
      { id: 't6', title: 'Review study notes and summarize key concepts', priority: 'medium', completed: false, category: 'Review' },
    ];
  }
}
