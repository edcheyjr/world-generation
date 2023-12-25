export default class Point {
  /**
   * Draw a point on canvas
   *
   * ------------------------
   *
   * @param {number} x a position from 0 to canvas width
   * @param {number} y a position from 0 to canvas height
   *
   *
   * @return { Point} a new point object
   */
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  /**
   * Draw function
   * @param {CanvasRenderingContext2D} ctx 2D canvas context
   * @param {object} attributes
   * @param {number} attributes.size size for individual points
   * @param {string} attributes.color color
   * @param {boolean} attributes.outlined is outlined
   */

  draw(ctx, { size = 18, color = 'black', outlined = false } = {}) {
    const radius = size * 0.5
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
    if (outlined) {
      ctx.save()
      ctx.globalAlpha = 0.8
      ctx.beginPath()
      ctx.lineWidth = 2
      ctx.strokeStyle = 'red'
      ctx.arc(this.x, this.y, radius * 0.6, 0, Math.PI * 2)
      ctx.stroke()
      ctx.restore()
    }
  }

  /**
   * @param {Point} point
   */
  equals(point) {
    return point.x == this.x && point.y == this.y
  }
}
