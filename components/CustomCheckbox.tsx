"use client"

interface CustomCheckboxProps {
  label: string
  checked: boolean
  onChange: () => void
}

export default function CustomCheckbox({ label, checked, onChange }: CustomCheckboxProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="appearance-none w-5 h-5 rounded border-2 border-white/30 bg-white/5 checked:bg-gradient-to-r checked:from-cyan-400 checked:to-blue-500 checked:border-cyan-400 transition-all cursor-pointer hover:border-white/50"
        />
        {checked && (
          <svg
            className="absolute inset-0 w-5 h-5 text-white pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className="text-white/90 font-medium group-hover:text-white transition-colors">{label}</span>
    </label>
  )
}
