import { fprint, clear, pause, realSleep } from "../../../waterWorks.js"
import { Player, Boss, Spy, rpgPrint, loadFight, unloadFight } from "../../../mechanics/spy/fightClub.js"

const months = [
	"January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]
const d = new Date()
const date = months[d.getMonth()] + " " + d.getDate()

export async function execute(queue) {

	window.rpg.battleID = 3

	if(typeof window.message === "string" && window.message.startsWith("s_final")) {
		window.rpg = JSON.parse(window.message.substring(7))
	} else {
		window.message = "s_final" + JSON.stringify(window.rpg)

		await fprint("The thirteenth hour.\n", "green", 2)
		await fprint("It's time to end this.", "cyan", 0)
		await fprint("You say into your shellphone.\n", "dim", 1)
	
		await fprint("You sure you want to do this now?", "yellow", 0)
		await fprint("That one spy guy asks.\n", "dim")
	
		await fprint("Never been more sure in my life. Let's go.\n", "cyan", 1)
		await fprint("They give you an address and a time. You wait patiently outside until the clock strikes midnight.\n", "dim", 1)
	
		await fprint("Why've you been sittin outside my shop for three hours, son?\n", "blue")
		await fprint("Oh, great timing. Are you familiar with The Organization?\n", "cyan")
		await fprint("Son, I don't think you know what yer messin with.\n", "blue", 1)
		await fprint("I got a score to settle. I can promise you they'll be through after tonight. If you'll cooperate, that is.\n", "cyan", 1)
		await fprint("After careful consideration, the shopkeep says", "dim", 0)
		await fprint("Follow me.\n", "blue", 1)
	
		await fprint("Entering the cornerstore, you don't notice anything out of the ordinary. He unlocks a door labeled \"Employees Only\" and leads you down a flight of stairs to what appears to be a storage room.", "dim")
		await fprint("Your feel of ease dissipates when he pushes aside boxes to unlock a room labeled \"" + date + ", Midnight\".\n", "dim")
		await fprint("The fuck is this?\n", "cyan")
		await fprint("I really did warn you. Nothing can save you now.\n", "blue", 2)
	
		await fprint("You step forward into a room containing a desk, another door on the wall opposite of you, and a phone.\n", "dim", 1)
		await fprint("It rings.\n", "red", 1)
		await fprint("Look behind you.\n", "yellow", 2)
	
		await fprint("Following their instruction, you see a carbon-copy of yourself staring back at you.\n You drop the phone, startled.\n", "dim")
	
		await fprint("I'm you. A reincarnation of you, really. I head a group called the Simulates (pronounced /ˌsimyə'lits/) protecting countless worlds from The Organization and much greater threats.\n", "yellow")
		await fprint("Why are you only revealing yourself to me now?\n", "cyan")
		await fprint("I'm sorry, really am, but I've been real busy lately. Good job nearly defeating this world's Organization by yourself.\n", "yellow")
		await fprint("... Thanks. This is a lot to take in.\n", "cyan")
		await fprint("They couldn't finish their next thought, because not soon after beginning to speak, they vaporize into a fine, salty mist.\n", "dim")
		await fprint("WHAT THE FUCK?\n", "cyan", 1)
		await fprint("Heh. I haven't figured out how to make em but I sure can close off worldly connections. Step into the room, son.\n", "blue", 2)

		await fprint("THE BOSS approaches!\n", "white", 1, 0.06)
		await pause()
	}

	clear()

	const spy = new Boss()
	const crab = new Player()

	loadFight(crab, spy)

	await realSleep(1)
	await rpgPrint("You're in a featureless room with concrete walls. A solitary lightbulb hangs down from the ceiling, illuminating the drab landscape.", "dim")
	await rpgPrint("Don't forget what I said earlier. I'll kill you with or without help.", "cyan")
	await rpgPrint("An attitude like that has kept me the Boss for over 40 years, heh heh heh. Ready yerself, son.", "blue")

	let startHP = crab.hp
	await spy.tnt()
	if(startHP !== crab.hp) {
		await realSleep(1)
		await rpgPrint("Don't beat yerself up, son. You can telegraph my attacks, but not easily. Heh heh heh.", "blue")
	}

	while(true) {
		if(await crab.takeTurn() === true) {
			// win
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

	await realSleep(1)
	await rpgPrint("Urrgh.. I really didn't want ta resort ta this.", "blue")
	await rpgPrint("Resort to what? Didn't I just beat you?", "cyan")
	await rpgPrint("Not quite.", "blue")
	await spy.protein()
	await rpgPrint("This protein bar gives me enough time to do my Final Attack.", "blue")
	await realSleep(1)
	await rpgPrint("Ring! Ring ring ring ring!", "red")
	await rpgPrint("Hold him off. I'm coming to help.", "purple")
	await rpgPrint("The voice is familiar to you. It's the first secret agent you beat up so many days ago.", "dim")
	await rpgPrint("Thank you.", "cyan")
	await realSleep(1)

	await rpgPrint("Break time's over, son.", "blue")
	await spy.finalAttack()
	if(crab.hp <= 0) {
		await realSleep(1)
		unloadFight()
		clear()
		await realSleep(1)
		return queue
	}

	await realSleep(1)
	let a = new Spy(true)
	await a.moveTo(a.x, -100)
	await a.moveTo(a.x, a.y + 100, 1)
	a.finalAttack()
	await realSleep(0.3)
	spy.getHurt(1)
	await realSleep(1)
	await a.moveTo(300, 200, 2)

	await realSleep(2)
	unloadFight()
	clear()
	await realSleep(1)

	await fprint("You collapse onto the ground from exhaustion.\n", "dim", 1)
	await fprint("Holy shit you came in clutch. I'm not sure how much longer I could've kept attacking.\n", "cyan")
	await fprint("I figured it was the least I could do. Thank you again for setting me on the right path.\n", "purple")
	await fprint("That's just what I do.", "cyan", 2)
	await fprint("I'm gonna dramatically pass out now, if you don't mind.\n", "cyan")
	await fprint("oh yeah ofc\n", "purple", 3)
	await fprint("The clock of the storage room reads 2 in the morning. After gathering enough strength, you get up and walk home.\n", "dim", 2)

	await fprint("Bragging rights + 1", "rainbow", 1)
	await fprint("Concerns for the multiverse + 2", "rainbow", 1)
	await fprint("Sense of accomplishment + 8", "rainbow", 1)
	await fprint("Experience + 1\n", "rainbow", 2)
	window.experience++

	return queue
}
