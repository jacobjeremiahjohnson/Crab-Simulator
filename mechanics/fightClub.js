import { awaitInput, createSpan, id, sleep, randomIndex } from "/waterWorks.js"

const fps = 60
const realSleep = s => new Promise(r => setTimeout(r, s * 1000)) // sleep unaffected by shift key

const textOutput = id("rpgText") // main text field
const menuOutputDefault = id("rpgMenu") // left section for menu choice
const menuTextOutputDefault = id("rpgMenuText") // text field for menu choice descriptions
var menuOutput = menuOutputDefault
var menuTextOutput = menuTextOutputDefault

var spriteList = {} // object with key of Math.random() "spirteID", value of sprite element
var hurtBox = [false, false, false, false] // active hitbox
var positionBox = [false, true, false, false] // where player currently is
var enemy = null // enemy and player are sprite elements
var player = null
var enemyDamageOutput = 0 // how much hp to decrease when hit

const fpsInterval = 1000 / fps // how long a frame is as per fps
var then = Date.now()
var gameStarted = false // is a fight going on currently?

// main game loop
function gameLoop() {
	if(gameStarted) requestAnimationFrame(gameLoop)
	else return
	let now = Date.now()
	let elapsed = now - then
	if(elapsed > fpsInterval) {
		then = now - (elapsed % fpsInterval)
		for(let s in spriteList) { // perform code for each sprite
			s = spriteList[s]
			s.graphicUpdate()
			s.positionUpdate()
			s.codeUpdate()
		}
	}
}

// prints text, most code taken from config.fprint()
async function rpgPrint(text, color) {
	const span = createSpan(color)
	textOutput.appendChild(span)
	for(let c of text) {
		if(c == "｡") c = "<span>.</span>"
		span.innerHTML += c
		switch(c) {
			case ".":
			case "!":
			case "?":
			case ";":
				await sleep(0.5) // full stop sleep
				break
			case ",":
			case ":":
				await sleep(0.25) // soft stop sleep
				break
			default:
				await sleep(0.04) // default sleep for characters
		}
	}
	span.innerHTML += "<br>>>"
	await awaitInput()
	span.remove()
}

var currentLayer = 0 // how many menus deep are you

// menu, most code taken from config.menu()
// I think menuLayer is unused now but I'm too scared to remove it
async function rpgMenu(array, menuLayer, flag = false) {
	currentLayer = menuLayer
	// create and append the menu list elements
	return new Promise(async (resolve, reject) => {
		const span = createSpan("cyan")
		span.classList.add("choice")
		for(let i in array) {
			let index = createSpan("menu")
			index.innerHTML = array[i][0]
			span.appendChild(index)
		}
		menuOutput.appendChild(span)
		let answer = await new Promise(async (resolve, reject) => {
			span.childNodes[0].classList.add("menuSelected")
			let count = 1
			rpgMenuPrint(array[0][1]) // print description of currently selected item
			document.addEventListener("keydown", document.rpgMenuKeyDown = e => {
				if(currentLayer == menuLayer) {
					if(e.key == "Enter" || e.key == " ") resolve(count) // selected
					if(e.key == "ArrowDown" || e.key == "s") {
						count++
						if(!(count < 1 || count > array.length)) rpgMenuPrint(array[count - 1][1])
					}
					if(e.key == "ArrowUp" || e.key == "w") {
						count--
						if(!(count < 1 || count > array.length)) rpgMenuPrint(array[count - 1][1])
					}
					if(count > array.length) count = array.length
					if(count < 1) count = 1
					span.childNodes.forEach(span => span.classList.remove("menuSelected"))
					span.childNodes[count - 1].classList.add("menuSelected")
				}
			})
		})
		document.removeEventListener("keydown", document.rpgMenuKeyDown)
		// after something has been selected
		menuIter++
		menuTextOutput.innerHTML = ""
		span.remove() // delete self
		currentLayer-- // go back to previous layer
		if(currentLayer < 0) currentLayer = 0
		resolve(answer)
	})
}

var menuIter = 0

// most code taken from config.fprint()
async function rpgMenuPrint(text, flag = false) {
	menuTextOutput.innerHTML = ""
	menuIter++
	let currentIter = menuIter // basically here so repeat print calls doesn't happen
	for(let c of text) {
		if(currentIter != menuIter) break // will break if new print call happens cause currentIter has changed
		if(c == "｡") c = "<span>.</span>"
		menuTextOutput.innerHTML += c
		switch(c) {
			case ".":
			case "!":
			case "?":
			case ";":
				await sleep(0.5) // full stop sleep
				break
			case ",":
			case ":":
				await sleep(0.25) // soft stop sleep
				break
			default:
				await sleep(0.04) // default sleep for characters
		}
	}
}

// start fight
function loadFight(thePlayer, theEnemy) {
	menuOutput = menuOutputDefault
	menuTextOutput = menuTextOutputDefault
	gameStarted = true
	gameLoop()
	thePlayer.yOffset = 200
	enemy = theEnemy
	player = thePlayer
	id("rpg").style.display = "block"
}

// somewhat self explanatory
function unloadFight() {
	gameStarted = false
	for(let i in spriteList) {
		spriteList[i].remove()
	}
	enemy = null
	player = null
	enemyDamageOutput = 0
	id("rpg").style.display = "none"
	for(let i = 0; i < id("rpg").children.length; i++) {
		let e = id("rpg").children[i]
		if(e.tagName == "DIV") continue
		e.remove()
		i--
	}
}

function loadShop(a, b) {
	menuOutput = a
	menuTextOutput = b
	id("rpg").style.display = "block"
}

function unloadShop() {
	menuOutput = menuOutputDefault
	menuTextOutput = menuTextOutputDefault
	id("rpg").style.display = "none"
}

