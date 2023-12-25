import { Graph } from './math/graph.js'
import Point from './primitive/point.js'
import { getNearestPoint } from './math/utils.js'

export default class GraphEditor {
  /**
   * Graph Editor
   * @param {HTMLCanvasElement} canvas this canvas el
   * @param {Graph} graph graph
   * @param {string} contextType 2D
   * @returns {GraphEditor} new graph editor
   */
  constructor(canvas, graph, contextType) {
    this.canvas = canvas
    this.graph = graph
    /**
     * context
     * @type {CanvasRenderingContext2D}
     */
    this.ctx = this.canvas.getContext(contextType)
    this.#addEventListeners()
    this.selected = null
    this.hovered = null
  }
  #addEventListeners() {
    this.canvas.addEventListener('mousedown', (e) => {
      let mousePoint = new Point(e.offsetX, e.offsetY)
      this.hovered = getNearestPoint(mousePoint, this.graph.points, 12)
      if (this.hovered) {
        this.selected = this.hovered
        return
      }
      this.graph.addPoint(mousePoint)
      this.selected = mousePoint
    })
    this.canvas.addEventListener('mousemove', (e) => {
      const mousePoint = new Point(e.offsetX, e.offsetY)
      this.hovered = getNearestPoint(mousePoint, this.graph.points, 12)
    })
    // this.canvas.addEventListener('mouseleave', (e) => {
    //   this.hovered = null
    // })
  }
  display() {
    this.graph.draw(this.ctx)
    if (this.selected) {
      this.selected.draw(this.ctx, { outlined: true })
    }
    if (this.hovered) {
      this.hovered.draw(this.ctx, { fill: true })
    }
  }
}
