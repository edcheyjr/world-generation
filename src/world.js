import { Graph } from './math/graph.js'
import { add, distance, lerp, scale } from './math/utils.js'
import Envelope from './primitive/envelope.js'
import Polygon from './primitive/polygon.js'
import Point from './primitive/point.js'
import Segment from './primitive/segment.js'
import Tree from './items/tree.js'
import Building from './items/building.js'

import Sha256 from './helpers/hashAlgrorithm.js'

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
   * @param {number} buildingWidth width of the buildings
   * @param {number} buildingMinLength minimum length of buildings
   */
  constructor(
    graph,
    roadWidth = 100,
    roadRoundness = 10,
    buildingWidth = 150,
    buildingMinLength = 150,
    spacing = 50,
    treeSize = 200
  ) {
    this.graph = graph
    this.roadWidth = roadWidth
    this.roadRoundness = roadRoundness
    this.buildingWidth = buildingWidth
    this.buildingMinLength = buildingMinLength
    this.spacing = spacing
    this.treeSize = treeSize
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
     * @type {Building[]}
     */
    this.buildings = []
    /**
     * trees store
     * @type {Tree[]}
     */
    this.trees = []
    /**
     * lane guides
     * @type {Segment[]}
     */
    this.laneGuides = []
    //world generation
    this.generate()
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
    let supports = []
    for (let seg of guides) {
      const len = seg.length() + this.spacing
      const buildingCount = Math.floor(
        len / (this.buildingMinLength + this.spacing)
      )
      // console.log('buildingCount', buildingCount)
      const buildingLength = len / buildingCount - this.spacing

      const dir = seg.directionVector() //direction vector

      let q1 = seg.p1
      let q2 = add(q1, scale(dir, buildingLength)) // locates the new position of q2 from q1 depending on the scale
      supports.push(new Segment(q1, q2))

      for (let i = 2; i <= buildingCount; i++) {
        q1 = add(q2, scale(dir, this.spacing))
        q2 = add(q1, scale(dir, buildingLength))
        supports.push(new Segment(q1, q2))
      }
    }
    /**
     * bases or buildingFoundations of the builds of the buildings
     * @type {Polygon[]}
     */
    const bases = []

    for (const seg of supports) {
      bases.push(new Envelope(seg, { width: this.buildingWidth }).poly) // building bases
    }
    const eps = 0.001
    //check for intersecting buildings if the do there is a 50 percentage or what percentage you define that they will be removed
    for (let i = 0; i < bases.length - 1; i++) {
      for (let j = i + 1; j < bases.length; j++) {
        if (
          bases[i].intesectsPoly(bases[j]) ||
          bases[i].distanceToPoly(bases[j]) < this.spacing - eps
        ) {
          const chanceKeeping = Math.random()
          //TODO: returns a number btwn 0 and 1 todecide whether to join build or remove one in corners find the road corner point and use that define new polygon with  the two shapes current just removing one of the interecting buildings
          //Get that point by find in the pile of points used in generateTree function
          bases.splice(j, 1) // remove
          j--
        }
      }
    }

    return bases.map((p) => new Building(p)) // buildings array
  }

  /**
   * generate a line guide in lanes
   * @returns {Segment[]} the guides
   */
  #generateLaneGuides() {
    const tmpEnvelopes = []
    //loop through all the graph segments
    for (let seg of this.graph.segments) {
      const envelope = new Envelope(seg, {
        width: this.roadWidth / 2,
        roundness: this.roadRoundness,
      })
      tmpEnvelopes.push(envelope)
    }
    let guides = Polygon.union(tmpEnvelopes.map((env) => env.poly)) //unionize all the lane guide poly and return as segment
    return guides
  }

  /**
   * Generate trees while the max as not be reached
   * @param {number} maxTries maximum number of tries to place a tree default 100
   * @return {Tree[]} returns array of trees
   */
  #generateTrees(maxTries = 100) {
    //TODO: move this to constructor or its own function so that it can be accessed by other functions
    const allPoints = [
      ...this.roadBorders.map((s) => [s.p1, s.p2]).flat(),
      ...this.buildings.map((b) => b.base.points).flat(),
    ]

    const trees = []

    // range to  place the trees randomly
    const left = Math.min(...allPoints.map((p) => p.x))
    const right = Math.max(...allPoints.map((p) => p.x))
    const top = Math.min(...allPoints.map((p) => p.y))
    const bottom = Math.max(...allPoints.map((p) => p.y))

    const illegalPolys = [
      ...this.buildings.map((b) => b.base),
      ...this.envelopes.map((e) => e.poly),
    ]
    let tryCount = 0
    while (tryCount < maxTries) {
      //try to generate more
      const p = new Point(
        lerp(left, right, Math.random()),
        lerp(top, bottom, Math.random())
      )

      let keep = true

      //check if the trees if in illegal position
      for (const poly of illegalPolys) {
        if (
          poly.containsPoint(p) ||
          poly.distanceToPoint(p) < this.treeSize / 2
        ) {
          keep = false
          break //save computation power don't check test the point over at anymore polygon it's enough that it should be in one polygon atmost
        }
      }

      //check if trees are so close to each other
      if (keep) {
        for (const tree of trees) {
          if (distance(tree.center, p) < this.treeSize) {
            keep = false
            break
          }
        }
      }

      //check if trees are so far away
      if (keep) {
        let closeToSomething = false
        for (let poly of illegalPolys) {
          if (poly.distanceToPoint(p) < this.treeSize * 2) {
            closeToSomething = true
            break
          }
        }
        keep = closeToSomething
      }

      if (keep) {
        trees.push(new Tree(p, this.treeSize)) // new tree
        tryCount = 0
      }

      tryCount++ // increment count
    }
    return trees
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
    this.trees = this.#generateTrees()
    // empty any previous generations of the lane guides
    this.laneGuides.length = 0
    //generate the lane guides
    this.laneGuides.push(...this.#generateLaneGuides())
  }
  /**
   * draw function
   * @param {CanvasRenderingContext2D} ctx 2D canvas Context
   * @param {Point} viewPoint camera point of view  {x,y} vector
   */
  draw(ctx, viewPoint, {} = {}) {
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

    //items rendering
    const items = [...this.buildings, ...this.trees]
    //sort the items order of rendering
    items.sort(
      (a, b) =>
        b.base.distanceToPoint(viewPoint) - a.base.distanceToPoint(viewPoint)
    )
    // trees and building and other items rendering
    for (let item of items) {
      item.draw(ctx, viewPoint)
    }

    // test lane guides
    for (let laneGuide of this.laneGuides) {
      laneGuide.draw(ctx, { color: 'red', width: 2 })
    }
  }
  /**
   * Keeps a cryptographic hash of the world
   * only changes when something change in the world
   */
  hash() {
    try {
      return Sha256.hash(JSON.stringify(this))
    } catch (error) {
      console.warn(
        "would not hash using jwt make sure it's install otherwise will just used stringfied version of world"
      )
      console.error('Error', error)
      return JSON.stringify(this)
    }
  }
}
