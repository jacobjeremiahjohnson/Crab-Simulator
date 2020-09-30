import { fprint, choice, clear, pause } from "./waterWorks.js"
import * as config from "./waterWorks.js"

window.debug = false
window.days = 0 // number of days
window.experience = 0 // exp level
window.personality = 0 // positive = good, negative = bad
window.state = 0 // 0 = alive, -1 = win, string = death message
window.message = 0 // used to communicate short term between days, typically used in multidays

async function game() {
  var queue = config.generateQueue()
  while(true) {
    await pause()
    window.days++
    clear()
    await fprint("DAY " + window.days + "\n", "white", 1, 0)
    var day = await import(queue.shift())
    queue = await day.execute(queue)
    if(queue.length == 0 && window.state == 0) { // if queue is empty and not dead on the last day
      window.state = -1 // set state to win
    }
    if(window.state != 0) { // if state isn't default, break out of game loop (dead or win)
      await pause()
      break
    }
  }
  if(window.state == -1) {
    // win game
    alert("win")
  } else {
    /*
    // lose game
    clear()

    await fprint("You died.\n", "red", 2, 0)
    await fprint("Ending " + window.state.slice(-2) + "\n", "green", 1, 0)
    await fprint(window.state.slice(0, -2) + "\n", "green", 1)
    await fprint("Congrats, you made it " + window.days + " " + config.dayPlural() + ".\n", "green", 2)
    // return to game code here?
    await pause()
    titleScreen()
    */
  }
}

window.addEventListener("load", () => {
  if(window.debug) {
    game()
  } else {
    //titleScreen()
    game()
  }
})
