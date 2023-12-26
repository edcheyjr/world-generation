import Point from './primitive/point.js'

export default class Viewport {
  /**
   * Viewport
   * @param {HTMLCanvasElement} canvas this canvas el
   * @returns {Viewport} viewport object
   */
  constructor(canvas) {
    this.canvas = canvas
    this.zoom = 1
    this.zoomAttir = {
      minZoom: 1,
      maxZoom: 5,
      zoomSteps: 0.1,
    }
    this.#addEventListeners()
  }

  #addEventListeners() {
    this.canvas.addEventListener('wheel', this.#handleMouseWheel.bind(this))
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
