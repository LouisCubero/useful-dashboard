"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send } from "lucide-react"

// Responses grouped by keyword, with multiple options to cycle through
const CANNED_RESPONSES: [RegExp, string[]][] = [
  [/\b(hello|hi|hey|yo|sup)\b/, [
    "Hi there! How can I help you enter your phone number today?",
    "Hey! Welcome back to the world's best phone number input.",
    "Hello! I'm contractually obligated to be here. What's up?",
  ]],
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
    <div className="fixed bottom-[36px] right-2 z-50 flex flex-col items-end gap-2">
      {open && (
        <div className="window w-[320px]">
          <div className="title-bar">
            <div className="title-bar-text">Support Chat</div>
            <div className="title-bar-controls">
              <button aria-label="Minimize" />
              <button aria-label="Maximize" />
              <button aria-label="Close" onClick={() => setOpen(false)} />
            </div>
          </div>
          <div className="window-body !m-0 !p-0">
            <div
              ref={scrollRef}
              className="flex h-[280px] flex-col gap-1 overflow-y-auto p-2"
              style={{ background: "#fff" }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] px-2 py-1 text-xs ${
                    msg.role === "bot"
                      ? "self-start"
                      : "self-end font-bold"
                  }`}
                  style={{
                    background: msg.role === "bot" ? "#ece9d8" : "#316ac5",
                    color: msg.role === "bot" ? "#000" : "#fff",
                  }}
                >
                  {msg.role === "bot" && <strong>{"Agent: "}</strong>}
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-1 p-2" style={{ borderTop: "1px solid #919b9c" }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 px-1 py-0.5 text-xs"
              />
              <button onClick={handleSend} style={{ fontSize: "11px" }}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        style={{ fontSize: "11px" }}
      >
        {open ? "Close Chat" : "Support Chat"}
      </button>
    </div>
  )
}
