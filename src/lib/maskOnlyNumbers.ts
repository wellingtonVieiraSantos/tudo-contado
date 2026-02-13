export const maskOnlyNumbers = (value: string, max?: number) => {
  const numbers = value.replace(/\D/g, '')
  return max ? numbers.slice(0, max) : numbers
}
