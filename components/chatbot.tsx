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
  // Help
  [/\b(help|assist|support)\b/, [
    "I'd love to help! Unfortunately, I can't do anything. Try clicking the + button a few million times.",
    "Help is on the way! Just kidding. Have you tried the + button though?",
    "Our help resources are currently limited to this chat and one + button. Good luck!",
  ]],
  // Phone / Number
  [/\b(phone|number|enter)\b/, [
    "To enter your phone number, simply click the + button until you reach your desired number. Easy!",
    "Pro tip: if your number starts with 917, you're already partway there!",
    "Fun fact: the average phone number requires approximately 3 billion clicks to reach. Stay motivated!",
  ]],
  // Submit / Blur
  [/\b(submit|blur)\b/, [
    "The submit button submits your number. Don't worry about the blur, that's a feature.",
    "The blur is completely intentional and indicates your form was submitted successfully. There is no way to undo it.",
    "Ah yes, the blur. Think of it as 'privacy mode'. Your phone number is now extra secure because even you can't see it.",
  ]],
  // Bug / Broken
  [/\b(bug|broken|error|wrong|fix)\b/, [
    "That's not a bug, it's a feature. Thank you for your feedback!",
    "Everything is working as intended. Thank you for your patience.",
    "Our QA team tested this extensively. They quit shortly after, but the tests all passed!",
  ]],
  // Thanks
  [/\b(thanks|thank you|thx)\b/, [
    "You're welcome! Is there anything else I can't help you with?",
    "No problem! I'm always here, doing absolutely nothing.",
    "Anytime! I get paid per message, so please keep talking.",
  ]],
  // Bye
  [/\b(bye|goodbye|leave|quit)\b/, [
    "Goodbye! Remember, we have your phone number now. Well, almost.",
    "See you later! The + button will miss you.",
    "Farewell! Your progress has not been saved.",
  ]],
  // Speed
  [/\b(slow|fast|speed|quick)\b/, [
    "For faster number entry, try clicking the + button faster.",
    "We're working on a '++' button for our Premium tier. Only $99/month!",
    "Speed is relative. Compared to counting grains of sand, this is lightning fast.",
  ]],
  // Minus / Subtract
  [/\b(minus|subtract|decrease|down|back)\b/, [
    "Unfortunately, a minus button is a premium feature available in our Enterprise plan.",
    "Going backwards? In THIS economy? That's a $49.99/month add-on.",
    "The minus button was removed in the last update to 'simplify the user experience'.",
  ]],
  // Delete / Reset
  [/\b(delete|reset|clear|undo)\b/, [
    "Deletion is not supported at this time. Or any time.",
    "To reset, please refresh the page and start clicking again from the beginning.",
    "Fun fact: there is no undo. Every click is a permanent, irreversible life decision.",
  ]],
  // Music / Volume / Song
  [/\b(music|volume|song|loud|quiet|audio|trap|queen)\b/, [
    "Ah, the background music? That's Trap Queen by Fetty Wap. You're welcome.",
    "To control the volume, use the tiny Angry Birds game in the top right. Obviously.",
    "The music is a core part of the phone number entry experience. It cannot be disabled, only aimed at.",
  ]],
  // Angry Birds / Slingshot
  [/\b(angry|bird|slingshot)\b/, [
    "The slingshot game controls the volume. Just aim the bird! It's the industry-standard volume control method.",
    "Angry Birds is not a game here. It's a critical audio management tool.",
    "Fun fact: the bird is angry because it was reassigned from a real game to be a volume slider.",
  ]],
  // Secret / Hint - escalating hints toward Konami code
  [/\b(secret|hint|hidden|easter)\b/, [
    "I probably shouldn't tell you this... but try pressing some arrows. Up Up Down Down Left Right then B A Enter. You didn't hear it from me.",
    "Okay fine. There's a hidden redeem box. Konami code unlocks it. Top left corner. Then type the name of a game where you fight demons from hell.",
    "FINE. Up Up Down Down Left Right B A Enter. Then type 'doom'. There. I said it. Please don't tell my manager.",
  ]],
  // Code / Redeem
  [/\b(code|redeem)\b/, [
    "Rumor has it there's a hidden redeem box. Something about arrows and a classic cheat code...",
    "Redeem? I don't see a redeem box anywhere... unless you know the right sequence of keys. Think old school gaming.",
    "Once you unlock the redeem box, try entering the name of a 1993 id Software classic. The first code is... well, it rhymes with 'room'.",
  ]],
  // Doom
  [/\b(doom)\b/, [
    "Interesting word choice. Maybe try typing that somewhere special... Have you tried pressing Up Up Down Down Left Right B A Enter first?",
    "DOOM? On a phone number form? That's absurd. But yes, absolutely, try it in the secret redeem box.",
    "I see you know about DOOM. The prophecy is true. Unlock the box with the Konami code and enter your destiny.",
  ]],
  // Konami
  [/\b(konami|up up|arrow)\b/, [
    "Shh! Yes, the Konami code works here. Try it with your arrow keys, then B, A, and Enter. Check the top left after.",
    "Up Up Down Down Left Right B A Enter. The sacred sequence. Use it wisely.",
    "You know the code?! A person of culture. Try it, unlock the box, and type 'doom'. You'll thank me later.",
  ]],
  // Cheat / Unlock / Game
  [/\b(cheat|unlock|game)\b/, [
    "Cheat codes? This is a professional phone number entry form. But... up up down down left right b a enter. Just saying.",
    "Some things are locked for a reason. But if you press the right arrows in the right order... top left corner.",
    "Games? On a phone number form? Hypothetically, if you unlocked a secret box and typed the name of a classic FPS...",
  ]],
  // Why / How - general confusion
  [/\b(why|how|what)\b/, [
    "Great question! The answer is: yes.",
    "I could explain, but my NDA prevents me from revealing why anything here is the way it is.",
    "Some questions are better left unasked. Like 'why is there an Angry Birds volume slider?'",
    "The real question isn't 'how' or 'why'. It's 'have you tried the Konami code yet?'",
  ]],
]

const DEFAULT_RESPONSES = [
  "I'm sorry, I didn't understand that. But rest assured, the + button is always there for you.",
  "Hmm, I don't know about that. But have you tried clicking + a few more times?",
  "That's beyond my capabilities. I'm mostly here for moral support and dropping hints.",
  "Interesting. Anyway, have you discovered any secrets on this page yet? Just curious.",
  "I wish I could help with that. Instead, here's a hint: this page has more to it than meets the eye...",
  "Sorry, what? I was distracted by the music. Try asking about something I know, like secrets or cheats.",
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
