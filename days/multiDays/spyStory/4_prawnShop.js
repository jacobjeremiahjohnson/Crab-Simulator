import { fprint, choice } from "../../../waterWorks.js"
import * as config from "../../../waterWorks.js"

// originally made when the beefy fritos burrito was still an available menu item
// lol doesn't have any reference to the beefy fritos burrito anymore

export async function execute(queue) {
	await fprint("Damn, wish I had some money.\n", "cyan")
	await fprint("Well, what's a fast way to earn clean cash?\n", "green", 1)
	await fprint("How about I just pawn some stuff off at a pawnshop? I don't see how this could go wrong in the slightest.\n", "cyan", 2)
	await fprint("You approach the shop. The brick walls of the building look very old. The thick layer of dust coating the windows doesn't do much to help alleviate the sense of foreboding.\n", "dim", 1)
	await fprint("Hello? Anyone here?", "cyan", 0)
	await fprint("You call out while opening the door.\n", "dim", 1)
	await fprint("Some noises can be heard from behind the counter, and eventually out pops a small fish.\n", "dim", 1)
	await fprint("I'm Rick Herring, and this is my prawn shop. I work here with my old man and my son, Big Haddock. Everything in here has a story and a price. One thing I've learned after 21 years: you never know what is gonna come through that door.\n", "yellow", 1.5)
	await fprint("Great, uh, I'm here to pawn off some stuff of mine.\n", "cyan")
	await fprint("Well, what do you have in store?\n", "yellow")

	let answer = await choice(["My old laptop", "My Big Mouth Billy Bass", "My watch"])

	if(answer == 1) {
		await fprint("I got an old laptop here. How much will you take it for?\n", "cyan", 2)
		await fprint("...", "yellow", 1)
		await fprint("Best I can do is $20.\n", "yellow", 1)
		await fprint("Deal.\n", "cyan", 1)
		await fprint("Old laptop - 1", "rainbow", 1)
		await fprint("Money + 20", "rainbow", 1)
		queue.unshift("./days/multiDays/spyStory/5_yardSale.js")
		queue = config.shuffleArray(queue)
		window.rpg.money += 20
	} else if(answer == 2) {
		await fprint("I got a Big Mouth Billy Bass here. How much will you take it for?\n", "cyan", 1)
		await fprint("tf makes you think I want that?\n", "yellow", 1)
		await fprint("Oh ok sorry.\n", "cyan", 1)
		await fprint("Nothing + 0", "rainbow", 1)
		queue.unshift("./days/multiDays/spyStory/4_5_extraMoney.js")
		// day where you find 20 dollars in an unmarked paper bag by the railroad tracks
	} else {
		await fprint("I got a watch here. How much will you take for it?\n", "cyan")
		await fprint("My oh my, that is a fantastic watch. Tell you what, I'll give you $30 for it.\n", "yellow")
		await fprint("Oh dope.\n", "cyan", 2)
		await fprint("Watch - 1", "rainbow", 1)
		await fprint("Money + 30", "rainbow", 1)
		queue.unshift("./days/multiDays/spyStory/5_yardSale.js")
		queue = config.shuffleArray(queue)
		window.rpg.money += 30
	}
	await fprint("Experience + 1\n", "rainbow", 2)
	window.experience += 1
	return queue
}
