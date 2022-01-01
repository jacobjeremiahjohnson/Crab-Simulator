import { fprint, choice, clear, pause } from "/waterWorks.js"
import * as config from "/waterWorks.js"

export async function execute(queue) {

	await fprint("After pressure from your friends, you finally get around to downloading Valorantlantic. You load up an Unrated match and greet your teammates.\n", "dim")
	await fprint("Hi guys! Ready to have an aw-\n", "cyan", 0)
	fprint("Shut the fuck up.", "yellow")
	fprint("Stop talking.", "blue")
	fprint("Shut up nerd.", "purple")
	await fprint("kys\n", "orange", 2)
	await fprint("sorry\n", "cyan", 2)

	let answer = await choice(["Rush B through window", "Rush B through long", "Rush A through showers"])

	if(answer == 1 || answer == 2) {
		await fprint("You and your team full send B, trading two kills to clear and plant onsite.\n", "dim")
		await fprint("Footsteps coming from backsite.\n", "blue", 1)
		await fprint("Your remaining teammate trades with the enemy, making it a 1v1.\n", "dim")
		await fprint("Last guy is definitely long, trust.", "yellow", 0)
	} else {
		await fprint("You and your team full send A, trading two kills to clear and plant onsite.\n", "dim")
		await fprint("Footsteps coming from heaven.\n", "blue", 1)
		await fprint("Your remaining teammate trades with the enemy, making it a 1v1.\n", "dim")
		await fprint("Last guy is definitely cubby, trust.", "yellow", 0)
	}
	await fprint("Your teammate helpfully calls out from beyond the grave.\n", "dim")
	await fprint("You one-tap the remaining enemy, closing out the round.\n", "dim", 1)

	await fprint("Haha, get fucked.\n", "cyan")
	answer = await choice(["Trash talk", "Don't trash talk"])

	if(answer == 1) {

		const span = config.createSpan("white")
		span.classList.add("choice")
		let message = config.createSpan("black")
		message.innerHTML = "-----------------------------------------------------------------------------"
		span.appendChild(message)
		message = config.createSpan("white")
		message.innerHTML = "<span class='blue'>(All)</span> <span class='yellow'>Crabo52:</span> <span class='white'>L bozo dollar store phantom</span>"
		span.appendChild(message)
		config.output.appendChild(span)
		await config.sleep(5)

		message = config.createSpan("white")
		message.innerHTML = "<span class='red'>(All) CrustaceanStation:</span> <span class='white'>You don't want to mess with me.</span>"
		span.appendChild(message)
		await config.sleep(5)

		message = config.createSpan("white")
		message.innerHTML = "<span class='blue'>(All)</span> <span class='yellow'>Crabo52:</span> <span class='white'>Boo hoo gonna cry?</span>"
		span.appendChild(message)
		await config.sleep(4)

		//(All) CrustaceanStation: 3319 Pulaski Hwy, Baltimore, MD 21224 181.91.242.118
		//-----------------------------------------------------------------------------

		message = config.createSpan("white")
		message.innerHTML = "<span class='red'>(All) CrustaceanStation:</span> <span class='white'>3319 Pulaski Hwy, Baltimore, MD 21224 181.91.242.118</span>"
		span.appendChild(message)
		await config.sleep(6)

		message = config.createSpan("white")
		message.innerHTML = "<span class='blue'>(All)</span> <span class='yellow'>Crabo52:</span> <span class='white'>sorry</span>"
		span.appendChild(message)
		await config.sleep(3)

		await fprint("", "white", 0)
		await fprint("You turn off your computer and sit in a corner for a while.\n", "dim", 1)
		await fprint("Badness + 1", "rainbow", 1)
		window.personality--

	} else {
		await fprint("You decide to be a huge fucking BABY and not trash talk like a real gamer. You end up losing the round 6-13 because of insufficient GAMER rage within you.\n", "dim", 1)
		await fprint("nerd\n", "green", 1)
		await fprint("Goodness + 1", "rainbow", 1)
		window.personality++
	}

	await fprint("Experience + 1\n", "rainbow", 2)
  window.experience += 1

	return queue
}
