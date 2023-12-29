import { Graph } from './math/graph.js'
import Envelope from './primitive/envelope.js'
import Polygon from './primitive/polygon.js'

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
  constructor(graph, roadWidth = 100, roadRoundness = 5) {
    this.graph = graph
    this.roadWidth = roadWidth
    this.roadRoundness = roadRoundness
    /**
     * envelopes info
     * @type {Envelope[]}
     */
    this.envelopes = []
    /**
     * intersection points of polygons
     * @type {Points[]}
     */
    this.intersections = []
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
    this.intersections = Polygon.break(
      this.envelopes[0].poly,
      this.envelopes[1].poly
    )
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
