import { add, subtract, scale } from '../math/utils.js'
import Polygon from '../primitive/polygon.js'

export default class Building {
  /**
   * cosntruct a new building at the base of the building
   * @param {Polygon} poly base of the building
   * @param {number} heightCoef height co-efficient use to adjust the height of the buildiing
   */
  constructor(poly, heightCoef = 0.1) {
    this.base = poly
    this.heightCoef = heightCoef
  }
  /**
   * draw
   *@param {CanvasRenderingContext2D} ctx 2D canvas context
   * @param {object} attributes optional styling attributes
   * @param {Point} viewPoint camera view point
   * @param {string} attributes.color color
   */
  draw(ctx, viewPoint) {
    const topPoints = this.base.points.map((p) =>
      add(p, scale(subtract(p, viewPoint), this.heightCoef))
    )
    const sides = []
    for (let i = 0; i < this.base.points.length; i++) {
      const nextI = (i + 1) % this.base.points.length
      const poly = new Polygon([
        this.base.points[i],
        this.base.points[nextI],
        topPoints[nextI],
        topPoints[i],
      ])
      sides.push(poly)
    }

    //sides sorting
    sides.sort(
      (a, b) => b.distanceToPoint(viewPoint) - a.distanceToPoint(viewPoint)
    )

    const ceiling = new Polygon(topPoints)

    this.base.draw(ctx, {
      fillColor: 'white',
      strokeColor: '#444',
      lineWidth: 4,
    })
    for (let side of sides) {
      side.draw(ctx, {
        fillColor: 'white',
        strokeColor: '#444',
        lineWidth: 4,
      })
    }
    ceiling.draw(ctx, {
      fillColor: 'gray',
      strokeColor: '#444',
      lineWidth: 4,
    })
  }
}