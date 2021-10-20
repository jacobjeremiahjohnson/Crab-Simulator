import { fprint, choice, clear, pause } from "/waterWorks.js"
import * as config from "/waterWorks.js"
import { loadShop, unloadShop, rpgMenu, itemishList, shopDisplay, alreadyHave, viewInventory } from "/mechanics/fightClub.js"

// originally made when the beefy fritos burrito was still an available menu item
// lol doesn't have any reference to the beefy fritos burrito anymore

export async function execute(queue) {

	window.rpg.money = 100

	/*

	await fprint("Morning jogs are so nice.", "cyan", 0)
	await fprint("You think to yourself while jogging in the morning.\n", "dim", 1)

	await fprint("You notice a sign saying yard sale by the side of the road. A certain green voice would probably tell you that it's important to story progression.\n", "dim")
	await fprint("Guess I'll go then.\n", "cyan", 1)
	await fprint("Heaps of trash and other superfluous items litter a crab's front lawn.\n", "dim")
	await fprint("Hi! What can I get for you?\n", "yellow")

	*/

	const shopWrapper = config.createSpan("shopWrapper")
	const menuOutput = config.createSpan("rpgMenu")
	const menuTextOutput = config.createSpan("yellow")
	menuTextOutput.classList.add("shopText")
	config.output.appendChild(shopWrapper)
	shopWrapper.appendChild(menuOutput)
	shopWrapper.appendChild(menuTextOutput)

	loadShop(menuOutput, menuTextOutput)

	var firstLayer = [
		["knife", "That rusty thing? Found it in a river."],
		["gun", "Ol' reliable. Except about 30% of the time."],
		["apple", "On a scale of 1 to 75, I'd say it heals about 10."],
		["pills", "Increases your attacks by 1｡2x, whatever that means."],
		["View Inventory", "Take a look at what you already have."],
		["Exit", "Don't you want to buy something to attack with?"]
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
		} else if(firstLayer[5][1] == "") { // exit
			break
		}
	}

	unloadShop()

	await fprint("Pleasure doing business with you.\n", "yellow", 1)
	await fprint("You feel as if something very important is going to happen tomorrow.\n", "dim", 1)
	await fprint("You have any idea what that line above this one is talking about?\n", "cyan")
	await fprint("Not a clue.\n", "green", 1)

	await fprint("Sales + 1", "rainbow", 1)
	await fprint("Experience + 1\n", "rainbow", 2)

	window.experience++

	queue.unshift("./days/multiDays/spyStory/6_rightSecretAgent.js")
	return queue
}
