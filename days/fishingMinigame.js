import { fprint, clear, id, output, sleep } from "../waterWorks.js"
import { start, fishPrint } from "../mechanics/fishing/fishing.js"

export async function execute(queue) {

	await fprint("Man I Love Fishing!\n", "cyan", 1)
	await fprint("You're out on a fishing trip despite the dubious legality in a society made of aquatic animals.\n", "dim", 2)

	await fprint("Alrighty, here's the spot.\n", "cyan", 2)

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

	return new Promise(async resolve => {
		let fish = await start(id("fishingMinigameMap"))
		await sleep(2)
		switch(fish) {
			case 8:
				await fprint("Aw nice, all 8 fish!\n", "cyan")
				await fprint("congrats bb gurl\n", "green", 1)
				break
			case 7:
			case 6:
			case 5:
			case 4:
				await fprint("Alright, " + fish + " fish!\n", "cyan")
				await fprint("decent enough\n", "green", 1)
				break
			case 3:
			case 2:
			case 1:
				await fprint("Damn, only " + fish + " fish.\n", "cyan")
				await fprint("nice going bozo\n", "green", 1)
				break
			case 0:
				await fprint("Aw fuck, I didn't catch a single fish?\n", "cyan")
				await fprint("Don't sweat it, it was probably a glitch from one of the programmers. I mean, you can't be THAT bad, right?\n", "green", 1)
				break
		}
		await fprint("Fish + " + fish, "rainbow", 1)
		await fprint("Experience + 1\n", "rainbow", 2)
		window.experience++
		resolve(queue)
	})

}
