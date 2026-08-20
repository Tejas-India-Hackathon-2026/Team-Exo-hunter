import { useState, useRef, useEffect, useCallback, type FormEvent, type KeyboardEvent } from 'react';
import { Sparkles, Send, Bot, Loader2 } from 'lucide-react';
import { SUGGESTED_PROMPTS } from '../data/studentData';
import {
  getAiResponse,
  generateMessageId,
  type AiMessage,
} from '../services/mockAiService';

// ── Welcome message shown on first load ──────────────────────────
const WELCOME_MESSAGE: AiMessage = {
  id: 'welcome',
  role: 'assistant',
  content: `👋 Hello! I'm **DISHA**, your personal AI guidance assistant.\n\nI can help you with:\n• 🎯 Career path guidance and roadmaps\n• 📚 Personalized study plans\n• 💡 Skill recommendations\n• 🛠️ Project suggestions\n• 📊 Progress tracking tips\n\nPick a suggestion below or type anything to get started!`,
  timestamp: new Date(),
};

// ── Tiny markdown-ish renderer (bold + bullet lines) ─────────────
function renderContent(text: string) {
  return text.split('\n').map((line, i) => {
    // Convert **bold** markers
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((seg, j) => {
      if (seg.startsWith('**') && seg.endsWith('**')) {
        return (
          <span key={j} className="font-semibold text-white">
            {seg.slice(2, -2)}
          </span>
        );
      }
      return <span key={j}>{seg}</span>;
    });

    return (
      <span key={i} className="block">
        {parts}
      </span>
    );
  });
}

// ── Component ────────────────────────────────────────────────────
export const DishaAiChat = () => {
  const [messages, setMessages] = useState<AiMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll whenever messages change or loading state toggles
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // ── Send handler ───────────────────────────────────────────────
  const handleSend = useCallback(
    async (text?: string) => {
      const trimmed = (text ?? input).trim();
      if (!trimmed || isLoading) return;

      // User message
      const userMsg: AiMessage = {
        id: generateMessageId(),
        role: 'user',
        content: trimmed,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, userMsg]);
      setInput('');
      setIsLoading(true);

      try {
        const reply = await getAiResponse(trimmed);
        const assistantMsg: AiMessage = {
          id: generateMessageId(),
          role: 'assistant',
          content: reply,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantMsg]);
      } catch {
        const errMsg: AiMessage = {
          id: generateMessageId(),
          role: 'assistant',
          content: '⚠️ Something went wrong. Please try again.',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errMsg]);
      } finally {
        setIsLoading(false);
        inputRef.current?.focus();
      }
    },
    [input, isLoading],
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ── Render ─────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full min-h-0 bg-slate-950 text-slate-200">
      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="flex-shrink-0 flex items-center gap-3 px-6 py-4 border-b border-slate-800/60 bg-slate-900/80 backdrop-blur-md">
        <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-400">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            DISHA AI{' '}
            <span className="font-normal text-slate-400">
              — Your Personal AI Guide
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Ask me about careers, study plans, skills &amp; more
          </p>
        </div>
      </header>

      {/* ── Suggested prompts ───────────────────────────────────── */}
      <div className="flex-shrink-0 flex items-center gap-2 px-6 py-3 overflow-x-auto scrollbar-none border-b border-slate-800/40 bg-slate-900/40">
        <span className="text-[11px] uppercase tracking-widest text-slate-500 mr-1 whitespace-nowrap">
          Try:
        </span>
        {SUGGESTED_PROMPTS.map(prompt => (
          <button
            key={prompt}
            type="button"
            disabled={isLoading}
            onClick={() => handleSend(prompt)}
            className="whitespace-nowrap rounded-full border border-indigo-500/25 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-medium text-indigo-300 transition hover:bg-indigo-500/20 hover:border-indigo-400/40 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* ── Chat area (scrollable) ──────────────────────────────── */}
      <div className="flex-1 min-h-0 overflow-y-auto px-6 py-5 space-y-4 scroll-smooth">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {/* Assistant avatar */}
            {msg.role === 'assistant' && (
              <div className="flex-shrink-0 mt-1 mr-3 p-1.5 rounded-lg bg-indigo-500/15 text-indigo-400 self-start">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-md'
                  : 'bg-slate-800/70 border border-indigo-500/15 text-slate-300 rounded-bl-md'
              }`}
            >
              {renderContent(msg.content)}
              <span className="block mt-2 text-[10px] opacity-40 text-right">
                {msg.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 p-1.5 rounded-lg bg-indigo-500/15 text-indigo-400">
              <Bot className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2 rounded-2xl rounded-bl-md bg-slate-800/70 border border-indigo-500/15 px-4 py-3 text-sm text-slate-400">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
              DISHA is thinking…
            </div>
          </div>
        )}

        {/* Scroll anchor */}
        <div ref={bottomRef} />
      </div>

      {/* ── Input bar ───────────────────────────────────────────── */}
      <form
        onSubmit={onSubmit}
        className="flex-shrink-0 flex items-center gap-3 px-6 py-4 border-t border-slate-800/60 bg-slate-900/80 backdrop-blur-md"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Ask DISHA anything..."
          disabled={isLoading}
          className="flex-1 rounded-xl border border-slate-700/60 bg-slate-800/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="flex items-center justify-center w-11 h-11 rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
