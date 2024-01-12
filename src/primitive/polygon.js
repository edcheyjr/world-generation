import Point from './point.js'
import Segment from './segment.js'
import { average, getIntersection } from '../math/utils.js'
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
      for (let j = i + 1; j < polys.length; j++) {
        Polygon.break(polys[i], polys[j])
      }
    }
  }
  /**
   * unionize all polygons
   * @param {Polygon[]} polys polygons array
   * @return {Segment[]} segment of all polygons unionizes to one
   */
  static union(polys) {
    Polygon.multiBreak(polys)
    const keepSegments = []
    for (let i = 0; i < polys.length; i++) {
      for (let seg of polys[i].segments) {
        // console.log('seg', seg)
        let keep = true // do we keep this segment?
        // loop through all other polygons to find a matching seg
        for (let j = 0; j < polys.length; j++) {
          // but not the same polygon
          if (i != j) {
            if (polys[j].containsSegment(seg)) {
              // found matching segment
              keep = false
              break
            }
          }
        }
        if (keep) {
          keepSegments.push(seg)
        }
      }
    }
    return keepSegments
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
    const intersections = [] //TODO remove not used

    for (let i = 0; i < seg1.length; i++) {
      for (let j = 0; j < seg2.length; j++) {
        const int = getIntersection(
          { A: seg1[i].p1, B: seg1[i].p2 },
          { C: seg2[j].p1, D: seg2[j].p2 }
        )
        if (int && int.offset != 1 && int.offset != 0) {
          const newInterectionPoint = new Point(int.x, int.y)

          // let aux = seg1[i].p2
          // seg1[i].p2 = newInterectionPoint
          // seg1.splice(i + 1, 0, new Segment(newInterectionPoint, aux))

          // aux = seg2[j].p2
          // seg2[j].p2 = newInterectionPoint
          // seg2.splice(j + 1, 0, new Segment(newInterectionPoint, aux))
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

  /**
   * does this it contain segment seg
   * @param { Segment} seg
   * @returns { boolean}
   */
  containsSegment(seg) {
    const midPoint = average(seg.p1, seg.p2)
    return this.containsPoint(midPoint)
  }
  /**
   * polygon contains point algorithm
   * --------------------------------
   *
   * does point lives with this polygon
   * @param {Point} point
   * @return {boolean}
   */

  containsPoint(point) {
    //FIXME testing random outer point would be better which is bound to be sure no one will reach it and also not too far
    const outerPoint = new Point(-2000, -2000)
    let intersectionCount = 0
    for (const seg of this.segments) {
      const intersects = getIntersection(
        { A: outerPoint, B: point },
        { C: seg.p1, D: seg.p2 }
      )
      if (intersects) {
        intersectionCount++
      }
    }
    return intersectionCount % 2 == 1
  }

  /**
   * @param {*} ctx
   */
  drawSegments(ctx) {
    for (const seg of this.segments) {
      seg.draw(ctx, { color: getRandomColor(), width: 10 })
    }
  }

  /**
   * draw function for a polygon
   * @param {CanvasRenderingContext2D} ctx 2D canvas context
   * @param {object} attributes optional styling attributes
   * @param {number} attributes.strokeColor  stroke color
   * @param {number} attributes.lineWidth stroke width
   * @param {string} attributes.fillColor bg color
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
