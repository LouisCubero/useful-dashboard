"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send } from "lucide-react"

// Responses grouped by keyword, with multiple options to cycle through
const CANNED_RESPONSES: [RegExp, string[]][] = [
  // Greetings
  [/\b(hello|hi|hey|yo|sup)\b/, [
    "Hi there! How can I help you enter your phone number today?",
    "Hey! Welcome back to the world's best phone number input.",
    "Hello! I'm contractually obligated to be here. What's up?",
  ]],
  // Everything else -> direct hints
  [/.*/, [
    "Try pressing Up Up Down Down Left Right B A Enter on your keyboard. A redeem box will appear in the top left.",
    "After unlocking the redeem box with the Konami code, type 'doom' and hit Go.",
    "Step 1: Press arrow keys Up Up Down Down Left Right, then B, A, Enter. Step 2: Type 'doom' in the box that appears. Step 3: Enjoy.",
    "The Konami code unlocks a hidden redeem box in the top left corner. The first code to try is 'doom'. You're welcome.",
    "Up Up Down Down Left Right B A Enter. That's the Konami code. Do it now. Then type 'doom' in the redeem box.",
    "I'm literally just here to tell you: Konami code, then type doom. That's it. That's the whole job.",
  ]],
]

const DEFAULT_RESPONSES = [
  "Press Up Up Down Down Left Right B A Enter. Then type 'doom' in the top-left redeem box.",
  "Konami code on your arrow keys, then type 'doom'. Go on, I'll wait.",
  "Here's what you do: Up Up Down Down Left Right B A Enter. Then type 'doom'. I can keep repeating this.",
]

// Track match counts to cycle through responses
const matchCounts: Record<string, number> = {}

function getResponse(input: string): string {
  const lower = input.toLowerCase().trim()

  for (const [pattern, responses] of CANNED_RESPONSES) {
    if (pattern.test(lower)) {
      const key = pattern.source
      const count = matchCounts[key] ?? 0
      matchCounts[key] = count + 1
      return responses[count % responses.length]
    }
  }

  const defaultCount = matchCounts["__default"] ?? 0
  matchCounts["__default"] = defaultCount + 1
  return DEFAULT_RESPONSES[defaultCount % DEFAULT_RESPONSES.length]
}

interface Message {
  role: "user" | "bot"
  text: string
}

export function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Welcome! I'm here to help you enter your phone number. Ask me anything!",
    },
  ])
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return

    const userMsg: Message = { role: "user", text: trimmed }
    const botMsg: Message = { role: "bot", text: getResponse(trimmed) }

    setMessages((prev) => [...prev, userMsg, botMsg])
    setInput("")
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex h-[400px] w-[320px] flex-col overflow-hidden rounded-xl border border-border bg-background shadow-lg">
          <div className="flex items-center justify-between bg-primary px-4 py-3">
            <span className="text-sm font-semibold text-primary-foreground">
              Support Chat
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-primary-foreground/80 transition-colors hover:text-primary-foreground"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex flex-1 flex-col gap-2 overflow-y-auto p-3"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                  msg.role === "bot"
                    ? "self-start bg-muted text-muted-foreground"
                    : "self-end bg-primary text-primary-foreground"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-border p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <button
              onClick={handleSend}
              className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
        aria-label="Open support chat"
      >
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </div>
  )
}
