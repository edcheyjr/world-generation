import { Graph } from './math/graph.js'
import Envelope from './primitive/envelope.js'
import Polygon from './primitive/polygon.js'
import Point from './primitive/point.js'

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
  constructor(graph, roadWidth = 100, roadRoundness = 4) {
    this.graph = graph
    this.roadWidth = roadWidth
    this.roadRoundness = roadRoundness
    /**
     * envelopes info
     * @type {Envelope[]}
     */
    this.envelopes = []
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
      Polygon.multiBreak(this.envelopes.map((env) => env.poly)) //breaks polygon for envelopes
    }
  }
  /**
   * draw function
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx, {} = {}) {
    for (let env of this.envelopes) {
      env.draw(ctx)
    }
  }
}
