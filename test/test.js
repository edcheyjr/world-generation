import { average } from '../src/math/utils.js'
import Point from '../src/primitive/point.js'
const testEl = document.getElementById('test-result')
const testNo = 4
console.assert(2 + 2 === testNo, '%o', { testNo, error: 'sanity test failed' }) //sanity test
const p1 = new Point(2, 4)
const p2 = new Point(5, 8)

console.log('finds average')
const averagePoint = average(p1, p2)
const x = averagePoint.x
const y = averagePoint.y
console.assert((2 + 5) / 2 === x, '%o', { x, error: 'not the average' })
console.assert((4 + 8) / 2 === y, '%o', { y, error: 'not the average' })
