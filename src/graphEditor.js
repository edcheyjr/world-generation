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
    this.canvas.addEventListener('mousedown', this.#handleMouseDown.bind(this))
    this.canvas.addEventListener('mousemove', (e) =>
      this.#handleMouseMove.bind(this)
    )
    this.canvas.addEventListener('mouseup', () => (this.dragging = false))
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault()) //prevent default menus
  }

  display() {
    this.graph.draw(this.ctx)
    if (this.selected) {
      const intent = this.hovered ?? this.mouse
      this.ctx.globalAlpha = 0.3
      new Segment(this.selected, intent).draw(this.ctx, { dashed: [3, 3] })
      this.ctx.globalAlpha = 1
      this.selected.draw(this.ctx, { outlined: true })
    }
    if (this.hovered) {
      this.hovered.draw(this.ctx, { fill: true })
    }
  }
  /**
   * @param {MouseEvent} e mouse event
   */
  #handleMouseDown(e) {
    if (e.button == 2) {
      //right click mouse to remove
      if (this.selected) {
        this.selected = null
      } else if (this.hovered) {
        this.#removePoint(this.hovered)
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
  }
  /**
   * @param {MouseEvent} e mouse event
   */
  #handleMouseMove(e) {
    this.mouse = new Point(e.offsetX, e.offsetY)
    this.hovered = getNearestPoint(this.mouse, this.graph.points, 12)
    if (this.dragging) {
      this.selected.x = this.mouse.x
      this.selected.y = this.mouse.y
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
