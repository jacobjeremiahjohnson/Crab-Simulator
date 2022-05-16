import { fprint, textInput } from "../../../waterWorks.js"
import * as config from "../../../waterWorks.js"

export async function execute(queue) {

	await fprint("Aw yeah internet time babey!\n", "cyan")
	await fprint("You type \"yhings to do oline\" into Google. A list of web pages appears.\n", "dim", 1)
	await fprint("Woah free money? yes please", "cyan", 0)
	await fprint("You say, clicking a link titled \"FREE MONEY CLICK HERE\".\n", "dim", 1)

	await fprint("FMCH Co｡ welcomes you to Free Money Click Here, the internet's best free money generator.", "yellow")
	await fprint("To get started, please enter some information about yourself.\n", "yellow", 1)

	await fprint("Last name:", "yellow")
	await textInput()

	await fprint("First name:", "yellow")
	await textInput()

	await fprint("Middle initial:", "yellow")
	let answer = await textInput()
	if(answer.length !== 1) {
		await fprint("Is that real?\n", "green")
		await fprint("yeah trust\n", "cyan", 1)
	}

	await fprint("Mother's maiden name:", "yellow")
	await textInput()

	await fprint("Credit / debit card number:", "yellow")
	answer = await textInput()
	if(answer.replace(/ /g, "").length == 16) {
		await fprint("Developer's note: please don't put your actual credit card number here thanks.\n", "green", 1)
	}

	await fprint("Favorite color:", "yellow")
	await textInput()

	await fprint("Thank you for completing this survey! :)\n", "yellow", 2)
	await fprint("Your CD drive opens, revealing 45 dollars.\n", "dim", 1)
	await fprint("aw sweet\n", "cyan", 1)

	await fprint("Money + 45", "rainbow", 1)
	await fprint("Experience + 1\n", "rainbow", 2)
	window.rpg.money += 45
	window.experience += 1

	queue.unshift("./days/multiDays/spyStory/8_armsDealer.js")
	queue = config.shuffleArray(queue)
	return queue
}
