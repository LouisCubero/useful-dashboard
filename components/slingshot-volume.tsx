"use client"

import { useRef, useEffect, useState, useCallback } from "react"

interface SlingshotVolumeProps {
  onVolumeChange: (volume: number) => void
}

const SLING_X = 80
const SLING_Y = 220
const GROUND_Y = 280
const GRAVITY = 0.4
const CANVAS_W = 600
const CANVAS_H = 320
const BIRD_R = 12
const MAX_PULL = 70

interface Bird {
  x: number
  y: number
  vx: number
  vy: number
  launched: boolean
  landed: boolean
}

export function SlingshotVolume({ onVolumeChange }: SlingshotVolumeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const birdRef = useRef<Bird>({
    x: SLING_X,
    y: SLING_Y,
    vx: 0,
    vy: 0,
    launched: false,
    landed: false,
  })
  const draggingRef = useRef(false)
  const animFrameRef = useRef<number>(0)
  const [volume, setVolume] = useState(50)
  const [lastLandX, setLastLandX] = useState<number | null>(null)

  const resetBird = useCallback(() => {
    birdRef.current = {
      x: SLING_X,
      y: SLING_Y,
      vx: 0,
      vy: 0,
      launched: false,
      landed: false,
    }
    setLastLandX(null)
  }, [])

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const bird = birdRef.current
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)

      // sky gradient
      const sky = ctx.createLinearGradient(0, 0, 0, GROUND_Y)
      sky.addColorStop(0, "#87CEEB")
      sky.addColorStop(1, "#B0E0E6")
      ctx.fillStyle = sky
      ctx.fillRect(0, 0, CANVAS_W, GROUND_Y)

      // ground
      ctx.fillStyle = "#5B8C3E"
      ctx.fillRect(0, GROUND_Y, CANVAS_W, CANVAS_H - GROUND_Y)

      // volume tick marks on the ground
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 11px sans-serif"
      ctx.textAlign = "center"
      for (let i = 0; i <= 100; i += 10) {
        const tx = 100 + (i / 100) * (CANVAS_W - 130)
        ctx.fillStyle = "rgba(255,255,255,0.5)"
        ctx.fillRect(tx, GROUND_Y, 1, 10)
        ctx.fillStyle = "#fff"
        ctx.fillText(`${i}%`, tx, GROUND_Y + 24)
      }

      // "VOLUME" label
      ctx.fillStyle = "#fff"
      ctx.font = "bold 13px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText("VOLUME", CANVAS_W / 2, CANVAS_H - 4)

      // landing marker
      if (lastLandX !== null) {
        ctx.fillStyle = "rgba(255, 60, 60, 0.3)"
        ctx.fillRect(lastLandX - 2, GROUND_Y, 4, CANVAS_H - GROUND_Y)
        ctx.fillStyle = "#ff3c3c"
        ctx.beginPath()
        ctx.moveTo(lastLandX - 6, GROUND_Y)
        ctx.lineTo(lastLandX + 6, GROUND_Y)
        ctx.lineTo(lastLandX, GROUND_Y + 8)
        ctx.fill()
      }

      // slingshot post
      ctx.fillStyle = "#8B5E3C"
      ctx.fillRect(SLING_X - 4, SLING_Y - 30, 8, 30 + (GROUND_Y - SLING_Y))
      // Y fork
      ctx.strokeStyle = "#8B5E3C"
      ctx.lineWidth = 5
      ctx.beginPath()
      ctx.moveTo(SLING_X, SLING_Y - 20)
      ctx.lineTo(SLING_X - 14, SLING_Y - 40)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(SLING_X, SLING_Y - 20)
      ctx.lineTo(SLING_X + 14, SLING_Y - 40)
      ctx.stroke()

      // rubber band (when dragging)
      if (draggingRef.current && !bird.launched) {
        ctx.strokeStyle = "#3E2723"
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(SLING_X - 14, SLING_Y - 40)
        ctx.lineTo(bird.x, bird.y)
        ctx.lineTo(SLING_X + 14, SLING_Y - 40)
        ctx.stroke()
      }

      // bird (red circle with face)
      ctx.fillStyle = "#E53935"
      ctx.beginPath()
      ctx.arc(bird.x, bird.y, BIRD_R, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = "#B71C1C"
      ctx.lineWidth = 2
      ctx.stroke()
      // eyes
      ctx.fillStyle = "#fff"
      ctx.beginPath()
      ctx.arc(bird.x - 4, bird.y - 3, 3.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(bird.x + 4, bird.y - 3, 3.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = "#000"
      ctx.beginPath()
      ctx.arc(bird.x - 3, bird.y - 3, 1.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(bird.x + 5, bird.y - 3, 1.5, 0, Math.PI * 2)
      ctx.fill()
      // angry eyebrows
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(bird.x - 8, bird.y - 8)
      ctx.lineTo(bird.x - 2, bird.y - 6)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(bird.x + 8, bird.y - 8)
      ctx.lineTo(bird.x + 2, bird.y - 6)
      ctx.stroke()
      // beak
      ctx.fillStyle = "#FF8F00"
      ctx.beginPath()
      ctx.moveTo(bird.x - 3, bird.y + 2)
      ctx.lineTo(bird.x + 3, bird.y + 2)
      ctx.lineTo(bird.x, bird.y + 7)
      ctx.fill()

      // label
      if (!bird.launched && !draggingRef.current) {
        ctx.fillStyle = "rgba(0,0,0,0.6)"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText("Drag bird to set volume", CANVAS_W / 2, 20)
      }
    },
    [lastLandX]
  )

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const bird = birdRef.current

    if (bird.launched && !bird.landed) {
      bird.x += bird.vx
      bird.y += bird.vy
      bird.vy += GRAVITY

      if (bird.y + BIRD_R >= GROUND_Y) {
        bird.y = GROUND_Y - BIRD_R
        bird.landed = true

        // compute volume from landing x
        const minX = 100
        const maxX = CANVAS_W - 30
        const pct = Math.max(0, Math.min(1, (bird.x - minX) / (maxX - minX)))
        const vol = Math.round(pct * 100)
        setVolume(vol)
        setLastLandX(bird.x)
        onVolumeChange(vol / 100)

        // reset after a moment
        setTimeout(resetBird, 1200)
      }
    }

    draw(ctx)
    animFrameRef.current = requestAnimationFrame(gameLoop)
  }, [draw, onVolumeChange, resetBird])

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(gameLoop)
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [gameLoop])

  const getCanvasPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    const scaleX = CANVAS_W / rect.width
    const scaleY = CANVAS_H / rect.height
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    }
  }

  const handleDown = (e: React.MouseEvent | React.TouchEvent) => {
    const bird = birdRef.current
    if (bird.launched) return
    const pos = getCanvasPos(e)
    const dist = Math.hypot(pos.x - bird.x, pos.y - bird.y)
    if (dist < BIRD_R + 15) {
      draggingRef.current = true
    }
  }

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!draggingRef.current) return
    const bird = birdRef.current
    const pos = getCanvasPos(e)
    const dx = pos.x - SLING_X
    const dy = pos.y - SLING_Y
    const dist = Math.hypot(dx, dy)
    if (dist > MAX_PULL) {
      bird.x = SLING_X + (dx / dist) * MAX_PULL
      bird.y = SLING_Y + (dy / dist) * MAX_PULL
    } else {
      bird.x = pos.x
      bird.y = pos.y
    }
  }

  const handleUp = () => {
    if (!draggingRef.current) return
    draggingRef.current = false
    const bird = birdRef.current
    const dx = SLING_X - bird.x
    const dy = SLING_Y - bird.y
    bird.vx = dx * 0.18
    bird.vy = dy * 0.18
    bird.launched = true
  }

  return (
    <div className="window w-[140px]">
      <div className="title-bar">
        <div className="title-bar-text">Volume</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Close" />
        </div>
      </div>
      <div className="window-body !m-0 !p-1">
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="w-full"
          style={{ touchAction: "none" }}
          onMouseDown={handleDown}
          onMouseMove={handleMove}
          onMouseUp={handleUp}
          onMouseLeave={handleUp}
          onTouchStart={handleDown}
          onTouchMove={handleMove}
          onTouchEnd={handleUp}
        />
        <div className="status-bar mt-1">
          <p className="status-bar-field" style={{ fontSize: "10px" }}>Vol: {volume}%</p>
        </div>
      </div>
    </div>
  )
}
