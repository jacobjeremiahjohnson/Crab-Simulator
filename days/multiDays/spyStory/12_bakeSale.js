import { fprint, choice, clear, pause } from "/waterWorks.js"
import * as config from "/waterWorks.js"
import { loadShop, unloadShop, rpgMenu, itemishList, shopDisplay, alreadyHave, viewInventory } from "/mechanics/fightClub.js"

export async function execute(queue) {
	
	await fprint("You're shopping for some weird vegetable or leaf or whatever at the farmer's market.\n", "dim")
	await fprint("Hey something in the code is telling me tomorrow's gonna be really important to the story.\n", "green")
	await fprint("Something in the what?\n", "cyan")
	await fprint("Nevermind, you should probably check out that bake sale over there though.\n", "green")
	await fprint("kk\n", "cyan", 1)

	await fprint("Before you, a variety of homebaked goods with surprisingly expensive prices.\n", "dim")
	await fprint("Thank you for supporting Girl Scouts Troop #636 Maryland!\n", "yellow", 1)

	const shopWrapper = config.createSpan("shopWrapper")
	const menuOutput = config.createSpan("rpgMenu")
	const menuTextOutput = config.createSpan("yellow")
	menuTextOutput.classList.add("shopText")
	config.output.appendChild(shopWrapper)
	shopWrapper.appendChild(menuOutput)
	shopWrapper.appendChild(menuTextOutput)

	loadShop(menuOutput, menuTextOutput)

	var firstLayer = [
		["cookie", "It's chocolate chip! Wait, no, only oatmeal rasin left."],
		["cake", "Stop calling it box mix it's not I'm serious no actually it's not."],
		["brownie", "My pride and joy, double fudge brownies."],
		["antacid", "Oh these? They're my mom's. She gets heartburn."],
		["book", "Oh this? That's my dad's. He worships the Devil."],
		["View Inventory", "Take a look at what you already have."],
		["Exit", ""]
	]

	while(true) {
		let answer = await rpgMenu(shopDisplay(firstLayer), 0)

		if(answer < 6) {
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
		} else if(answer == 6) { // view inventory
			await viewInventory()
		} else { // exit
			break
		}
	}

	unloadShop()

	await fprint("Thank you for supporting the Girl Scouts! Come again soon!\n", "yellow", 2)
	await fprint("You, likely for the last time, feel as if something very important is going to happen tomorrow.\n", "dim", 1)

	await fprint("Experience + 1\n", "rainbow", 2)
	window.experience++

	queue.unshift("./days/multiDays/spyStory/13_theFinalFight.js")
	return queue
}
