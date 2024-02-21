import { Graph } from './src/math/graph.js'
import ViewPort from './src/viewport.js'
import GraphEditor from './src/graphEditor.js'
import World from './src/world.js'
import { getItem, setItem } from './src/helpers/localStorageAcess.js'
import { scale } from './src/math/utils.js'

const CONTEXT_TYPE = '2d'
const GRAPH_STORE_NAME = 'graph'
/**
 * @type {CanvasRenderingContext2DSettings}
 */
const CONTEXT_ATTRIBUTES = {}

const canvasOneEl = document.getElementById('canvasOne')

//control buttons
const clearBtnEl = document.getElementById('clear-btn')
const saveBtnEl = document.getElementById('save-btn')
const graphBtnEl = document.getElementById('graph')
const stopBtnEl = document.getElementById('stop')
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
const world = new World(graph)
let oldHash = world.hash()
console.log('oldHash', oldHash)

function animate() {
  viewport.reset(ctx)
  if (world.hash() != oldHash) {
    world.generate()
    oldHash = world.hash()
  }
  const viewPoint = scale(viewport.getOffset(), -1)
  world.draw(ctx, viewPoint)

  ctx.globalAlpha = 0.4
  graphEditor.display()
  requestAnimationFrame(animate)
}
animate()
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
/**
 * disable editors
 */
function disableAllEditors() {
  graphBtnEl.style.backgroundColor = '#88888888'
  graphBtnEl.style.filter = 'grayscale(100%)'
  graphEditor.disable()
  stopBtnEl.style.backgroundColor = '#88888888'
  stopBtnEl.style.filter = 'grayscale(100%)'
}

/**
 * set an editor active
 * @param {'graph' | 'stop'} mode editor mode to be set to active
 */
function setMode(mode = 'graph') {
  //disable all editors currently active
  disableAllEditors()
  switch (mode) {
    case 'graph':
      console.log('graph')
      graphBtnEl.style.backgroundColor = 'rgba(34, 170, 86, 0.336)'
      graphBtnEl.style.filter = ''
      graphEditor.enable()
      break
    case 'stop':
      console.log('graph')
      stopBtnEl.style.backgroundColor = 'rgba(34, 170, 86, 0.336)'
      stopBtnEl.style.filter = ''
      break
  }
}
graphBtnEl.addEventListener('click', () => setMode('graph'))
stopBtnEl.addEventListener('click', () => setMode('stop'))
