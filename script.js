// Constants
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz"
const NUMBERS = "0123456789"
const SYMBOLS = "!@#$%^&*()-_=+{}[]<>/?"

// DOM Elements
const passwordInput = document.getElementById("passwordInput")
const copyBtn = document.getElementById("copyBtn")
const generateBtn = document.getElementById("generateBtn")
const lengthSlider = document.getElementById("lengthSlider")
const lengthInput = document.getElementById("lengthInput")
const lengthDisplay = document.getElementById("lengthDisplay")
const uppercaseCheckbox = document.getElementById("uppercase")
const lowercaseCheckbox = document.getElementById("lowercase")
const numbersCheckbox = document.getElementById("numbers")
const symbolsCheckbox = document.getElementById("symbols")
const strengthBar = document.getElementById("strengthBar")
const strengthText = document.getElementById("strengthText")

// Tab Navigation
const navLinks = document.querySelectorAll(".nav-link")
const tabContents = document.querySelectorAll(".tab-content")

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const tabName = e.target.dataset.tab
    switchTab(tabName)
  })
})

function switchTab(tabName) {
  tabContents.forEach((tab) => tab.classList.remove("active"))
  navLinks.forEach((link) => link.classList.remove("active"))

  document.getElementById(tabName + "-tab").classList.add("active")
  document.querySelector(`[data-tab="${tabName}"]`).classList.add("active")
}

function scrollToGenerator() {
  switchTab("generator")
  window.scrollTo({ top: 0, behavior: "smooth" })
}

// ============== PASSWORD GENERATOR ==============
function generatePassword() {
  const length = Number.parseInt(lengthInput.value)
  const includeUppercase = uppercaseCheckbox.checked
  const includeLowercase = lowercaseCheckbox.checked
  const includeNumbers = numbersCheckbox.checked
  const includeSymbols = symbolsCheckbox.checked

  if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
    alert("Please select at least one character type!")
    return
  }

  let characters = ""
  if (includeUppercase) characters += UPPERCASE
  if (includeLowercase) characters += LOWERCASE
  if (includeNumbers) characters += NUMBERS
  if (includeSymbols) characters += SYMBOLS

  let password = ""
  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  passwordInput.value = password
  updateStrengthMeter(password)
}

function updateStrengthMeter(password) {
  let strength = 0
  if (password.length >= 8) strength += 25
  if (password.length >= 12) strength += 25
  if (/[A-Z]/.test(password)) strength += 10
  if (/[a-z]/.test(password)) strength += 10
  if (/[0-9]/.test(password)) strength += 10
  if (/[^A-Za-z0-9]/.test(password)) strength += 5

  strengthBar.style.width = strength + "%"

  if (strength < 40) {
    strengthBar.style.background = "linear-gradient(90deg, #ff6b6b, #ff8787)"
    strengthText.textContent = "Weak"
  } else if (strength < 70) {
    strengthBar.style.background = "linear-gradient(90deg, #ffd93d, #ffb700)"
    strengthText.textContent = "Medium"
  } else {
    strengthBar.style.background = "linear-gradient(90deg, #6bcf7f, #52c77a)"
    strengthText.textContent = "Strong"
  }
}

function copyToClipboard() {
  if (!passwordInput.value) {
    alert("Generate a password first!")
    return
  }

  navigator.clipboard.writeText(passwordInput.value).then(() => {
    const originalHTML = copyBtn.innerHTML
    copyBtn.innerHTML = '<span class="copy-icon">✓</span><span class="copy-text">Copied!</span>'
    copyBtn.style.background = "rgba(107, 207, 127, 0.5)"
    setTimeout(() => {
      copyBtn.innerHTML = originalHTML
      copyBtn.style.background = "rgba(102, 126, 234, 0.3)"
    }, 2000)
  })
}

lengthSlider.addEventListener("input", (e) => {
  lengthInput.value = e.target.value
  lengthDisplay.textContent = e.target.value
})

