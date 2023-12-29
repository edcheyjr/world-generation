import Point from './point.js'
export default class Polygon {
  /**
   * Polygon shape
   * @param {Point[]} points
   */
  constructor(points) {
    this.points = points
  }
  /**
   * draw function for a polygon
   * @param {CanvasRenderingContext2D} ctx 2D canvas context
   * @param {object} attributes
   * @param {number} attributes.strokeColor  stroke color
   * @param {string} attributes.fillColor bg color
   * @param {number} attributes.lineWidth bg color
   */

  draw(
    ctx,
    {
      strokeColor = 'blue',
      fillColor = 'rgba(0,0, 255, 0.3)',
      lineWidth = 2,
    } = {}
  ) {
    if (this.points.length > 1) {
      ctx.beginPath()
      ctx.fillStyle = fillColor
      ctx.strokeStyle = strokeColor
      ctx.lineWidth = lineWidth
      ctx.moveTo(this.points[0].x, this.points[0].y)
      for (let i = 1; i < this.points.length; i++) {
        ctx.lineTo(this.points[i].x, this.points[i].y)
      }
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
    }
  }
}
