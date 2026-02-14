"use client"

import { useState, useEffect, useRef } from "react"

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
  "Enter",
]

interface RedeemCodeProps {
  onFix?: () => void
}

export function RedeemCode({ onFix }: RedeemCodeProps) {
  const [unlocked, setUnlocked] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [doomMode, setDoomMode] = useState(false)
  const [code, setCode] = useState("")
  const progressRef = useRef<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (unlocked) return
      progressRef.current.push(e.key)
      if (progressRef.current.length > KONAMI.length) {
        progressRef.current.shift()
      }
      if (
        progressRef.current.length === KONAMI.length &&
        progressRef.current.every((k, i) => k === KONAMI[i])
      ) {
        setUnlocked(true)
        setTimeout(() => inputRef.current?.focus(), 100)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [unlocked])

  if (doomMode) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90">
        <div className="relative flex flex-col items-center gap-2">
          <button
            onClick={() => {
              setDoomMode(false)
              setCode("")
            }}
            className="absolute -top-8 right-0 text-xs font-bold text-red-500 hover:text-red-400"
          >
            ESC
          </button>
          <iframe
            src="https://doom-captcha.vercel.app/"
            className="h-[600px] w-[800px] rounded border-2 border-red-900"
            allow="autoplay"
          />
          <p className="text-xs text-red-500">
            {"DOOM mode activated. Good luck."}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed top-4 left-4 z-50">
      {!unlocked ? (
        <div className="rounded-md border border-border bg-muted/80 px-3 py-2 backdrop-blur-sm">
          <p className="text-xs font-medium text-muted-foreground">
            Redeem Code
          </p>
          <div className="mt-1 flex h-7 items-center rounded border border-border bg-background px-2">
            <span className="text-xs text-muted-foreground/50 select-none">
              Locked
            </span>
          </div>
        </div>
      ) : !submitted ? (
        <div className="rounded-md border border-primary bg-background px-3 py-2 shadow-lg animate-in fade-in zoom-in duration-300">
          <p className="text-xs font-bold text-primary">
            Redeem Code Unlocked
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const val = code.toLowerCase().trim()
              if (val === "doom") {
                setDoomMode(true)
              } else if (val === "fix") {
                onFix?.()
                setCode("")
              } else {
                setSubmitted(true)
              }
            }}
            className="mt-1 flex gap-1"
          >
            <input
              ref={inputRef}
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter code..."
              className="h-7 w-32 rounded border border-border bg-muted px-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              className="h-7 rounded bg-primary px-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Go
            </button>
          </form>
        </div>
      ) : (
        <div className="rounded-md border border-destructive bg-background px-3 py-2 shadow-lg">
          <p className="text-xs font-bold text-destructive">
            Invalid code: &quot;{code}&quot;
          </p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">
            All codes expired in 2007.
          </p>
        </div>
      )}
    </div>
  )
}
