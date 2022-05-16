import { fprint, textInput } from "../waterWorks.js"

export async function execute(queue) {

	await fprint("STOP.\n", "yellow", 1)
	await fprint("I'm sorry, excuse me?\n", "cyan", 1)
	await fprint("A large yeti crab threateningly ascends from under the bridge you're crossing.\n", "dim", 2)
	await fprint("Who approaches the Bridge of Death must answer me these questions three!\n", "yellow", 1)
	await fprint("Oh, THIS is the Bridge of Death? I was supposed to make a left back there.\n", "cyan")
	await fprint("Yes, yes, the Bridge of Death it is. Can't turn back now, hah hah!\n", "yellow")
	await fprint("Ask me the questions Bridge Keeper, I'm not afraid.\n", "cyan")
	await fprint("Why would you be afraid? Well, first question!", "yellow", 1)
	await fprint("What is the best animal?", "yellow", 1)

	let answer = await textInput()
	answer = answer.toLowerCase().replace(/ /g, "")
	if(answer.includes("squirrel")) {
		await fprint("Close, but WRONG ANSWER!\n", "yellow", 2)
		window.state = "The yeti crab casts forth plague and famine and shit as punishment, bozo.24"
		return queue
	}
	if(!answer.includes("crab")) return await wrong(queue)

	await fprint("Second question! What is the next letter in this sequence?", "yellow", 1)
	await fprint("S, B, A, R", "yellow", 0, 0)

	answer = await textInput()
	answer = answer.toLowerCase().replace(/ /g, "")
	if(answer != "c") return await wrong(queue)

	await fprint("Third question! How many days has the crabbiest person in the world lived?", "yellow", 1)

	answer = await textInput()
	answer = answer.toLowerCase().replace(/ /g, "")
	if(answer != window.days) return await wrong(queue)

	await fprint("Right, off you go.\n", "yellow")
	await fprint("Thanks.\n", "cyan", 1)

	await fprint("Experience + 1\n", "rainbow", 2)
	window.experience += 1

	return queue
}

async function wrong(queue) {
	await fprint("WRONG ANSWER!\n", "yellow", 2)
	window.state = "The yeti crab casts forth plague and famine and shit as punishment, bozo.24"
	return queue
}