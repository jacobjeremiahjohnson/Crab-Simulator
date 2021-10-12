import { fprint, choice, clear, pause } from "/waterWorks.js"
import * as config from "/waterWorks.js"

export async function execute(queue) {

	await fprint("I love walking by the railroad tracks at sunset, searching the ground for paper bags full of money.", "cyan", 0)
	await fprint("You idly think to yourself.\n", "dim", 1)

	await fprint("Oh hey look a paper bag by the railroad tracks full of money!\n", "cyan", 1)

	await fprint("Poor decisions at a pawnshop, forcing this day to occur + 1", "rainbow", 1)
	await fprint("Money + 20", "rainbow", 1)
	await fprint("Experience + 1\n", "rainbow", 2)
	window.experience++
	window.money += 20

	queue.push("./days/multiDays/spyStory/5_yardSale.js")
	queue = config.shuffleArray(queue)

  return queue
}