lengthInput.addEventListener("input", (e) => {
  let value = Number.parseInt(e.target.value)
  if (value < 8) value = 8
  if (value > 128) value = 128
  lengthInput.value = value
  lengthSlider.value = value
  lengthDisplay.textContent = value
})

generateBtn.addEventListener("click", generatePassword)
copyBtn.addEventListener("click", copyToClipboard)

// ============== STRENGTH TESTER ==============
const testPassword = document.getElementById("testPassword")
const testBtn = document.getElementById("testBtn")
const resultBar = document.getElementById("resultBar")
const resultText = document.getElementById("resultText")
const resultTips = document.getElementById("resultTips")

testBtn.addEventListener("click", () => {
  const pwd = testPassword.value
  if (!pwd) {
    resultText.textContent = "Enter a password to test"
    return
  }

  let strength = 0
  const tips = []

  if (pwd.length >= 12) strength += 30
  else if (pwd.length >= 8) strength += 20
  else strength += 10

  if (/[A-Z]/.test(pwd)) strength += 15
  else tips.push("• Add uppercase letters (A-Z)")

  if (/[a-z]/.test(pwd)) strength += 15
  else tips.push("• Add lowercase letters (a-z)")

  if (/[0-9]/.test(pwd)) strength += 15
  else tips.push("• Add numbers (0-9)")

  if (/[^A-Za-z0-9]/.test(pwd)) strength += 15
  else tips.push("• Add special characters (!@#$%^&*)")

  if (pwd.length < 12) tips.push("• Make it longer (12+ characters)")

  strength = Math.min(strength, 100)
  resultBar.style.width = strength + "%"

  if (strength < 40) {
    resultBar.style.background = "linear-gradient(90deg, #ff6b6b, #ff8787)"
    resultText.textContent = "Weak Password"
  } else if (strength < 70) {
    resultBar.style.background = "linear-gradient(90deg, #ffd93d, #ffb700)"
    resultText.textContent = "Medium Password"
  } else {
    resultBar.style.background = "linear-gradient(90deg, #6bcf7f, #52c77a)"
    resultText.textContent = "Strong Password"
  }

  resultTips.innerHTML = tips.length ? tips.join("<br>") : "✓ Great password!"
})

// ============== MINI GAMES ==============

// Pattern Matcher Game
const patternBoard = document.getElementById("patternBoard")
const patternStartBtn = document.getElementById("patternStartBtn")
const patternLevel = document.getElementById("patternLevel")
let patternSequence = []
let playerSequence = []
let patternGameActive = false

patternBoard.querySelectorAll(".pattern-tile").forEach((tile) => {
  tile.addEventListener("click", () => {
    if (!patternGameActive) return
    const id = tile.dataset.id
    playerSequence.push(id)
    flashTile(tile)
    if (playerSequence[playerSequence.length - 1] !== patternSequence[playerSequence.length - 1]) {
      alert("Game Over! Level: " + Number.parseInt(patternLevel.textContent))
      resetPatternGame()
      return
    }
    if (playerSequence.length === patternSequence.length) {
      setTimeout(playPatternSequence, 1000)
    }
  })
})

patternStartBtn.addEventListener("click", () => {
  patternSequence = []
  playerSequence = []
  patternGameActive = true
  patternLevel.textContent = "1"
  playPatternSequence()
})

function playPatternSequence() {
  playerSequence = []
  patternSequence.push(Math.floor(Math.random() * 4).toString())
  patternLevel.textContent = patternSequence.length

  let i = 0
  const showNextTile = () => {
    if (i < patternSequence.length) {
      const tile = document.querySelector(`[data-id="${patternSequence[i]}"]`)
      flashTile(tile)
      i++
      setTimeout(showNextTile, 800)
    }
  }
  showNextTile()
}

function flashTile(tile) {
  tile.classList.add("active")
  setTimeout(() => tile.classList.remove("active"), 500)
}

