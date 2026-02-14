"use client"

import { useState } from "react"

export default function Page() {
  const [number, setNumber] = useState(9173210000)

  const formatPhone = (num: number) => {
    const s = String(num).padStart(10, "0")
    return `(${s.slice(0, 3)}) ${s.slice(3, 6)}-${s.slice(6)}`
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4">
      <h1 className="text-3xl font-bold text-foreground md:text-4xl">
        Please enter your phone number:
      </h1>
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-semibold tabular-nums text-foreground md:text-3xl">
          {formatPhone(number)}
        </h2>
        <button
          onClick={() => setNumber((n) => n + 1)}
          className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-2xl font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          aria-label="Increment phone number"
        >
          +
        </button>
      </div>
    </main>
  )
}
