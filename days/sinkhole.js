import { fprint, choice, sleep } from "../waterWorks.js"

export async function execute(queue) {

	await fprint("Geronimooooooo!\n", "cyan")
	await fprint("You jump off the roof of your house onto a large outdoor trampoline.\n", "dim")

	await fprint("booiiiing", "red", 1)

	document.documentElement.style.position = "relative"
	fprint("rumble rumble rumble\n", "red", 1)
	for(let i = 3.5; i > 0; i -= 0.1) {
		document.documentElement.style.top = `${(Math.random() * 100 - 50) * i}px`
		document.documentElement.style.left = `${(Math.random() * 100 - 50) * i}px`
		await sleep(0.05)
	}
	document.documentElement.style.position = "static"
	document.documentElement.style.top = null
	document.documentElement.style.left = null

	await sleep(3)

	await fprint("The ground surrounding the trampoline has caved in, forming a large sinkhole. Which you are now trapped in.\n", "dim")
	await fprint("haha idiot, better go explore these cave systems in a desparate attempt to get out lmaooo\n", "green", 2)

	await fprint("You press forwards. The tunnels are a bit claustrophobic, but nothing you can't handle. After a short hike, you end up in a large cavern.\n", "dim", 1)
	await fprint("Do you see that?\n", "green")
	await fprint("see what\n", "cyan")
	await fprint("Oh yeah you can't see from my unbridled third-person perspective lol\n", "green")
	await fprint("From the other side of the cavern you spot the flickering of torch light.\n", "dim")
	await fprint("Shit.\n", "cyan")
	await fprint("A mesenger from the Above!", "yellow", 0)
	await fprint("An eel calls out to his little posse of bishops or priests or whatever. Presumably.\n", "dim", 1)
	let answer = await choice(["Go with it", "Admit the truth"])
	if(answer == 1) {
		await fprint("I have come to reap the benefits of your peoples and spread bad will to your enemies.", "cyan", 0)
		await fprint("You yell in a faux important tone.\n", "dim", 1)
		await fprint("Splendid, splendid! Come with us, Legged-One.\n", "yellow")
		await fprint("And to whom do I have the pleasure of enjoying my worldly tie with?\n", "cyan")
		await fprint("Dr｡ Angerjas, professor of theology at the University.\n", "yellow")
		await fprint("Your services are required at once, Legged-One. We encourage you to make haste with us.", "blue", 1)
		await fprint("Another one spits out through their awe. You comply.\n", "dim", 2)
		await fprint("After walking through more tunnels, once again a cavern opens. Hundreds of eels wait within alcoves in the rock face extending hundreds of feet up. Within the center of it all lies the largest hydrothermal vent you have ever seen.\n", "dim", 2)
		await fprint("Please take your time, Legged-One. Speak with me once you are content.\n", "yellow")

		let choices = ["Observe the village", "Observe The Vent", "Talk to some townsfolk", "Speak with Dr. Angerjas"]
		whileLoop:
		while(true) {
			let answer = await choice(choices)
			switch(choices[answer - 1]) {
				case "Observe the village":
					await fprint("The cavern you're in is cylindrical, extending far above you. Many eels would have been swimming to and fro overhead, but they seem to be watching from holes dotted along the wall.\n", "dim", 1)
					break
				case "Observe The Vent":
					await fprint("In the middle of the village is a large hydrothermal vent spewing forth black smoke. The surrounding water is scalding, so you stay away from it.\n", "dim", 1)
					break
				case "Talk to some townsfolk":
					await fprint("You scuttle over to a hole in the wall to ask an eel what's going on.\n", "dim")
					await fprint("Oh Legged-One, what may you ask of me?\n", "purple")
					await fprint("What's going on?\n", "cyan")
					await fprint("The village is anxiously awaiting your judgement. Please hurry towards a decision.\n", "purple")
					await fprint("You're left with more questions as you scuttle back to Dr｡ Angerjas.\n", "dim", 1)
					break
				case "Speak with Dr. Angerjas":
					break whileLoop
			}
			choices.splice(answer - 1, 1)
		}
		await fprint("I'm ready.\n", "cyan")
		await fprint("What is your judgement?\n", "yellow", 1)
		answer = await choice(["Worthy", "Unworthy"])
		if(answer == 1) {
			await fprint("Worthy.\n", "cyan", 1)
			await fprint("Celebration erupts from the rock. Dr｡ Angerjas collapses in tears over the decision.\n", "dim")
			await fprint("May we take your acceptance with great honor, Legged-One. Please return to the Vent.\n", "yellow")
			await fprint("wait what\n", "cyan")
			await fprint("Enter the Vent to return once more to the Above, yes.\n", "yellow", 1)
			await fprint("oh.\n", "cyan", 1)
			await fprint("You make a cautious step forwards. The water grows hotter. With each step you make, the harder it is to continue. You endure, however.\n", "dim", 2)
			window.message = 0
			await fprint("Experience + 1\n", "rainbow", 2)
		} else {
			await fprint("Unworthy.\n", "cyan", 1)
			await fprint("Several eels cry out. Dr｡ Angerjas collapses in tears over the decision.\n", "dim")
			await fprint("May we take your rejection with great honor, Legged-One. Please return to the Vent.\n", "yellow")
			await fprint("wait what\n", "cyan")
			await fprint("Enter the Vent to return once more to the Above, please.", "yellow", 0)
			await fprint("They say, weeping.\n", "dim", 1)
			await fprint("oh.\n", "cyan", 1)
			await fprint("You make a cautious step forwards. The water grows hotter. With each step you make, the harder it is to continue. And yet a force compels you so.\n", "dim", 2)
			window.message = 1
			await fprint("Experience + 1\n", "rainbow", 2)
		}
	} else {
		await fprint("Hey, I, uh, ok so don't get the wrong idea about this.\n", "cyan")
		await fprint("What do you mean, Legged-One?\n", "blue", 1)
		await fprint("oh geez there are a lot of them\n", "green", 1)
		await fprint("Basically I just ended up here. So like I made an earthquake, like sinkhole or something, right? And I was crawling, crawling, crawling, right? And I came through that hole up there, idk what any of you guys are talking about ok?\n", "cyan")
		await fprint("The eels stare back with blank expressions.\n", "dim")
		await fprint("No I'm serious tho\n", "cyan", 2)
		await fprint("You invade our sacred temple with false promises in our time of need?\n", "yellow")
		await fprint("wdym\n", "cyan", 1)
		await fprint("Leave us at once, Bringer of False Promise!\n", "yellow", 2)
		window.state = "The eels did a weird ritualistic chant then just fucking went at you with their mouths. Something out of a horror movie. R-rated too.23"
		return queue
	}
	window.experience++
	queue.unshift("./days/chainDays/sinkholeEnding.js")
	return queue
}