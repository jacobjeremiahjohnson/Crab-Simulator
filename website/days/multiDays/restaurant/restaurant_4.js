import { fprint, choice, clear, pause } from "../../../waterWorks.js"
import * as config from "../../../waterWorks.js"

export async function execute(queue) {

	await fprint("When you've come to your senses, you realize you are completely alone, bathed in a glowing white light.", "dim", 1)
	await fprint("You feel a precense directly above you. Before your being, an incomprehensible pile of shifting geometric shapes and colors descends.\n", "dim", 1)

	await fprint("Cut it out.\n", "rainbow", 2)
	await fprint("Yea mb.\n", "cyan", 2)

	await fprint("You wake up in what would be a cold sweat, but crabs don't have sweat glands.\n", "dim", 1)
	await fprint("...", "cyan")
	await fprint("Was that a dream?\n", "cyan")

	await fprint("Look in front of you.\n", "green", 1)

	await fprint("On the floor next to you sits a filled, passing health inspection document.\n", "dim", 1)

	if(window.message == "chef_agree") {
		await fprint("Must've been Kevin.", "cyan", 1)
		await fprint("Right?\n", "cyan", 1)
	} else {
		await fprint("Huh.\n", "cyan", 1)
	}

	await fprint("Passed health inspection + 1", "rainbow", 1)
	await fprint("Experience + 1\n", "rainbow", 2)
	window.experience++

  return queue
}
