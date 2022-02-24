import { fprint, choice } from "../../../waterWorks.js"
import * as config from "../../../waterWorks.js"
import { loadShop, unloadShop, rpgMenu, itemishList, shopDisplay, alreadyHave, viewInventory } from "../../../mechanics/fightClub.js"

export async function execute(queue) {

	await fprint("After a long day, it's nice to sit down and relax.\n", "green")
	await fprint("You curl up with a cup of hot cocoa next to the fire, content with the current state of things. Nothing could move you from thi-\n", "dim", 0)
	await fprint("Riiiiiiing. riiiiINNNGgg. RIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIINNNG.\n", "red", 1)
	await fprint("Goddamnit.\n", "cyan", 2)

	await fprint("That one spy guy lays out the deets.\n", "dim", 1)
	await fprint("There's an arms deal going on tonight. My sources indicate some real shit is gonna happen tomorrow, so you need to get in.\n", "yellow", 1)
	await fprint("bet\n", "cyan", 2)

	await fprint("You arrive at the unmarked concrete parking garage on the outskirts of the city. You decend a few levels, then step into a small office.\n", "dim", 1)
	await fprint("Can I help you?", "yellow", 0)
	await fprint("Some crab in a suit asks you.\n", "dim", 1)

	await fprint("You got any arms?\n", "cyan")
	await fprint("No, I have claws. What are you here for?\n", "yellow")
	await fprint("I was told there was an arms deal here?\n", "cyan")
	await fprint("Password, please.\n", "yellow", 1)

	let answer = await choice(["Open seasame", "Password", "Salmon"])

	if(answer == 1 || answer == 2) {
		if(answer == 1) {
			await fprint("Open seasame!\n", "cyan", 2)
			await fprint("Oh it's like a pun, cause sea and sesame, heh. Heh. Uh, I mean that's not it, but still kinda funny.\n", "yellow", 1)
		} else {
			await fprint("Password!\n", "cyan", 2)
			await fprint("Yeah I'm asking you for the password. What is it?\n", "yellow")
			await fprint("No, I'm saying the password IS password.\n", "cyan", 1)
			await fprint("... You take me as a fool?\n", "yellow")
			await fprint("He flashes a gun, formerly concealed under his suit jacket.\n", "dim")
			await fprint("shit shit shit shit\n", "green", 1)
		}
		answer = await choice(["Get inside by force", "Take the nuclear option"])
		if(answer == 1) {
			await fprint("Looks like I'll just have to force my way in.\n", "cyan", 2)
			window.state = "The armed security guard decided shooting you was the best means of conflict resolution.21"
			return queue
		} else if(answer == 2) {
			await fprint("Looks like I'll just have to use the nuclear option.\n", "cyan")
			await fprint("The fuck is that supposed to mean.\n", "yellow", 1)
			await fprint("You take a brick and hit him swiftly over the head. You step towards the door he was guarding and walk into the dealing room.\n", "dim", 1)
		}
	} else {
		await fprint("Salmon.\n", "cyan", 2)
		await fprint("Right this way, sir.\n", "yellow")
		await fprint("He opens a door further into the office, and you step into the dealing room.\n", "dim", 1)
	}

	await fprint("What can I do for yeas?\n", "blue")
	await fprint("A crab sits on the other side of a plastic foldable table. Atop it lay several firearms and goods of various legalities.\n", "dim", 1)

	const shopWrapper = config.createSpan("shopWrapper")
	const menuOutput = config.createSpan("rpgMenu")
	const menuTextOutput = config.createSpan("yellow")
	menuTextOutput.classList.add("shopText")
	config.output.appendChild(shopWrapper)
	shopWrapper.appendChild(menuOutput)
	shopWrapper.appendChild(menuTextOutput)

	loadShop(menuOutput, menuTextOutput)

	var firstLayer = [
		["knife", "That rusty thing? Found it at a yardsale."],
		["sword", "I bought this on seaBay. Didn't even know they sold weaprawns."],
		["cannon", "My dad's a pirate. He used this on the high seas, I think."],
		["mint", "Complementary."],
		["View Inventory", "Take a look at what you already have."],
		["Exit", ""]
	]

	while(true) {
		let answer = await rpgMenu(shopDisplay(firstLayer), 0)

		if(answer < 5) {
			let itemID = firstLayer[answer - 1][0]
			let item = itemishList[itemID]
			if(window.rpg.money < item.price) { // not enough money
				await rpgMenu([["Back", "You only have " + window.rpg.money + " dollars, sorry."]])
			} else if(alreadyHave(itemID)) { // already have weapon or spell
				await rpgMenu([["Back", "Pretty sure you already own that."]])
			} else { // purchase dialog
				let answer2 = await rpgMenu([["Purchase", "You'll have " + window.rpg.money + " - " + item.price + " = " + (window.rpg.money - item.price) + " dollars left."], ["Back", ""]], 1)
				if(answer2 == 1) { // purchase item
					window.rpg.money -= item.price // take money
					switch(item.type) {
						case 0: // weapon
							window.rpg.weapons.push(itemID)
							firstLayer[5][1] = ""
							break
						case 1: // spell
							window.rpg.spells.push(itemID)
							firstLayer[5][1] = ""
							break
						case 2: // item
						case 3:
							window.rpg.items.push(itemID)
							break
					}
				}
			}
	  } else if(answer == 5) { // view inventory
			await viewInventory()
		} else { // exit
			break
		}
	}

	unloadShop()

	await fprint("Come back again some time, yeah?\n", "yellow", 2)
	await fprint("You, again, feel as if something very important is going to happen tomorrow.\n", "dim", 1)

	if(window.rpg.items.findIndex(i => i == "mint") !== -1) await fprint("Minty freshness + 1", "rainbow", 1)
	await fprint("Experience + 1\n", "rainbow", 2)

	window.experience++

	queue.unshift("./days/multiDays/spyStory/9_higherUp.js")
	return queue
}
