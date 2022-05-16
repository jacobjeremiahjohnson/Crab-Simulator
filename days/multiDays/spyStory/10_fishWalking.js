import { fprint, choice } from "../../../waterWorks.js"
import * as config from "../../../waterWorks.js"

export async function execute(queue) {

	await fprint("Literally so free. This was a great idea.\n", "cyan")
	await fprint("You're out walking your friend's jellyfish while they're out on vacation to earn some cash.\n", "dim", 1)
	await fprint("What is?\n", "green")
	await fprint("Walking this jellyfish, I'm getting 50 doubloons from it.\n", "cyan")
	await fprint("What jellyfish?\n", "green")
	await fprint("You look down, noticing the now empty leash.\n", "dim", 1.5)
	await fprint("Fuck.\n", "cyan")

	let answer = await choice(["Search the construction site", "Search the mall", "Search the supermarket"])

	if(answer == 1) {
		await fprint("They probably wandered off into the comically dangerous construction site.", "cyan", 0)
		await fprint("You say as you start scuttling over.\n", "dim", 1)

		await fprint("The jellyfish is sitting contently in a wheelbarrow.\n", "dim")
		await fprint("Oh thank god\n", "cyan")
		await fprint("The wheelbarrow starts to roll slowly towards the dangerous construction equipment.\n", "dim")
		await fprint("oh no\n", "cyan")

		await fprint("You! You're not allowed to be here!", "yellow", 0)
		await fprint("Some guy in hi-vis yells at you.\n", "dim", 1)

		answer = await choice(["I'm looking for my pet", "Get out my way bitch"])

		if(answer == 1) {
			await fprint("I'm in a hurry, my pet got into this site and it's dangerous.\n", "cyan")
			await fprint("Ok, what's their name?\n", "yellow")
			await fprint("Hahah, bet you don't remember.\n", "green", 1)

			answer = await choice(["Fido", "Spot", "Ted"])
			let name
			if(answer == 1) name = "Fido"
			else name = "Spot"

			if(answer == 1 || answer == 2) {
				await fprint("Their name's " + name + ".\n", "cyan")
				await fprint("Aww, sounds cute.\n", "yellow")
			} else {
				await fprint("Their name's Ted.\n", "cyan")
				await fprint("Fake ass name bro.\n", "yellow", 2)
				window.state = "While arguing with the construction worker, a stray cinder block hits you squarely on the head.22"
				return queue
			}
			await fprint("You race past him, snatching up " + name + " in the nick of time. The rest of your walk is pleasant and uneventful.\n", "dim")
			await fprint("oh shit nice\n", "green", 1)
			await fprint("Acrobatics + 1", "rainbow", 1)
		} else {
			await fprint("Get out my way bitch\n", "cyan", 1)
			await fprint("ok geez\n", "yellow", 1)
			await fprint("You race past him, snatching up the jellyfish in the nick of time. The rest of your walk is pleasant and uneventful.\n", "dim")
			await fprint("Badness + 1", "rainbow", 1)
			window.personality--
		}
	} else if(answer == 2) {
		await fprint("They probably wandered off into that bigass mall they just built.", "cyan", 0)
		await fprint("You say as you start scuttling over.\n", "dim", 1)

		await fprint("C'mere fishy fishy...\n", "cyan")
		await fprint("A group of fish give you weird looks.\n", "dim")
		await fprint("Ay there they are.\n", "green")
		await fprint("The jellyfish is shoplifting $30 worth of Target merchandise.\n", "dim")
		answer = await choice(["Encourage them", "Discourage them"])
		if(answer == 1) {
			await fprint("Nice.\n", "cyan", 1)
			await fprint("You both make out with a hat and some quality pens.\n", "dim", 1)
			await fprint("Drip + 1", "rainbow", 1)
			await fprint("Badness + 1", "rainbow", 1)
			window.personality--
		} else {
			await fprint("HEY! BAD JELLYFISH! NO!\n", "cyan")
			await fprint("The jellyfish looks at you with contempt now, but you understand that with a more mature mindset ten years down the road, they will thank you for instilling such just morals unto them.\n", "dim", 1)
			await fprint("Goodness + 1", "rainbow", 1)
			window.personality++
		}
	} else {
		await fprint("They probably wandered off into that grocery store over there.", "cyan", 0)
		await fprint("You say as you start scuttling over.\n", "dim", 1)

		await fprint("thats the bitch\n", "green")
		await fprint("You spot them bartering and trading with an employee in the corner of the store. You run up to them and engage in battle.\n", "dim")

		answer = await choice(["Rock", "Paper", "Scissors"])
		await fprint("Rock, paper, scissors, shoot!\n", "green")

		if(answer == 1) {
			await fprint("Haha get fucked, rock beats scissors.\n", "cyan", 1)
		} else if(answer == 2) {
			await fprint("Haha get fucked, paper beats rock.\n", "cyan", 1)
		} else {
			await fprint("Haha get fucked, scissors beats paper.\n", "cyan", 1)
		}
		await fprint("The jellyfish reluctantly gets back on its leash, ready to finish their walk.\n", "dim", 1)
	}

	await fprint("Money + 50", "rainbow", 1)
	window.rpg.money += 50
	await fprint("Experience + 1\n", "rainbow", 2)
	window.experience += 1

	queue.unshift("./days/multiDays/spyStory/11_secretAgentReprise.js")
	queue = config.shuffleArray(queue)

	return queue
}
