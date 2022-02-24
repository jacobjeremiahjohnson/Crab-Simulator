import { fprint, choice } from "../../../waterWorks.js"
import * as config from "../../../waterWorks.js"

export async function execute(queue) {

	await fprint("You slept restlessly all night, thinking about how to extract your revenge on that needlessly rude prawn shop owner.\n", "dim", 1)
	await fprint("How will you do it?\n", "green")

	let answer = await choice(["Ask kindly", "Ask firmly", "Arson"])

	if(answer == 1) {
		await fprint("I like it.\n", "green", 1)
		await fprint("You arrive at the prawn shop and knock loudly on the door.", "dim")
		await fprint("Rick Herring opens it and welcomes you in.\n", "dim", 1)
		await fprint("Hey, uh, Mr｡ Herring, I was wondering if I could borrow just, like, 20 bucks. If not no big deal really. But it would be a huge help.\n", "cyan", 1)
		await fprint("Sure.\n", "yellow")
		await fprint("wait really\n", "cyan")
		await fprint("Yeah I mean I guess.\n", "yellow")
		await fprint("Dip.\n", "cyan", 1)

		await fprint("Money + 20", "rainbow", 1)
		await fprint("Goodness + 1", "rainbow", 1)
		await fprint("Experience + 1\n", "rainbow", 2)
		window.experience++
		window.rpg.money += 20
		window.personality++

	} else if(answer == 2) {
		await fprint("Interesting choice.\n", "green", 1)
		await fprint("You arrive at the prawn shop and knock loudly on the door.", "dim")
		await fprint("Rick Herring opens it and welcomes you in.\n", "dim", 1)
		await fprint("Mr｡ Herring, I would like to borrow 20 dollars.\n", "cyan", 1)
		await fprint("Sure.\n", "yellow")
		await fprint("wait really\n", "cyan")
		await fprint("Yeah I mean I guess.\n", "yellow")
		await fprint("Dip.\n", "cyan", 1)

		await fprint("Money + 20", "rainbow", 1)
		await fprint("Experience + 1\n", "rainbow", 2)
		window.experience++
		window.rpg.money += 20
	} else {
		await fprint("You laugh a little too hard. The narrator would give you a weird look if he existed physically.", "dim", 1)
		await fprint("You arrive at the prawn shop, jerry can in hand. You douse the layout with gasoline, and take out a match from your backpack.\n", "dim", 1)
		await fprint("Bombs away.\n", "cyan", 1)
		await fprint("The place instantly ignites. You feel no remorse. Mainly confusion, actually.\n", "dim")
		await fprint("wait why did I do that\n", "cyan", 1)
		await fprint("You look down and find a 20 dollar bill by your legs.\n", "dim", 1)
		await fprint("Oh cool.\n", "cyan", 1)

		await fprint("Money + 20", "rainbow", 1)
		await fprint("Badness + 1", "rainbow", 1)
		await fprint("Experience + 1\n", "rainbow", 2)
		window.experience++
		window.rpg.money += 20
		window.personality--
	}

	queue.unshift("./days/multiDays/spyStory/5_yardSale.js")
	queue = config.shuffleArray(queue)

  return queue
}
