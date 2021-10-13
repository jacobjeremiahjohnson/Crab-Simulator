import { fprint, choice, clear, pause } from "/waterWorks.js"
import * as config from "/waterWorks.js"

export async function execute(queue) {

	await fprint("You hear a slide whistle start descending in pitch.\n", "dim", 1)
	let answer = await choice(["Step left", "Step right"])
	await fprint("You step to your " + (answer == 1 ? "left" : "right") + " and look up.", "dim", 1)
	if(Math.floor(Math.random() * 2) == 0 && window.message != "slideWhistle_die") { // 1/2 chance
		await fprint("\n Cool looking grand piano.\n", "cyan", 2)
		window.message = "slideWhistle_die" // don't die twice in a row lol
		window.state = "Hah. Idiot. Crushed by a falling piano. HAH! Classic.18"
		return queue
	}

	await fprint("Beside you, a large grand piano crashes onto the sidewalk, obliterating instantly.\n", "dim", 1)
	await fprint("Neat.\n", "cyan", 1)

	await fprint("Experience + 1\n", "rainbow", 2)
  window.experience += 1

	return queue
}