// sprite class
class Sprite {
	// color is CSS class
	// sprites is an array of text fields
	// width offset is how many pixels to offset text by so it gets centered properly
	constructor(color, sprites, widthOffset = 0) {
		if(!sprites) sprites = ["X"] // default sprite
		if(typeof sprites == "string") sprites = [sprites]
		this.sprites = sprites
		let spr = createSpan(color)
		spr.classList.add("sprite")
		spr.innerHTML = this.sprites[0]
		this.spriteID = Math.random()
		// [x acceleration, y acceleration, x acceleration acceleration, y acceleration acceleration]
		// weird, I'm learning about this shit in calc right now
		this.deltaPosition = [null, null, null, null]
		spriteList[this.spriteID] = this
		id("rpg").appendChild(spr)
		this.sprite = spr
		this.x = 0
		this.y = 30
		this.widthOffset = widthOffset
		this.isEnemyTurn = false
		this.isHurt = false
	}

	graphicUpdate() {
		this.sprite.style.top = `${this.y}px`
		this.sprite.style.left = `calc(50vw - ${this.widthOffset - this.x}px)`
	}

	positionUpdate() {
		if(this.deltaPosition[0] != null) {
			this.x += this.deltaPosition[0]
			this.y += this.deltaPosition[1]
			this.deltaPosition[0] += this.deltaPosition[2]
			this.deltaPosition[1] += this.deltaPosition[3]
		}
	}

	codeUpdate() {

	}

	moveTo(x2, y2, time) {
		if(time == 0) {
			this.x = x2
			this.y = y2
			return
		} else {
			return new Promise(async resolve => {
				// calculates how much to move per frame
				this.deltaPosition = [(x2 - this.x) / (time * 60), (y2 - this.y) / (time * 60), 0, 0]
				await realSleep(time)
				this.deltaPosition = [null, null, null, null] // done moving
				// hard set position just incase code has rounding errors or whatever
				this.x = x2
				this.y = y2
				resolve()
			})
		}

	}

	updateSprite(num) { // changes sprite to new one in the text array given on construction
		this.sprite.innerHTML = this.sprites[num]
	}

	remove() {
		delete spriteList[this.spriteID]
		this.sprite.remove()
	}
}

class Character extends Sprite { // sprite but has hp
	constructor(color, sprites, widthOffset, maxHp) {
		super(color, sprites, widthOffset)
		this.maxHp = maxHp
		this.hp = maxHp
		this.hpTextElement = createSpan(color)
		this.hpTextElement.classList.add("hpText")
		this.hpTextUpdate()
		id("rpg").appendChild(this.hpTextElement)
	}

	hpTextUpdate() {
		this.hpTextElement.innerHTML = this.hp + "/" + this.maxHp
	}

	async getHurt(amount) {
		if(amount > 0) {
			this.stunned = true
			this.sprite.classList.add("hurt")
			new HurtText(this.x, this.y, amount)
			this.hp -= amount
			if(this.hp <= 0) return await this.die()
			this.hpTextUpdate()
			await realSleep(0.5)
			this.sprite.classList.remove("hurt")
			await realSleep(0.5)
			this.stunned = false
		} else {
			this.sprite.classList.add("healed")
			new HealedText(this.x, this.y, amount)
			this.hp -= amount
			if(this.hp > this.maxHp) this.hp = this.maxHp
			this.hpTextUpdate()
			await realSleep(0.5)
			this.sprite.classList.remove("healed")
			await realSleep(0.5)
		}
	}

	die() {

	}
}

// player on first encounter
class Player extends Character {

bulletSprite = String.raw`
∩
‾
`
cannonSprite = String.raw`
 _
(_)
`

bookText = "Stultus Fatuus"

shoveResponses = [
	"It doesn't seem like it did much...",
	"They look annoyed.",
	"They let out a cough. Or maybe that was just coincidental.",
	"It did a comedically small amount of damage.",
	"A fraction of a sliver of their HP went down.",
	"They look confused at how weak it was."
]
weaponResponses = [
	"They cry out in pain, presumably from the stab wound.",
	"They spit up blood like a cool guy in an anime.",
	"They yell out some family-unfriendly language.",
	"They stand there and take the attack for unknown reasons.",
	"They marvel at how cool your weapon is. Through the pain, of course.",
	"They're impressed you just walked up and stabbed them."
]
bookResponses = [
	"Their eyes bleed blood, no, ketchup.",
	"They fall to the ground, fearful of God's Wrath.",
	"They're thoroughly shaken to the core.",
	"They start crying in fear.",
	"A small flame erupts on their clothes.",
	"This book is crazy, dude."
]
hitResponses = [
	"Dub.",
	"gg.",
	"Nice.",
	"Good job.",
	"You're proud of yourself.",
	"Maybe you'll hit the next one too."
]
missResponses = [
	"You think self-deprecating thoughts.",
	"Try hitting your shots.",
	"You chalk it up to RNG.",
	"You'll try harder next time.",
	"You'll think about this when going to bed at night.",
	"Hitting the enemy will lower their HP faster.",
	"Maybe you'll hit the next one."
]

