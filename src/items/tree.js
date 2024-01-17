import Point from '../primitive/point.js'
import { add, scale, subtract, lerp, lerp2D, translate } from '../math/utils.js'
import Polygon from '../primitive/polygon.js'
/**
 * Tree class
 * Use to spawn new trees at given location
 */
export default class Tree {
  /**
   * cosntruct a new tree a this point p with this size
   * @param {Point} center center of the tree
   * @param {number} size size of the base of the tree
   * @param {number} heightCoef height co-efficient use to adjust the size of the tree between 0 and 1 where 0 will set the height to zero and 1 to the tallest it can get
   */
  constructor(center, size = 250, heightCoef = 0.1) {
    this.center = center
    this.size = size
    this.heightCoef = heightCoef
    /**
     * @type {Polygon}
     */
    this.base = this.#generatePoly(this.center, size)
  }
  /**
   * genetate a rugged circle for the trees
   * @param {Point} point
   * @param {number} size size
   * @returns {Polygon} which is the new circle making one level of the tree
   */
  #generatePoly(point, size) {
    const rad = size / 2
    const points = []
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 16) {
      const kindaRandomeNumber =
        Math.cos(((a + this.center.x) * size) % 17) ** 2 //replace with a randomly seed number
      const noisedRadius = rad * lerp(0.5, 1, kindaRandomeNumber * 0.5)
      points.push(translate(point, a, noisedRadius))
    }
    return new Polygon(points)
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
    const top = add(this.center, scale(diff, this.heightCoef))
    const levelCount = 8
    for (let level = 0; level < levelCount; level++) {
      const t = level / (levelCount - 1)
      const color = `rgb(30,${lerp(60, 210, t)},70)`
      const size = lerp(this.size, 40, t)
      const point = lerp2D(this.center, top, t)
      const poly = this.#generatePoly(point, size)
      poly.draw(ctx, { strokeColor: 'transparent', fillColor: color })
    }
  }
}
