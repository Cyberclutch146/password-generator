"use client"

interface LengthSliderProps {
  value: number
  onChange: (value: number) => void
}

export default function LengthSlider({ value, onChange }: LengthSliderProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <label className="text-sm font-semibold text-white/80 uppercase tracking-wide">Password Length</label>
        <span className="text-lg font-bold text-cyan-400 bg-white/10 px-3 py-1 rounded-lg">{value}</span>
      </div>
      <input
        type="range"
        min="8"
        max="128"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full cursor-pointer"
      />
      <div className="flex justify-between text-xs text-white/50 mt-2">
        <span>8</span>
        <span>128</span>
      </div>
    </div>
  )
}
