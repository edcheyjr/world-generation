const KEY_DOWN = 'ArrowDown'
const KEY_UP = 'ArrowUp'
const KEY_RIGHT = 'ArrowRight'
const KEY_LEFT = 'ArrowLeft'
const ENTER = 'Enter'
const SWIPE_UP = 'SwipeUp'
const SWIPE_DOWN = 'SwipeDown'
const SWIPE_RIGHT = 'SwipeRight'
const SWIPE_LEFT = 'SwipeLeft'
const KEY_Z = 'Z'
const KEY_X = 'X'
const KEY_C = 'C'

/**
 * This is the input listener singleton
 */
class InputSingleton {
  constructor() {
    if (InputSingleton._instance) {
      throw new Error("Singleton classes can't be instantiated more than once.")
    }
    this.keys = []
    this.touchY = ''
    this.touchX = ''
    this.touchTreshold = 30
    this.rightTouchTreshold = 60

    //keypress events
    window.addEventListener('keydown', (e) => {
      if (this.#checkKeys(e) && this.keys.indexOf(e.key) === -1) {
        if (e.key.length == 1) {
          this.keys.push(e.key.toUpperCase())
        }
        this.keys.push(e.key)
      } else if (e.key == ENTER && GAME_OVER) {
        restartGame() //TODO CHANGE WILL HAVE A MENU
      }
    })
    window.addEventListener('keyup', (e) => {
      // console.log('KEY', e.key)
      if (this.#checkKeys(e)) {
        if (e.key.length == 1) {
          this.keys.splice(this.keys.indexOf(e.key.toUpperCase()), 1)
        }
        this.keys.splice(this.keys.indexOf(e.key), 1)
      }
    })

    // Touch events
    window.addEventListener('touchstart', (e) => {
      // console.log('change touches', e.changedTouches[0])
      this.touchY = e.changedTouches[0].pageY
      this.touchX = e.changedTouches[0].pageX
    })
    window.addEventListener('touchmove', (e) => {
      // console.log(e)
      const swipeYDistance = e.changedTouches[0].pageY - this.touchY
      const swipeXDistance = e.changedTouches[0].pageX - this.touchX
      if (
        swipeYDistance < -this.touchTreshold &&
        this.keys.indexOf(SWIPE_UP) === -1
      ) {
        this.keys.push(SWIPE_UP)
      } else if (
        swipeYDistance > this.touchTreshold &&
        this.keys.indexOf(SWIPE_DOWN) === -1
      ) {
        this.keys.push(SWIPE_DOWN)
        // swipe down to restart the game probably to remove also to add other keys namely X, Z , C
        if (GAME_OVER) {
          restartGame()
        }
      } else if (
        swipeXDistance < this.rightTouchTreshold &&
        this.keys.indexOf(SWIPE_RIGHT) === -1
      ) {
        this.keys.push(SWIPE_RIGHT)
      } else if (
        swipeXDistance < -this.rightTouchTreshold &&
        this.keys.indexOf(SWIPE_LEFT) === -1
      ) {
        this.keys.push(SWIPE_LEFT)
      }
    })
    window.addEventListener('touchend', (e) => {
      // clean up swipe actions
      this.keys.splice(this.keys.indexOf(SWIPE_UP), 1)
      this.keys.splice(this.keys.indexOf(SWIPE_DOWN), 1)
      this.keys.splice(this.keys.indexOf(SWIPE_RIGHT), 1)
      this.keys.splice(this.keys.indexOf(SWIPE_LEFT), 1)
    })
  }
  /**
   * checks if key exist in the keys[]
   * ___________________________________
   *
   * @param {string} key Key up down right left or Z,X,C
   * __________________________________
   *
   * @returns {boolean}
   */
  checkIfAKeyExists(key) {
    return this.keys.indexOf(key) > -1
  }

  /**
   * Match keys
   * @param {KeyboardEvent} e Keyboard event
   */
  #checkKeys(e) {
    if (
      e.key === KEY_DOWN ||
      e.key == KEY_UP ||
      e.key == KEY_LEFT ||
      e.key == KEY_RIGHT ||
      e.key.toUpperCase() == KEY_Z ||
      e.key.toUpperCase() == KEY_C ||
      e.key.toUpperCase() == KEY_X
    ) {
      return true
    }
    return false
  }
}
/**
 * gets single input instance
 */
export default class InputHandler {
  constructor() {
    throw new Error('Use InputHandler.getInstance()')
  }
  /**
   * get Input Instance
   * @description ensure that only one InputHandler is used
   * _____________________
   * _____________________
   * @returns {InputSingleton} input singleton class
   */
  static getInstance() {
    if (!InputSingleton.instance) {
      InputSingleton.instance = new InputSingleton()
    }
    return InputSingleton.instance
  }
}
