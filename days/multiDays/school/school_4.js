import { fprint } from "../../../waterWorks.js"

export async function execute(queue) {

	await fprint("The principal talks to you in her office.\n", "dim")
	await fprint("Well, you did everything a young crab should want to do in school. Take your diploma and enter the workforce, me laddie.\n", "yellow", 1)

	await fprint("Aw sick thanks\n", "cyan", 1)

	await fprint("Math + 2", "rainbow", 1)
	await fprint("Mental health - 1", "rainbow", 1)
	await fprint("Experience + 1\n", "rainbow", 2)
	window.experience++

	queue.unshift("./days/cookingCompetition.js")
	queue.unshift("./days/paneraBreadGiftcard.js")
	queue.unshift("./days/prisonersDilemma.js")
	queue.unshift("./days/multiDays/presidentialCampaign/presidentialCampaign_1.js")
	queue = config.shuffleArray(queue)
	return queue
}
