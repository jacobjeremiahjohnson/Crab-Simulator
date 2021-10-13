import { awaitInput, createSpan, id, sleep } from "/waterWorks.js"

const fps = 60
const realSleep = s => new Promise(r => setTimeout(r, s * 1000)) // sleep unaffected by shift key

const textOutput = id("rpgText") // main text field
const menuOutputDefault = id("rpgMenu") // left section for menu choice
const menuTextOutputDefault = id("rpgMenuText") // text field for menu choice descriptions
var menuOutput = menuOutputDefault
var menuTextOutput = menuTextOutputDefault

var spriteList = {} // object with key of Math.random() "spirteID", value of sprite element
var hurtBox = [false, false, false] // active hitbox
var positionBox = [false, true, false] // where player currently is
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
		})
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
	id("rpg").style.display = "none"
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
	constructor(color, sprites, widthOffset) {
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
	}

	async getHurt(amount) {
		this.stunned = true
		this.sprite.classList.add("hurt")
		new HurtText(this.x, this.y, amount)
		this.hp -= amount
		if(this.hp < 0) return this.die()
		await realSleep(0.5)
		this.sprite.classList.remove("hurt")
		await realSleep(0.5)
		this.stunned = false
	}

	die() {

	}
}

// player on first encounter
class PlayerNew extends Character {
	constructor() {
		super("cyan", null, 50, 75)
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
]
		this.y = 300
		this.updateSprite(0)
		this.stunned = false
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
	}

	async takeTurn() {
		let answer
		while(true) {
			answer = await rpgMenu([["Attack", "Use your Weapons to attack the enemy."], ["Items", "Use your Items to gain an advantage."]], 0)
			if(answer == 1) {
				answer = await rpgMenu([["Shove", "1 dmg : Not very useful."], ["Exit", ""]], 1)
				if(answer == 1) break
			} else {
				await rpgMenu([["Exit", "You don't have any items!"]], 1)
			}
		}
		await this.shove()
	}

	async shove() {
		await this.moveTo(this.x, this.y - 190, 1)
		this.updateSprite(1)
		enemy.getHurt(1)
		await realSleep(0.5)
		this.updateSprite(0)
		await this.moveTo(this.x, this.y + 190, 1)
		await realSleep(0.5)
		await rpgPrint("You shove the enemy. It doesn't seem like it did much...", "dim")
	}

	async enemyTurn(turnFlag) {
		this.isEnemyTurn = turnFlag
		let currentMoving = 0
		let keys = [false, false]
		if(turnFlag) {
			document.addEventListener("keydown", async e => {
				if(!this.isEnemyTurn) return
				if((e.key == "ArrowLeft" || e.key == "a") && currentMoving == 0) {
					// initiate move left
					currentMoving = -1
					let curX = this.x
					let curY = this.y
					this.deltaPosition = [-10, 0, 0.34, 0]
					positionBox = [true, false, false]
					await realSleep(0.9)
					positionBox = [false, true, false]
					await realSleep(0.1)
					this.deltaPosition = [null, null, null, null]
					this.x = curX
					this.y = curY
					currentMoving = 0
				}
				if((e.key == "ArrowRight" || e.key == "d") && currentMoving == 0) {
					// initiate move right
					currentMoving = 1
					let curX = this.x
					let curY = this.y
					this.deltaPosition = [10, 0, -0.34, 0]
					positionBox = [false, false, true]
					await realSleep(0.9)
					positionBox = [false, true, false]
					await realSleep(0.1)
					this.deltaPosition = [null, null, null, null]
					this.x = curX
					this.y = curY
					currentMoving = 0
				}
			})
		}
	}
}

// little text that pops up when you get hurt
class HurtText extends Sprite {
	constructor(x, y, amount) {
		super("hurtText", "-" + amount, 100)
		this.x = x
		this.y = y
		this.deltaPosition = [-2.5, -3, 0, 0.17]
		this.lifeTime = 60
	}

	codeUpdate() {
		this.lifeTime--
		if(this.lifeTime < 0) this.remove()
	}
}

// spy
class Spy extends Character {

	bulletSprite = String.raw`
_
U
`

	constructor() {
		super("blue", null, 90, 75)
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
`
]
		this.updateSprite(0)
	}

	async shoot() {
		player.enemyTurn(true)
		enemyDamageOutput = 15
		let direction = (Math.floor(Math.random() * 2) + 1) // 1 left, 2 right
		this.updateSprite(direction)
		await realSleep(1)
		let bullet = new Sprite("blue", this.bulletSprite, 0)
		await bullet.moveTo(direction == 1 ? this.x - 64 : this.x + 52, this.y + 55)
		bullet.moveTo(bullet.x, bullet.y + 300, 1.5)
		await realSleep(0.9)
		if(direction == 1) hurtBox = [1, 1, 0]
		else hurtBox = [0, 1, 1]
		await realSleep(0.6)
		bullet.remove()
		hurtBox = [0, 0, 0]
		await realSleep(0.5)
		this.updateSprite(0)
		await realSleep(0.5)
		enemyDamageOutput = 0
		player.enemyTurn(false)
	}
}

function shopDisplay(itemList) {
	let val = []
	for(let i in itemList) {
		let ref = itemList[i][0]
		if(ref == "Exit") {
			val.push(itemList[i])
			continue
		}
		let name = itemishList[ref][2]
		let description = itemishList[ref][1] + " dollars : "
		switch(itemishList[ref][0]) {
			case 0:
				description += itemishList[ref][3] + " dmg : "
				break
			case 1:
				description += itemishList[ref][3] + " dmg (" + (itemishList[ref][4] * 100) + "% miss rate) : "
				break
			case 2:
				description += "+" + itemishList[ref][3] + " hp : "
				break
			case 3:
				description += "+" + dotReplace(itemishList[ref][3]) + "x atk : "
				break
		}
		description += itemList[i][1]
		val.push([name, description])
	}
	return val
}

function dotReplace(text) {
	text += ""
	return text.replace(/\./g, "｡")
}

/*
[itemType, price, displayName, modify, addModify]

itemType
0 - weapon,      modify = dmg
1 - spell,       modify = dmg,                 addModify = miss rate
2 - healable,    modify = hp healed
3 - status item, modify = attack modification
*/
const itemishList = {
	shove: [0, 0, "Shove", 1],
	knife: [0, 10, "Knife", 8],
	gun: [1, 15, "Gun", 10, .3],
	apple: [2, 5, "Apple", 5],
	pills: [3, 5, "Bottle of pills", 1.2]
}

export {
	PlayerNew,
	Spy,
	Sprite,
	rpgMenu,
	rpgPrint,
	loadFight,
	unloadFight,
	loadShop,
	unloadShop,
	shopDisplay,
	itemishList
}
