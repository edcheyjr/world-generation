import { Graph } from './math/graph.js'
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
  constructor(graph, roadWidth = 100, roadRoundness = 10) {
    this.graph = graph
    this.roadWidth = roadWidth
    this.roadRoundness = roadRoundness
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
      // Polygon.multiBreak(this.envelopes.map((env) => env.poly))
      this.roadBorders = Polygon.union(this.envelopes.map((env) => env.poly))
    }
  }
  /**
   * draw function
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx, {} = {}) {
    for (let env of this.envelopes) {
      env.draw(ctx, { fillColor: '#bbb', strokeColor: '#bbb' })
    }
    for (let border of this.roadBorders) {
      border.draw(ctx, { color: 'white', width: 4 })
    }
  }
}
