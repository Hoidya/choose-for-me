export const fateMessages = [
  '就这样了。',
  '宇宙已经替你决定。',
  '不要反悔。',
  '命运已定。',
  '接受这个结果。',
  '没有回头路。',
  '这就是答案。',
  '尘埃落定。',
]

export function getRandomFateMessage(): string {
  return fateMessages[Math.floor(Math.random() * fateMessages.length)]
}

export function getRandomResult<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}




