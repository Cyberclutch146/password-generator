export function generatePassword(
  length: number,
  options: {
    uppercase: boolean
    lowercase: boolean
    numbers: boolean
    symbols: boolean
  },
): string {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const lowercase = "abcdefghijklmnopqrstuvwxyz"
  const numbers = "0123456789"
  const symbols = "!@#$%^&*()-_=+{}[]<>/?"

  let chars = ""
  if (options.uppercase) chars += uppercase
  if (options.lowercase) chars += lowercase
  if (options.numbers) chars += numbers
  if (options.symbols) chars += symbols

  if (chars === "") return ""

  let password = ""
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    password += chars[randomIndex]
  }

  return password
}
