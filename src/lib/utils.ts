import { Input } from '../stores/form'

export const generateInitInputs = (initialNumberOfInputs: number = 3) => {
  const result: Record<string, Input> = {}

  for (let i = 0; i < initialNumberOfInputs; i++) {
    const idx = crypto.randomUUID()
    result[idx] = {
      idx,
      value: ''
    }
  }

  return result
}

export const getVowelsCount = (str: string) => {
  const m = str.match(/[aeiou]/gi)

  return m === null ? 0 : m.length
}
