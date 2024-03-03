import World from '../world.js'
import Viewport from '../viewport.js'
import { getNearestSegment } from '../math/utils.js'
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
    this.intent = null
    this.isDisabled = false
    this.mouse = null
    console.log('intialized')
  }
  #getCanvas() {
    return this.viewport.canvas
  }
  /**
   * enables stop editor
   */
  enable() {
    this.#addEventListeners()
    this.isDisabled = false
  }
  /**
   * disables stop editor
   */
  disable() {
    this.#removeEventListeners()
    this.isDisabled = true
  }

  /**
   * display fuction for stop editor
   */
  display() {
    if (this.intent) {
      this.intent.draw(this.ctx, {
        width: 4,
        color: 'blue',
      })
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
    console.log('seg', seg)
    if (seg) {
      const proj = seg.projectPoint(this.mouse)
      if (proj.offset >= 0 && proj.offset <= 1) {
        this.intent = proj.point
      } else {
        this.intent = null
      }
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
