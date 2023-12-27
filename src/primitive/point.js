export default class Point {
  /**
   * Draw a point on canvas
   *
   * ------------------------
   *
   * @param {number} x some position from 0 to canvas width (X axis)
   * @param {number} y some position from 0 to canvas height (Y axis)
   *
   *
   * @return { Point} a new point object
   */
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  /**
   * draw function for a point
   * @param {CanvasRenderingContext2D} ctx 2D canvas context
   * @param {object} attributes
   * @param {number} attributes.size size for individual points
   * @param {string} attributes.color color
   * @param {boolean} attributes.outlined is outlined
   * @param {boolean} attributes.fill is fill
   */

  draw(
    ctx,
    { size = 18, color = 'black', outlined = false, fill = false } = {}
  ) {
    const radius = size * 0.5
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
    if (outlined) {
      ctx.globalAlpha = 0.8
      ctx.beginPath()
      ctx.lineWidth = 2
      ctx.strokeStyle = 'red'
      ctx.arc(this.x, this.y, radius * 0.6, 0, Math.PI * 2)
      ctx.stroke()
      ctx.globalAlpha = 1
    }
    if (fill) {
      ctx.beginPath()
      ctx.fillStyle = 'orange'
      ctx.arc(this.x, this.y, radius * 0.3, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  /**
   * test equality of current(this) point and passed point
   * @param {Point} point
   */
  equals(point) {
    return point.x == this.x && point.y == this.y
  }
}
