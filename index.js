import { Graph } from './src/math/graph.js'
import Point from './src/primitive/point.js'
import Segment from './src/primitive/segment.js'
import ViewPort from './src/viewport.js'
import GraphEditor from './src/graphEditor.js'

const CONTEXT_TYPE = '2d'
/**
 * @type {CanvasRenderingContext2DSettings}
 */
const CONTEXT_ATTRIBUTES = {}

const canvasOneEl = document.getElementById('canvasOne')
/**
 * @type {CanvasRenderingContext2D}
 */
const ctx = canvasOneEl.getContext(CONTEXT_TYPE, CONTEXT_ATTRIBUTES)

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
const viewport = new ViewPort(canvasOneEl)
const graphEditor = new GraphEditor(canvasOneEl, graph, CONTEXT_TYPE)

function animate() {
  ctx.clearRect(0, 0, canvasOneEl.width, canvasOneEl.height)
  ctx.save()
  const scaleValue = 1 / viewport.zoom
  ctx.scale(scaleValue, scaleValue)
  graphEditor.display()
  ctx.restore()
  requestAnimationFrame(animate)
}
animate()
// console.log('ponts', graph.points)
// console.log('segments', graph.segments)
console.warn('Everything in Order!')
