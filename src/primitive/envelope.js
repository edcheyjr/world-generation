import Point from './point.js'
export default class Envelope {
  /**
   * a polygon structure around points and it's segments
   * @param {Point[]} points points making the envelope
   * @param {number} width thickness of the envelope
   */
  constructor(points, width = 80) {
    this.points = points
    this.width = width
  }
  /**
   * draw function
   * @param {CanvasRenderingContext2D} ctx context
   * @param {object} attributes optional styling attributes
   */
  draw(ctx, {} = {}) {}
}
