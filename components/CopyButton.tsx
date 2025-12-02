"use client"

import { useState } from "react"

interface CopyButtonProps {
  password: string
}

export default function CopyButton({ password }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      alert("Failed to copy password")
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="glass-button-secondary neon-glow whitespace-nowrap"
      title="Copy to clipboard"
    >
      {copied ? "✓ Copied" : "Copy"}
    </button>
  )
}
