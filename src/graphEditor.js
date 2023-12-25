import { Graph } from './math/graph.js'

export default class GraphEditor {
  /**
   * Graph Editor
   * @param {HTMLCanvasElement} canvas this canvas el
   * @param {Graph} graph graph
   * @param {string} contextType 2D
   * @returns {GraphEditor} new graph editor
   */
  constructor(canvas, graph, contextType) {
    this.canvas = canvas
    this.graph = graph
    /**
     * context
     * @type {CanvasRenderingContext2D}
     */
    this.ctx = this.canvas.getContext(contextType)
  }
  display() {
    this.graph.draw(this.ctx)
  }
}
