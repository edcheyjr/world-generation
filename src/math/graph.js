import Segment from '../primitive/segment'
import Point from '../primitive/point.js'

export class Graph {
  /**
   * Graph Builder G = (V, E)
   * =======================
   * ______________________________________________________________________________________________
   *
   *  graph is data structure use to store 2D space consist of vertices and edges learn more here
   *  https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)
   *
   *  > Uses include:
   *  > ------------
   *
   *  >>- storing spatial information i.e google maps
   *
   *  >>- showing relations between object i.e in social media following
   *
   *  >>- finding shortpath from points i.e A* search algorithm or Dijkstra's algorithm.
   *
   *-------------------------------------------------------------------------------------------------
   *  > Types of graphs
   *  > ---------------
   *  >>- **Tree** : A tree is an undirected, connected, and acyclic graph. It has one less edge than the number of nodes.
   *
   *  >>- **Directed Graphs (Digraphs)**:In a directed graph, each edge has a direction, indicating a one-way relationship between nodes.
   *                                 The edges are represented by arrows pointing from one node to another.
   *
   *  >>- **Undirected Graphs**: In an undirected graph, edges have no direction, and the relationship between nodes is mutual.
   *                         The edges are typically represented by straight lines connecting nodes.
   * ______________________________________________________________________________________________
   *
   * @param {Segment[]} segments edge / lines/ segments / link connecting nodes / vertices / points
   *                               this can be use to store info telling the relations between nodes
   * @param {Point[]} points nodes / vertices / point  connected by edge/ lines / links, and can be used to
   *                          marking change in direction or magnitude or store bits of information
   * @param {Segment[]} segments edge / lines/ segments / link connecting nodes / vertices / points
   *                               this can be use to store info telling the relations between nodes
   *
   * @returns {Graph} it returns a graph object made of the defined Segments and Points
   * _____________________________________________________________________________________________
   */
  constructor(points = [], segments = []) {
    this.segments = segments
    this.points = points
  }
  /**
   * @param {Point} point
   */
  addPoint(point) {
    this.points.push(point)
    // console.log(this.points)
  }
  /**
   * @param {Point} point
   */
  containPoint(point) {
    return this.points.find((p) => p.equals(point))
  }
  /**
   * Draw function
   * @param {CanvasRenderingContext2D} ctx 2D canvas context
   */

  draw(ctx) {
    for (const seg of this.segments) {
      seg.draw(ctx)
    }
    for (const point of this.points) {
      point.draw(ctx)
    }
  }
  /**
   * @param {Point} point
   * @returns {boolean} success
   */
  tryAddPoint(point) {
    if (!this.containPoint(point)) {
      this.addPoint(point)
      return true
    }
    return false
  }

}
