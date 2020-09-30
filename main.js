import { fprint, choice, clear, pause } from "./waterWorks.js"
import * as config from "./waterWorks.js"

window.debug = true
window.days = 0 // number of days
window.experience = 0 // exp level
window.personality = 0 // positive = good, negative = bad
window.state = 0 // 0 = alive, -1 = win, string = death message
window.message = 0 // used to communicate short term between days, typically used in multidays

async function game() {
  var day = await import("./days/oldMan.js")
  await day.execute()
}

game()
