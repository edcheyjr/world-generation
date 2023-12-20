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
   * @return { Point} a new point
   */
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  /**
   * Draw function
   *
   * @param {CanvasRenderingContext2D} ctx 2D canvas context
   * @param {number} size size for individual points
   * @param {string} color color
   */

  draw(ctx, size = 18, color = 'black') {
    const radius = size * 0.5
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
  }
}
