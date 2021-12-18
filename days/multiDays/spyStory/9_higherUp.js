import { fprint, choice, clear, pause, sleep, realSleep } from "/waterWorks.js"
import * as config from "/waterWorks.js"
import { Player, HigherUp, rpgPrint, rpgMenu, loadFight, unloadFight } from "/mechanics/fightClub.js"

export async function execute(queue) {

	if(typeof window.message === "string" && window.message.startsWith("s_highe")) {
		window.rpg = JSON.parse(window.message.substring(7))
	} else {
		window.message = "s_highe" + JSON.stringify(window.rpg)
		await fprint("You notice a strange figure by the fishtank of the Chinese restaurant you're eating at.\n", "dim")
		await fprint("Hey do you see that guy\n", "cyan")
		await fprint("Yea weird vibes idk\n", "green", 1)
		await fprint("oh shit what\n", "cyan", 1)
		await fprint("She approaches your table.\n", "dim", 1)
		await fprint("oh no\n", "green", 1)
		await fprint("I think you know exactly what this is about.", "yellow", 0)
		await fprint("She says in a violence-implying tone.\n", "dim")
		await fprint("I really don't.\n", "cyan")
		await fprint("No? You don't recognize my jersey?\n", "yellow")
		await fprint("Her baseball jersey is emblazoned with \"The Organization\" on the front.\n", "dim")
		await fprint("Ohhhh I get it now.\n", "cyan", 1)
		await fprint("SECRET AGENT approaches!\n", "white", 1, 0.06)

		await pause()
	}

	clear()

	const spy = new HigherUp()
	const crab = new Player()

	loadFight(crab, spy)

	await sleep(1)
	await rpgPrint("So you're here to kill me, right? You want to do your little monologue first?", "cyan")
	await rpgPrint("Yeah, could I? Thanks.", "yellow")
	await rpgPrint("Big Man sent me to personally take you out. I guess we can't rely on our underlings for anything, geez.", "yellow")
	await rpgPrint("Dip. Let's get this battle started then.", "cyan")
	await rpgPrint("Wait first I gotta eat this.", "yellow")
	await spy.egg()

	let result
	while(true) {
		if(await crab.takeTurn() === true) {
			// win
			await realSleep(1)
			await rpgPrint("You're paying for my meal by the way.", "cyan")
			await rpgPrint("Aw damn.", "yellow")
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

	await fprint("ringa ding ding ring ring ring ring", "red", 0)
	await fprint("Says your phone. You pick up the call.\n", "dim")

	await fprint("Hey yeah what-\n", "cyan", 0)
	await fprint("A higher up in the organization was spotted at your location. Leave the area immediately or prepare for battle!\n", "yellow", 1)
	await fprint("Uh, already taken care of.\n", "cyan", 1)
	await fprint("What?\n", "yellow")
	await fprint("Yeah I mean it wasn't super difficult. They even paid for my food after I beat them.\n", "cyan")
	await fprint("Oh ok. Good job. Nice. Ok.\n", "yellow")
	await fprint("They hang up.\n", "dim", 1)

	await fprint("General Tsos + 4", "rainbow", 1)
	await fprint("Lo mein + 2", "rainbow", 1)
	await fprint("Experience + 1\n", "rainbow", 2)
	window.experience++

	queue.unshift("./days/multiDays/spyStory/10_fishWalking.js")
	queue = config.shuffleArray(queue)
	window.message = false

	return queue
}
