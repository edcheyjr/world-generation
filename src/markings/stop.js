import { angle, translate } from '../math/utils.js'
import Envelope from '../primitive/envelope.js'
import Point from '../primitive/point.js'
import Segment from '../primitive/segment.js'

/**
 * Stop sign / Traffic light
 */
export default class StopSign {
  /**
   * Stop sign on the road
   * --------------------
   * @param {Point} center center of the marking stop sign
   * @param {Point} dirVector direction vector of the parent segment i.e one of the roads segments
   * @param {number} length lenght of the the sign ideal should span the enter road width only
   * @param {number | undefined} width thickness of the marking
   */
  constructor(center, dirVector, length, width = length * 0.5) {
    this.center = center
    this.dirVector = dirVector
    this.width = width
    this.length = length
    /**
     * @private @param {Segment} skeletonSupport support or the skelton of which to build the stop sign polygon
     * @type {Segment}
     */
    this.skeletonSupport = new Segment(
      translate(center, angle(dirVector), width / 2), // translate at point center half the road length on the angle of the direction vector
      translate(center, angle(dirVector) + Math.PI, width / 2) // translate at point center half the road length on the opp angle of the direction vector, this cab be done by add PI to the angle or using a negative offset
    )
    this.poly = new Envelope(this.skeletonSupport, width, 0).poly //stop sign polygon
  }
  init() {
    // intialize or build the sign
  }
  build() {
    // build the sign
  }
  draw(ctx) {
    // Draw function
    this.poly.draw(ctx)
  }
}
