import { fprint, choice, clear, pause } from "../../../waterWorks.js"
import * as config from "../../../waterWorks.js"

export async function execute(queue) {

	await fprint("They should be here any minute now.", "cyan", 0)
	if(window.message == "chef_agree") await fprint("You say to Kevin, the crab you talked to yesterday.\n", "dim", 1)
	else await fprint("You say to yourself.\n", "dim", 1)

	await fprint("Outside, tires screech on the pavement. You rush to the window and watch as a large older crab scuttles out of a flashy sports car.\n", "dim", 1)
	await fprint("ENTER:", "dim", 0.75, 0.1)
	await fprint("THE HEALTH INSPECTOR\n", "dim", 1.5, 0.1)

	let answer = await choice(["Wassap shorty", "I bid you good day, my fellow", "Welcome to the restaurant"])

	if(answer == 1) {
		await fprint("Ayy, wassap shorty.\n", "cyan", 1)
		await fprint("Improper language for a food production facility. That's a mark.\n", "yellow")
	} else if(answer == 2) {
		await fprint("I bid you good day, my fellow.\n", "cyan", 1)
		await fprint("Are you aware this tiled floor cannot be installed in the reception area of a food production facility? That's a mark.\n", "yellow")
	} else {
		await fprint("Welcome to the restaurant!\n", "cyan", 1)
		await fprint("You're not wearing shoes in a food production facility? That's a mark.\n", "yellow")
	}
	await fprint("Oh boy. This'll be rough.\n", "green", 1)

	await fprint("---140 excruciating minutes later---\n", "dim", 2, 0)

	await fprint("You've failed in nearly every regard. I'm amazed this building hasn't collapsed yet.\n", "yellow")

	await fprint("Fuck fuck fuck shit fuck shit.", "cyan", 0)
	await fprint("You think to yourself.\n", "dim")

	await fprint("There's only one way to get out of this one.\n", "green", 1)

	await fprint("From your pocket, you procure a pistol. By the time he realizes what is about to unfold, his fate has already been sealed.\n", "dim")
	await fprint("NO. NO! I meant to BRIBE them. Not SHOOT them. Dear lord. Oh my god. I'm gonna be sick. Hoooly. Oh wow. Oh my god. Wow.\n", "green")

	await fprint("Oh, um, oops.", "cyan", 1.5)
	await fprint("What now?\n", "cyan", 1)

	await fprint("Uncertainty + 1", "rainbow", 1)
	await fprint("Experience + 1\n", "rainbow", 2)
	window.experience++
	queue.unshift("./days/multiDays/restaurant/restaurant_4.js")

  return queue
}
