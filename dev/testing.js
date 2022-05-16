import { fprint, choice } from "../waterWorks.js"
import * as config from "../waterWorks.js"

export async function execute(queue) {

	await fprint("Example fprint statement.\n", "cyan", 1, 0.04)
	let answer = await choice(["Option A", "Option B"])
	if(answer == 1) {
		await fprint("You choice Option A.\n", "green")
	} else {
		await fprint("You choice Option B. This kills you\n", "green", 2)
		window.state = "This is the death message. The last two digits is the ending number.99"
		return queue
	}

	await fprint("Experience + 1\n", "rainbow", 2)
	window.experience += 1

	queue.unshift("./days/oldMan.js")
	queue = config.shuffleArray(queue)
	return queue
}
