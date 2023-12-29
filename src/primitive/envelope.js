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
    const p1_cw = translate(p1, alpha_cw, radius)
    const p2_cw = translate(p2, alpha_cw, radius)
    const p2_ccw = translate(p2, alpha_ccw, radius)
    const p1_ccw = translate(p1, alpha_ccw, radius)

    return new Polygon([p1_cw, p2_cw, p2_ccw, p1_ccw])
  }
}
