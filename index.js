import { Graph } from './src/math/graph.js'
import Point from './src/primitive/point.js'
import Segment from './src/primitive/segment.js'

const CONTEXT_TYPE = '2d'
/**
 * @type {CanvasRenderingContext2DSettings}
 */
const CONTEXT_ATTRIBUTES = {}

const canvasOne = document.getElementById('canvasOne')
const addPoint = document.getElementById('addPoint')
const addSegment = document.getElementById('addSegment')
/**
 * @type {CanvasRenderingContext2D}
 */
const ctx = canvasOne.getContext(CONTEXT_TYPE, CONTEXT_ATTRIBUTES)
const addRandomPoint = () => {
  const success = graph.tryAddPoint(
    new Point(Math.random() * canvasOne.width, Math.random() * canvasOne.height)
  )
  console.log('success status', success)
  ctx.clearRect(0, 0, canvasOne.width, canvasOne.height)
  graph.draw(ctx)
}
addPoint.addEventListener('click', addRandomPoint)

const addRandomSegment = () => {
  const index = Math.floor(Math.random() * graph.points.length)
  const index2 = Math.floor(Math.random() * graph.points.length)
  if (index != index2) {
    const success = graph.tryAddSegment(
      new Segment(graph.points[index], graph.points[index2])
    )
    console.log('success status', success)
  } else {
    console.warn('trying to add segement on the same point , try again')
  }
  ctx.clearRect(0, 0, canvasOne.width, canvasOne.height)
  graph.draw(ctx)
}
addSegment.addEventListener('click', addRandomSegment)

const p1 = new Point(100, 100)
const p2 = new Point(300, 400)
const p3 = new Point(200, 100)
const p4 = new Point(400, 400)
const s1 = new Segment(p1, p2)
const s2 = new Segment(p2, p3)
const s3 = new Segment(p1, p3)
const s4 = new Segment(p3, p4)
const s5 = new Segment(p2, p4)
const graph = new Graph([p1, p2, p3, p4], [s2, s1, s3, s4, s5])
graph.draw(ctx)

// Test if it working
console.warn('Everything in Order!')
