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
    this.dragging = false
  }
  #addEventListeners() {
    this.canvas.addEventListener('mousedown', (e) => {
      if (e.button == 2) {
        //right click mouse to remove
        if (this.hovered) {
          this.#removePoint(this.hovered)
        }
      }

      if (e.button == 0) {
        //left click mouse to select
        let mousePoint = new Point(e.offsetX, e.offsetY)
        if (this.hovered) {
          this.selected = this.hovered
          this.dragging = true
          return
        }
        this.graph.addPoint(mousePoint)
        this.selected = mousePoint
        this.hovered = mousePoint
      }
    })
    this.canvas.addEventListener('mousemove', (e) => {
      const mousePoint = new Point(e.offsetX, e.offsetY)
      this.hovered = getNearestPoint(mousePoint, this.graph.points, 12)
      if (this.dragging) {
        this.selected.x = mousePoint.x
        this.selected.y = mousePoint.y
      }
    })
    this.canvas.addEventListener('mouseup', () => (this.dragging = false))
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault()) //prevent default menus
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
  /**
   * @param {Point} p
   */
  #removePoint(p) {
    this.hovered = null
    this.selected = null
    this.graph.removePoint(p)
  }
}
