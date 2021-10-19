import { fprint, choice, clear, pause, sleep, realSleep } from "/waterWorks.js"
import * as config from "/waterWorks.js"
import { PlayerNew, Spy, Sprite, rpgPrint, rpgMenu, loadFight, unloadFight } from "/mechanics/fightClub.js"

export async function execute(queue){

	clear()

	const crab = new PlayerNew()
	const spy = new Spy()

	loadFight(crab, spy)

	while(true) {
		await spy.shoot()
		await sleep(0.5)
	}

	unloadFight()
	clear()

	return queue
}
