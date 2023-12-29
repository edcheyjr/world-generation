import { angle, translate, subract } from '../math/utils.js'
import Point from './point.js'
import Polygon from './polygon.js'
export default class Envelope {
  /**
   * a polygon structure around points and it's segments
   * @param {object} skeleton points  making the envelope
   * @param {Point} skeleton.p1 point one
   * @param {Point} skeleton.p2 point two
   * @param {number} width thickness of the envelope
   */
  constructor(skeleton, width = 80) {
    this.skeleton = skeleton
    this.poly = this.#generatePolygon(width)
  }
  /**
   * draw function
   * @param {CanvasRenderingContext2D} ctx context
   * @param {object} attributes optional styling attributes
   */
  draw(ctx, {} = {}) {
    this.poly.draw(ctx)
  }
  /**
   * envelope polygon generator
   * @param {number} width
   * @returns {Polygon} envelope polygon
   */
  #generatePolygon(width) {
    const { p1, p2 } = this.skeleton

    const radius = width / 2
    const alpha = angle(subract(p1, p2))
    const alpha_cw = alpha + Math.PI / 2
    const alpha_ccw = alpha - Math.PI / 2

    const points = []
    const step = Math.PI / 10
    for (let i = alpha_ccw; i <= alpha_cw; i += step) {
      points.push(translate(p1, i, radius))
    }
    for (let i = alpha_ccw; i <= alpha_cw; i += step) {
      points.push(translate(p2, Math.PI + i, radius))
    }

    return new Polygon(points)
  }
}
