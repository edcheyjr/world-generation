import Point from '../primitive/point.js'
import Segment from '../primitive/segment.js'
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/* Vector Operations                                                  (c) Edwin Chebii 2023-2050  */
/*                                                                                   MIT Licence  */
/* This helper function of vector operations                                                      */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
export {
  average,
  angle,
  add,
  dot,
  distance,
  getFake3dPoint,
  getNearestSegment,
  getNearestPoint,
  getIntersection,
  lerp,
  lerp2D,
  normalize,
  magnitude,
  subtract,
  scale,
  translate,
}
/**
 * finds avarage loc of two point and position a new point in that location
 * @param {Point} p1 point 2
 * @param {Point} p2 point 1
 * @returns {Point} midpoint
 */
function average(p1, p2) {
  return new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2)
}

/**
 * Returns tangent angle given a vector point(x,y) which is difference  between two vector points
 * @param {Point} points_diff
 * @return {number} angle in radians
 */
function angle(points_diff) {
  return Math.atan2(points_diff.y, points_diff.x)
}

/**
 * finds the addition between two point vectors
 * @param {Point} p1 vector
 * @param {Point} p2 vector
 * @returns {Point} sum of the vector
 */
function add(p1, p2) {
  return new Point(p1.x + p2.x, p1.y + p2.y)
}

/**
 * finds the product between to points vectors
 * @param {Point} p1 vector
 * @param {Point} p2 vector
 * @returns {number} product
 */
function dot(p1, p2) {
  return p1.x * p2.x + p1.y * p2.y
}
/**
 * finds the difference between two point vectors
 * @param {Point} p1 vector
 * @param {Point} p2 vector
 * @returns {Point} vector
 */
function subtract(p1, p2) {
  return new Point(p1.x - p2.x, p1.y - p2.y)
}

/**
 * scales a point by a scaler value
 * @param {Point} p1 vector
 * @param {number} scaler scale value
 * @returns {Point} vector
 */
function scale(p1, scaler) {
  return new Point(p1.x * scaler, p1.y * scaler)
}

/**
 * interpolation function A.k.a lerp
 *
 * --------------------------------
 *
 * @description The term "lerp" stands for linear interpolation. It is a mathematical function commonly used in computer graphics, animation, and other areas to interpolate (estimate values between two known values) linearly between two endpoints. [more info](https://en.wikipedia.org/wiki/Linear_interpolation)
 * > The formula for linear interpolation is:
 * > ``lerp(a,b,t)=(1−t)⋅a+t⋅b``
 * ________________________________________
 *
 * @param {number} A The starting value.
 * @param {number} B  he ending value.
 * @param {number} t  A parameter that represents the interpolation factor. It ranges from 0 to 1, where 0 corresponds to the starting value, 1 corresponds to the ending value, and values in between represent the interpolation between the two
 * ________________________________________
 *
 * @returns {number} position(number) between postions A and B depending with the factor t
 *
 * @example
 * let startValue = 10;
 * let endValue = 20;
 * let interpolationFactor = 0.5; // Interpolate halfway between start and end
 * let result = lerp(startValue, endValue, interpolationFactor);
 * console.log(result); // Output: 15
 *
 */

function lerp(A, B, t) {
  return A + (B - A) * t
}
/**
 * interpolation for 2D space
 * @param {Point} A  a point on space
 * @param {Point} B a point on space
 * @param {number} t this the pecentage  we want to lerp to x and y
 * @returns {Point} new point at the lerped location
 */
function lerp2D(A, B, t) {
  return new Point(lerp(A.x, B.x, t), lerp(A.y, B.y, t))
}

/**
 * Intersection function
 * _____________________________________
 *
 * @description takes vectors points {A} to {B} AND {C} to {D} and find where they intersect otherwise returns null if not co-ordinates
 * _____________________________________
 *
 * @param {object} lineOne A to B
 * @param {Point} lineOne.A point A
 * @param {Point} lineOne.B point B
 * @param {object} lineTwo C to D
 * @param {Point} lineTwo.C point C
 * @param {Point} lineTwo.D point D
 *
 * @returns {{x:number, y:number, offset:number} | null} with x,y point of intersect or null between x and y and the offset
 */
