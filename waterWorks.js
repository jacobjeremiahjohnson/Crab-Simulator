const debug = false

var output // output div
var input // input div

var sleep // sleep in seconds
debug ? sleep = () => true : sleep = s => new Promise(r => setTimeout(r, s * 1000))

// converts string to an array + converts \n to <br>
function tokenize(string) {
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

// creates an HTML span element
function createSpan(color) {
  const span = document.createElement("span")
  span.classList.add(color)
  return span
}

/*
- Informational text is "dim"
- Narrator speech is "green"
- Character's speech is "cyan"
- Other character's speech are "yellow", "blue", and "purple" in that order
- Onomonopoeia and other sounds are "red"
- God and stat level ups are "rainbow"
- Use "rainbow" and "white" very sparingly

- Carlos (Carlos Sandchez) is a reoccurring friend character for the crab now

TIMINGS
wait is how long to wait before next instruction, default 0.5
text speed is how long normal letters take, default 0.04
slow text speed is recommended to be 0.06
fast text speed is recommended to be 0.02
*/

// fancy print
async function fprint(string, color = "white", wait = 0.5, textSpeed = 0.04) {
	if(color == "rainbow") return rainbowPrint(string, wait, textSpeed) // do rainbow print
	const span = createSpan(color)
	output.appendChild(span) // make and put an empty span of the specified color on the dom
	for(let c of tokenize(string)) { // loop through all characters
    span.innerHTML += c // add character
		if(textSpeed != 0) {
			if([".", "!", "?", ";"].includes(c)) { // full stop sleep
				await sleep(0.5)
			} else if([",", ":"].includes(c)) { // soft stop sleep
				await sleep(0.25)
			} else { // default sleep for characters
				await sleep(textSpeed)
			}
		}
	}
	span.innerHTML += "<br>" // add line break at end
	if(!debug) { // end wait
		await sleep(wait)
	}
}


// rainbow print
// pretty much the same as fprint but cycles between colors
async function rainbowPrint(string, wait, textSpeed) {
  const rainbowList = ["red", "yellow", "green", "blue", "purple"]
  let rainbowInt = Math.floor(Math.random() * 5)
  for(let c of tokenize(string)) {
    const span = createSpan(rainbowList[rainbowInt])
    span.innerHTML = c
    output.appendChild(span)
    rainbowInt += 1
		if(rainbowInt == 5) {
      rainbowInt = 0
    }
    if(textSpeed != 0) {
			if([".", "!", "?", ";"].includes(c)) {
				await sleep(0.5)
			} else if([",", ":"].includes(c)) {
				await sleep(0.25)
			} else {
				await sleep(textSpeed)
			}
		}
  }
  fprint("", "cyan", 0, 0)
  if(!debug) {
    await sleep(wait)
  }
}

const clear = () => output.innerHTML = ""

// okay I kind of don't want to comment the rest of this because it's ugly
const choice = array => new Promise(async (resolve, reject) => {
  input.classList.add("visible")
	for(let i in array) {
    fprint(`[${parseInt(i) + 1}] ${array[i]}`, "cyan", 0, 0)
	}
  fprint("", "cyan", 0, 0)
	while(true) {
		let answer = await awaitInput()
    fprint(answer, "cyan", 0, 0)
    answer = parseInt(answer.slice(3))
		if(answer >= 1 && answer <= array.length) {
      input.classList.remove("visible")
			resolve(answer)
		} else {
			fprint("Invalid input...", "red", 0, 0)
			continue
		}
	}
})

const awaitInput = () => new Promise(async (resolve, reject) => {
  input.innerHTML = ">> "
  let text = ">> "
	document.addEventListener("keypress", e => {
    if(e.key == "Enter") {
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

window.onload = () => {
	output = document.getElementById("output")
	input = document.getElementById("input")
}

export { output, input, sleep, createSpan, fprint, choice }
