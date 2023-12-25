import Point from '../primitive/point.js'

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
 * finds the distance between mouse loc and the current point
 * @param {Point} p1 point 1
 * @param {Point} p2 point 2
 * @return {number} distance between the points
 */
function distance(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y)
}
