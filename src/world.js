import { Graph } from './math/graph.js'
import { add, lerp, scale } from './math/utils.js'
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
   * @param {number} buildingWidth width of the buildings
   * @param {number} buildingMinLength minimum length of buildings
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
    /**
     * trees store
     */
    this.trees = []

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

    //check for intersecting buildings if the do there is a 50 percentage or what percentage you define that they will be removed
    for (let i = 0; i < bases.length - 1; i++) {
      for (let j = i + 1; j < bases.length; j++) {
        if (bases[i].intesectsPoly(bases[j])) {
          const chanceKeeping = Math.random() //TODO: returns a number btwn 0 and 1 todecide whether to join build or remove one in corners
          bases.splice(j, 1) // remove
          j--
        }
      }
    }

    return bases // buildings array
  }
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
  /**
   * Keeps a cryptographic hash of the world only changes when something change in the world
   */
  hash() {
    return JSON.stringify(this)
  }
}
