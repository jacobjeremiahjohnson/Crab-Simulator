import { fprint, clear, output, id } from "../waterWorks.js"
import { start, fishPrint } from "../mechanics/fishing/fishing.js"

export async function execute(queue) {

	/*

	await fprint("Man I Love Fishing!\n", "cyan", 1)
	await fprint("You're out on a fishing trip despite the dubious legality in a society made of aquatic animals.\n", "dim", 2)

	await fprint("Alrighty, here's the spot.\n", "cyan", 2)

	*/

	clear()

let html = `
<div id='fishingMinigameMap'>
</div>
<div id='fishingMinigameMeter'>
	<div id='fishingTarget'></div>
	<div id='fishingBar'></div>
</div>
`
	let div = document.createElement("div")
	div.classList.add("fishingMinigame")
	div.innerHTML = html
	output.appendChild(div)

	let fishPrintOutput = document.createElement("div")
	fishPrintOutput.id = "fishPrintOutput"
	output.appendChild(fishPrintOutput)

	return new Promise(res => {
		start(id("fishingMinigameMap"))
		fishPrint("Catch fish by clicking on them, then mash the spacebar to match it with the target on the right side! Hold it for 10 seconds!", "green", fishPrintOutput)
	})

}
