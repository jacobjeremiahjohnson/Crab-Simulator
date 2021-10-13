var output // output div
var input // input div
var sleep
var speed = 1

var textSpeedAdjustment = 1

const rainbowList = ["red", "orange", "yellow", "green", "blue", "purple"]
let rainbowInt = Math.floor(Math.random() * rainbowList.length)
const rainbowCycle = () => rainbowInt = (rainbowInt + 1) % 5

function generateQueue() {
	var queueListTest = false
	// comment out this line to use normal queue list
	queueListTest = ["./days/slideWhistle.js"]
	var queueList = [
		"./days/oldMan.js",
		"./days/depression.js",
		"./days/multiDays/spyStory/1_wrongSecretAgent.js",
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
		"./days/paneraBreadGiftcard.js",
		"./days/peerPressure.js",
		"./days/pirates.js",
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
		} else if(string.startsWith("｡")) {
			array.push("<span>.</span>")
			string = string.substring(1)
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
					await sleep(textSpeed * textSpeedAdjustment) // default sleep for characters
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

var choice

// okay I kind of don't want to comment the rest of this because it's ugly
const choiceClassic = array => new Promise(async (resolve, reject) => {
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

function loadSettings() {
	let settings = JSON.parse(window.localStorage.getItem("settings"))
	if(settings[0] === 0) choice = menu
	else choice = choiceClassic
	textSpeedAdjustment = settings[1]
}

var fprintSettingsIter = 0

// settings screen
const settings = async () => new Promise((resolve, reject) => {

	fprintSettingsIter = 0
	const randomSettingsList = [ // random thing that's displayed at the top of the page
		"Set to your heart's content.",
		"Set all your stuff here.",
		"So many choices, so little time.",
		"Set all your ings here.",
		"I bet this is where you change your settings.",
		"I wonder if this is where you change your settings...",
		"The Crab Simulator farm-fresh settings guarantee!"
	]

	clear()
	id("settingsRandom").innerHTML = randomSettingsList[Math.floor(Math.random() * randomSettingsList.length)] + "<br><br>"

	let options = [ // elements for menu items
		id("menuOptions"),
		id("textSpeed"),
		id("deleteSave"),
		id("exitSettings")
	]
	let selections = [ // all possible menu selections
		[0, id("menuOptionsSelect"), ["&nbsp;&nbsp;Modern >&nbsp;", "< Classic&nbsp;&nbsp;"]],
		[5, id("textSpeedSelect"), ["&nbsp;&nbsp;x0.5 >", "< x0.6 >", "< x0.7 >", "< x0.8 >", "< x0.9 >", "< x1.0 >", "< x1.1 >", "< x1.2 >", "< x1.3 >", "< x1.4 >", "< x1.5&nbsp;&nbsp;"]],
		null, // no menu selection attached to delete save or exit settings
		null
	]

	options.forEach(span => span.classList.remove("menuSelected"))
	options[0].classList.add("menuSelected")

	let oldSettings = JSON.parse(window.localStorage.getItem("settings"))
	selections[0][0] = oldSettings[0]
	selections[1][0] = Math.round(Math.abs(1.5 - oldSettings[1]) * 10) // floating point precision :whyyy:
	console.log(oldSettings[1], selections[1][0])
	updateSettingsScreen(selections)
	id("settings").style.display = "block" // make settings screen visible

	let count = 0 // currently selected menu item
	document.addEventListener("keydown", e => {
		if(e.key == "Enter" || e.key == " ") {
			if(count == 2) { // delete save file
				if(options[2].innerHTML == "Delete save file") {
					options[2].innerHTML = "Click again to delete"
				} else if(options[2].innerHTML == "Click again to delete") {
					window.localStorage.removeItem("save")
					options[2].innerHTML = "Deleted!"
				}
			} else if(count == 3) { // exit settings
				id("settings").style.display = "none"
				window.localStorage.setItem("settings", JSON.stringify([selections[0][0], 1.5 - (selections[1][0] * 0.1)]))
				loadSettings()
				resolve()
			}
		} else {
			options[2].innerHTML = "Delete save file"
		}
		if(e.key == "ArrowLeft" || e.key == "a") {
			if(selections[count] != null) { // if menu selection attached to current item
				selections[count][0]--
				if(selections[count][0] < 0) selections[count][0] = 0 // out of bounds
				selections[count][1].innerHTML = selections[count][2][selections[count][0]] // lol
			}
			if(count == 1) fprintSettings(1.5 - (selections[1][0] * 0.1))
		}
		if(e.key == "ArrowRight" || e.key == "d") {
			if(selections[count] != null) {
				selections[count][0]++
				if(selections[count][0] > selections[count][2].length - 1) selections[count][0] = selections[count][2].length - 1
				selections[count][1].innerHTML = selections[count][2][selections[count][0]]
			}
			if(count == 1) fprintSettings(1.5 - (selections[1][0] * 0.1))
		}
		if(e.key == "ArrowDown" || e.key == "s") count++
		if(e.key == "ArrowUp" || e.key == "w") count--
		if(count > options.length - 1) count = options.length - 1
		if(count < 0) count = 0
		options.forEach(span => span.classList.remove("menuSelected"))
		options[count].classList.add("menuSelected")
		updateSettingsScreen(selections)
	})
})

async function fprintSettings(speed = 1) {
	let span = id("textSpeedDisp")
	span.innerHTML = ""
	fprintSettingsIter++
	let currentIteration = fprintSettingsIter
	for(let c of "This is how fast text appears in the game, at least under normal conditions. Holding the shift key doubles it.") {
		if(currentIteration != fprintSettingsIter) {
			break
		}
		span.innerHTML += c
		switch(c) {
			case ".":
			case "!":
			case "?":
			case ";":
				await sleep(0.5)
				break
			case ",":
			case ":":
				await sleep(0.25)
				break
			default:
				await sleep(0.04 * speed)
		}
	}
	if(currentIteration == fprintSettingsIter) span.innerHTML += "<br><br>"
}

function updateSettingsScreen(selections) {
	selections[0][1].innerHTML = selections[0][2][selections[0][0]] // lol
	selections[1][1].innerHTML = selections[1][2][selections[1][0]]
	let saveDays = JSON.parse(window.localStorage.getItem("save"))
	id("deleteSaveDisp").innerHTML = "Days : " + ((saveDays === null) ? "X" : saveDays[0])
	if(selections[0][0] == 0) {
		id("menuOptionsDisp").innerHTML = '<p class="cyan choice"><p class="menu menuSelected">Option one</p><p class="menu">Option 2</p></p><br><br><br>'
	} else {
		id("menuOptionsDisp").innerHTML = '<p class="cyan">[1] New Game&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><p class="cyan">[2] Resume Game : X</p><p class="cyan">[3] Settings&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><p class="cyan">[4] Credits&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><br>'
	}
}

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

const realSleep = s => new Promise(r => setTimeout(r, s * 1000))
const id = i => document.getElementById(i)

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
	awaitInput,
	loadSettings,
	id,
	settings,
	realSleep
}
