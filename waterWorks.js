var output // output div
var input // input div
var sleep
var speed = 1

const rainbowList = ["red", "orange", "yellow", "green", "blue", "purple"]
let rainbowInt = Math.floor(Math.random() * rainbowList.length)
const rainbowCycle = () => rainbowInt = (rainbowInt + 1) % 5

function generateQueue() {
	var queueListTest = false
	// comment out this line to use normal queue list
	queueListTest = ["./days/depression.js", "./days/oldMan.js"]
	var queueList = [
		"./days/oldMan.js",
		"./days/depression.js",
		"./days/wrongSecretAgent.js",
		"./days/multiDays/oldGuyDrugs/oldGuyDrugs_1.js",
		"./days/tasteTesting.js",
		"./days/multiDays/presidentialCampaign/presidentialCampaign_1.js",
		"./days/multiDays/robberyTime/robberyTime_1.js",
		"./days/randomHotCrab.js",
		"./days/multiDays/soccerPractice/soccerPractice_1.js",
		"./days/burnWitch.js",
		"./days/purchaseSomeGoods.js",
		"./days/cookingCompetition.js",
		"./days/crabExam.js",
		"./days/firstContact.js",
		"./days/fisherman.js",
		"./days/forwardScuttle.js",
		"./days/gameShow.js",
		"./days/paneraBreadGiftcard.js",
		"./days/peerPressure.js",
		"./days/pirates.js",
		"./days/prawnShop.js",
		"./days/prisonersDilemma.js",
		"./days/coolCrabs.js",
		"./days/multiDays/restaurant/restaurant_1.js",
		"./days/mcDolphins.js",
		"./days/coding.js"
	]
	queueList = shuffleArray(queueList)
	return queueListTest || queueList
}

// converts string to an array + converts \n to <br>
function tokenize(string, color) {
	if(color == "rainbow") return rainbowTokenize(string)
	let array = []
	while(string.length != 0) {
		if(string.startsWith("\n")) {
			array.push("<br>")
			string = string.substring(2)
		} else {
			array.push(string[0])
			string = string.substring(1)
		}
	}
	return array
}

function rainbowTokenize(string) {
	let array = []
	while(string.length != 0) {
		if(string.startsWith("\n")) {
			array.push("<br>")
			string = string.substring(2)
		} else {
			rainbowCycle()
			const span = document.createElement("span")
			span.classList.add(rainbowList[rainbowInt])
			span.innerHTML = string[0]
			array.push(span)
			string = string.substring(1)
		}
	}
	return array
}

// creates an HTML span element
function createSpan(color) {
	const span = document.createElement("p")
	span.classList.add(color)
	return span
}

// fancy print
async function fprint(string, color = "white", wait = 0.5, textSpeed = 0.04, isChoice = false) {
	const span = createSpan(color)
	if(isChoice) span.classList.add("choice")
	output.appendChild(span) // make and put an empty span of the specified color on the dom
	for(let c of tokenize(string, color)) { // loop through all characters
		span.innerHTML += c.outerHTML || c // add character
		scrollToBottom()
		if(textSpeed != 0 && !window.debug) {
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
					await sleep(textSpeed) // default sleep for characters
			}
		}
	}
	span.innerHTML += "<br>" // add line break at end
	scrollToBottom()
	if(!window.debug) { // end wait
		await sleep(wait / speed)
	}
}

const clear = () => output.innerHTML = ""

async function pause() {
	fprint("Press ENTER", "dim", 0, 0)
	await awaitInput()
}

// okay I kind of don't want to comment the rest of this because it's ugly
const choice = array => new Promise(async (resolve, reject) => {
	input.classList.add("visible")
	const span = createSpan("cyan")
	span.classList.add("choice")
	for(let i in array) {
		let index = createSpan("cyan")
		index.innerHTML = `[${parseInt(i) + 1}] ${array[i]}`
		span.appendChild(index)
		//fprint(, "cyan", 0, 0, true)
	}
	output.appendChild(span)
	fprint("", "cyan", 0, 0)
	while(true) {
		let answer = await awaitInput()
		fprint(answer, "cyan", 0, 0, true)
		answer = parseInt(answer.slice(3))
		if(answer >= 1 && answer <= array.length) {
			input.classList.remove("visible")
			fprint("", "cyan", 0, 0)
			resolve(answer)
			break
		} else {
			fprint("Invalid input...", "red", 0, 0, true)
			continue
		}
	}
})

