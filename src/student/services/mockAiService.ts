export interface AiMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// ── Gemini API Configuration ─────────────────────────────────────
const GEMINI_API_KEY = 'AIzaSyAKqTx1sBKJGR6GR3Yt5NFsniLbYGProWY';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

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

// Conversation history for context-aware responses
let conversationHistory: Array<{ role: string; parts: Array<{ text: string }> }> = [];

/**
 * Send a message to the Gemini API and get DISHA's response
 */
export async function getAiResponse(userMessage: string): Promise<string> {
  // Add user message to conversation history
  conversationHistory.push({
    role: 'user',
    parts: [{ text: userMessage }],
  });

  // Keep only last 20 messages to avoid token limits
  if (conversationHistory.length > 20) {
    conversationHistory = conversationHistory.slice(-20);
  }

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: DISHA_SYSTEM_PROMPT }],
        },
        contents: conversationHistory,
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

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Gemini API error:', response.status, errorBody);
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();

    // Extract the text from Gemini's response
    const aiText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm having trouble generating a response right now. Please try again!";

    // Add assistant response to conversation history
    conversationHistory.push({
      role: 'model',
      parts: [{ text: aiText }],
    });

    return aiText;
  } catch (error) {
    console.error('DISHA AI Error:', error);

    // Remove the failed user message from history
    conversationHistory.pop();

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
