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
   * @param {number} roundness how rounded the edges of the envelope should be
   */
  constructor(skeleton, width = 80, roundness = 5) {
    this.skeleton = skeleton
    this.poly = this.#generatePolygon(width, roundness)
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
   * @param {number} roundness
   * @returns {Polygon} envelope polygon
   */
  #generatePolygon(width, roundness) {
    const { p1, p2 } = this.skeleton

    const radius = width / 2
    const alpha = angle(subract(p1, p2))
    const alpha_cw = alpha + Math.PI / 2
    const alpha_ccw = alpha - Math.PI / 2

    const points = []
    const step = Math.PI / Math.max(1, roundness) // avoid 0
    const eps = step / 2 // small value to ensure alpha_cw is not close to zero
    for (let i = alpha_ccw; i <= alpha_cw + eps; i += step) {
      points.push(translate(p1, i, radius))
    }
    for (let i = alpha_ccw; i <= alpha_cw + eps; i += step) {
      points.push(translate(p2, Math.PI + i, radius))
    }

    return new Polygon(points)
  }
}
