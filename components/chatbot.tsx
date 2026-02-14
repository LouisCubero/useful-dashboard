"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send } from "lucide-react"

const CANNED_RESPONSES: Record<string, string> = {
  hello: "Hi there! How can I help you today?",
  hi: "Hi there! How can I help you today?",
  hey: "Hi there! How can I help you today?",
  help: "I'd love to help! Unfortunately, I can't do anything. Try clicking the + button a few million times.",
  "phone number":
    "To enter your phone number, simply click the + button until you reach your desired number. Easy!",
  phone:
    "To enter your phone number, simply click the + button until you reach your desired number. Easy!",
  number:
    "To enter your phone number, simply click the + button until you reach your desired number. Easy!",
  submit:
    "The submit button submits your number. Don't worry about the blur, that's a feature.",
  blur: "The blur is completely intentional and indicates your form was submitted successfully. There is no way to undo it.",
  bug: "That's not a bug, it's a feature. Thank you for your feedback!",
  broken:
    "Everything is working as intended. Thank you for your patience.",
  why: "Great question! The answer is: yes.",
  how: "Simply use the + button. It's very intuitive.",
  thanks: "You're welcome! Is there anything else I can't help you with?",
  "thank you":
    "You're welcome! Is there anything else I can't help you with?",
  bye: "Goodbye! Remember, we have your phone number now.",
  slow: "For faster number entry, try clicking the + button faster.",
  fast: "For faster number entry, try clicking the + button faster.",
  minus: "Unfortunately, a minus button is a premium feature available in our Enterprise plan.",
  subtract: "Unfortunately, a minus button is a premium feature available in our Enterprise plan.",
  delete: "Deletion is not supported at this time. Or any time.",
  reset: "To reset, please refresh the page and start clicking again from the beginning.",
  secret: "I probably shouldn't tell you this... but try pressing some arrows. Up Up Down Down Left Right then B A Enter. You didn't hear it from me.",
  code: "Rumor has it there's a hidden redeem box. Something about arrows and a classic cheat code... Once you unlock it, try entering the name of a 1993 id Software classic.",
  hint: "Okay fine. Konami code. Top left corner. Then type the name of a game where you fight demons from hell. Rhymes with 'room'.",
  redeem: "Redeem? I don't see a redeem box anywhere... unless you know the right sequence of keys. Think old school gaming.",
  doom: "Interesting word choice. Maybe try typing that somewhere... if you can find the right place. Have you tried pressing Up Up Down Down Left Right B A Enter?",
  konami: "Shh! Yes, the Konami code works here. Try it with your arrow keys, then B, A, and Enter. Check the top left after.",
  unlock: "Some things are locked for a reason. But if you press the right arrows in the right order... who knows what might appear in the top left corner.",
  game: "Games? On a phone number form? That's ridiculous. But hypothetically, if you unlocked a secret box and typed the name of a classic FPS...",
  cheat: "Cheat codes? This is a professional phone number entry form. But... up up down down left right b a enter. Just saying.",
}

const DEFAULT_RESPONSE =
  "I'm sorry, I didn't understand that. But rest assured, the + button is always there for you."

function getResponse(input: string): string {
  const lower = input.toLowerCase().trim()
  for (const [key, value] of Object.entries(CANNED_RESPONSES)) {
    if (lower.includes(key)) return value
  }
  return DEFAULT_RESPONSE
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
