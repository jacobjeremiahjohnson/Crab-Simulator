import { fprint, choice } from "../waterWorks.js"

export async function execute(queue) {

	await fprint("We got a 2-9-2 issue at the city hall, all units on standby now!", "yellow", 0)
	await fprint("Some nerd in a uniform yells into a walkie-talkie.\n", "dim", 1)

	await fprint("You walk over to the city hall to investigate.", "dim", 2)
	await fprint("Tons of emergency vehicles are scattered about the place with several crabs directing civilians away with probably non-lethal weapons.\n", "dim", 1)

	await fprint("Hey you!", "yellow", 0)
	await fprint("Another nerd calls out.\n", "dim", 1)
	await fprint("Huh? Me?\n", "cyan")
	await fprint("Yeah you, get to your post!\n", "yellow")
	await fprint("ok\n", "cyan", 1)

	await fprint("You stand absent-mindedly waiting for some crab to go and give you directions.\n", "dim")
	await fprint("Hey you!\n", "blue")
	await fprint("Huh? Me?\n", "cyan")
	await fprint("Yeah you, do something about the hostage situation! You're the situation team's chief, right?\n", "blue", 1)
	await fprint("Ohhhhh yeah I remember reading about this in the news a few minutes ago. There's like a bunch of terrorists holding a bunch of people hostage. They want, uh, like.. uh, I think they wanted money, yeah. Yeah probably money.\n", "green", 1)

	let answer = await choice(["Give the hostages what they want", "Tactical nuke", "Do what someone else says"])

	if(answer == 1) {
		await fprint("Hey, guys, I'll give you what you want if you let the hostages go.\n", "cyan")
		await fprint("OH YEAH? HOW CAN WE BE SO SURE?\n", "purple", 1)
		answer = await choice(["I swear on my mom", "I swear on my life", "Cross my heart, hope to die, stick a needle in my eye"])
		if(answer == 1) {
			await fprint("I swear on my mom.\n", "cyan")
			await fprint("So you'd sacrifice your mom? psssh pussy bitch lmao", "purple", 1)
		} else if(answer == 2) {
			await fprint("I swear on my life.\n", "cyan")
			await fprint("Ok cool no need to be edgy", "purple", 1)
		} else {
			await fprint("Cross my heart, hope to die, stick a needle in my eye.\n", "cyan")
			await fprint("Wait we used to say that as kids, that's kinda fucked up if you think about it.", "purple")
		}
		await fprint("Uh anyways we want one trillion dollars.\n", "purple", 1)
		await fprint("word? I got a trillion dollar coin in my pocket right here\n", "cyan")
		await fprint("yo sweet dude\n", "purple")
		await fprint("The terrorists release the hostages who now have a cool icebreaker.\n", "dim", 1)
		await fprint("Conflict resolution + 1", "rainbow", 1)
	} else if(answer == 2) {
		await fprint("I'd like to call in the, um, \"tactical nuke\".\n", "cyan")
		await fprint("Really? I hardly think that's necessary for-\n", "blue", 0)
		await fprint("Weird, I don't think anybody asked.\n", "cyan", 1)
		await fprint("Uh, right, sir.\n", "blue", 1)
		await fprint("You watch as a nuclear fission warhead is dropped on city hall. You can't help but feel like this may have been too drastic a move.\n", "dim", 2)
		window.state = "Wait, let me get this right, you NUKED yourself? And thought that was a good plan?19"
		return queue
	} else {
		await fprint("Hey what should I do?", "cyan", 2)
		await fprint("Anyone?", "cyan", 2)
		await fprint("Hello?\n", "cyan", 3)
		await fprint("After realizing nobody acknowledges your existence if you can't make decisions for yourself, you go home and listen to some music.\n", "dim", 1)
		await fprint("Inaction + 1", "rainbow", 1)
	}

	await fprint("Experience + 1\n", "rainbow", 2)
  window.experience += 1

	return queue
}
