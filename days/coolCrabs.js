import { fprint, choice, clear, pause } from "../waterWorks.js"
import * as config from "../waterWorks.js"

export async function execute(queue) {
  await fprint("Two younger male crabs corner you on your way into your apartment in the evening.\n", "dim", 1)
  await fprint("Hey, look what we have here...", "yellow", 0)
  await fprint("Says one of the crabs.\n", "dim", 1)
  await fprint("Fresh meat, heheh.\n", "blue")

  let answer = await choice(["Hey, step off", "That doesn't make sense"])

  if(answer == 1) {
    await fprint("Hey, step off.\n", "cyan", 1)
    await fprint("Ok buddy.\n", "yellow", 1)
    await fprint("Whoa, confidence. That's pretty hot dude.\n", "green", 1)
    await fprint("Hotness + 10347", "rainbow", 1)
    await fprint("Experience + 1\n", "rainbow", 2)
    window.experience++
  } else {
    await fprint("You're a crab of the Uca species. That means you're primarily herbivorous (although you also may eat organic debris and waste); I am not \"fresh meat\", as you would not eat meat.\n", "cyan", 2)
    await fprint("Shut up nerd.\n", "yellow", 1)
    await fprint("They proceed to beat the shit out of you, real \"oof ouch owie\" stuff.\n", "dim", 2)
    window.state = "You're a fucking idiot. Picking a fight with two other crabs? Dumbass.12"
  }
  return queue
}
