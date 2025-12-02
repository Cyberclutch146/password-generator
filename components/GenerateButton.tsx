"use client"

interface GenerateButtonProps {
  onClick: () => void
}

export default function GenerateButton({ onClick }: GenerateButtonProps) {
  return (
    <button onClick={onClick} className="w-full glass-button neon-glow text-lg font-bold py-4">
      Generate Password
    </button>
  )
}
