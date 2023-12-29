import { Graph } from './math/graph.js'
import Envelope from './primitive/envelope.js'

/**
 * World generation and display
 */
export default class World {
  /**
   * World class
   * @param {Graph} graph
   * @param {number} roadWidth
   * @param {number} roadRoundness
   */
  constructor(graph, roadWidth = 100, roadRoundness = 5) {
    this.graph = graph
    this.roadWidth = roadWidth
    this.roadRoundness = roadRoundness
  }
  generate() {}
  /**
   * draw function
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx, {} = {}) {
    const segments = this.graph.segments

    if (segments.length > 0) {
      for (let seg of segments) {
        new Envelope(seg, this.roadRoundness, this.roadWidth).draw(ctx)
      }
    }
  }
}
