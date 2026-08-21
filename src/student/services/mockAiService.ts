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

export async function getAiResponse(
  userMessage: string, 
  customApiKey?: string, 
  history: Array<{ role: 'user' | 'assistant'; content: string }> = []
): Promise<string> {
  if (!customApiKey || !customApiKey.trim()) {
    return "KEY_NOT_CONFIGURED";
  }

  // Format dynamic chat history to match Gemini's API format
  const apiContents = history
    .filter(m => m.content !== 'KEY_NOT_CONFIGURED') // filter out key prompts
    .map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

  // Add the current user prompt
  apiContents.push({
    role: 'user',
    parts: [{ text: userMessage }],
  });

  // Keep last 20 messages to prevent token overflows
  const contents = apiContents.slice(-20);

  const apiKey = customApiKey;
  
  const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
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
            temperature: 0.8,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
          ],
        }),
      });

      if (response.ok) {
        break; // Successfully completed the request!
      } else {
        lastErrorStatus = response.status;
        lastErrorBody = await response.text();
        console.warn(`Model ${model} failed with status ${response.status}. trying next...`);
      }
    } catch (e) {
      console.warn(`Failed to connect using model ${model}:`, e);
    }
  }

  if (!response || !response.ok) {
    console.error('All Gemini API models failed. Last status:', lastErrorStatus, lastErrorBody);
    try {
      const parsed = JSON.parse(lastErrorBody);
      const errMsg = parsed?.error?.message || '';
      if (lastErrorStatus === 400 && (errMsg.toLowerCase().includes('api key not valid') || errMsg.toLowerCase().includes('key invalid'))) {
        return `🔑 **Invalid API Key:** The Gemini API returned "API key not valid."

Please check that you copied the key correctly from Google AI Studio. You can reset or update it using the **"Set Gemini Key"** button in the header.`;
      }
      return `⚠️ **Gemini API Error (Status ${lastErrorStatus}):** ${errMsg || 'Unknown error or service temporarily unavailable. Please try again later.'}`;
    } catch {
      return `⚠️ **Gemini API Error:** Status ${lastErrorStatus} was returned by Google servers.`;
    }
  }

  try {
    const data = await response.json();

    // Extract the text from Gemini's response
    const aiText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm having trouble generating a response right now. Please try again!";

    return aiText;
  } catch (error) {
    console.error('DISHA AI Error:', error);

    return `⚠️ I'm having trouble connecting to my AI engine right now.

**Possible reasons:**
• Internet connection issue
• API service temporarily unavailable

**What you can do:**
• Check your internet connection and try again
• Try rephrasing your question

I'll be back online shortly! 🔄`;
  }
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
