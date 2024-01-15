/**
 * Hash Function
 * --------------
 * --------------------------------------
 *
 * This uses basic web api crypto ~ **NOTE:** *this is one way hashing algorithm*
 * @description The Crypto interface represents basic cryptography features available in the current context. It allows access to a cryptographically strong random number generator and to cryptographic primitives.[see more](https://developer.mozilla.org/en-US/docs/Web/API/Crypto)
 * -----------------------------------------
 * @param {string} message message to be digested
 * @param {"SHA-1" | "SHA-256" | "SHA-384" | "SHA-512"} algo algorithm to uses
 * @returns {string} hash representation of the message
 * -----------------------------------------
 * Examples
 * --------
 * @example
 * const hash = await digestMessage("hello") // defaults to SHA-256
 *
 *-----------------------------------------------
 */
export async function digestMessage(message, algo = 'SHA-256') {
  const msgUint8 = new TextEncoder().encode(message) // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest(algo, msgUint8) // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)) // convert buffer to byte array
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('') // convert bytes to hex string
  console.log('hashHex', hashHex)
  return hashHex
}
