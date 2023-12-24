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

graph.draw(ctx)

// Test if it working
console.warn('Everything in Order!')
