import Point from '../primitive/point.js'

/**
 * finds the addition between two point vectors
 * @param {Point} p1 vector
 * @param {Point} p2 vector
 * @returns {Point} vector
 */
export function add(p1, p2) {
  return new Point(p1.x + p2.x, p1.y + p2.y)
}

/**
 * finds the difference between two point vectors
 * @param {Point} p1 vector
 * @param {Point} p2 vector
 * @returns {Point} vector
 */
export function subract(p1, p2) {
  return new Point(p1.x - p2.x, p1.y - p2.y)
}

/**
 * scales a point by a scaler value
 * @param {Point} p1 vector
 * @param {number} scaler scale value
 * @returns {Point} vector
 */
export function scale(p1, scaler) {
  return new Point(p1.x * scaler, p1.y * scaler)
}

/**
 *  finds the rnearest point to current mouse location (loc)
 * @param {Point} loc
 * @param {Point[]} points
 * @param {number} threshold
 * @returns {Point}
 */
export function getNearestPoint(
  loc,
  points,
  threshold = Number.MAX_SAFE_INTEGER
) {
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
 * finds the distance between two points
 * @param {Point} p1 point 1
 * @param {Point} p2 point 2
 * @return {number} distance between the points
 */
function distance(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y)
}
