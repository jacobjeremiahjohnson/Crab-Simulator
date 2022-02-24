import { fprint, choice } from "../waterWorks.js"

export async function execute(queue) {

	await fprint("You decide to sit in on a table of cards at a large casino.\n", "dim", 1)
	await fprint("Hey, you know how to play Euchrustacean?\n", "yellow")

	let answer = await choice(["Yeah", "Nah"])

	if(answer == 1) {
		await fprint("Sure do.\n", "cyan")
		await fprint("Great, let me deal you in.\n", "yellow", 1)
	} else {
		await fprint("Nah, could you explain it?\n", "cyan")
		await fprint("Sure, doesn't even take long. So basic rules, each action token is worth 50 junipers, right?\n", "yellow", 2)
		await fprint("You awaken just as the dealer finishes his explanation.\n", "dim", 1)
		await fprint("At that point tap your milk factory cards to deactive the production phase and sell the remainder of your stock. Got it? I'll deal you in.\n", "yellow", 1)
	}

	await fprint("You pick up your cards:", "dim")
	await fprint("Reverse, Ace of Clubs, Market Tile, Pot of Greed\n", "white", 3, 0)

	answer = await choice(["Knock", "Fold", "Invest", "Trade", "Camp", "Push", "Tech"])

	switch(answer) {
		case 1:
			await fprint("I, uh, knock.\n", "cyan")
			await fprint("On round one? Alright man.\n", "yellow")
			break
		case 2:
			await fprint("I, uh, fold.\n", "cyan")
			await fprint("On round one? Alright man.\n", "yellow")
			break
		case 3:
			await fprint("I, uh, invest.\n", "cyan")
			await fprint("In which properties?\n", "yellow")
			await choice(["Park Place", "Boardwalk", "Water Works"])
			await fprint("Hah just kidding, you don't have any money. Why would you invest on round one?\n", "yellow")
			break
		case 4:
			await fprint("I, uh, trade.\n", "cyan")
			await fprint("With which player?\n", "yellow")
			await choice(["Small crab", "Shady looking shrimp", "Ugly fish", "Uglier crayfish"])
			await fprint("I offer my, um, Ace of Clubs.\n", "cyan")
			await fprint("Deal!", "blue")
			await fprint("They say as they take your card.\n", "dim", 1)
			await fprint("Do I get something in return?\n", "cyan")
			await fprint("Huh? Why would you?\n", "blue")
			await fprint("Nevermind.\n", "cyan")
			break
		case 5:
			await fprint("I, uh, camp.\n", "cyan")
			await fprint("Ok, take eight tent tokens and two s'mores tokens.\n", "yellow", 1)
			await fprint("You take a handful of shiny plastic chips from the dealer.", "dim", 1)
			break
		case 6:
			await fprint("I, uh, push.\n", "cyan")
			await fprint("Into which location?\n", "yellow")
			let answer = await choice(["Tilted Towers", "Pleasant Park", "Lucky Landing"])
			if(answer == 1) {
				await fprint("Tilted Towers.\n", "cyan")
			} else if(answer == 2) {
				await fprint("Pleasant Park.\n", "cyan")
			} else {
				await fprint("Lucky Landing.\n", "cyan")
			}
			await fprint("Bold strategy.\n", "yellow")
			break
		case 7:
			await fprint("I, uh, tech.\n", "cyan", 1)
			await fprint("You tech?\n", "yellow", 1)
			await fprint("Yeah.\n", "cyan", 2)
			await fprint("Get the fuck out of my casino.\n", "yellow", 1)
			await fprint("The dealer calls security and you get barred from reentering. For life.\n", "dim", 1)
			await fprint("I don't think that was the right option.\n", "green", 1)
			await fprint("Experience + 1\n", "rainbow", 2)
			window.experience++
			return queue
	}
	await fprint("All the other players take their turns. This keeps going on until you're eventually the last player left, somehow.\n", "dim", 1)
	await fprint("Not sure if these players know how to play either.\n", "green", 1)
	await fprint("Understanding of Euchrustacean strategy + 0", "rainbow", 1)
	await fprint("Experience + 1\n", "rainbow", 2)
	window.experience++

	return queue
}
