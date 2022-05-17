import { createSpan, rainbowList, realSleep } from "../../waterWorks.js"

const fpsInterval = 1000 / 60

let gameStarted = false
let then = 0
let map = null

let fishList = []
let currentFish = null

function gameLoop() {
	if(gameStarted) requestAnimationFrame(gameLoop)
	else return
	let now = Date.now()
	let elapsed = now - then
	if(elapsed > fpsInterval) {
		then = now - (elapsed % fpsInterval)
		for(let f in fishList) { // perform code for each sprite
			f = fishList[f]
			f.positionUpdate()
		}
		meterCode()
	}
}

function start(mapElement) {
	map = mapElement
	gameStarted = true
	gameLoop()
	for(let i = 0; i < 10; i++) new Fish()
}

function stop() {
	gameStarted = false
	for(let f in fishList) {
		fishList[f].remove()
	}
}

class Fish {
	element = createSpan("fish")
	x = 0
	y = 0
	deltaPosition = [null, null]
	moving = true

	sprites = [
		[">(=o)", "(o=)<"],
		[")o", "o("],
		["d=Io", "oI=b"],
		[">-(=8)", "(8=)-<"],
		[">To", "oT<"]
	]

	spriteID = 0
	fishID = null

	constructor() {
		this.x = Math.floor(Math.random() * 560) + 20
		this.y = Math.floor(Math.random() * 360) + 20
		this.spriteID = Math.floor(Math.random() * 5)
		this.fishID = Math.random()
		fishList[this.fishID] = this
		this.element.classList.add(rainbowList[Math.floor(Math.random() * rainbowList.length)])
		this.element.innerHTML = this.sprites[this.spriteID][0]
		map.appendChild(this.element)
		this.movingLoop()

		this.element.addEventListener("click", this.clicked)
	}
	
	positionUpdate() {
		if(this.deltaPosition[0] === null) return
		this.x += this.deltaPosition[0]
		this.y += this.deltaPosition[1]
		this.element.style.top = `${this.y}px`
		this.element.style.left = `${this.x}px`
	}

	clicked = e => {
		if(currentFish !== null) return
		currentFish = this
		this.element.classList.add("target")
		setInterval(() => {
			currentFish = null
			this.element.classList.remove("target")
		}, 10000)
	}

	async moveTo(x2, y2, time) {
		// calculates how much to move per frame
		this.deltaPosition = [(x2 - this.x) / (time * 60), (y2 - this.y) / (time * 60)]
		if(this.deltaPosition[0] > 0) this.element.innerHTML = this.sprites[this.spriteID][0]
		else this.element.innerHTML = this.sprites[this.spriteID][1]
		await realSleep(time)
		this.deltaPosition = [null, null, null, null] // done moving
		// hard set position just incase code has rounding errors or whatever
		this.x = x2
		this.y = y2
	}

	remove() {
		delete fishList[this.spriteID]
		this.element.remove()
	}

	async movingLoop() {
		while(this.moving) {
			await this.randomPosition()
		}
	}

	async randomPosition() {
		let x = Math.floor(Math.random() * 560) + 20
		let y = Math.floor(Math.random() * 320) + 20
		await this.moveTo(x, y, 0.01 * Math.sqrt((this.x - x) ** 2 + (this.y - y) ** 2))
		await realSleep(1)
	}
}

function meterCode() {
	if(currentFish === null) return

}

export {
	start
}