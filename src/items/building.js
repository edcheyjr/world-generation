import { average, getFake3dPoint } from '../math/utils.js'
import Polygon from '../primitive/polygon.js'

export default class Building {
  /**
   * cosntruct a new building at the base of the building
   * @param {Polygon} poly base of the building
   * @param {number} heightCoef height co-efficient use to adjust the height of the buildiing
   */
  constructor(poly, heightCoef = 0.6, maxHeight = 180) {
    this.base = poly
    this.heightCoef = heightCoef
    this.height = maxHeight
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
      getFake3dPoint(p, viewPoint, this.height * this.heightCoef)
    )
    //ceiling
    const ceiling = new Polygon(topPoints)

    const baseMidpoints = [
      average(this.base.points[0], this.base.points[1]),
      average(this.base.points[2], this.base.points[3]),
    ]
    //top mid-points
    const topMidpoints = baseMidpoints.map((p) =>
      getFake3dPoint(p, viewPoint, this.height)
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

    const sideRoofPanels = [
      new Polygon([ceiling.points[0], topMidpoints[0], ceiling.points[1]]),
      new Polygon([ceiling.points[2], topMidpoints[1], ceiling.points[3]]),
    ]
    sideRoofPanels.sort(
      (a, b) => b.distanceToPoint(viewPoint) - a.distanceToPoint(viewPoint)
    )

    const roofPolys = [
      new Polygon([
        ceiling.points[0],
        ceiling.points[3],
        topMidpoints[1],
        topMidpoints[0],
      ]),
      new Polygon([
        ceiling.points[2],
        ceiling.points[1],
        topMidpoints[0],
        topMidpoints[1],
      ]),
    ]
    roofPolys.sort(
      (a, b) => b.distanceToPoint(viewPoint) - a.distanceToPoint(viewPoint)
    )

    this.base.draw(ctx, {
      fillColor: 'white',
      strokeColor: '#444',
    })

    for (let side of sides) {
      side.draw(ctx, {
        fillColor: 'white',
        strokeColor: '#44444499',
      })
    }
    ceiling.draw(ctx, {
      fillColor: 'gray',
      strokeColor: '#444',
    })
    for (let sideRoof of sideRoofPanels) {
      sideRoof.draw(ctx, {
        fillColor: 'white',
        strokeColor: 'white',
      })
    }
    for (const poly of roofPolys) {
      poly.draw(ctx, {
        fillColor: '#D44',
        strokeColor: '#C44',
        lineWidth: 2,
        join: 'round',
      })
    }
  }
}
