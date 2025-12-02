"use client"

import { useState, useCallback } from "react"
import { generatePassword } from "@/utils/generatePassword"
import PasswordDisplay from "./PasswordDisplay"
import PasswordOptions from "./PasswordOptions"
import GenerateButton from "./GenerateButton"

export default function PasswordCard() {
  const [password, setPassword] = useState("P@ssw0rd123!")
  const [length, setLength] = useState(16)
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  })

  const handleGenerate = useCallback(() => {
    // Validate at least one option is selected
    const hasSelected = Object.values(options).some((val) => val === true)
    if (!hasSelected) {
      alert("Please select at least one character type")
      return
    }

    const newPassword = generatePassword(length, options)
    setPassword(newPassword)
  }, [length, options])

  const handleOptionChange = (key: keyof typeof options) => {
    setOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="w-full max-w-md glass-card">
      {/* Title */}
      <h1 className="text-4xl font-bold text-white text-center mb-8 text-balance">Password Generator</h1>

      {/* Password Display */}
      <PasswordDisplay password={password} />

      {/* Options */}
      <PasswordOptions
        length={length}
        onLengthChange={setLength}
        options={options}
        onOptionChange={handleOptionChange}
      />

      {/* Generate Button */}
      <GenerateButton onClick={handleGenerate} />
    </div>
  )
}
