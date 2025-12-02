"use client"
import CopyButton from "./CopyButton"

interface PasswordDisplayProps {
  password: string
}

export default function PasswordDisplay({ password }: PasswordDisplayProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <input type="text" value={password} readOnly className="glass-input flex-1 text-lg font-mono tracking-wide" />
        <CopyButton password={password} />
      </div>
    </div>
  )
}
