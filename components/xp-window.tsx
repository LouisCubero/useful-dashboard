import type { CSSProperties } from "react"

interface XPWindowProps {
  title: string
  children: React.ReactNode
  className?: string
  style?: CSSProperties
  onClose?: () => void
  showMinimize?: boolean
  showMaximize?: boolean
  showClose?: boolean
}

export function XPWindow({
  title,
  children,
  className = "",
  style,
  onClose,
  showMinimize = true,
  showMaximize = true,
  showClose = true,
}: XPWindowProps) {
  return (
    <div className={`window ${className}`} style={style}>
      <div className="title-bar">
        <div className="title-bar-text">{title}</div>
        <div className="title-bar-controls">
          {showMinimize && <button aria-label="Minimize" />}
          {showMaximize && <button aria-label="Maximize" />}
          {showClose && (
            <button aria-label="Close" onClick={onClose} />
          )}
        </div>
      </div>
      <div className="window-body">
        {children}
      </div>
    </div>
  )
}
