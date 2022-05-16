import { fprint, sleep } from "../../../waterWorks.js"
import * as config from "../../../waterWorks.js"

export async function execute(queue) {
	return new Promise(async res => {
		await fprint("Meet me at the science hallway stairwell after fourth period if you wanna scrap.", "white", 0)
		await fprint("Reads the note you find in your locker. You follow its instructions.\n", "dim", 1)

		await fprint("Aye cool, that's dope.\n", "yellow")
		await fprint("Why do you want to fight me?\n", "cyan")
		await fprint("You seemed like a fightable guy idk\n", "yellow", 2)

		await fprint("Spam your spacebar to attack. Ready? GO!\n", "green")

		let hp = 50
		let enemyHp = 50

		let output = config.createSpan()
		config.output.appendChild(output)

		const attacker = setInterval(() => {
			let span = document.createElement("span")
			span.classList.add("yellow")
			span.innerHTML = "X"
			output.appendChild(span)
			hp--
			if(hp < 0) lose()
		}, 200)

		const attack = e => {
			if(e.keyCode !== 32) return
			let span = document.createElement("span")
			span.classList.add("cyan")
			span.innerHTML = "X"
			output.appendChild(span)
			enemyHp--
			if(enemyHp < 0) win() 
		}

		document.addEventListener("keydown", attack)

		const lose = async () => {
			document.removeEventListener("keydown", attack)
			clearInterval(attacker)
			await fprint("", "white", 2)
			await fprint("The world slowly goes dark...\n", "dim", 2)
			window.state = "You lost a school fight? Come on, I raised you better.25"
			res(queue)
		}

		const win = async () => {
			document.removeEventListener("keydown", attack)
			clearInterval(attacker)
			await fprint("", "white", 2)
			await fprint("The crab collapses in front of you, flashing a thumbs up in approval.\n", "dim", 1)
			await fprint("congrats bro\n", "green", 1)
			await fprint("Experience + 1\n", "rainbow", 2)
			window.experience++
		
			queue.unshift("./days/multiDays/school/school_4.js")
			res(queue)
		}
	})
}
