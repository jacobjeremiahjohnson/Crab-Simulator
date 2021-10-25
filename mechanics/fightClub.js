import { awaitInput, createSpan, id, sleep } from "/waterWorks.js"

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
		const controller = new AbortController()
		let answer = await new Promise(async (resolve, reject) => {
			span.childNodes[0].classList.add("menuSelected")
			let count = 1
			rpgMenuPrint(array[0][1]) // print description of currently selected item
			document.addEventListener("keydown", e => {
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
		}, { signal: controller.signal })
		controller.abort()
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
			if(this.hp < 0) return await this.die()
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
class PlayerNew extends Character {
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
				await realSleep(0.5)
				this.updateSprite(0)
				positionBox = [false, true, false, false]
				this.deltaPosition = [null, null, null, null]
				this.x = curX
				this.y = curY
				this.currentMoving = 0
			}
		}
	}

	async takeTurn() {
		let answer
		while(true) {
			answer = await rpgMenu([["Attack", "Use your Weapons to attack the enemy."], ["Items", "Use your Items to gain an advantage."]], 0)
			if(answer == 1) {
				answer = await rpgMenu([["Shove", "1 dmg : Not very useful."], ["Back", ""]], 1)
				if(answer == 1) break
			} else {
				await rpgMenu([["Back", "You don't have any items!"]], 1)
			}
		}
		await this.take_action_shove()
	}

	async take_action_shove() {
		await this.moveTo(this.x, this.y - 190, 1)
		this.updateSprite(1)
		enemy.getHurt(1)
		await realSleep(0.5)
		this.updateSprite(0)
		await this.moveTo(this.x, this.y + 190, 1)
		await realSleep(0.5)
		await rpgPrint("You shove the enemy. It doesn't seem like it did much...", "dim")
	}

	enemyTurn(turnFlag) {
		this.isEnemyTurn = turnFlag
		this.currentMoving = 0
	}
}

// player on first encounter
class Player extends PlayerNew {

bulletSprite = String.raw`
∩
‾
`

	constructor() {
		super()
// 5, knife
this.sprites.push(String.raw`
+       |X
 \ |_| /
  /   \
 /\___/\
 //   \\
`)
// 6, sword
this.sprites.push(String.raw`
+       |\
 \ |_| /|
  /   \
 /\___/\
 //   \\
`)
// 7, gun
this.sprites.push(String.raw`
+       ||
 \ |_| /|/
  /   \ .?
 /\___/\
 //   \\
`)
// 8, cannon
this.sprites.push(String.raw`
+        _.
 \ |_| / ||
  /   \  ||
 /\___/\ O/
 //   \\
`)
// 9, necromica
this.sprites.push(String.raw`
+        _
 \ |_| /|N|
  /   \
 /\___/\
 //   \\
`)
// 10, necromica
this.sprites.push(String.raw`
+       +
 \ X_X /
  /   \
 /\___/\
 //   \\
`)
		this.dmgModifier = 1
		this.state = 1 // 1 is alive, 0 is dead
	}