	constructor() {
		super("cyan", null, 50, 50)
		this.sprites = [ String.raw`
+       +
 \ |_| /
  /   \
 /\___/\
 //   \\
`,
String.raw`
X       X
 \ |_| /
  /   \
 /\___/\
 //   \\
`,
String.raw`
+      +
 \ ]_] |
  /   \
 /\___/\
 //   \\
`,
String.raw`
 +     +
 | [_[ /
  /   \
 /\___/\
 //   \\
`,
String.raw`

+  |_|  +
 \/   \/
 /\___/\
 //   \\
`,
String.raw`
+       |X
 \ |_| /
  /   \
 /\___/\
 //   \\
`,
String.raw`
+       |\
 \ |_| /|
  /   \
 /\___/\
 //   \\
`,
String.raw`
+       ||
 \ |_| /|/
  /   \ .?
 /\___/\
 //   \\
`,
String.raw`
+        _.
 \ |_| / ||
  /   \  ||
 /\___/\ ||
 //   \\ O/
`,
String.raw`
+        _
 \ |_| /|N|
  /   \
 /\___/\
 //   \\
`,
String.raw`
+       +
 \ X_X /
  /   \
 /\___/\
 //   \\
`
]
		this.y = 300
		this.updateSprite(0)
		this.stunned = false
		this.keys = {
			left: false,
			right: false,
			down: false
		}
		this.dmgModifier = 1
		this.state = 1 // 1 is alive, 0 is dead
		this.currentMoving = 0
		document.addEventListener("keydown", e => {
			if(e.key == "ArrowLeft" || e.key == "a") this.keys.left = true
			if(e.key == "ArrowRight" || e.key == "d") this.keys.right = true
			if(e.key == "ArrowDown" || e.key == "s") this.keys.down = true
		})
		document.addEventListener("keyup", e => {
			if(e.key == "ArrowLeft" || e.key == "a") this.keys.left = false
			if(e.key == "ArrowRight" || e.key == "d") this.keys.right = false
			if(e.key == "ArrowDown" || e.key == "s") this.keys.down = false
		})
	}

	positionUpdate() {
		super.positionUpdate()
		let isHurt = false
		for(let e in positionBox) {
			isHurt = isHurt || positionBox[e] && hurtBox[e]
		}
		this.isHurt = isHurt ? true : false
	}

	async codeUpdate() {
		if(this.isHurt && !this.stunned) {
			this.getHurt(enemyDamageOutput)
		}
		if(this.isEnemyTurn) {
			if(this.keys.left && this.currentMoving == 0 && this.state == 1) {
				// initiate move left
				this.currentMoving = -1
				let curX = this.x
				let curY = this.y
				this.deltaPosition = [-10, 0, 0.46, 0]
				positionBox = [true, false, false, false]
				this.updateSprite(2)
				await realSleep(0.75)
				this.updateSprite(0)
				positionBox = [false, true, false, false]
				this.deltaPosition = [null, null, null, null]
				this.x = curX
				this.y = curY
				this.currentMoving = 0
			}
			if(this.keys.right && this.currentMoving == 0 && this.state == 1) {
				// initiate move right
				this.currentMoving = 1
				let curX = this.x
				let curY = this.y
				this.deltaPosition = [10, 0, -0.46, 0]
				positionBox = [false, false, true, false]
				this.updateSprite(3)
				await realSleep(0.75)
				this.updateSprite(0)
				positionBox = [false, true, false, false]
				this.deltaPosition = [null, null, null, null]
				this.x = curX
				this.y = curY
				this.currentMoving = 0
			}
			if(this.keys.down && this.currentMoving == 0 && this.state == 1) {
				// initiate duck
				this.currentMoving = 1
				let curX = this.x
				let curY = this.y
				this.deltaPosition = [0, 10, 0, -0.7]
				positionBox = [false, false, false, true]
				this.updateSprite(4)
				await realSleep(0.3)
				positionBox = [false, true, false, false]
				await realSleep(0.2)
				this.updateSprite(0)
				this.deltaPosition = [null, null, null, null]
				this.x = curX
				this.y = curY
				this.currentMoving = 0
			}
		}
		if(this.state == 0) {
			this.updateSprite(10)
		}
	}

	async takeTurn() {
		let answer
		while(true) {
			answer = await rpgMenu([["Attack", "Use your Weapons to attack the enemy."], ["Spells", "Use your Spells to attack the enemy."], ["Items", "Use your Items to gain an advantage."]], 0)
			let ref
			if(answer == 1) {
				ref = window.rpg.weapons
			} else if(answer == 2) {
				ref = window.rpg.spells
			} else {
				ref = window.rpg.items
			}
			let array = []
			ref.forEach(a => {
				array.push([itemishList[a].displayName, itemInspect(a) + " : " + itemishList[a].description])
			})
			array.push(["Back", array.length != 0 ? "" : "You don't have any..."])
			answer = await rpgMenu(array, 1)
			if(answer - 1 !== ref.length) { // use it
				await this["take_action_" + ref[answer - 1]]()
				break
			}
		}
		return enemy.hp < 1
	}

	enemyTurn(turnFlag) {
		this.isEnemyTurn = turnFlag
		this.currentMoving = 0
	}

	async die() {
		this.hpTextUpdate()
		this.state = 0
		window.state = "You died in combat like a heroic warrior. Well, sort of heroic.20"
	}

	calcHit(miss) {
		return Math.floor(Math.random() * 10) + 1 > miss * 10
	}

	calcDmg(amount) {
		return Math.ceil(amount *= this.dmgModifier)
	}

	//weapons

	async take_action_shove() {
		await this.moveTo(this.x, this.y - 190, 1)
		this.updateSprite(1)
		enemy.getHurt(this.calcDmg(1))
		await realSleep(0.5)
		this.updateSprite(0)
		await this.moveTo(this.x, this.y + 190, 1)
		await realSleep(0.5)
		await rpgPrint("You shove the enemy. " + randomIndex(this.shoveResponses), "dim")
	}

	async take_action_knife() {
		await this.moveTo(this.x, this.y - 190, 1)
		this.updateSprite(5)
		enemy.getHurt(this.calcDmg(itemishList["knife"].stat_1))
		await realSleep(0.5)
		this.updateSprite(0)
		await this.moveTo(this.x, this.y + 190, 1)
		await realSleep(0.5)
		await rpgPrint(randomIndex(this.weaponResponses), "dim")
	}

	async take_action_sword() {
		await this.moveTo(this.x, this.y - 190, 1)
		this.updateSprite(6)
		enemy.getHurt(this.calcDmg(itemishList["sword"].stat_1))
		await realSleep(0.5)
		this.updateSprite(0)
		await this.moveTo(this.x, this.y + 190, 1)
		await realSleep(0.5)
		await rpgPrint(randomIndex(this.weaponResponses), "dim")
	}

