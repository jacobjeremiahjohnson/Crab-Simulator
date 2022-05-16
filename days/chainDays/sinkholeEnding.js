import { fprint, choice, pause } from "../../waterWorks.js"

export async function execute(queue) {
	await fprint("You are disoriented. Motionless. Disembodied.\n", "dim", 2)

	if(window.message == 0) {
		// worthy
		await fprint("I thank you for seeing the need of my people.\n", "rainbow", 3)
		await fprint("You wake up in your bed to the distinct scent of a crab steamer.\n", "dim", 1)
		await fprint("Goodness + 1", "rainbow", 1)
		window.personality++
	} else {
		// unworthy
		await fprint("Why did you deem them Unworthy?\n", "rainbow", 1)
		let answer = await choice(["Bad vibes", "Didn't like them", "I didn't know what would happen"])
		if(answer == 1 || answer == 2) {
			await fprint("Unacceptable.\n", "rainbow", 3)
		} else {
			await fprint("Do not take such decisions lightly. Unacceptable.\n", "rainbow", 3)
		}
		await fprint("You wake up in your bed to the distinct scent of a crab steamer.\n", "dim", 1)
		await fprint("Badness + 1", "rainbow", 1)
		window.personality--
	}
	await fprint("Experience + 1\n", "rainbow", 2)
	window.experience++
	return queue
}