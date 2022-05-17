import { fprint, clear, output, id } from "../waterWorks.js"
import { start } from "../mechanics/fishing/fishing.js"

export async function execute(queue) {

	/*

	await fprint("Man I Love Fishing!\n", "cyan", 1)
	await fprint("You're out on a fishing trip despite the dubious legality in a society made of aquatic animals.\n", "dim", 2)

	await fprint("Alrighty, here's the spot.\n", "cyan", 2)

	*/

	clear()

let html = `
<div class='fishingMinigame'>
	<div id='fishingMinigameMap' class='map'>
	</div>
	<div class='meter'>
	</div>
</div>
<div id='fishingMinigameOutput'>
</div>
`
	let div = document.createElement("div")
	div.innerHTML = html
	output.appendChild(div)

	return new Promise(res => {
		start(id("fishingMinigameMap"))
	})

}
