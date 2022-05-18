// https://docs.google.com/document/d/18BcuCWor4hgtS_EwAWBTJOp9TZmFc8nn81btmvg1E-Y/edit?usp=sharing

/*
- Informational text is "dim"
- Narrator speech is "green"
- Character's speech is "cyan"
- Other character's speech are "yellow", "blue", "purple", "orange", and "light yellow" in that order
- Onomonopoeia and other sounds are "red"
- God and stat level ups are "rainbow"
- Use "rainbow" and "white" very sparingly
- Use "｡" character if you want a period to not pause like a full stop with fprint()

- Carlos (Carlos Sandchez) is a reoccurring friend character for the crab now

TIMINGS
wait is how long to wait before next instruction, default 0.5
text speed is how long normal letters take, default 0.04
slow text speed is recommended to be 0.06
fast text speed is recommended to be 0.02
*/

/* LIST OF DEATHS
01 - depression.js Crab suicide
02 - burnWitch.js Burnt to a crisp
03 - /chainDays/oldGuyDrugs/oldGuyDrugs_2.js Oyster-piod overdose
04 - /chainDays/cringeNarrator.js Cringed to death
05 - /multiDays/oldGuyDrugs/oldGuyDrugs_2.js M'shark-er fume overdose
06 - /multiDays/robberyTime/robberyTime_3.js Buff crab beat up
07 - /multiDays/oldGuyDrugs/oldGuyDrugs_2.js Apartment flooding
08 - /chainDays/crabExamDeath.js Not licensed to crab
09 - cookingCompetition.js Automobile gakked you
10 - /chainDays/presidentStay.js Assassination
11 - fisherman.js Cooked and eaten
12 - coolCrabs.js Beat up real "oof ouch owie" like
13 - prisonersDilemma.js Prison time
14 - /chainDays/secretMeeting.js Ouch ow fire
15 - /multiDays/restaurant_2.js Stalking and choking
16 - coding.js Code error
17 - mcDolphins.js Village uprising
18 - slideWhistle.js Crushed by a piano
19 - hostage.js Called in a nuke for some reason lol
20 - spyStory/ Died in combat
21 - spyStory/8_armsDealer.js shot by security guard
22 - spyStory/10_fishWalking.js stray cinder block
23 - sinkhole.js false idol
24 - riddles.js wrong answer
25 - /multiDays/school/school_3.js lost a fight
*/

import { fprint, choice, clear, pause } from "./waterWorks.js"
import * as config from "./waterWorks.js"

const skipIntro = true // goes straight into the game if true
var quitable = false // if can quit rn
var atEndOfDay = false
var quitVar = 0 // save and quit stuff
var quitDotInterval // save and quit stuff
var queue, dayString
window.days = 0 // number of days
window.experience = 0 // exp level
window.personality = 0 // positive = good, negative = bad
window.state = 0 // 0 = alive, -1 = win, string = death message
window.message = 0 // used to communicate short term between days, typically used in multidays
window.difficulty = 1 // 1 for normal, 1.5 for easy, used in spy story
window.rpg = {
	money: 0,
	weapons: ["shove"],
	spells: [],
	items: [],
	battleID: 0 // 1 spy, 2 higher up, 3 boss
}


