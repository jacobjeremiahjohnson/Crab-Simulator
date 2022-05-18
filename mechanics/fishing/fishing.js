import { clear, createSpan, fprint, id, rainbowList, realSleep } from "../../waterWorks.js"

const fpsInterval = 1000 / 60

let gameStarted = false
let then = 0
let map = null

let fishList = []
let currentFish = null
let meter = 0
let meterChange = -5
let score = 0
let fishingGoal = 28700
let caughtFish = 0

let fishingBar = null
let fishingTarget = null

let resolveFunc = null

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

async function start(mapElement) {
	return new Promise(resolve => {
		resolveFunc = resolve
		map = mapElement
		gameStarted = true
		caughtFish = 0
		document.addEventListener("keydown", spacebarPress)
		gameLoop()
		fishPrint("Catch fish by clicking on them, then mash the spacebar to match it with the target on the right side! Hold it for 10 seconds!", "green")
		for(let i = 0; i < 8; i++) new Fish()
		fishingBar = id("fishingBar")
		fishingTarget = id("fishingTarget")
	})

}

function stop() {
	gameStarted = false
	for(let f in fishList) {
		fishList[f].remove()
	}
	document.removeEventListener("keydown", spacebarPress)
	clear()
	resolveFunc(caughtFish)
}

class Fish {
	element = createSpan("fish")
	x = 0
	y = 0
	deltaPosition = [null, null]
	moving = true
	color = null

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
		this.x = Math.floor(Math.random() * 540) + 20
		this.y = Math.floor(Math.random() * 340) + 20
		this.spriteID = Math.floor(Math.random() * 5)
		this.fishID = Math.random()
		this.color = rainbowList[Math.floor(Math.random() * rainbowList.length)]
		fishList[this.fishID] = this
		this.element.classList.add(this.color)
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
		score = 0
		currentFish = this
		fishClicked(this)
		this.element.classList.add("target")
		fishPrint("Mash the spacebar and keep the right bar on the target!", "green")
		setTimeout(async () => {
			if(score > fishingGoal) {
				fishPrint("Aw, it got away...", "green")
			} else {
				fishPrint("Nice catch!", "green")
				caughtFish++
			}
			currentFish = null
			fishingTarget.style.backgroundColor = null
			this.remove()
			if(Object.keys(fishList).length === 0) {
				await realSleep(3)
				stop()
			}
		}, 10000)
	}

	async moveTo(x2, y2, time) {
		// calculates how much to move per frame
		this.deltaPosition = [(x2 - this.x) / (time * 60), (y2 - this.y) / (time * 60)]
		if(this.deltaPosition[0] > 0) this.element.innerHTML = this.sprites[this.spriteID][0]
		else this.element.innerHTML = this.sprites[this.spriteID][1]
		await realSleep(time)
		this.deltaPosition = [null, null] // done moving
		// hard set position just incase code has rounding errors or whatever
		this.x = x2
		this.y = y2
	}

	remove() {
		delete fishList[this.fishID]
		this.element.remove()
	}

	async movingLoop() {
		while(this.moving) {
			await this.randomPosition()
		}
	}

	async randomPosition() {
		let x = Math.floor(Math.random() * 540) + 20
		let y = Math.floor(Math.random() * 340) + 20
		await this.moveTo(x, y, 0.01 * Math.sqrt((this.x - x) ** 2 + (this.y - y) ** 2))
		await realSleep(1)
	}
}

function spacebarPress(e) {
	if(e.code === "Space") {
		if(meterChange < 0) meterChange = 0
		meterChange += 4
		if(meterChange > 25) meterChange = 25
	}
}

function fishClicked(fish) {

	fishingTarget.style.bottom = `${Math.floor(Math.random() * 360) + 20}px`

	const color = fish.color[0].toUpperCase() + fish.color.substring(1).toLowerCase()
	fishingTarget.style.backgroundColor = `var(--color${color})`
}

function meterCode() {
	if(fishingBar === null) return
	meter += meterChange
	if(meter < 0) {
		meter = 0
		meterChange = 0
	}
	if(meter > 400) {
		meter = 400
		if(meterChange > 2) meterChange = 1
	}
	meterChange -= 0.4
	fishingBar.style.bottom = `${meter}px`
	if(currentFish === null) return
	score += Math.abs(fishingBar.style.bottom.slice(0, -2) - fishingTarget.style.bottom.slice(0, -2))
}

async function fishPrint(string = "", color = "white") {
	const output = id("fishPrintOutput")
	output.innerHTML = ""
	return fprint({
		string: string,
		color: color,
		destination: output,
		cancellable: true
	})
}

export {
	start,
	fishPrint
}