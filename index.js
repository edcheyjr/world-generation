import { Graph } from './src/math/graph.js'
import ViewPort from './src/viewport.js'
import GraphEditor from './src/graphEditor.js'
import Envelope from './src/primitive/envelope.js'
import { getItem, setItem } from './src/helpers/localStorageAcess.js'

const CONTEXT_TYPE = '2d'
const GRAPH_STORE_NAME = 'graph'
/**
 * @type {CanvasRenderingContext2DSettings}
 */
const CONTEXT_ATTRIBUTES = {}

const canvasOneEl = document.getElementById('canvasOne')
const clearBtnEl = document.getElementById('clear-btn')
const saveBtnEl = document.getElementById('save-btn')
/**
 * @type {CanvasRenderingContext2D}
 */
const ctx = canvasOneEl.getContext(CONTEXT_TYPE, CONTEXT_ATTRIBUTES)

/**
 * graph info
 * @type {{
 * points:{x:number,y:number}[],
 * segments: {p1:{x:number, y:number},
 * p2:{x:number, y:number}}[]
 * } | null
 * }
 */
const graphInfo = getItem(GRAPH_STORE_NAME, 'object')
const graph = graphInfo ? Graph.load(graphInfo) : new Graph()
const viewport = new ViewPort(canvasOneEl)
const graphEditor = new GraphEditor(viewport, graph, CONTEXT_TYPE)

function animate() {
  viewport.reset(ctx)
  if (graph.segments.length > 0) {
    for (let seg of graph.segments) {
      new Envelope(seg, 80, 20).draw(ctx)
    }
  }
  graphEditor.display()
  requestAnimationFrame(animate)
}
animate()
// console.log('ponts', graph.points)
// console.log('segments', graph.segments)
console.warn('Everything in Order!')

/**
 * Clear everything in the editor
 */
function dispose() {
  graphEditor.dispose()
  console.log('sucessfully cleared graph')
}
clearBtnEl.addEventListener('click', dispose)

/**
 * saves graph content
 */
function save() {
  setItem(GRAPH_STORE_NAME, graph)
  console.log('sucessfully saved graph')
}
saveBtnEl.addEventListener('click', save)
