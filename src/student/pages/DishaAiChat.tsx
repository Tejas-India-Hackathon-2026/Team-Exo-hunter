import { useState, useRef, useEffect, useCallback, type FormEvent, type KeyboardEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, Send, Bot, Loader2, Key, X, Pencil } from 'lucide-react';
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

// ── Tiny markdown-ish renderer (bold + lists + code blocks) ─────────────
function renderContent(text: string) {
  const lines = text.split('\n');
  let inCodeBlock = false;
  let codeContent: string[] = [];

  const elements = lines.map((line, i) => {
    // Toggle code blocks
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        inCodeBlock = false;
        const code = codeContent.join('\n');
        codeContent = [];
        return (
          <pre key={i} className="my-3 p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 font-mono text-[11px] text-indigo-300 overflow-x-auto shadow-inner leading-relaxed select-text">
            <code>{code}</code>
          </pre>
        );
      } else {
        inCodeBlock = true;
        return null;
      }
    }

    if (inCodeBlock) {
      codeContent.push(line);
      return null;
    }

    // Check if line is a bullet item
    let isBullet = false;
    let cleanLine = line;
    if (line.trim().startsWith('•')) {
      isBullet = true;
      cleanLine = line.replace(/^\s*•\s*/, '');
    } else if (line.trim().startsWith('* ')) {
      isBullet = true;
      cleanLine = line.replace(/^\s*\*\s*/, '');
    } else if (line.trim().startsWith('- ')) {
      isBullet = true;
      cleanLine = line.replace(/^\s*-\s*/, '');
    }

    // Process inline bold & backticks
    const parseInline = (str: string) => {
      const tokens = str.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
      return tokens.map((token, j) => {
        if (token.startsWith('**') && token.endsWith('**')) {
          return (
            <strong key={j} className="font-extrabold text-white">
              {token.slice(2, -2)}
            </strong>
          );
        }
        if (token.startsWith('`') && token.endsWith('`')) {
          return (
            <code key={j} className="px-1.5 py-0.5 rounded bg-slate-905 border border-slate-800 text-indigo-300 font-mono text-[11px] font-semibold">
              {token.slice(1, -1)}
            </code>
          );
        }
        return <span key={j}>{token}</span>;
      });
    };

    if (isBullet) {
      return (
        <li key={i} className="list-none pl-5 relative before:content-['•'] before:absolute before:left-1 before:text-indigo-400 font-normal py-0.5 text-slate-300 leading-relaxed">
          {parseInline(cleanLine)}
        </li>
      );
    }

    const trimmed = line.trim();
    if (!trimmed) {
      return <div key={i} className="h-2" />;
    }

    return (
      <p key={i} className="leading-relaxed text-slate-300 my-0.5">
        {parseInline(line)}
      </p>
    );
  }).filter(Boolean);

  return <div className="space-y-1">{elements}</div>;
}

