import Point from '../primitive/point.js'

  lerp,
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
 * @returns {Point} vector
 */
function add(p1, p2) {
  return new Point(p1.x + p2.x, p1.y + p2.y)
}

/**
 * finds the difference between two point vectors
 * @param {Point} p1 vector
 * @param {Point} p2 vector
 * @returns {Point} vector
 */
function subract(p1, p2) {
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
 * @returns {int} position(number) between postions A and B depending with the factor t
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
 *  finds the rnearest point to current mouse location (loc)
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
