import { fprint, choice, clear, pause, sleep, realSleep } from "/waterWorks.js"
import * as config from "/waterWorks.js"
import { PlayerNew, Spy, Sprite, rpgPrint, rpgMenu, loadFight, unloadFight } from "/mechanics/rpgModule.js"

export async function execute(queue){

	await fprint("You're walking downtown, admiring the aquatic city architecture.\n", "dim", 1)
	await fprint("Riiiing.", "red", 0)
	await fprint("Your phone calls out. Unknown number.\n", "dim", 1)
	await fprint("Oh hey what's up?\n", "cyan")
	await fprint("I got to you in time. Listen to me: someone's trying to kill you. They're down that alleyway to your right. I'll try to get to you in time, but if I can't, good luck.\n", "yellow", 1)
	await fprint("Click.\n", "red", 2)

	await fprint("You look down the alley. Someone looks back.\n", "dim", 1)
	await fprint("SHADY FIGURE approaches!\n", "white", 1, 0.06)

	await pause()
	clear()

	const crab = new PlayerNew()
	const spy = new Spy()

	loadFight(crab, spy)

	await sleep(1)
	await rpgPrint("Do you remember getting a phone call you weren't supposed to get?", "blue")
	await rpgPrint("Something about secret agents? What about it?", "cyan")
	await rpgPrint("It's obvious, isn't it? We can't let someone who knows about the Organization to live.", "blue")
	await rpgPrint("So you're here to kill me?", "cyan")
	await rpgPrint("Yeah, I'm here to kill you.", "blue")

	await crab.takeTurn()
	await rpgPrint("Seriously? I'm almost gonna feel bad for doing this.", "blue")
	await spy.shoot()

	if(crab.hp == 75) await rpgPrint("Wow, you know how to dodge with the left and right arrow keys.", "blue")
	else await rpgPrint("Hah, you don't even know how to dodge with the left and right arrow keys.", "blue")
	await crab.takeTurn()
	await rpgPrint("Ow! Aaah! That hurt so much!", "blue")
	await rpgPrint("NOT! Hahahah.", "blue")
	await spy.shoot()
	await crab.takeTurn()
	await rpgPrint("Oh man, this is easy! I hope nothing weird or uncharacteristic interrupts this fight.", "blue")
	await spy.shoot()
	await crab.takeTurn()
	await rpgPrint("Pssh, I don't even have a scratch on me. Is this really all you can do?", "blue")
	const pot = new Sprite("white", flowerPotSprite, 10)
	await pot.moveTo(spy.x, spy.y - 200, 0)
	await pot.moveTo(spy.x, spy.y + 50, 2)
	spy.updateSprite(3)
	await realSleep(3)
	await rpgPrint("Press ENTER", "dim")

	unloadFight()
	clear()

	await sleep(1)
	await fprint("You hear your phone ringing. You pick up the call.\n", "dim", 1)
	await fprint("I used a plant to knock over a flower pot. Is he unconcious?\n", "yellow")
	await fprint("Uhh, he is. What now?\n", "cyan")
	await fprint("That's for you to figure out. I'll keep you updated.\n", "yellow", 1)
	await fprint("Click.\n", "red", 1)

	await fprint("Concern for your life + 2", "rainbow", 1)
	await fprint("Experience + 1\n", "rainbow", 2)
	window.experience++

	return queue
}

const flowerPotSprite = String.raw`
%\
┕┙
`
