import { fprint, choice, /*clear, pause*/ } from "./waterWorks.js"
import * as config from "./waterWorks.js"

async function game() {
  var day = await import("./days/oldMan.js")
  console.log(day)
  day.execute()
  //day.execute()
  /*
  queue = config.generateQueue()
  while(true) {
    await pause()
    // do shit
  }
  */
}

game()