// flag means its a resume if true
// flag means normal if false
// flag is the queue if restarting day
async function game(flag = false) {
	queue = config.generateQueue()
	if(flag === true) {
		let saveFile = JSON.parse(window.localStorage.getItem("save"))
		window.days = saveFile[0]
		window.experience = saveFile[1]
		window.personality = saveFile[2]
		window.state = saveFile[3]
		window.message = saveFile[4]
		queue = saveFile[5]
		window.inventory = saveFile[6]
	} else if(flag !== false) {
		queue = flag
	}
	while(true) {
		quitable = true
		atEndOfDay = true
		await pause()
		atEndOfDay = false
		window.days++
		clear()
		await fprint("DAY " + window.days + "\n", "white", 1, 0)
		dayString = queue.shift()
		quitable = false
		if(dayString !== undefined) { // saving and quiting on the last day results in undefined queue
			var day = await import(dayString)
			queue = await day.execute(queue)
		}
		if(queue.length == 0 && window.state == 0) { // if queue is empty and not dead on the last day
			window.state = -1 // set state to win
		}
		if(window.state != 0) { // if state isn't default, break out of game loop (dead or win)
			quitable = false
			await pause()
			break
		}
	}
	quitable = false
	if(window.state == -1) {
		// win game
		clear()
		window.days++
		await fprint("DAY " + window.days + "\n", "white", 1, 0)
		await fprint("Damn, you actually made it.\n", "green", 2)
		await fprint("Huh? Where am I?\n", "cyan")
		await fprint("You're at the end of the game. You finished all of the trials I put you through.", "green")
		await fprint("You may rest now.\n", "green", 2)
		await fprint("...", "cyan", 1)
		await fprint("I don't want to. I still have so much to do as a crab.\n", "cyan", 1)
		await fprint("Really? I've never had this happen to me before... I'll tell you what, kid. You wanna become a narrator?\n", "green")
		let answer = await choice(["Yes", "No"])
		if(answer == 1) {
			await fprint("I accept.\n", "green")
			await fprint("Thank you. I can move on now. I shall see you again soon.\n", "white", 1)
			await fprint("Where are you going?", "green", 2)
			await fprint("...", "green", 3)
			await fprint("Oh, and thanks for playing through this whole thing as me. You saved me a whole lot back there.", "green", 2)
			await fprint("I guess I should be going as well. See ya.\n", "green", 4)
		} else {
			await fprint("Thanks for the offer, but I refuse.\n", "cyan")
			await fprint("I can't blame you.", "green", 1)
			await fprint("Goodbye for now. I shall see you again soon.\n", "green", 1)
			await fprint("Where are you going?", "cyan", 2)
			await fprint("...", "cyan", 3)
			await fprint("Oh, and thanks for playing through this whole thing as me. You saved me a whole lot back there.", "cyan", 2)
			await fprint("I guess I should be going as well. See ya.\n", "cyan", 4)
		}
		await pause()
		clear()
		config.sleep(2)
		await fprint("Thanks for playing Crab Simulator 2!\n", "yellow", 3)
		await fprint("STATS:", "white", 1)
		await fprint("Total days : " + window.days, "white", 1)
		await fprint("Experience : " + window.experience, "white", 1)
		await fprint("Overall Kindness : " + window.personality + "\n", "white", 1)
		if(window.personality > 0) {
			await fprint("Those were some pretty nice choices back there. Good job.\n", "rainbow", 3)
		} else {
			await fprint("Those weren't some pretty nice choices back there. Not cool, dude.\n", "rainbow", 3)
		}
		await fprint("Hope you liked our game. Gotta run now, bye.\n", "yellow", 10)
		window.localStorage.removeItem("save")
		await fprint("Refresh this page btw. There isn't anything after this.\n", "green", 30)
		await fprint("No, I'm serious. There's not.\n", "green", 30)
		await fprint("Truly, this is the last funny little text that appears.\n", "green", 30)
		await fprint("Ok I lied, this is. But actually nothing after this.\n", "green", 120)
		await fprint("You're taking too long, lemme just do it for you.\n", "green", 1)
		location.reload()

	} else {
		// lose game
		clear()

		await fprint("You died.\n", "red", 2, 0)
		await fprint("Ending " + window.state.slice(-2) + "\n", "green", 1, 0)
		await fprint(window.state.slice(0, -2) + "\n", "green", 1)
		await fprint("Congrats, you made it " + window.days + " " + config.dayPlural() + ".\n", "green", 2)

		if(window.state.slice(-2) == 20) { // rpg day
			await fprint("This battle is all about learning enemy attacks and responding with the arrow / WASD keys. Notice subtle changes in enemy appearances before attacks.", "green")
			await fprint("If it's still too hard, try changing the difficulty in the settings.\n", "green")
		}

		let answer = await choice(["Restart day", "Save and quit"])
		window.state = 0
		window.days--

		// dead end days where you die no matter what, reset to previous chain day
		if(dayString == "./days/chainDays/presidentStay.js") {
			window.days--
			dayString = "./days/multiDays/presidentialCampaign/presidentialCampaign_3.js"
		} else if(dayString == "./days/chainDays/crabExamDeath.js") {
			window.days--
			dayString = "./days/crabExam.js"
		}

		if(answer == 1) {
			queue.unshift(dayString)
			game(queue)
		} else {
			await pause()
			saveAndQuit()
		}
	}
}

async function intro() {
	clear()
	await fprint("Welcome!\n", "green", 1)
	await fprint("You've died tragically " + config.randomDeath() + ".\n", "red", 1.5)
	if(Math.floor(Math.random() * 4) == 0) {
		await fprint("LucKRILLy...", "green", 1)
		await fprint("haha do you get it", "dim", 0, 0.02)
	} else {
		await fprint("Luckily...", "green", 1)
	}
	await fprint("You've been reincarnated as a crab!", "green", 1)
	await fprint("There's a lot to do as a crab these days, so strap in and enjoy the ride!\n", "green", 1)
	await fprint("Hold ESCAPE to save and quit at the end of a day. Once you're ready to start, go ahead and", "dim", 0.5)
	window.days = 0
	window.experience = 0
	window.personality = 0
	window.state = 0
	game(false)
}

