import { Graph } from './math/graph.js'
import Point from './primitive/point.js'
import { getNearestPoint } from './math/utils.js'
import Segment from './primitive/segment.js'

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
    /**
     * context
     * @type {CanvasRenderingContext2D}
     */
    this.ctx = this.canvas.getContext(contextType)
    this.graph = graph
    this.mouse = null
    this.hovered = null
    this.selected = null
    this.dragging = false
    this.#addEventListeners()
  }
  #addEventListeners() {
    this.canvas.addEventListener('mousedown', (e) => {
      if (e.button == 2) {
        //right click mouse to remove
        if (this.hovered) {
          this.#removePoint(this.hovered)
        } else {
          this.selected = null
        }
      }

      if (e.button == 0) {
        //left click mouse to select
        if (this.hovered) {
          // added segment between point
          this.#selectPoint(this.hovered)
          this.dragging = true
          return
        }
        this.#selectPoint(this.mouse)
        this.graph.tryAddPoint(this.mouse)
        this.hovered = this.mouse
      }
    })
    this.canvas.addEventListener('mousemove', (e) => {
      this.mouse = new Point(e.offsetX, e.offsetY)
      this.hovered = getNearestPoint(this.mouse, this.graph.points, 12)
      if (this.dragging) {
        this.selected.x = this.mouse.x
        this.selected.y = this.mouse.y
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
   * @param {Point} point
   */
  #removePoint(point) {
    this.hovered = null
    if (point == this.selected) {
      this.selected = null
    }
    this.graph.removePoint(point)
  }
  /**
   * select a point and also tries to add a segment between prev selected and the new selected point
   * @param {Point} point
   */
  #selectPoint(point) {
    if (this.selected) {
      this.graph.tryAddSegment(new Segment(this.selected, point))
    }
    this.selected = point
  }
}
