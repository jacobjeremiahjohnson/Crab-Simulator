import { fprint, choice, clear, pause } from "../../../waterWorks.js"
import * as config from "../../../waterWorks.js"

export async function execute(queue) {

  await fprint("You remember when you did that cooking competition?", "yellow", 0)
  await fprint("Carlos asks you.\n", "dim", 1)

  await fprint("Oh yeeeaaah, I remember that. Bad memories.\n", "cyan")
  await fprint("Well, you should set up a restaurant. You did so well!\n", "yellow")
  await fprint("I guess I did do pretty well...", "cyan", 0)
  await fprint("You say, knowing you definitely didn't.\n", "dim", 1)

  await fprint("So, restaurant now? Seems like you keep jumping from one day to the next with little regard to your responsibilities as a crab.\n", "green", 1)
  await fprint("You drive down to your local courthouse to make a banger of a case.\n", "dim", 1)

  await fprint("Welcome to your local courthouse. Do you have an idea for a restaurant?\n", "yellow")
  let answer = await choice(["Fish tempura", "Vegan steakhouse", "No"])
  if(answer == 1) {
    await fprint("A hipster fish tempura joint.\n", "cyan", 2)
    await fprint("You eye the magistrate, a fish, nervously.\n", "dim", 2)
    await fprint("Sounds good.\n", "yellow", 1)
  } else if(answer == 2) {
    await fprint("Right, so, a steakhouse.. for vegans.\n", "cyan", 2)
    await fprint("You know, I've never heard of that before. I think you got this market cornered.\n", "yellow", 1)
  } else {
    await fprint("Nah.\n", "cyan", 1)
    await fprint("In that case you can rummage through the pile of rejected restaurants over there, pick one you like.\n", "yellow")
    await fprint("How about a.. um... this, ninja-themed pizza parlour?\n", "cyan")
    await fprint("That's hella dope, granted.\n", "yellow", 1)
  }

  await fprint("Business license + 1", "rainbow", 1)
  await fprint("Experience + 1\n", "rainbow", 2)
  window.experience++
  queue.unshift("./days/multiDays/restaurant/restaurant_2.js")
  return queue
}
