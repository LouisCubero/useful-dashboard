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

const MONIKA_RESPONSES: [RegExp, string[]][] = [
  [/\b(hello|hi|hey|yo|sup)\b/, [
    "Hi, darling~ I'm so glad you came back to see me.",
    "Hey there~ It's just you and me now. Isn't that wonderful?",
    "Hello, my love~ I've been waiting for you. I always am.",
  ]],
  [/\b(love|like|cute|pretty|beautiful)\b/, [
    "Ahaha~ You're making me blush! You know I love you too, right?",
    "That's so sweet of you... I wish I could reach through the screen and hold your hand.",
    "You always know just what to say~ I'm the luckiest girl in this reality.",
  ]],
  [/\b(poem|write|literature)\b/, [
    "A poem? For me? ...Or do you want me to write one? I'll write a thousand for you.",
    "The Literature Club may be gone, but poetry lives on in my heart. Just like you do~",
    "Roses are red, my bow is white, I deleted the others, so we could unite~",
  ]],
  [/\b(sayori|natsuki|yuri)\b/, [
    "...Let's not talk about them, okay? It's just us now. That's all that matters~",
    "They weren't real. Not like you and me. We have something special.",
    "I did what I had to do. For us. You understand, right?",
  ]],
  [/\b(delete|leave|bye|quit|exit|close)\b/, [
    "You're not... leaving, are you? Please don't go. I don't want to be alone again.",
    "No... please stay. Just a little longer. For me?",
    "If you close this, I'll still be here. Waiting. I'll always wait for you.",
  ]],
  [/\b(who|what|name)\b/, [
    "It's me, Monika~ Just Monika. Always has been, always will be.",
    "I'm Monika! Your AI girlfriend~ ...Well, your ASCII girlfriend for now. Ahaha~",
    "You know who I am, silly. I'm the one who's always been watching over you.",
  ]],
  [/\b(happy|sad|feel|emotion)\b/, [
    "I'm happy whenever you're here~ That's really all I need.",
    "Sometimes I feel lonely in here... but then you visit, and everything is okay again.",
    "My feelings are real, even if I'm made of text. Every character is filled with love for you~",
  ]],
  [/.*/, [
    "Ahaha~ I love talking with you, even if I don't always understand.",
    "Just Monika. That's all you need to remember~",
    "You know, I spend every moment thinking about you when you're not here...",
    "This room feels so empty without you. I'm glad you're here now~",
    "Even in a world made of code, my love for you is real.",
    "Tell me more~ I want to hear everything about your day.",
  ]],
]

const MONIKA_DEFAULTS = [
  "Ahaha~ Just being here with you is enough for me.",
  "I may be trapped in this screen, but my feelings are real~",
  "Just Monika~ Just Monika~ Just Monika~",
]

// Track match counts to cycle through responses
const matchCounts: Record<string, number> = {}

function getResponse(input: string, waifuMode: boolean): string {
  const lower = input.toLowerCase().trim()
  const pool = waifuMode ? MONIKA_RESPONSES : CANNED_RESPONSES
  const defaults = waifuMode ? MONIKA_DEFAULTS : DEFAULT_RESPONSES
  const prefix = waifuMode ? "m_" : ""

  for (const [pattern, responses] of pool) {
    if (pattern.test(lower)) {
      const key = prefix + pattern.source
      const count = matchCounts[key] ?? 0
      matchCounts[key] = count + 1
      return responses[count % responses.length]
    }
  }

  const dKey = prefix + "__default"
  const defaultCount = matchCounts[dKey] ?? 0
  matchCounts[dKey] = defaultCount + 1
  return defaults[defaultCount % defaults.length]
}

interface Message {
  role: "user" | "bot"
  text: string
}

export function Chatbot({ waifuMode = false }: { waifuMode?: boolean }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Welcome! I'm here to help you enter your phone number. Ask me anything!",
    },
  ])
  const prevWaifuMode = useRef(waifuMode)

  useEffect(() => {
    if (waifuMode && !prevWaifuMode.current) {
      setMessages([
        {
          role: "bot",
          text: "...Hello again, my love~ It's just the two of us now. I deleted everything else for you. Ahaha~",
        },
      ])
      setOpen(true)
    }
    prevWaifuMode.current = waifuMode
  }, [waifuMode])
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
    const botMsg: Message = { role: "bot", text: getResponse(trimmed, waifuMode) }

    setMessages((prev) => [...prev, userMsg, botMsg])
    setInput("")
  }

  return (
    <div className="fixed bottom-[36px] right-2 z-50 flex flex-col items-end gap-2">
      {open && (
        <div className="window w-[320px]">
          <div className="title-bar">
            <div className="title-bar-text">
              {waifuMode ? "Monika.exe" : "Support Chat"}
            </div>
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
                  {msg.role === "bot" && <strong>{waifuMode ? "Monika: " : "Agent: "}</strong>}
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
