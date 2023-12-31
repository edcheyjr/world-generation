import Point from './point.js'
import Segment from './segment.js'
import { getIntersection } from '../math/utils.js'
import { getRandomColor } from '../helpers/getRandomColor.js'

/**
 * primtive shape bulder class
 */
export default class Polygon {
  /**
   * Polygon shape
   * @param {Point[]} points
   */
  constructor(points) {
    this.points = points
    this.segments = []
    for (let i = 1; i <= points.length; i++) {
      this.segments.push(
        new Segment(points[i - 1], points[i % points.length]) //continuously loop through the points of the polygon
      )
    }
  }
  /**
   * break for all polygons
   * @param {Polygon[]} polys
   */
  static multiBreak(polys) {
    for (let i = 0; i < polys.length - 1; i++) {
      for (let j = i + 1; i < polys.length; i++) {
        Polygon.break(polys[i], polys[j])
      }
    }
  }
  /**
   * gets the intersections btwn two polygons
   * _______________________________________
   *
   * @param {Polygon} poly1 polygon one info
   * @param {Polygon} poly2 polygon two info
   * @returns {Points[]} interections points
   */
  static break(poly1, poly2) {
    const seg1 = poly1.segments
    const seg2 = poly2.segments
    /**
     * @type {Point[]}
     */
    const intersections = []

    for (let i = 0; i < seg1.length; i++) {
      for (let j = 0; j < seg2.length; j++) {
        const int = getIntersection(
          seg1[i].p1,
          seg1[i].p2,
          seg2[j].p1,
          seg2[j].p2
        )
        if (int && int.offset != 1 && int.offset != 0) {
          const newInterectionPoint = new Point(int.x, int.y)
          this.#splitSegAtIntersection(seg1, i, newInterectionPoint) // first segment
          this.#splitSegAtIntersection(seg2, j, newInterectionPoint) // second segment intersecting with the first
        }
      }
    }
  }

  /**
   * Split segment at a given intersection point and add them to the segments array
   * @param {Segment[]} segs the segments array
   * @param {number} index current index
   * @param {Point} point intersection point
   * @return {Segment[]} return the modified segments array
   */
  static #splitSegAtIntersection(segs, index, point) {
    let aux = segs[index].p2
    segs[index].p2 = point // replace the last point of the current segment with new point
    segs.splice(index + 1, 0, new Segment(point, aux)) //remove that segment and replace with the new segment obvious ignoring or "cleaning" the inside segment
    return segs
  }
  drawSegments(ctx) {
    for (const seg of this.segments) {
      seg.draw(ctx, { color: getRandomColor(), width: 5 })
    }
  }

  /**
   * draw function for a polygon
   * @param {CanvasRenderingContext2D} ctx 2D canvas context
   * @param {object} attributes optional styling attributes
   * @param {number} attributes.strokeColor  stroke color
   * @param {string} attributes.fillColor bg color
   * @param {number} attributes.lineWidth bg color
   */

  draw(
    ctx,
    {
      strokeColor = 'blue',
      fillColor = 'rgba(0,0, 255, 0.3)',
      lineWidth = 2,
    } = {}
  ) {
    if (this.points.length > 1) {
      ctx.beginPath()
      ctx.fillStyle = fillColor
      ctx.strokeStyle = strokeColor
      ctx.lineWidth = lineWidth
      ctx.moveTo(this.points[0].x, this.points[0].y)
      for (let i = 1; i < this.points.length; i++) {
        ctx.lineTo(this.points[i].x, this.points[i].y)
      }
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
    }
  }
}