// ── Component ────────────────────────────────────────────────────
export const DishaAiChat = () => {
  const [messages, setMessages] = useState<AiMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // API Key States
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem('disha-gemini-key') || '');
  const [tempKey, setTempKey] = useState(apiKey);
  const [showKeyModal, setShowKeyModal] = useState(false);

  // Message Editing States
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editInput, setEditInput] = useState('');

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

      const history = messages.slice(1);

      try {
        const savedKey = localStorage.getItem('disha-gemini-key') || '';
        const reply = await getAiResponse(trimmed, savedKey, history);
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
    [input, isLoading, messages],
  );

  // ── Edit submit handler ─────────────────────────────────────────
  const handleEditSubmit = async (messageId: string, newText: string) => {
    const trimmed = newText.trim();
    if (!trimmed || isLoading) return;

    const msgIndex = messages.findIndex(m => m.id === messageId);
    if (msgIndex === -1) return;

    // Get history before this edited message (excluding welcome message at index 0)
    const history = messages.slice(1, msgIndex);

    const updatedUserMsg: AiMessage = {
      ...messages[msgIndex],
      content: trimmed,
      timestamp: new Date(),
    };

    // Slice history up to edited message, and clear subsequent chat history
    const nextMessages = [...messages.slice(0, msgIndex), updatedUserMsg];
    setMessages(nextMessages);
    setEditingMessageId(null);
    setIsLoading(true);

    try {
      const savedKey = localStorage.getItem('disha-gemini-key') || '';
      const reply = await getAiResponse(trimmed, savedKey, history);
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
    }
  };

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      handleSend(q);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, handleSend, setSearchParams]);

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
      <header className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-slate-800/60 bg-slate-900/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-400 flex-shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              DISHA AI
              <span className="hidden sm:inline font-normal text-slate-400">
                — Your Personal AI Guide
              </span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Ask me about careers, study plans, skills &amp; more
            </p>
          </div>
        </div>

        {/* API Key Configuration */}
        <button
          onClick={() => {
            setTempKey(apiKey);
            setShowKeyModal(true);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer select-none"
        >
          <Key className="w-3.5 h-3.5 text-indigo-400" />
          <span>{apiKey ? 'API Key Saved' : 'Set Gemini Key'}</span>
        </button>
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
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2 group ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {/* User Edit Button (Left of bubble, visible on hover) */}
            {msg.role === 'user' && editingMessageId !== msg.id && (
              <button
                onClick={() => {
                  setEditingMessageId(msg.id);
                  setEditInput(msg.content);
                }}
                className="self-center opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-white cursor-pointer select-none"
                title="Edit message"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Assistant avatar */}
            {msg.role === 'assistant' && (
              <div className="flex-shrink-0 mt-1 mr-1.5 p-1.5 rounded-lg bg-indigo-500/15 text-indigo-400 self-start relative">
                <span className="absolute inset-0 rounded-lg bg-indigo-500/20 animate-ping duration-1500 opacity-60" />
                <Bot className="w-4 h-4 relative z-10" />
              </div>
            )}

            {editingMessageId === msg.id ? (
              /* Inline Edit Area */
              <div className="flex-1 max-w-[75%] rounded-2xl p-4 bg-slate-900 border border-indigo-500/30 space-y-3 shadow-xl shadow-indigo-950/20">
                <textarea
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none min-h-[60px] leading-relaxed"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleEditSubmit(msg.id, editInput);
                    }
                  }}
                />
                <div className="flex justify-end gap-2 text-xs">
                  <button
                    onClick={() => setEditingMessageId(null)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-lg cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleEditSubmit(msg.id, editInput)}
                    disabled={!editInput.trim() || isLoading}
                    className="px-3.5 py-1.5 bg-indigo-650 hover:bg-indigo-650 text-white font-bold rounded-lg cursor-pointer disabled:opacity-50 transition-colors"
                  >
                    Save &amp; Submit
                  </button>
                </div>
              </div>
            ) : (
              /* Normal Bubble */
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-indigo-650 text-white rounded-br-md shadow-md'
                    : 'bg-slate-800/70 border border-indigo-500/15 text-slate-300 rounded-bl-md shadow-lg shadow-indigo-950/10'
                }`}
              >
                {msg.content === 'KEY_NOT_CONFIGURED' ? (
                  <div className="space-y-3 p-1">
                    <p className="font-bold text-white text-xs flex items-center gap-1.5">
                      <Key className="w-4 h-4 text-indigo-400" />
                      Set Gemini API Key to chat
                    </p>
                    <p className="text-slate-400 text-xs leading-normal">
                      To enable smart chat replies, please paste your Google Gemini API Key below. This key is free and stays locally in your browser.
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        placeholder="Paste AIzaSy... key here"
                        id="inline-key-input"
                        className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 placeholder-slate-750"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const val = (e.target as HTMLInputElement).value.trim();
                            if (val) {
                              localStorage.setItem('disha-gemini-key', val);
                              setApiKey(val);
                              setMessages((prev) => {
                                const next = [...prev];
                                next[next.length - 1] = {
                                  id: generateMessageId(),
                                  role: 'assistant',
                                  content: '🎉 API Key configured successfully! How can I help you today?',
                                  timestamp: new Date(),
                                };
                                return next;
                              });
                            }
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          const inputEl = document.getElementById('inline-key-input') as HTMLInputElement;
                          const val = inputEl?.value.trim();
                          if (val) {
                            localStorage.setItem('disha-gemini-key', val);
                            setApiKey(val);
                            setMessages((prev) => {
                              const next = [...prev];
                              next[next.length - 1] = {
                                id: generateMessageId(),
                                role: 'assistant',
                                content: '🎉 API Key configured successfully! How can I help you today?',
                                timestamp: new Date(),
                              };
                              return next;
                            });
                          }
                        }}
                        className="px-3.5 py-1.5 bg-indigo-650 hover:bg-indigo-600 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer select-none"
                      >
                        Save
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-500">
                      Get a free key from{' '}
                      <a
                        href="https://aistudio.google.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-400 hover:underline"
                      >
                        Google AI Studio ↗
                      </a>
                    </p>
                  </div>
                ) : (
                  renderContent(msg.content)
                )}
                <span className="block mt-2 text-[10px] opacity-40 text-right">
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            )}
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

      {/* ── Key Settings Modal ────────────────────────────────────── */}
      {showKeyModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl max-w-md w-full overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 text-slate-200">
            {/* Modal Header */}
            <div className="bg-slate-950 p-5 border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Configure Gemini API Key</h3>
                  <p className="text-[11px] text-slate-400">Enable custom AI recommendations &amp; chat responses</p>
                </div>
              </div>
              <button
                onClick={() => setShowKeyModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-400 leading-relaxed">
                By default, DISHA AI uses a prototype API key. Enter your personal **Google Gemini API Key** for unlimited, custom responses.
              </p>
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-slate-400">
                  Gemini API Key
                </label>
                <input
                  type="password"
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  placeholder="Paste your AIzaSy... key here"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none text-xs text-white placeholder-slate-650"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <a
                  href="https://aistudio.google.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 hover:underline font-medium"
                >
                  Get a free key from Google AI Studio ↗
                </a>
                {apiKey && (
                  <button
                    onClick={() => {
                      localStorage.removeItem('disha-gemini-key');
                      setApiKey('');
                      setTempKey('');
                      setShowKeyModal(false);
                    }}
                    className="text-rose-450 hover:underline cursor-pointer"
                  >
                    Clear Saved Key
                  </button>
                )}
              </div>

              <button
                onClick={() => {
                  localStorage.setItem('disha-gemini-key', tempKey.trim());
                  setApiKey(tempKey.trim());
                  setShowKeyModal(false);
                }}
                disabled={!tempKey.trim()}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer mt-2"
              >
                Save Key &amp; Connect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
