import Point from './primitive/point.js'
import { subract, add } from './math/utils.js'

export default class Viewport {
  /**
   * Viewport
   * @param {HTMLCanvasElement} canvas this canvas el
   * @returns {Viewport} viewport object
   */
  constructor(canvas) {
    this.canvas = canvas
    this.zoom = 1
    this.globalOffset = new Point(0, 0)
    this.zoomAttir = {
      minZoom: 1,
      maxZoom: 5,
      zoomSteps: 0.1,
    }
    this.keys = []
    this.pan = {
      start: new Point(0, 0),
      end: new Point(0, 0),
      offset: new Point(0, 0),
      active: false,
    }
    this.#addEventListeners()
  }

  #addEventListeners() {
    this.canvas.addEventListener('wheel', this.#handleMouseWheel.bind(this))
    this.canvas.addEventListener('mousedown', this.#handleMouseDown.bind(this))
    this.canvas.addEventListener('mousemove', this.#handleMouseMove.bind(this))
    this.canvas.addEventListener('mouseup', this.#handleMouseUp.bind(this))
  }
  /**
   * handle mouse down
   * @param {MouseEvent} e mouse wheel event
   */
  #handleMouseDown(e) {
    //middle button used for panningSimulator
    if (e.button == 1) {
      this.pan.start = this.getMousePointPos(e)
      this.pan.active = true
    }
  }
  /**
   * handle mouse move
   * @param {MouseEvent} e mouse wheel event
   */
  #handleMouseMove(e) {
    if (this.pan.active) {
      this.pan.end = this.getMousePointPos(e)
      this.pan.offset = subract(this.pan.end, this.pan.start)
    }
  }
  /**
   * handle mouse up
   * @param {MouseEvent} e
   */
  #handleMouseUp() {
    if (this.pan.active) {
      this.globalOffset = add(this.globalOffset, this.pan.offset)
      this.pan = {
        start: new Point(0, 0),
        end: new Point(0, 0),
        offset: new Point(0, 0),
        active: false,
      }
    }
  }
  /**
   * handle mouse wheel
   * @param {WheelEvent} e mouse wheel event
   */
  #handleMouseWheel(e) {
    const dir = Math.sign(e.deltaY) // +ve or -ve
    this.zoom += dir * this.zoomAttir.zoomSteps
    this.zoom = Math.max(
      this.zoomAttir.minZoom,
      Math.min(this.zoomAttir.maxZoom, this.zoom)
    ) // zoom cap between min and max zooms
  }

  /**
   * Get mouse point position in respect to zoom level
   * @param {MouseEvent} e
   * @return {Point} mouse point
   */
  getMousePointPos(e) {
    return new Point(e.offsetX * this.zoom, e.offsetY * this.zoom)
  }
}
