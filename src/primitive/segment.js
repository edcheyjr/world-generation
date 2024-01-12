import Point from './point.js'
import { distance } from '../math/utils.js'

/**
 * primtive shape bulder class
 */
export default class Segment {
  /**
   * Draw joint between two points p1 and p2
   * ______________________________________
   * @param {Point} p1 point one
   * @param {Point} p2 point two
   */
  constructor(p1, p2) {
    this.p1 = p1
    this.p2 = p2
  }
  /**
   * draw function for a segment
   * @param {CanvasRenderingContext2D} ctx 2D canvas context
   * @param {object} attributes segments optional additional attributes
   * @param {number} attributes.width thickness of the line
   * @param {string} attributes.color  line/stroke color
   * @param {number[]} attributes.dashed  array of dash size and gap size [dash, gap]
   */
  draw(ctx, { width = 2, color = 'black', dashed = [] } = {}) {
    ctx.beginPath()
    ctx.lineWidth = width
    ctx.strokeStyle = color
    ctx.setLineDash(dashed)
    ctx.moveTo(this.p1.x, this.p1.y)
    ctx.lineTo(this.p2.x, this.p2.y)
    ctx.stroke()
    ctx.setLineDash([])
  }

  /**
   * check if two segments are the same
   * @param {Segment} seg
   * @return {boolean}
   */
  equals(seg) {
    return this.includes(seg.p1) && this.includes(seg.p2)
  }

  /**
   * if a point is contained in this segment
   * @param {Point} point
   * @returns {boolean}
   */
  includes(point) {
    return this.p1.equals(point) || this.p2.equals(point)
  }
  /**
   * Finds the length of a segment
   */
  length() {
    return distance(this.p1, this.p2)
  }
}
