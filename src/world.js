import { Graph } from './math/graph.js'
import { add, scale } from './math/utils.js'
import Envelope from './primitive/envelope.js'
import Polygon from './primitive/polygon.js'
import Segment from './primitive/segment.js'

/**
 * World generation and display
 */
export default class World {
  /**
   * world features defination class
   *
   * @param {Graph} graph
   * @param {number} roadWidth road width
   * @param {number} roadRoundness road roundness
   */
  constructor(
    graph,
    roadWidth = 100,
    roadRoundness = 10,
    buildingWidth = 150,
    buildingMinLength = 150,
    spacing = 50
  ) {
    this.graph = graph
    this.roadWidth = roadWidth
    this.roadRoundness = roadRoundness
    this.buildingWidth = buildingWidth
    this.buildingMinLength = buildingMinLength
    this.spacing = spacing
    /**
     * envelopes info
     * @type {Envelope[]}
     */
    this.envelopes = []
    /**
     * roadborders made of union of segments
     * @type {Segment[]}
     */
    this.roadBorders = []
    /**
     * buildings Store
     * @type {Envelope[]}
     */
    this.buildings = []
  }

  #generateBuildings() {
    const tmpEnvelopes = []
    //loop through all the graph segments and outer envelope which are the intial building block of houses/building along the roads
    for (let seg of this.graph.segments) {
      const envelope = new Envelope(seg, {
        width: this.roadWidth + this.buildingWidth + this.spacing * 2,
        roundness: this.roadRoundness,
      })
      tmpEnvelopes.push(envelope)
    }
    let guides = Polygon.union(tmpEnvelopes.map((env) => env.poly))
    for (let i = 0; i < guides.length; i++) {
      const seg = guides[i]
      if (seg.length() < this.buildingMinLength) {
        guides.splice(i, 1)
        i-- // return to the same index as the array shifted by one
      }
    }
    // divide long guides to smaller guides of atleast buildingMinLength
    const supports = []
    for (let seg of guides) {
      const len = seg.length() + this.spacing
      const buildingCount = Math.floor(
        len / this.buildingMinLength + this.spacing
      )
      const buildingLength = len / buildingCount - this.spacing

      const dir = seg.directionVector() //direction vector

      let q1 = seg.p1
      let q2 = add(q1, scale(dir, buildingLength)) // locates the new position of q2 from q1 depending on the scale
      supports.push(new Segment(q1, q2))
    }

    return supports
  }

  /**
   * world generation function
   */
  generate() {
    this.envelopes.length = 0
    const segments = this.graph.segments

    if (segments.length > 0) {
      for (let seg of segments) {
        this.envelopes.push(
          new Envelope(seg, {
            width: this.roadWidth,
            roundness: this.roadRoundness,
          })
        )
      }
    }
    if (this.envelopes.length > 1) {
      this.roadBorders = Polygon.union(this.envelopes.map((env) => env.poly))
    }
    this.buildings = this.#generateBuildings()
  }
  /**
   * draw function
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx, {} = {}) {
    //road tarmac
    for (let env of this.envelopes) {
      env.draw(ctx, { fillColor: '#bbb', strokeColor: '#bbb', lineWidth: 20 })
    }
    // road yellow lines
    for (let seg of this.graph.segments) {
      seg.draw(ctx, { color: 'white', width: 4, dashed: [8, 10] })
    }

    // road borders
    for (let border of this.roadBorders) {
      border.draw(ctx, { color: 'white', width: 4 })
    }

    // building rendering
    for (let bld of this.buildings) {
      bld.draw(ctx)
    }
  }
}