async function credits() {
	clear()
	await fprint("Made by Roger Cronin\n", "green", 1)
	await fprint("Shoutout to RomeroShwarz and their 1300s Peasant Simulator for insipration\n", "green", 1)
	const span = config.createSpan("green")
	config.output.appendChild(span)
	for(let c of "Shoutout ") {
		span.innerHTML += c
		await config.sleep(0.04)
	}
	const link = document.createElement("a")
	link.classList.add("link")
	link.href = "https://en.wikipedia.org/wiki/Crab"
	link.target = "_blank"
	span.appendChild(link)
	for(let c of "https://en.wikipedia.org/wiki/Crab") {
		link.innerHTML += c
		await config.sleep(0.04)
	}
	await fprint("", "green", 1, 0)
	await fprint("Crab art by tre\n", "green", 1)
	await fprint("Ib and Alex for feedback and ideas\n", "green", 1)
	await fprint("A bunch of people who tested and probably don't want their names on this\n", "green", 1)
	await fprint("And you, gamer.\n", "green", 2)
	const emoji = document.createElement("img")
	emoji.draggable = false
	emoji.classList.add("emoji")
	emoji.alt = "😘"
	emoji.src = "../assets/kiss_emoji.png"
	config.output.appendChild(emoji)
	await config.sleep(3)
	titleScreen()
}

async function titleScreen(flag = false) {
	quitable = false
	clear()
	const span = config.createSpan("red")
	const pre = document.createElement("pre")
	pre.innerHTML = `
/\\
( /   @ @    ()
 \\  __| |__  /
  -/   "   \\-
 /-|       |-\\
/ /-\\     /-\\ \\
 / /-\`---'-\\ \\
  /         \\

`
	span.appendChild(pre)
	config.output.appendChild(span)
	flag ? "" : await config.sleep(2)

	await fprint("Welcome to Crab Simulator 2!\n", "yellow", flag ? 0 : 1.5, flag ? 0 : 0.04)
	await fprint("Select an option pleeeaase\n", "green", flag ? 0 : 0.5, flag ? 0 : 0.04)

	let resumable
	if(window.localStorage.getItem("save") === null) resumable = false
	else resumable = JSON.parse(window.localStorage.getItem("save"))[0]

	let answer = await choice(["New Game", `Resume Game : ${resumable === false ? "X" : " Day " + resumable}`, "Settings", "Credits"])

	if(answer == 1) {
		await fprint(config.randomAgree() + "\n", "green", 2)
		intro()
	} else if(answer == 2) {
		if(resumable === false) {
			await fprint("Uh, I can't find anything, rip your save file lmao.", "green", 2)
			return titleScreen(true)
		}
		await fprint(config.randomAgree() + "\n", "green", 2)
		game(true)
	} else if(answer == 3) {
		await fprint(config.randomAgree() + "\n", "green", 1)
		await config.settings()
		titleScreen()
	} else {
		await fprint(config.randomAgree() + "\n", "green", 1)
		credits()
	}
}

function startQuiting() {
	quitVar++
	if(quitVar == 1) {
		let div = document.getElementById("quiting")
		let dots = document.getElementById("quitingDots")
		div.style.display = "block"
		quitDotInterval = setInterval(() => {
			if(!quitable) return stopQuiting()
			dots.innerHTML += "."
			if(dots.innerHTML.length == 10) {
				window.days--
				saveAndQuit()
			}
		}, 250)
	}
}

function stopQuiting() {
	quitVar = 0
	let div = document.getElementById("quiting")
	div.style.display = "none"
	clearInterval(quitDotInterval)
	document.getElementById("quitingDots").innerHTML = ""
}

function saveAndQuit() {
	if(!atEndOfDay) {
		queue.unshift(dayString)
	} else {
		window.days++
	}
	let saveString = JSON.stringify([window.days, window.experience, window.personality, window.state, window.message, queue, window.rpg])
	window.localStorage.setItem("save", saveString)
	location.reload()
}

window.addEventListener("load", async () => {
	// if no settings loaded, set default ones
	if(window.localStorage.getItem("settings") === null) window.localStorage.setItem("settings", JSON.stringify([0, 0, 1.0, 1]))
	config.loadSettings()

	fprint("Press ENTER to start Crab Simulator 2", "dim", 0, 0)
	await config.awaitInput()
	let audio = new Audio("./assets/ambient.mp3")
	audio.loop = true
	audio.play()

	document.addEventListener("keydown", e => {
		if(e.key == "Escape" && quitable) startQuiting()
		if(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) e.preventDefault() // prevent up down arrow key scrolling
	}, {
		capture: true // idk what this really means but I need it for scroll prevention
	})
	document.addEventListener("keyup", e => {
		if(e.key == "Escape") stopQuiting()
	})

	clear()

	if(skipIntro) game()
	else titleScreen()
})
