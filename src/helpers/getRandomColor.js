export function getRandomColor() {
  const hue = 290 + Math.random() * 260
  return `hsl(${hue},100%, 60%)`
}