const menu = array => new Promise(async (resolve, reject) => {
	// displays text to screen
	const span = createSpan("cyan")
	span.classList.add("choice")
	for(let i in array) {
		let index = createSpan("menu")
		index.innerHTML = array[i]
		span.appendChild(index)
	}
	output.appendChild(span)
	// input handling
	let answer = await new Promise(async (resolve, reject) => {
		span.childNodes[0].classList.add("menuSelected")
		let count = 1
		document.addEventListener("keydown", e => {
			if(e.key == "Enter" || e.key == " ") resolve(count)
			if(e.key == "ArrowDown" || e.key == "s") count++
			if(e.key == "ArrowUp" || e.key == "w") count--
			if(count > array.length) count = array.length
			if(count < 1) count = 1
			span.childNodes.forEach(span => span.classList.remove("menuSelected"))
			span.childNodes[count - 1].classList.add("menuSelected")
		})
	})
	fprint("", "cyan", 0, 0)
	resolve(answer)
})

const awaitInput = () => new Promise(async (resolve, reject) => {
	input.innerHTML = ">> "
	let text = ">> "
	document.addEventListener("keypress", e => {
		if(e.key == "Enter" || e.key == " ") {
			resolve(text)
		} else {
			text += e.key
			input.innerHTML = text
		}
	})
	document.addEventListener("keydown", e => {
		if(e.key == "Backspace") {
			if(text.length < 4) return
			text = text.slice(0, text.length - 1)
			input.innerHTML = text
		}
	})
})

const dayPlural = () => window.days == 1 ? "day" : "days"

// taken from https://stackoverflow.com/a/6274398
// why doesn't JavaScript have a built in array shuffle method?
function shuffleArray(array) {
	let counter = array.length
	while(counter > 0) {
		let index = Math.floor(Math.random() * counter)
		counter--
		let temp = array[counter]
		array[counter] = array[index]
		array[index] = temp
	}
	return array
}

function randomGreeting() {
	const randomGreetList = [
		"Lets get into it, yeah?",
		"You ready?",
		"Check me out on Bandcamp!",
		"Now with extra days!",
		"*snip snap snip snap snip snap*",
		"My claws are clicking \"fuck you\" in morse code.",
		"Let's get Kraken!",
		"Now with twice as many crabs!"
	]
	return randomGreetList[Math.floor(Math.random() * randomGreetList.length)]
}

function randomAgree() {
	const randomAgreeList = [
		"Aight bro.",
		"Good choice.",
		"kk",
		"Alrighty.",
		"Okey dokey!!"
	]
	return randomAgreeList[Math.floor(Math.random() * randomAgreeList.length)]
}

function randomDeath() {
	const randomDeathList = [
		"as a crab",
		"from carbon monoxide poisoning",
		"from really bad Chinese food",
		"from COVID-19",
		"from fall damage",
		"in the trenches",
		"in a compromising position",
		"trying to commit suicide",
		"through reading this message",
		"in an online game of Chess",
		"in your favorite battle royale videogame",
		"in a TLS handshake",
		"in an automobile accident",
		"as a Kurdish freedom fighter",
		"from a gluten overdose", // oof
		"in a candle factory fire",
		"trying to pursue the American Dream",
		"caught up in the grimy criminal underworld of urban Wyoming",
		"as an ant",
		"from an angry weasel",
		"in a \"suicide\"",
		"from good, clean, fun"
	]
	return randomDeathList[Math.floor(Math.random() * randomDeathList.length)]
}

function scrollToBottom() {
	document.documentElement.scrollTop = document.body.scrollHeight
}

// returns a promise that is resolved when audio is finished playing
const playAudio = async src => new Promise((resolve, reject) => {
	let player = new Audio(src) // new audio player
	player.play() // plays from file specified in src
	player.onended = () => {
		player = null // set to null so player is garbage collected
		resolve() // resolve promise
	}
})

window.addEventListener("load", () => {
	window.debug ? sleep = () => true : sleep = s => new Promise(r => setTimeout(r, s * 1000 / speed))
	output = document.getElementById("output")
	input = document.getElementById("input")
	document.addEventListener("keydown", e => {
		 if(e.key == "Shift") speed = 2
	 })
	document.addEventListener("keyup", e => {
		if(e.key == "Shift") speed = 1
	})
})

// list of window variables to save
const windowSaveList = [
	"days",
	"experience",
	"personality",
	"state",
	"message"
]

export {
	output,
	input,
	clear,
	pause,
	sleep,
	createSpan,
	fprint,
	choice,
	dayPlural,
	generateQueue,
	shuffleArray,
	randomDeath,
	randomGreeting,
	randomAgree,
	scrollToBottom,
	playAudio,
	menu,
	awaitInput
}
