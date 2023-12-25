import Segment from '../primitive/segment.js'
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
  }
  /**
   * @param {Segment} seg
   */
  addSegment(seg) {
    this.segments.push(seg)
  }
  /**
   * Set the graph to empty
   */
  clear() {
    this.segments.length = 0
    this.points.length = 0
  }
  /**
   * @param {Point} point
   */
  containPoint(point) {
    return this.points.find((p) => p.equals(point))
  }
  /**
   *
   * @param {Segment} seg
   */
  containsSegment(seg) {
    return this.segments.find((s) => s.equals(seg))
  }
  /**
   * draw function
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
   * gets all segment associated with a given point
   * @param {Point} point
   * @return {Segment[]} array of segments
   */
  getSegmentsWithPoint(point) {
    const includedSegments = []
    for (let seg of this.segments) {
      if (seg.includes(point)) {
        includedSegments.push(seg)
      }
    }
    return includedSegments
  }

  /**
   * removes a point/node and all segment associated with it
   * @param {Point} point
   * @param {number | undefined} index
   * @return {Point} removed point is returned
   */
  removePoint(point, index = undefined) {
    const segs = this.getSegmentsWithPoint(point)
    for (let seg of segs) {
      this.removeSegment(seg)
    }
    if (index) {
      this.points.splice(index, 1)
    } else {
      this.points.splice(this.segments.indexOf(point), 1)
    }
    return point
  }

  /**
   * removes a segment
   * @param {Segment } seg
   * @param {number | undefined} index
   * @return {Segment} segment removed
   */
  removeSegment(seg, index = undefined) {
    if (index) {
      this.segments.splice(index, 1)
    } else {
      this.segments.splice(this.segments.indexOf(seg), 1)
    }
    return seg
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
    console.log('points', this.points)
    return false
  }

  /**
   * @param {Segment} seg
   */
  tryAddSegment(seg) {
    // any point present
    if (this.points.length < 2) {
      console.warn('not enough point to add segment , try adding points!')
      return false
    }
    // point adding not the same point
    if (seg.p1.equals(seg.p2)) {
      console.warn('trying to add segment on the same point , try again!')
      return false
    }
    // segment does not already exists
    if (this.containsSegment(seg)) {
      console.warn('segment already added , try again!')
      return false
    }
    //else add the segment
    this.addSegment(seg)
    return true
  }
}
