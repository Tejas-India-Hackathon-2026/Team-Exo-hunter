export interface AiMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export async function getAiResponse(userMessage: string): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

  const msg = userMessage.toLowerCase();

  // Pattern-matching mock responses
  if (msg.includes('ai engineer') || msg.includes('artificial intelligence')) {
    return `Great question! To become an AI Engineer, here's a structured path:

**1. Foundation (Months 1-3)**
• Master Python programming and data structures
• Learn Linear Algebra, Probability & Statistics

**2. Core ML (Months 3-6)**
• Study supervised & unsupervised learning with Scikit-learn
• Practice on Kaggle datasets and competitions

**3. Deep Learning (Months 6-9)**
• Learn PyTorch or TensorFlow
• Build projects: image classifiers, NLP models

**4. Specialization (Months 9-12)**
• Choose: NLP, Computer Vision, or Reinforcement Learning
• Build a portfolio with 3-5 real-world projects

**5. Career Prep**
• Contribute to open-source AI projects
• Prepare for ML system design interviews

Would you like me to create a detailed study plan for any of these phases?`;
  }

  if (msg.includes('study plan') || msg.includes('exam')) {
    return `Here's a personalized study plan based on your profile:

📅 **Weekly Study Plan**

**Monday - Wednesday: Core Subjects**
• 2 hrs: Mathematics (Linear Algebra focus)
• 1 hr: DSA practice (2-3 LeetCode problems)
• 1 hr: Theory revision

**Thursday - Friday: Practical Skills**
• 2 hrs: ML/Python hands-on coding
• 1 hr: Project work
• 1 hr: Research paper reading

**Saturday: Projects & Practice**
• 3 hrs: Portfolio project development
• 1 hr: Code review and documentation

**Sunday: Review & Rest**
• 1 hr: Week summary & next week planning
• Rest and recharge!

💡 **Tip:** Focus on understanding over memorization. Build something with every concept you learn.`;
  }

  if (msg.includes('skill') || msg.includes('learn')) {
    return `Based on your current profile as a CSE student targeting AI/ML, here are the skills you should prioritize:

🔴 **High Priority (Learn Now)**
• Mathematics: Linear Algebra, Probability, Calculus
• Python advanced: NumPy, Pandas, Matplotlib
• Machine Learning fundamentals

🟡 **Medium Priority (Next Quarter)**
• Deep Learning with PyTorch
• Natural Language Processing basics
• SQL & data engineering

🟢 **Good to Have (Build Over Time)**
• Cloud deployment (AWS/GCP)
• Docker & containerization
• MLOps fundamentals

📊 **Your Current Skill Gaps:**
You have a strong web dev foundation. Focus on strengthening your math and ML theory to bridge the gap to AI engineering.`;
  }

  if (msg.includes('project')) {
    return `Here are some project recommendations matched to your learning stage:

🟢 **Beginner-Friendly (Start Here)**
1. **Student Performance Predictor** — Use classification to predict grades based on study patterns
2. **Sentiment Analyzer** — Analyze product reviews using NLP

🟡 **Intermediate (Build Next)**
3. **AI Resume Analyzer** — Match resumes to job descriptions using NLP
4. **Attendance Analytics Dashboard** — Visualize campus data

🔴 **Advanced (Challenge Yourself)**
5. **Campus AI Assistant** — RAG-based chatbot trained on college data
6. **Face Recognition System** — Real-time face detection for attendance

💡 **Tip:** Start with project #1, document it well on GitHub, and write a blog post about your approach. This builds your portfolio significantly!`;
  }

  if (msg.includes('career') || msg.includes('suitable')) {
    return `Based on your profile analysis, here are your top career matches:

🥇 **AI/ML Engineer** — 92% match
Your programming skills + interest in AI make this an excellent fit. Focus on mathematics and ML theory.

🥈 **Data Scientist** — 85% match
Strong Python + SQL foundation. Build statistics and visualization skills.

🥉 **Software Developer** — 80% match
You already have web dev skills. Strengthen DSA and system design.

📊 **Why AI/ML Engineer is #1 for you:**
• You have Python proficiency ✅
• You're interested in AI ✅
• Your semester allows time for deep learning ✅
• Growing market demand 📈

Would you like to explore the detailed roadmap for any of these careers?`;
  }

  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    return `Hello! 👋 I'm DISHA, your personal AI guidance assistant.

I can help you with:
• 🎯 Career path guidance and roadmaps
• 📚 Personalized study plans
• 💡 Skill recommendations
• 🛠️ Project suggestions
• 📊 Progress tracking tips

What would you like to explore today?`;
  }

  if (msg.includes('internship')) {
    return `Here's your internship preparation strategy:

**3-Month Action Plan:**

📋 **Month 1: Foundation**
• Complete 100 LeetCode problems (Easy + Medium)
• Build 2 portfolio projects with clean documentation
• Create/update LinkedIn & GitHub profiles

📋 **Month 2: Applications**
• Research target companies and their tech stacks
• Customize resume for each application
• Practice mock interviews (technical + HR)

📋 **Month 3: Interview Prep**
• System design basics
• ML-specific interview questions
• Behavioral STAR format answers

🎯 **Top Platforms for AI/ML Internships:**
• LinkedIn, AngelList, Internshala
• Company career pages (Google, Microsoft, Amazon)
• Research lab positions at IITs/IISc

Would you like me to help you prepare for a specific type of internship?`;
  }

  // Default response
  return `That's a great question! Let me help you with that.

Based on your profile as a **${getTimeBasedGreeting()}** CSE student interested in AI/ML, I'd recommend:

1. **Stay focused** on your current roadmap step
2. **Practice daily** — even 30 minutes of coding helps
3. **Build projects** that demonstrate your skills
4. **Network** with peers and mentors in your field

Would you like me to dive deeper into any specific topic? I can help with:
• Career guidance 🎯
• Study planning 📚
• Skill development 💡
• Project ideas 🛠️

Just ask me anything!`;
}

function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
}

/**
 * Generate a unique message ID
 */
export function generateMessageId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
