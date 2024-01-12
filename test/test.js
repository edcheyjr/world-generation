import { average, getIntersection } from '../src/math/utils.js'
import Point from '../src/primitive/point.js'
import Polygon from '../src/primitive/polygon.js'
import Segment from '../src/primitive/segment.js'
const testEl = document.getElementById('test-result')
const testNo = 4
console.assert(2 + 2 === testNo, '%o', { testNo, error: 'sanity test failed' }) //sanity test
const p1 = new Point(0, 0)
const p2 = new Point(0, 100)
const p3 = new Point(100, 0)
const p4 = new Point(100, 100)
const seg = new Segment(p1, p2)
const poly = new Polygon([p1, p2, p3, p4])
console.log('new polygon', poly)
console.log('finds average test')
const averagePoint = average(p1, p2)
const x = averagePoint.x
const y = averagePoint.y

console.assert((0 + 0) / 2 === x, '%o', {
  value: x,
  error: 'not the average, average fn failed',
})
console.assert((0 + 100) / 2 === y, '%o', {
  value: y,
  error: 'not the average, average fn failed',
})
console.log('test contains point')
const testPoint = new Point(50, 50)
const containsPoint = poly.containsPoint(testPoint)
console.assert(containsPoint == true, '%o', {
  value: testPoint,
  error: 'failed does not contain that point',
})
console.log('test contains segement')
const testSeg = new Segment(testPoint, new Point(75, 75))
const containsSeg = poly.containsSegment(testSeg)
console.assert(containsSeg == true, '%o', {
  value: testSeg,
  error: 'failed does not contain that poin',
})

console.log('test intersections')
const int = getIntersection({ A: p1, B: p2 }, { C: p3, D: p4 })
console.assert(int == null, '%o', {
  value: int,
  error: 'not true should not intersect',
})
const inttwo = getIntersection(
  { A: new Point(2, 4), B: new Point(2, 10) },
  { C: new Point(3, -1), D: new Point(3, 10) }
)
console.assert(int == null, '%o', {
  value: int,
  error: 'not true should not intersect',
})
//TODO Test break multibreak and union
