"use client"

import CustomCheckbox from "./CustomCheckbox"
import LengthSlider from "./LengthSlider"

type PasswordOption = "uppercase" | "lowercase" | "numbers" | "symbols"

interface PasswordOptionsProps {
  length: number
  onLengthChange: (length: number) => void
  options: {
    uppercase: boolean
    lowercase: boolean
    numbers: boolean
    symbols: boolean
  }
  onOptionChange: (key: PasswordOption) => void
}

export default function PasswordOptions({ length, onLengthChange, options, onOptionChange }: PasswordOptionsProps) {
  return (
    <div className="space-y-6 mb-8">
      {/* Length Slider */}
      <LengthSlider value={length} onChange={onLengthChange} />

      {/* Character Options */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wide">Character Types</h3>
        <div className="space-y-2">
          <CustomCheckbox
            label="Uppercase (A–Z)"
            checked={options.uppercase}
            onChange={() => onOptionChange("uppercase")}
          />
          <CustomCheckbox
            label="Lowercase (a–z)"
            checked={options.lowercase}
            onChange={() => onOptionChange("lowercase")}
          />
          <CustomCheckbox label="Numbers (0–9)" checked={options.numbers} onChange={() => onOptionChange("numbers")} />
          <CustomCheckbox
            label="Symbols (!@#$%^&*...)"
            checked={options.symbols}
            onChange={() => onOptionChange("symbols")}
          />
        </div>
      </div>
    </div>
  )
}
