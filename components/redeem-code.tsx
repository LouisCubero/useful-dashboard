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
  onWaifu?: () => void
  onDoom?: () => void
}

export function RedeemCode({ onFix, onWaifu, onDoom }: RedeemCodeProps) {
  const [unlocked, setUnlocked] = useState(false)
  const [submitted, setSubmitted] = useState(false)
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

  return (
    <div className="fixed top-4 left-4 z-50">
      <div className="window w-[200px]">
        <div className="title-bar">
          <div className="title-bar-text">Redeem Code</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Close" />
          </div>
        </div>
        <div className="window-body">
          {!unlocked ? (
            <div>
              <p style={{ fontSize: "11px" }}>Status: Locked</p>
              <input
                disabled
                type="text"
                value="Locked"
                className="mt-1 w-full"
                style={{ fontSize: "11px" }}
              />
            </div>
          ) : !submitted ? (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const val = code.toLowerCase().trim()
                if (val === "doom") {
                  onDoom?.()
                  setCode("")
                } else if (val === "fix") {
                  onFix?.()
                  setCode("")
                } else if (val === "waifu") {
                  onWaifu?.()
                  setCode("")
                } else {
                  setSubmitted(true)
                }
              }}
            >
              <p style={{ fontSize: "11px", fontWeight: "bold" }}>Unlocked!</p>
              <div className="mt-1 flex gap-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter code..."
                  className="w-full"
                  style={{ fontSize: "11px" }}
                />
                <button type="submit" style={{ fontSize: "11px" }}>Go</button>
              </div>
            </form>
          ) : (
            <div>
              <p style={{ fontSize: "11px", color: "#c00", fontWeight: "bold" }}>
                Invalid code: &quot;{code}&quot;
              </p>
              <p style={{ fontSize: "10px", color: "#666" }}>
                All codes expired in 2007.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