	// spells

	async take_action_gun() {
		let hit = this.calcHit(itemishList["gun"].stat_2)
		await realSleep(0.2)
		this.updateSprite(7)
		await realSleep(1)
		let bullet = new Sprite("cyan", this.bulletSprite, 0)
		await bullet.moveTo(this.x + 45, this.y - 40)
		bullet.moveTo(bullet.x, 10, 0.7)
		await realSleep(0.5)
		if(hit) enemy.getHurt(this.calcDmg(itemishList["gun"].stat_1))
		await realSleep(0.2)
		bullet.remove()
		await realSleep(0.5)
		this.updateSprite(0)
		await realSleep(0.5)
		if(hit) await rpgPrint("Hit for " + this.calcDmg(itemishList["gun"].stat_1) + " dmg. " + randomIndex(this.hitResponses), "dim")
		else await rpgPrint("The bullet missed. " + randomIndex(this.missResponses), "dim")
	}

	async take_action_cannon() {
		let hit = this.calcHit(itemishList["cannon"].stat_2)
		await realSleep(0.2)
		this.updateSprite(8)
		await realSleep(1)
		let bullet = new Sprite("cyan", this.cannonSprite, 0)
		await bullet.moveTo(this.x + 45, this.y - 40)
		bullet.moveTo(bullet.x, 10, 0.7)
		await realSleep(0.5)
		if(hit) enemy.getHurt(this.calcDmg(itemishList["cannon"].stat_1))
		await realSleep(0.2)
		bullet.remove()
		await realSleep(0.5)
		this.updateSprite(0)
		await realSleep(0.5)
		if(hit) await rpgPrint("Hit for " + this.calcDmg(itemishList["cannon"].stat_1) + " dmg. " + randomIndex(this.hitResponses), "dim")
		else await rpgPrint("The cannon missed. " + randomIndex(this.missResponses), "dim")
	}

	async take_action_book() {
		let hit = this.calcHit(itemishList["book"].stat_2)
		await realSleep(0.2)
		this.updateSprite(9)
		await realSleep(1)
		let text = new Sprite("cyan", " ", 0)
		await text.moveTo(this.x - 90, this.y - 30)
		for(let i of this.bookText) {
			text.sprite.innerHTML += i
			await sleep(0.04)
		}
		await realSleep(1)
		text.moveTo(text.x, 10, 0.7)
		await realSleep(0.5)
		if(hit) enemy.getHurt(this.calcDmg(itemishList["book"].stat_1))
		await realSleep(0.2)
		text.remove()
		await realSleep(0.5)
		this.updateSprite(0)
		await realSleep(0.5)
		if(hit) await rpgPrint("Hit for " + this.calcDmg(itemishList["book"].stat_1) + " dmg. " + randomIndex(this.bookResponses), "dim")
		else await rpgPrint("The Necronomicon missed. " + randomIndex(this.missResponses), "dim")
	}

	// items

	async take_action_apple() {
		this.getHurt(itemishList["apple"].stat_1 * -1)
		window.rpg.items.splice(window.rpg.items.indexOf("apple"), 1)
		await rpgPrint("Healed for " + itemishList["apple"].stat_1 + " hp.", "dim")
	}

	async take_action_pills() {
		this.dmgModifier += itemishList["pills"].stat_1 - 1
		this.sprite.classList.add("healed")
		new HealedText(this.x, this.y, itemishList["pills"].stat_1, true)
		await realSleep(0.5)
		this.sprite.classList.remove("healed")
		await realSleep(0.5)
		window.rpg.items.splice(window.rpg.items.indexOf("pills"), 1)
		await rpgPrint("Attack modifier is now at " + dotReplace(this.dmgModifier) + "x.", "dim")
	}

	async take_action_antacid() {
		this.dmgModifier += itemishList["antacid"].stat_1 - 1
		this.sprite.classList.add("healed")
		new HealedText(this.x, this.y, itemishList["antacid"].stat_1, true)
		await realSleep(0.5)
		this.sprite.classList.remove("healed")
		await realSleep(0.5)
		window.rpg.items.splice(window.rpg.items.indexOf("antacid"), 1)
		await rpgPrint("Attack modifier is now at " + dotReplace(this.dmgModifier) + "x.", "dim")
	}

	async take_action_mint() {
		this.getHurt(itemishList["mint"].stat_1 * -1)
		window.rpg.items.splice(window.rpg.items.indexOf("mint"), 1)
		await rpgPrint("Healed for " + itemishList["mint"].stat_1 + " hp.", "dim")
	}

	async take_action_cookie() {
		this.getHurt(itemishList["cookie"].stat_1 * -1)
		window.rpg.items.splice(window.rpg.items.indexOf("cookie"), 1)
		await rpgPrint("Healed for " + itemishList["cookie"].stat_1 + " hp.", "dim")
	}

	async take_action_cake() {
		this.getHurt(itemishList["cake"].stat_1 * -1)
		window.rpg.items.splice(window.rpg.items.indexOf("cake"), 1)
		await rpgPrint("Healed for " + itemishList["cake"].stat_1 + " hp.", "dim")
	}

	async take_action_brownie() {
		this.getHurt(itemishList["brownie"].stat_1 * -1)
		window.rpg.items.splice(window.rpg.items.indexOf("brownie"), 1)
		await rpgPrint("Healed for " + itemishList["brownie"].stat_1 + " hp.", "dim")
	}

}

class CharacterText extends Sprite {
	constructor(className, x, y, text) {
		super(className, text)
		this.x = x - 50
		this.y = y
		this.deltaPosition = [-2.5, -3, 0, 0.17]
		this.lifeTime = 60
	}

