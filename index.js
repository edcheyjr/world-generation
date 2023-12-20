import { Graph } from './src/math/graph.js'
import Point from './src/primitive/point.js'
import Segment from './src/primitive/segment.js'

const CONTEXT_TYPE = '2d'
/**
 * @type {CanvasRenderingContext2DSettings}
 */
const CONTEXT_ATTRIBUTES = {}

const canvasOne = document.getElementById('canvasOne')
/**
 * @type {CanvasRenderingContext2D}
 */
const ctx = canvasOne.getContext(CONTEXT_TYPE, CONTEXT_ATTRIBUTES)
console.log('ctx', ctx)

// draw an empty graph
const graph = new Graph()
graph.draw(ctx)

// Test if it working
console.warn('Everything in Order!')
