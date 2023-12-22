import Point from './point'

export default class Segment {
  /**
   * Draw joint between two points p1 and p2
   * ______________________________________
   *
   * @param {Point} p1 point one
   * @param {Point} p2 point two
   *
   * @return {Segment} segment class object
   */
  constructor(p1, p2) {
    this.p1 = p1
    this.p2 = p2
  }
  /**
   *
   * @param {CanvasRenderingContext2D} ctx 2D canvas context
   * @param {number} width thickness of the line
   * @param {string} color  line/stroke color
   */
  draw(ctx, width = 2, color = 'black') {
    ctx.beginPath()
    ctx.lineWidth = width
    ctx.strokeStyle = color
    ctx.moveTo(this.p1.x, this.p1.y)
    ctx.lineTo(this.p2.x, this.p2.y)
    ctx.stroke()
  }
}