	codeUpdate() {
		this.lifeTime--
		if(this.lifeTime < 0) this.remove()
	}
}

// little text that pops up when you get hurt
class HurtText extends CharacterText {
	constructor(x, y, amount) {
		super("hurtText", x, y, "-" + amount)
	}
}

class HealedText extends CharacterText {
	constructor(x, y, amount, flag = false) {
		super("healedText", x, y, "+" + Math.abs(amount) + (flag ? "x" : ""))
	}
}

// spy
class Spy extends Character {

	bulletSprite = String.raw`
_
U
`

	constructor(final = false) {
		super(final ? "purple" : "blue", null, 95, 60)
this.sprites = [ String.raw`
     \ || /
      /  \
     /\__/\
     //  \\
`,
String.raw`
  ?. \ || /
  /|  /  \
  || /\__/\
     //  \\
`,
String.raw`
     \ || / .?
      /  \  //
     /\__/\ //
     //  \\
`,
String.raw`
  ?. \ || /
  \\  /  \
  \\ /\__/\
     //  \\
`,
String.raw`
     \ || / .?
      /  \  |\
     /\__/\ ||
     //  \\
`,
String.raw`
     \ KK /
      /  \
     /\__/\
     //  \\
`,
String.raw`
       ||
   X--/  \--X
     /\__/\
     //  \\
`,
String.raw`
     X || X
      /  \
     /\__/\
     //  \\
`]
		this.updateSprite(0)
	}

	async oldShoot() {
		player.enemyTurn(true)
		enemyDamageOutput = 15
		let direction = (Math.floor(Math.random() * 2) + 1) // 1 left, 2 right
		this.updateSprite(direction)
		await realSleep(1)
		let bullet = new Sprite("blue", this.bulletSprite, 0)
		await bullet.moveTo(direction == 1 ? this.x - 64 : this.x + 52, this.y + 55)
		bullet.moveTo(bullet.x, bullet.y + 300, 1.2)
		await realSleep(0.8)
		if(direction == 1) hurtBox = [true, true, false, true]
		else hurtBox = [false, true, true, true]
		await realSleep(0.4)
		bullet.remove()
		hurtBox = [false, false, false, false]
		await realSleep(0.5)
		this.updateSprite(0)
		await realSleep(0.5)
		enemyDamageOutput = 0
		player.enemyTurn(false)
	}

	async shoot_1() {
		player.enemyTurn(true)
		enemyDamageOutput = 15
		let directions = [(Math.floor(Math.random() * 2) + 1)**2, (Math.floor(Math.random() * 2) + 1)**2, (Math.floor(Math.random() * 2) + 1)**2]
		for(let i in directions) {
			this.updateSprite(directions[i])
			await realSleep(0.3)
			this.updateSprite(0)
			await realSleep(0.1)
		}
		await realSleep(1)
		for(let i in directions) {
			let direction = directions[i]
			this.updateSprite(direction)
			let bullet = new Sprite("blue", this.bulletSprite, 0)
			await bullet.moveTo(direction == 1 ? this.x - 64 : this.x + 52, this.y + 55)
			bullet.moveTo(bullet.x, bullet.y + 300, 0.3)
			await realSleep(0.2)
			if(direction == 1) hurtBox = [true, true, false, true]
			else hurtBox = [false, true, true, true]
			await realSleep(0.1)
			bullet.remove()
			hurtBox = [false, false, false, false]
			await realSleep(0.5)
		}
		this.updateSprite(0)
		await realSleep(0.5)
		await this.moveTo(this.x, this.y + 180, 0.6)
		await realSleep(Math.random() + 1)
		this.updateSprite(7)
		await realSleep(0.3)
		this.updateSprite(6)
		enemyDamageOutput = 10
		hurtBox = [true, true, true, false]
		await realSleep(0.1)
		hurtBox = [false, false, false]
		await realSleep(0.2)
		this.updateSprite(0)
		await realSleep(0.4)
		await this.moveTo(this.x, this.y - 180, 0.6)
		await realSleep(0.5)
		player.enemyTurn(false)
	}

	async shoot_2() {
		enemyDamageOutput = 15
		for(let i = 0; i < 3; i++) {
			player.enemyTurn(true)
			let direction = (Math.floor(Math.random() * 2) + 1) // 1 left, 2 right
			let facing = (Math.floor(Math.random() * 2) + 1) // 1 left, 2 right
			this.updateSprite(direction * 2 + facing - 2)
			await realSleep(0.5)
			let bullet = new Sprite("blue", this.bulletSprite, 0)
			await bullet.moveTo(facing == 1 ? this.x - 64 : this.x + 52, this.y + 55)
			if(direction == 1) {
				bullet.moveTo(facing == 1 ? bullet.x : bullet.x - 150, bullet.y + 300, 0.6)
				await realSleep(0.4)
				hurtBox = [true, true, false, true]
				await realSleep(0.2)
				bullet.remove()
				hurtBox = [false, false, false, false]
				await realSleep(0.5)
				this.updateSprite(0)
				await realSleep(0.5)
			} else {
				bullet.moveTo(facing == 1 ? bullet.x + 150 : bullet.x, bullet.y + 300, 0.6)
				await realSleep(0.4)
				hurtBox = [false, true, true, true]
				await realSleep(0.2)
				bullet.remove()
				hurtBox = [false, false, false, false]
				await realSleep(0.5)
				this.updateSprite(0)
				await realSleep(0.5)
			}
		}
		player.enemyTurn(false)
	}

	async takeTurn() {
		if(Math.random() > 0.5) await this.shoot_1()
		else await this.shoot_2()
		return player.hp < 1
	}

	async die() {
		this.hpTextUpdate()
	}

	async finalAttack() {
		this.updateSprite(7)
		await realSleep(0.3)
		this.updateSprite(6)
		await realSleep(0.3)
		this.updateSprite(0)
		await realSleep(1.5)
	}

}

