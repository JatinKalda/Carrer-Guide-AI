"use client";

import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Card } from "@/components/ui/card";
import { chatSuggestions } from "@/lib/data";
import { Bot, Mic, Paperclip, Send, Sparkles, Plus, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "ai"; text: string };

const history = [
  "Backend Engineer roadmap at FAANG",
  "Improve my LinkedIn headline",
  "System design interview prep",
  "Salary negotiation tips",
];

const fullReply =
  "Great question! Here's a personalized plan for you:\n\n- Strengthen your DSA and problem-solving fundamentals\n- Master backend technologies (Node.js, Python, Java)\n- Build 2-3 real-world projects\n- Learn cloud basics (AWS/GCP) and DevOps\n- Contribute to open source\n- Prepare for behavioral and technical interviews\n\nWould you like to create a detailed roadmap?";

export default function AiCoachPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Hello John! How can I help with your career today?" },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  function ask(text: string) {
    if (!text.trim() || streaming) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setStreaming(true);
    setMessages((m) => [...m, { role: "ai", text: "" }]);

    let i = 0;
    const interval = setInterval(() => {
      i += 3;
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { role: "ai", text: fullReply.slice(0, i) };
        return copy;
      });
      if (i >= fullReply.length) {
        clearInterval(interval);
        setStreaming(false);
      }
    }, 15);
  }

  return (
    <>
      <Navbar title="AI Career Coach" subtitle="Your personal AI career assistant" />
      <main className="flex h-[calc(100vh-80px)] gap-6 p-6 lg:p-10">
        {/* History sidebar */}
        <Card className="hidden w-64 shrink-0 md:flex md:flex-col">
          <div className="p-4">
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-gradient py-2.5 text-sm font-medium text-white shadow-soft">
              <Plus className="h-4 w-4" /> New Chat
            </button>
          </div>
          <div className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
            <p className="px-2 pb-2 text-[11px] font-medium uppercase tracking-wide text-muted">
              Career Memory
            </p>
            {history.map((h) => (
              <button
                key={h}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm text-muted transition-colors hover:bg-slate-50 hover:text-ink"
              >
                <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{h}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Chat */}
        <Card className="flex flex-1 flex-col overflow-hidden">
          <div ref={scrollRef} className="flex-1 space-y-5 overflow-y-auto p-6">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex gap-3", m.role === "user" && "flex-row-reverse")}>
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    m.role === "ai" ? "bg-brand-gradient text-white" : "bg-slate-200 text-ink"
                  )}
                >
                  {m.role === "ai" ? <Bot className="h-4 w-4" /> : "JD"}
                </div>
                <div
                  className={cn(
                    "max-w-[75%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    m.role === "ai"
                      ? "bg-slate-100 text-ink rounded-tl-md"
                      : "bg-primary text-white rounded-tr-md"
                  )}
                >
                  {m.text}
                  {m.role === "ai" && streaming && i === messages.length - 1 && (
                    <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-ink/60 align-middle" />
                  )}
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="grid gap-2 sm:grid-cols-2">
                {chatSuggestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => ask(q)}
                    className="flex items-center gap-2 rounded-2xl border border-border/70 p-3.5 text-left text-sm text-ink transition-colors hover:border-primary-200 hover:bg-primary-50"
                  >
                    <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary" /> {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="flex items-center gap-2 border-t border-border/70 p-4"
          >
            <button type="button" className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border text-muted hover:text-ink">
              <Paperclip className="h-4 w-4" />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about your career..."
              className="h-11 flex-1 rounded-2xl border border-border bg-slate-50 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            />
            <button type="button" className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border text-muted hover:text-ink">
              <Mic className="h-4 w-4" />
            </button>
            <button
              type="submit"
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-soft"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </Card>
      </main>
    </>
  );
}
