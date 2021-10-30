import { fprint, choice, clear, pause, sleep, realSleep } from "/waterWorks.js"
import * as config from "/waterWorks.js"
import { Player, Spy, Sprite, rpgPrint, rpgMenu, loadFight, unloadFight } from "/mechanics/fightClub.js"

export async function execute(queue){

	if(typeof window.message === "string" && window.message.startsWith("rpgTest")) window.rpg = JSON.parse(window.message.substring(7))
	window.message = "rpgTest" + JSON.stringify(window.rpg)

	clear()

	const spy = new Spy()
	const crab = new Player()

	loadFight(crab, spy)

	//await sleep(1)

	while(true) {
		await spy.shoot_1()
		await sleep(1)
	}

	await crab.takeTurn()

	let result
	while(true) {
		if(await spy.takeTurn() === true) { // dead
			await realSleep(1)
			unloadFight()
			clear()
			await realSleep(1)
			return queue
		}
		if(await crab.takeTurn() === true) { // win
			await realSleep(1)
			unloadFight()
			clear()
			await realSleep(1)
			break
		}
	}

	await fprint("Neat.", "cyan")

	return queue
}