function resetPatternGame() {
  patternGameActive = false
  patternSequence = []
  playerSequence = []
}

// Word to Password Converter
const wordInput = document.getElementById("wordInput")
const wordConvertBtn = document.getElementById("wordConvertBtn")
const wordResult = document.getElementById("wordResult")

wordConvertBtn.addEventListener("click", () => {
  const word = wordInput.value.trim()
  if (!word) return

  let converted = ""
  for (const char of word) {
    const code = char.charCodeAt(0)
    if (converted.length < 12) {
      if (char === char.toUpperCase()) converted += char.toUpperCase()
      else converted += char.toUpperCase() + Math.floor(Math.random() * 10)
    }
  }
  converted += Math.floor(Math.random() * 100)
  converted += "!@#"[Math.floor(Math.random() * 3)]

  wordResult.textContent = converted
})

// Character Hunt Game
const huntCharacter = document.getElementById("huntCharacter")
const huntOptions = document.getElementById("huntOptions")
const huntScore = document.getElementById("huntScore")
const huntStartBtn = document.getElementById("huntStartBtn")

let huntGameActive = false
let huntCurrentScore = 0
const characterTypes = [
  { char: "A", type: "uppercase" },
  { char: "z", type: "lowercase" },
  { char: "5", type: "number" },
  { char: "@", type: "symbol" },
]

huntStartBtn.addEventListener("click", () => {
  huntGameActive = true
  huntCurrentScore = 0
  huntScore.textContent = "0"
  playHuntRound()
})

function playHuntRound() {
  if (huntCurrentScore >= 10) {
    alert("You won! Score: 10/10")
    huntGameActive = false
    return
  }

  const correct = characterTypes[Math.floor(Math.random() * characterTypes.length)]
  huntCharacter.textContent = correct.char

  const options = [...characterTypes.sort(() => 0.5 - Math.random()).slice(0, 3), correct].sort(
    () => 0.5 - Math.random(),
  )

  huntOptions.innerHTML = ""
  options.forEach((opt) => {
    const btn = document.createElement("div")
    btn.className = "hunt-option"
    btn.textContent = opt.type
    btn.addEventListener("click", () => {
      if (opt.type === correct.type) {
        huntCurrentScore++
        huntScore.textContent = huntCurrentScore
        btn.classList.add("correct")
        setTimeout(playHuntRound, 800)
      } else {
        btn.classList.add("incorrect")
        setTimeout(() => {
          alert("Wrong! Score: " + huntCurrentScore + "/10")
          huntGameActive = false
        }, 500)
      }
    })
    huntOptions.appendChild(btn)
  })
}

// Memory Chain Game
const memoryDisplay = document.getElementById("memoryDisplay")
const memoryInput = document.getElementById("memoryInput")
const memoryStartBtn = document.getElementById("memoryStartBtn")
const chainLength = document.getElementById("chainLength")

let memorySequence = ""
let memoryGameActive = false

memoryStartBtn.addEventListener("click", () => {
  memoryGameActive = true
  memorySequence = ""
  memoryInput.value = ""
  chainLength.textContent = "0"
  generateMemoryChain()
})

function generateMemoryChain() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const newChar = chars[Math.floor(Math.random() * chars.length)]
  memorySequence += newChar
  chainLength.textContent = memorySequence.length

  memoryDisplay.textContent = memorySequence
  setTimeout(() => {
    memoryDisplay.textContent = ""
    memoryInput.focus()
  }, 2000)
}

memoryInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && memoryGameActive) {
    if (memoryInput.value === memorySequence) {
      memoryInput.value = ""
      setTimeout(generateMemoryChain, 500)
    } else {
      alert("Wrong! Chain length: " + memorySequence.length)
      memoryGameActive = false
      memorySequence = ""
    }
  }
})

// Initial Generation
generatePassword()