function getIntersection({ A, B }, { C, D }) {
  const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x)
  const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y)
  const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y)
  const eps = 0.001
  if (Math.abs(bottom) > eps) {
    const t = tTop / bottom
    const u = uTop / bottom
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return {
        x: lerp(A.x, B.x, t),
        y: lerp(A.y, B.y, t),
        offset: t,
      }
    }
  }
  return null
}

// TODO create a getNearest which gets the nearest segment and point in an object the remove getNearestPoint and getNearestSegment
/**
 *  finds the nearest point to current mouse location (loc)
 * @param {Point} loc
 * @param {Point[]} points
 * @param {number} threshold
 * @returns {Point}
 */
function getNearestPoint(loc, points, threshold = Number.MAX_SAFE_INTEGER) {
  let minDist = Number.MAX_SAFE_INTEGER
  let nearestPoint = null
  for (let point of points) {
    let dist = distance(loc, point)
    if (dist < minDist && dist < threshold) {
      minDist = dist
      nearestPoint = point
    }
  }
  return nearestPoint
}
/**
 *  finds the nearest point to current mouse location (loc)
 * @param {Point} loc location on the canvas
 * @param {Segment[]} segments list of segments
 * @param {number} threshold threshold
 * @returns {Segment} segment
 */
function getNearestSegment(loc, segments, threshold = Number.MAX_SAFE_INTEGER) {
  let minDist = Number.MAX_SAFE_INTEGER
  let nearestSegment = null
  // tries to find the segment with the shortest distance from one of this point to this loc
  for (let seg of segments) {
    let dist = seg.distanceToPoint(loc)
    if (dist < minDist && dist < threshold) {
      minDist = dist
      nearestSegment = seg
    }
  }
  return nearestSegment
}

/**
 * finds the distance between two points
 * @param {Point} p1 point 1
 * @param {Point} p2 point 2
 * @return {number} distance between the points
 */
function distance(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y)
}

/**
 * Translate a point location by distance relative to alpha
 * @param {Point} loc point to translate
 * @param {number} alpha angle to translate relative
 * @param {number} offset offset distance value
 * @return {Point} new translated point
 */
function translate(loc, alpha, offset) {
  return new Point(
    loc.x + Math.cos(alpha) * offset,
    loc.y + Math.sin(alpha) * offset
  )
}
/**
 * [Normalize](https://www.wallstreetmojo.com/normalization-formula/) a point p t
 * scaling the function so that it has a standardized value normally between -1 and 1 maximum or minimum value, or adjusting it to have a standard integral or sum. [learn more](https://www.wallstreetmojo.com/normalization-formula/)
 * @description normalize returns the value to range between 1 and -1 but does not affect the direction
 * @param {Point} p vector{x,y} p
 * @returns {Point} vector with normalized values
 */
function normalize(p) {
  return scale(p, 1 / magnitude(p))
}
/**
 * Finds a magnutude or the distance of a point to origin. [learn more](https://en.wikipedia.org/wiki/Magnitude_(mathematics))
 * @param {Point} p point p
 * @return {number} which is the hypo or distance between origin and point/ vector p
 */
function magnitude(p) {
  return Math.hypot(p.x, p.y) //  magnitude btwn {0, 0} and {x,y}
}

/**
 * Gets a fake tree3D point on space
 * @param {Point} point base point
 * @param {Point} viewPoint  camera point of view {x,y} vector
 * @param {number} height the y distance given y is the distance going up on the fake 3d space
 * @return {Point} point on space
 */
function getFake3dPoint(point, viewPoint, height) {
  const dir = normalize(subtract(point, viewPoint))
  const dist = distance(point, viewPoint)
  const scaler = Math.atan(dist / 300) / (Math.PI / 2)
  return add(point, scale(dir, height * scaler))
}