class HigherUp extends Character {
	attackMod = 1
	phase = 0 // 0 eggroll, 1 hook, 2 kick,

	exclaimSprite = String.raw`
 _
| |
|_|
 _
[_]
`

	constructor() {
		super("yellow", null, 67, 180)
this.sprites = [ String.raw`
   .|_|.
  +     +
 / \___/ \
 C // \\ C
`,
String.raw`
   .|_|.
  +     +_/
 / \___/
 C // \\
`,
String.raw`
C  .|_|.  C
\_+     +_/
   \___/
   // \\
`,
String.raw`
C  .-_|.  C
\_+     +_/
   \___/
   // \\
`,
String.raw`
C  .|_-.  C
\_+     +_/
   \___/
   // \\
`,
String.raw`
C\K .|_|.
  \_/   \+
    \___/C
    // \\
`,
String.raw`
 .|_|. K/C
+/   \_/
C\___/
 // \\
`,
String.raw`
 C,.|_|. C
  +     +/
,-/\___/
 /     \\
`
]
		this.updateSprite(0)
	}

	calcDmg(amount) {
		return Math.ceil(amount *= this.attackMod)
	}

	async takeTurn() {
		this.phase += 1
		if(this.phase > 2) this.phase = 0
		switch(this.phase) {
			case 0:
				await this.egg()
				break
			case 1:
				await this.hook()
				break
			case 2:
				await this.kick()
				break
		}
		return player.hp < 1
	}

	async die() {
		this.hpTextUpdate()
	}

	async hook() {
		enemyDamageOutput = this.calcDmg(13)
		player.enemyTurn(true)
		for(let i = 0; i < 3; i++) {
			let direction = Math.random() > 0.5 ? 1 : -1
			this.updateSprite(2)
			await realSleep(1)
			if(direction == 1)  { // right punch
				this.updateSprite(3)
				await realSleep(0.45)
				this.x = 120
				this.y = 300
				this.updateSprite(5)
				hurtBox = [false, true, true, true]
			} else { // left punch
				this.updateSprite(4)
				await realSleep(0.45)
				this.x = -120
				this.y = 300
				this.updateSprite(6)
				hurtBox = [true, true, false, true]
			}
			await realSleep(0.3)
			this.updateSprite(2)
			hurtBox = [false, false, false, false]
			await realSleep(1)
			await this.moveTo(0, 30, 1)
		}
		await realSleep(0.4)
		player.enemyTurn(false)
	}

	async kick() {
		enemyDamageOutput = this.calcDmg(15)
		player.enemyTurn(true)
		await this.moveTo(this.x, -400, 1.5)
		this.moveTo(1100, 300)
		await realSleep(1 + Math.random() * 1.2)
		let indicator = new Sprite("red", this.exclaimSprite, 16)
		indicator.y = 150
		this.updateSprite(7)
		this.moveTo(-1100, this.y, 0.9)
		await realSleep(0.27)
		hurtBox = [true, true, true, false]
		await realSleep(0.22)
		hurtBox = [false, false, false, false]
		await realSleep(1)
		indicator.remove()
		await this.moveTo(0, -400)
		this.updateSprite(0)
		await this.moveTo(this.x, 30, 1.5)
		await realSleep(0.5)
		player.enemyTurn(false)
	}

	async egg() {
		let eggroll = new Sprite("yellow", "E")
		eggroll.x = 50
		eggroll.y = 60
		this.updateSprite(1)
		await realSleep(1)
		eggroll.deltaPosition = [-1.5, -1.5, 0, 0.1]
		await realSleep(0.7)
		eggroll.remove()
		this.updateSprite(0)
		this.sprite.classList.add("healed")
		new HealedText(this.x, this.y, 1.2, true)
		await realSleep(0.5)
		this.sprite.classList.remove("healed")
		this.attackMod += 0.2
		await rpgPrint("She eats an eggroll, increasing her attack by 1｡2x.", "dim")
	}

}

class Boss extends Character {
	phase = 0 // 0 gatling twice, 1 tnt, 2 gatling once

	bulletSprite = String.raw`
 |
| |
 | |
`
	tntLSprite = String.raw`
 **_
[TNT]
[___]
`
	tntRSprite = String.raw`
 _**
[TNT]
[___]
`

explosionSprites = [ String.raw`

 X

`,
String.raw`
 X 
XXX
 X
`,
String.raw`
X X
 X 
X X
`,
String.raw`
X X

X X
`
]

	constructor() {
		super("blue", null, 60, 200)
this.sprites = [ String.raw`
| ,I__I, |
\_|    |_/
  /\__/\
  //  \\
`,
String.raw`
| ,I__I,  _
\_|    |_| |[]
  /\__/\ |^|
  //  \\ }}}
`,
String.raw`
| ,I__I,  _
\_|    |_| |[]
  /\__/\ |^|
  //  \\ {{{
`
]
		this.updateSprite(0)
	}

	async takeTurn() {
		this.phase += 1
		if(this.phase > 2) this.phase = 0
		switch(this.phase) {
			case 0:
				await this.gatTwice()
				break
			case 1:
				await this.tnt()
				break
			case 2:
				await this.gatOnce()
				break
		}
		return player.hp < 1
	}

	async die() {
		this.hpTextUpdate()
	}

	async gatTwice() {
		player.enemyTurn(true)
		enemyDamageOutput = 20
		this.updateSprite(1)
		this.spawnGatTwice()
		await realSleep(1)
		await this.spawnGatTwice()
		this.updateSprite(0)
		await realSleep(0.5)
		enemyDamageOutput = 0
		player.enemyTurn(false)
	}

