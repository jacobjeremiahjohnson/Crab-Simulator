import { fprint, choice, clear, pause, sleep, realSleep } from "../../../waterWorks.js"
import * as config from "../../../waterWorks.js"
import { Player, Spy, rpgPrint, loadFight, unloadFight } from "../../../mechanics/spy/fightClub.js"

export async function execute(queue){

	// saves copy of rpg in window.message so restart day works
	if(typeof window.message === "string" && window.message.startsWith("rpgTest")) {
		window.rpg = JSON.parse(window.message.substring(7))
	} else {
		window.message = "rpgTest" + JSON.stringify(window.rpg)
		await fprint("You're walking downtown again and chance upon that one alleyway.", "dim", 1)
		await fprint("As if on queue, your phone starts to ring.\n", "dim", 1)
		await fprint("A call from... \"That one spy guy\"?\n", "green")

		await fprint("Hey, what's it this time?\n", "cyan")
		await fprint("He's found your location. My team can't reach you this time. Good luck.\n", "yellow")
		await fprint("You look over into the alleyway. Someone looks back.\n", "dim", 1)
		await fprint("Fu-\n", "cyan", 0)
		await fprint("SECRET AGENT approaches!\n", "white", 1, 0.06)

		await pause()
	}

	clear()

	const spy = new Spy()
	const crab = new Player()

	loadFight(crab, spy)

	await sleep(1)
	await rpgPrint("Look who I found... Heheh heh. Heh.", "blue")
	await rpgPrint("Hey fair warning, I got some kit now, so.", "cyan")
	await rpgPrint("As if I'd be scared of the likes of YOU!", "blue")
	await rpgPrint("You took EVERYTHING from me. I was kicked out of the Organization after some stupid flower pot knocked me out.", "blue")
	await rpgPrint("So you're here to kill me again?", "cyan")
	await rpgPrint("Yeah, I'm here to kill you again. And fair warning, you're not the only one with kit.", "blue")
	await spy.shoot_1()
	await rpgPrint("You like that last attack with the down arrow key? Pretty creative, I know.", "blue")

	let result
	while(true) {
		if(await crab.takeTurn() === true) {
			// win
			await realSleep(1)
			await rpgPrint("Huh. You did that all by yourself?", "blue")
			await rpgPrint("Rip bozo fucking idiot get schooled nerd lmao.", "cyan")
			await realSleep(0.5)
			unloadFight()
			clear()
			await realSleep(1)
			break
		}
		if(await spy.takeTurn() === true) {
			// dead
			await realSleep(1)
			unloadFight()
			clear()
			await realSleep(1)
			return queue
		}
	}

	await fprint("You leave the (former) secret agent in a pile of garbage bags and continue running your errands.\n", "dim", 1)
	await fprint("Fighting skills + 8", "rainbow", 1)
	await fprint("Experience + 1\n", "rainbow", 2)
	window.experience++

	queue.unshift("./days/multiDays/spyStory/7_surveys.js")
	queue = config.shuffleArray(queue)
	window.message = false

	return queue
}
