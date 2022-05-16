import { fprint, choice } from "../../../waterWorks.js"

export async function execute(queue) {

	await fprint("It's third period, lunch time. Where are you sitting?\n", "green", 1)
	let answer = await choice(["The jocks", "The goths", "The nerds"])

	if(answer == 1) {
		await fprint("You walk over to the jock table.\n", "dim")
		await fprint("Hey can I sit with you guys?\n", "cyan")
		await fprint("Sure.\n", "yellow", 1)
		await fprint("You all have a nice long conversation about the Seahawks. Except for one seemingly average-in-strength guy sitting on the long side of the table.\n", "dim")
	} else if(answer == 2) {
		await fprint("You walk over to the goth table.\n", "dim")
		await fprint("Hey can I sit with you guys?\n", "cyan")
		await fprint("Sure.\n", "yellow", 1)
		await fprint("You all have a nice long conversation about the moon. Except for one guy not wearing black eyeliner and claw polish on the long side of the table.\n", "dim")
	} else if(answer == 3) {
		await fprint("You walk over to the nerd table.\n", "dim")
		await fprint("Hey can I sit with you guys?\n", "cyan")
		await fprint("Sure.\n", "yellow", 1)
		await fprint("You all have a nice long conversation about League of Legends. Except for one guy not actively discussing the latest world's match up on the long side of the table.\n", "dim")
	}

	await fprint("Yo what's your name dude.\n", "cyan", 1)
	await fprint("Me? My name's Carlos Sandchez.\n", "blue")
	await fprint("You seem as unremarkable as I am, wanna be my friend?\n", "cyan")
	await fprint("Yea lets gooooo\n", "blue", 1)

	await fprint("Friend + 1", "rainbow", 1)
	await fprint("Experience + 1\n", "rainbow", 2)
	window.experience++

	queue.unshift("./days/multiDays/school/school_3.js")
	return queue
}
