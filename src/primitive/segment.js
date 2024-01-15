import Point from './point.js'
import {
  add,
  dot,
  distance,
  magnitude,
  normalize,
  scale,
  subtract,
} from '../math/utils.js'

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
   * Finds the shortest distance to this segment
   * @param {Point} point the point to test
   * @return {number} distance to point
   */
  distanceToPoint(point) {
    const proj = this.projectPoint(point)
    if (proj.offset > 0 && proj.offset < 1) {
      return distance(point, proj.point)
    }
    const distToP1 = distance(point, this.p1)
    const distToP2 = distance(point, this.p2)
    return Math.min(distToP1, distToP2)
  }
  /**
   * Direction vector of the segment
   * @returns {Point}
   */
  directionVector() {
    return normalize(subtract(this.p2, this.p1))
  }
  /**
   *  Reversed Direction vector of the segment
   * @returns {Point} vector
   */
  directionReversedVector() {
    return normalize(subtract(this.p1, this.p2))
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
  /**
   * find the projection distance point to this segment and the point between this segment which connect  the projection
   * @param {Point} point the point to test
   * @return {{point:Point, offset:number}} prejected point and the offset to the point
   */
  projectPoint(point) {
    const a = subtract(point, this.p1)
    const b = subtract(this.p2, this.p1)
    const normB = normalize(b)
    const scaler = dot(a, normB)
    const proj = {
      point: add(this.p1, scale(normB, scaler)),
      offset: scaler / magnitude(b),
    }
    // console.log('proj', proj)
    return proj
  }
}
