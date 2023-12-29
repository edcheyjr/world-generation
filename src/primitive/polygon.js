import Point from './point.js'

/**
 * primtive shape bulder class
 */
export default class Polygon {
  /**
   * Polygon shape
   * @param {Point[]} points
   */
  constructor(points) {
    this.points = points
  }
  /**
   * gets the intersections btwn two polygons
   * _______________________________________
   *
   * @param {Polygon} poly1 polygon one info
   * @param {Polygon} poly2 polygon two info
   * @returns {Points[]} interections points
   */
  static break(poly1, poly2) {
    // TODO
  }

  /**
   * draw function for a polygon
   * @param {CanvasRenderingContext2D} ctx 2D canvas context
   * @param {object} attributes optional styling attributes
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