	async spawnGatTwice() {
		await realSleep(1)
		let dir = Math.floor(Math.random() * 3) // 0 = SXX, 1 = XSX, 2 = XXS
		let bulletL = new Sprite("blue", this.bulletSprite, 0)
		let bulletR = new Sprite("blue", this.bulletSprite, 0)

		const left = -150
		const mid = -70
		const right = 10
		const time = 0.4

		await bulletL.moveTo(this.x + 52, this.y + 55)
		await bulletR.moveTo(this.x + 52, this.y + 55)
		switch(dir) {
			case 0: bulletL.moveTo(bulletL.x + mid, bulletL.y + 60, time); bulletR.moveTo(bulletR.x + right, bulletR.y + 60, time); break
			case 1: bulletL.moveTo(bulletL.x + left, bulletL.y + 60, time); bulletR.moveTo(bulletR.x + right, bulletR.y + 60, time); break
			case 2: bulletL.moveTo(bulletL.x + left, bulletL.y + 60, time); bulletR.moveTo(bulletR.x + mid, bulletR.y + 60, time)
		}
		await realSleep(time)
		bulletL.moveTo(bulletL.x, bulletL.y + 240, 0.4)
		bulletR.moveTo(bulletR.x, bulletR.y + 240, 0.4)
		await realSleep(0.15)
		switch(dir) {
			case 0: hurtBox = [false, true, true, true]; break
			case 1: hurtBox = [true, false, true, true]; break
			case 2: hurtBox = [true, true, false, true]
		}
		await realSleep(0.25)
		bulletL.remove()
		bulletR.remove()
		hurtBox = [false, false, false, false]
		await realSleep(0.5)
	}

	async gatOnce() {
		player.enemyTurn(true)
		enemyDamageOutput = 30
		this.updateSprite(2)
		this.spawnGatOnce()
		await realSleep(1)
		this.spawnGatOnce()
		await realSleep(1)
		await this.spawnGatOnce()
		this.updateSprite(0)
		await realSleep(0.5)
		enemyDamageOutput = 0
		player.enemyTurn(false)
	}

	async spawnGatOnce() {
		await realSleep(1)
		let dir = Math.floor(Math.random() * 3) // 0 = Left, 1 = Mid, 2 = Right
		let bullet = new Sprite("blue", this.bulletSprite, 0)

		const left = -150
		const mid = -70
		const right = 10
		const time = 0.4

		await bullet.moveTo(this.x + 52, this.y + 55)

		switch(dir) {
			case 0: bullet.moveTo(bullet.x + (left * 0.8), bullet.y + 60, time); break
			case 1: bullet.moveTo(bullet.x + mid, bullet.y + 60, time); break
			case 2: bullet.moveTo(bullet.x + (right * -3), bullet.y + 60, time)
		}
		await realSleep(time)
		bullet.moveTo(bullet.x, bullet.y + 240, 0.4)
		await realSleep(0.15)
		switch(dir) {
			case 0: hurtBox = [true, true, false, true]; break
			case 1: hurtBox = [false, true, false, true]; break
			case 2: hurtBox = [false, true, true, true]
		}
		await realSleep(0.25)
		bullet.remove()
		hurtBox = [false, false, false, false]
		await realSleep(0.5)
	}

	async tnt() {
		await realSleep(1)
		player.enemyTurn(true)
		enemyDamageOutput = 40
		let dir = Math.floor(Math.random() * 2) // 0 left, 1 right
		let tnt = new Sprite("blue", dir == 0 ? this.tntLSprite : this.tntRSprite, 0)
		await tnt.moveTo(this.x + 50, this.y - 50)
		await realSleep(0.7)
		await tnt.moveTo(tnt.x, tnt.y - 300, 1)
		await tnt.moveTo(1100, 250)
		tnt.moveTo(-500, tnt.y, 1)
		if(dir == 0) {
			await realSleep(0.73)
			hurtBox = [true, true, false, true]
		} else {
			await realSleep(0.65)
			hurtBox = [false, true, true, true]
		}
		tnt.remove()
		await this.spawnExplosion(tnt.x, tnt.y)
		hurtBox = [false, false, false, false]
		await realSleep(0.5)
		enemyDamageOutput = 0
		player.enemyTurn(false)
	}

	async spawnExplosion(x, y) {
		let sprite = new Sprite("red")
		await sprite.moveTo(x, y)
		for(let i = 0; i < this.explosionSprites.length; i++) {
			sprite.sprite.innerHTML = this.explosionSprites[i]
			await realSleep(0.1)
		}
		sprite.remove()
	}

	async finalAttack() {
		await realSleep(1)
		player.enemyTurn(true)
		let tntDir = Math.floor(Math.random() * 2) // 0 left, 1 right
		let tnt = new Sprite("blue", tntDir == 0 ? this.tntLSprite : this.tntRSprite, 0)
		await tnt.moveTo(this.x + 50, this.y - 50)
		await realSleep(0.7)
		await tnt.moveTo(tnt.x, tnt.y - 300, 1)

		enemyDamageOutput = 30
		this.updateSprite(2)
		await this.spawnGatOnce()
		this.updateSprite(0)
		enemyDamageOutput = 40

		await tnt.moveTo(1100, 250)
		tnt.moveTo(-500, tnt.y, 1)
		if(tntDir == 0) {
			await realSleep(0.73)
			hurtBox = [true, true, false, true]
		} else {
			await realSleep(0.65)
			hurtBox = [false, true, true, true]
		}
		tnt.remove()

		let tntDir2 = Math.floor(Math.random() * 2) // 0 left, 1 right
		let tnt2 = new Sprite("blue", tntDir2 == 0 ? this.tntLSprite : this.tntRSprite, 0)
		await tnt2.moveTo(this.x + 50, this.y - 50)
		await this.spawnExplosion(tnt.x, tnt.y)
		hurtBox = [false, false, false, false]
		await tnt2.moveTo(tnt2.x, tnt2.y - 300, 1)

		enemyDamageOutput = 25
		this.updateSprite(1)
		await this.spawnGatTwice()
		this.updateSprite(0)
		enemyDamageOutput = 40

		await tnt2.moveTo(1100, 250)
		tnt2.moveTo(-500, tnt2.y, 1)
		if(tntDir2 == 0) {
			await realSleep(0.73)
			hurtBox = [true, true, false, true]
		} else {
			await realSleep(0.65)
			hurtBox = [false, true, true, true]
		}
		tnt2.remove()
		await this.spawnExplosion(tnt2.x, tnt2.y)
		hurtBox = [false, false, false, false]
		await realSleep(2)

		enemyDamageOutput = 0
		player.enemyTurn(false)
	}

