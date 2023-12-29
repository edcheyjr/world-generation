import Point from './primitive/point.js'
import { subract, add, scale } from './math/utils.js'
import { getItem, setItem } from './helpers/localStorageAcess.js'

const ZOOM_LEVEL = 'zoom-level'
export default class Viewport {
  /**
   * Viewport
   * @param {HTMLCanvasElement} canvas this canvas el
   * @returns {Viewport} viewport object
   */
  constructor(canvas) {
    this.canvas = canvas
    this.zoom = getItem(ZOOM_LEVEL, 'number') || 1
    this.center = new Point(canvas.width / 2, canvas.height / 2)
    this.globalOffset = scale(this.center, -1)
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
    setItem(ZOOM_LEVEL, this.zoom) // persist current zoom
  }

  /**
   * Get mouse point position in respect to zoom level
   * @param {MouseEvent} e
   * @param {boolean | undefined} subtractPanOffset this is boolean
   * @return {Point} mouse point
   */
  getMousePointPos(e, subtractPanOffset = false) {
    const p = new Point(
      (e.offsetX - this.center.x) * this.zoom - this.globalOffset.x,
      (e.offsetY - this.center.y) * this.zoom - this.globalOffset.y
    )
    return subtractPanOffset ? subract(p, this.pan.offset) : p
  }
  /**
   * gets cumulative offset of the globalOffset and pan offset
   * @returns {Point}
   */
  getOffset() {
    return add(this.globalOffset, this.pan.offset)
  }
  /**
   * changes current viewport settings
   * @param {CanvasRenderingContext2D} ctx canvas context
   */
  reset(ctx) {
    ctx.restore()
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.save()
    const scaleValue = 1 / this.zoom
    ctx.translate(this.center.x, this.center.y)
    ctx.scale(scaleValue, scaleValue) //zooming / scaling
    const offset = this.getOffset()
    ctx.translate(offset.x, offset.y) // panning / translating
  }
}
