import Point from '../primitive/point.js'
import { add, subtract } from '../math/utils.js'
import Segment from '../primitive/segment.js'

/**
 * Tree class
 * Use to spawn new trees at given location
 */
export default class Tree {
  /**
   * cosntruct a new tree a this point p with this size
   * @param {Point} center center of the tree
   * @param {number} size size of the base of the tree
   */
  constructor(center, size = 50) {
    this.center = center
    this.size = size // size of the base of the tree
  }
  /**
   * draw
   *@param {CanvasRenderingContext2D} ctx 2D canvas context
   * @param {object} attributes optional styling attributes
   * @param {Point} viewPoint camera view point
   * @param {string} attributes.color color
   */
  draw(ctx, viewPoint, attributes = {}) {
    const diff = subtract(this.center, viewPoint)
    this.center.draw(ctx, { size: this.size, color: 'green' })
    const top = add(this.center, diff)
    new Segment(this.center, top).draw(ctx)
  }
}