	async protein() {
		let bar = new Sprite("blue", "P")
		bar.x = 50
		bar.y = 50
		await realSleep(1)
		bar.deltaPosition = [-1.5, -1.5, 0, 0.1]
		await realSleep(0.7)
		bar.remove()
		this.sprite.classList.add("healed")
		new HealedText(this.x, this.y, 1 - this.hp)
		this.hp = 1
		this.sprite.classList.remove("hurt")
		this.hpTextUpdate()
		await realSleep(0.5)
		this.sprite.classList.remove("healed")
	}
}

function itemInspect(iden) {
	let description
	switch(itemishList[iden].type) {
		case 0:
			description = itemishList[iden].stat_1 + " dmg"
			break
		case 1:
			description = itemishList[iden].stat_1 + " dmg (" + (itemishList[iden].stat_2 * 100) + "% miss rate)"
			break
		case 2:
			description = "+" + itemishList[iden].stat_1 + " hp"
			break
		case 3:
			description = "+" + dotReplace(itemishList[iden].stat_1) + "x atk"
			break
	}
	return description
}

function shopDisplay(itemList) {
	let val = []
	for(let i in itemList) {
		let ref = itemList[i][0]
		if(ref == "Exit" || ref == "View Inventory") {
			val.push(itemList[i])
			continue
		}
		let name = itemishList[ref].displayName
		let description = itemishList[ref].price + " dollars : "
		description += itemInspect(ref)
		description += " : " + itemList[i][1]
		val.push([name, description])
	}
	return val
}

function alreadyHave(iden) {
	return (
		window.rpg.weapons.findIndex(i => i == iden) !== -1 ||
		window.rpg.spells.findIndex(i => i == iden) !== -1
	)
}

async function viewInventory() {
	while(true) {
		let answer = await rpgMenu([["Weapons", "View your weapons."], ["Spells", "View your spells."], ["Items", "View your items."], ["Back", ""]], 1)
		let menuArray = []

		if(answer == 1) {
			window.rpg.weapons.forEach(w => menuArray.push([itemishList[w].displayName, itemInspect(w) + " : " + itemishList[w].description]))
		} else if(answer == 2) {
			window.rpg.spells.forEach(w => menuArray.push([itemishList[w].displayName, itemInspect(w) + " : " + itemishList[w].description]))
		} else if(answer == 3) {
			window.rpg.items.forEach(w => menuArray.push([itemishList[w].displayName, itemInspect(w) + " : " + itemishList[w].description]))
		} else {
			break
		}

		menuArray.push(["Back", ""])
		while(true) {
			let answer2 = await rpgMenu(menuArray, 2)
			if(answer2 == menuArray.length) break
		}
	}
}

function dotReplace(text) {
	text += ""
	return text.replace(/\./g, "｡")
}

const itemishList = {
	shove: {
		type: 0, // 0 is weapon
		price: 0, // cost in shops
		displayName: "Shove", // display name
		stat_1: 1, // for weapons, dmg
		description: "Not very useful."
	},
	knife: {
		type: 0,
		price: 10,
		displayName: "Knife",
		stat_1: 8,
		description: "Ouch."
	},
	sword: {
		type: 0,
		price: 30,
		displayName: "Sword",
		stat_1: 20,
		description: "Vaguely pointy."
	},
	gun: {
		type: 1, // 1 is spell
		price: 15,
		displayName: "Gun",
		stat_1: 12, // for spells, dmg
		stat_2: .3, // for spells, miss rate
		description: "Yeowch."
	},
	cannon: {
		type: 1,
		price: 25,
		displayName: "Cannon",
		stat_1: 20,
		stat_2: .1,
		description: "Not fit for a landlubber like yeself."
	},
	book: {
		type: 1,
		price: 40,
		displayName: "Necronomicon",
		stat_1: 50,
		stat_2: .4,
		description: "Smells weird."
	},
	apple: {
		type: 2, // 2 is healable
		price: 5,
		displayName: "Apple",
		stat_1: 15, // for healables
		description: "Not your favorite fruit."
	},
	mint: {
		type: 2,
		price: 0,
		displayName: "Mint",
		stat_1: 1,
		description: "Ugh, spearmint."
	},
	cookie: {
		type: 2,
		price: 10,
		displayName: "Cookie",
		stat_1: 20,
		description: "A little overbaked."
	},
	cake: {
		type: 2,
		price: 15,
		displayName: "Cake",
		stat_1: 25,
		description: "Too dense."
	},
	brownie: {
		type: 2,
		price: 20,
		displayName: "Brownie",
		stat_1: 30,
		description: "Tastes illegal."
	},
	antacid: {
		type: 3,
		price: 20,
		displayName: "Antacid",
		stat_1: 1.5,
		description: "Good for heartburn."
	},
	pills: {
		type: 3, // 3 is status item
		price: 5,
		displayName: "Bottle of pills",
		stat_1: 1.2, // for status items, atk modifier
		description: "Illegal to take without a prescription."
	}
}

export {
	Player,
	Spy,
	HigherUp,
	Sprite,
	Boss,
	rpgMenu,
	rpgPrint,
	loadFight,
	unloadFight,
	loadShop,
	unloadShop,
	shopDisplay,
	alreadyHave,
	viewInventory,
	itemishList
}