	async die() {
		this.hpTextUpdate()
		this.state = 0
		window.state = "You died in combat like a heroic warrior. Well, sort of heroic.20"
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
			array.push(["Back", ""])
			answer = await rpgMenu(array)
			if(answer - 1 !== ref.length) { // use it
				await this["take_action_" + ref[answer - 1]]()
				break
			}
		}
		return enemy.hp < 1
	}

	codeUpdate() {
		super.codeUpdate()
		if(this.state == 0) {
			this.updateSprite(10)
		}
	}

	calcHit(miss) {
		return Math.floor(Math.random() * 10) + 1 > miss * 10
	}

	calcDmg(amount) {
		return Math.ceil(amount *= this.dmgModifier)
	}

	// weapons
	async take_action_shove() {
		await this.moveTo(this.x, this.y - 190, 1)
		this.updateSprite(1)
		enemy.getHurt(this.calcDmg(1))
		await realSleep(0.5)
		this.updateSprite(0)
		await this.moveTo(this.x, this.y + 190, 1)
		await realSleep(0.5)
		await rpgPrint("You shove the enemy. It doesn't seem like it did much...", "dim")
	}

	async take_action_knife() {
		await this.moveTo(this.x, this.y - 190, 1)
		this.updateSprite(5)
		enemy.getHurt(this.calcDmg(itemishList["knife"].stat_1))
		await realSleep(0.5)
		this.updateSprite(0)
		await this.moveTo(this.x, this.y + 190, 1)
		await realSleep(0.5)
		await rpgPrint("They cry out in pain, presumably from the stab wound.", "dim")
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
		if(hit) await rpgPrint("Hit for " + this.calcDmg(itemishList["gun"].stat_1) + " dmg.", "dim")
		else await rpgPrint("The bullet missed.", "dim")
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

	constructor() {
		super("blue", null, 90, 60)
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
`
]
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
		if(direction == 1) hurtBox = [true, true, false, false]
		else hurtBox = [false, true, true, false]
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
		let directions = [(Math.floor(Math.random() * 2) + 1), (Math.floor(Math.random() * 2) + 1), (Math.floor(Math.random() * 2) + 1)]
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
			if(direction == 1) hurtBox = [true, true, false, false]
			else hurtBox = [false, true, true, false]
			await realSleep(0.1)
			bullet.remove()
			hurtBox = [false, false, false, false]
			await realSleep(0.5)
		}
		this.updateSprite(0)
		await realSleep(0.5)
		await this.moveTo(this.x, this.y + 180, 0.6)
		await realSleep(Math.random() + 0.5)
		this.updateSprite(5)
		await realSleep(0.3)
		this.updateSprite(4)
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
		for(let i = 0; i < 3; i++) {
			player.enemyTurn(true)
			enemyDamageOutput = 15
			let direction = (Math.floor(Math.random() * 2) + 1) // 1 left, 2 right
			let facing = (Math.floor(Math.random() * 2) + 1)
			this.updateSprite(facing)
			await realSleep(1)
			let bullet = new Sprite("blue", this.bulletSprite, 0)
			await bullet.moveTo(facing == 1 ? this.x - 64 : this.x + 52, this.y + 55)
			if(direction == 1) {
				bullet.moveTo(facing == 1 ? bullet.x : bullet.x - 150, bullet.y + 300, 0.8)
				await realSleep(0.6)
				hurtBox = [true, true, false, false]
				await realSleep(0.2)
				bullet.remove()
				hurtBox = [false, false, false, false]
				await realSleep(0.5)
				this.updateSprite(0)
				await realSleep(0.5)
				enemyDamageOutput = 0
			} else {
				bullet.moveTo(facing == 1 ? bullet.x + 150 : bullet.x, bullet.y + 300, 0.8)
				await realSleep(0.6)
				hurtBox = [false, true, true, false]
				await realSleep(0.2)
				bullet.remove()
				hurtBox = [false, false, false, false]
				await realSleep(0.5)
				this.updateSprite(0)
				await realSleep(0.5)
				enemyDamageOutput = 0
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

async function viewInventory(inven) {
	while(true) {
		let answer = await rpgMenu([["Weapons", "View your weapons."], ["Spells", "View your spells."], ["Items", "View your items."], ["Back", ""]], 1)
		let menuArray = []

		if(answer == 1) {
			inven.weapons.forEach(w => menuArray.push([itemishList[w].displayName, itemInspect(w) + " : " + itemishList[w].description]))
		} else if(answer == 2) {
			inven.spells.forEach(w => menuArray.push([itemishList[w].displayName, itemInspect(w) + " : " + itemishList[w].description]))
		} else if(answer == 3) {
			inven.items.forEach(w => menuArray.push([itemishList[w].displayName, itemInspect(w) + " : " + itemishList[w].description]))
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
	gun: {
		type: 1, // 1 is spell
		price: 15,
		displayName: "Gun",
		stat_1: 14, // for spells, dmg
		stat_2: .3, // for spells, miss rate
		description: "Yeowch."
	},
	apple: {
		type: 2, // 2 is healable
		price: 5,
		displayName: "Apple",
		stat_1: 15, // for healables
		description: "Not your favorite fruit."
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
	PlayerNew,
	Player,
	Spy,
	Sprite,
	rpgMenu,
	rpgPrint,
	loadFight,
	unloadFight,
	loadShop,
	unloadShop,
	shopDisplay,
	itemishList,
	alreadyHave,
	viewInventory
}
