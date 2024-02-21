import World from '../world'
import Viewport from '../viewport'
import { getNearestSegment } from '../math/utils'
/**
 * stop editor
 */
export default class StopEditor {
  /**
   * Stop Editor
   * @param {Viewport} viewport this viewport
   * @param {World}  world world object
   * @returns {StopEditor} new graph editor
   */
  constructor(viewport, world) {
    this.viewport = viewport
    this.world = world
    this.ctx = this.#getCanvas().getContext('2d')
    this.boundMouseDown = this.#handleMouseDown.bind(this)
    this.boundMouseMove = this.#handleMouseMove.bind(this)
    this.preventDefault = (e) => e.preventDefault()
    /**
     * @type {Segment | null}
     */
    this.intent = null
    this.mouse = null
  }
  #getCanvas() {
    return this.viewport.canvas
  }
  /**
   * enables graph editor
   */
  enable() {
    this.#addEventListeners()
  }
  /**
   * disables graph editor
   */
  disable() {
    this.#removeEventListeners()
  }

  /**
   * display fuction for stop editor
   */
  display() {
    if (this.intent) {
      this.intent.draw(this.ctx)
    }
  }
  /**
   * @param {MouseEvent} e mouse event
   */
  #handleMouseDown(e) {}
  /**
   * @param {MouseEvent} e mouse event
   */
  #handleMouseMove(e) {
    this.mouse = this.viewport.getMousePointPos(e, true)
    const seg = getNearestSegment(
      this.mouse,
      this.world.graph.segments,
      12 * this.viewport.zoom
    )

    if (seg) {
      this.intent = seg
    } else {
      this.intent = null
    }
  }

  #addEventListeners() {
    this.#getCanvas().addEventListener('mousedown', this.boundMouseDown)
    this.#getCanvas().addEventListener('mousemove', this.boundMouseMove)
    this.#getCanvas().addEventListener('contextmenu', this.preventDefault) //prevent default menus
  }
  #removeEventListeners() {
    this.#getCanvas().removeEventListener('mousedown', this.boundMouseDown)
    this.#getCanvas().removeEventListener('mousemove', this.boundMouseMove)
    this.#getCanvas().removeEventListener('contextmenu', this.preventDefault) //prevent default menus
  }
}
