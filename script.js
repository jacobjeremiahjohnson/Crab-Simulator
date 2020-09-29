const debug = false
const acceptingInput = false
var output
var input
var sleep

debug ? sleep = () => true : sleep = s => new Promise(r => setTimeout(r, s * 1000))

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

function createSpan(color) {
  const span = document.createElement("span")
  span.classList.add(color)
  return span
}

async function fprint(string, color = "white", wait = 0.5, textSpeed = 0.04) {
	if(color == "rainbow") return rainbowPrint(string, wait, textSpeed)
	const span = createSpan(color)
	output.appendChild(span)
	for(let c of tokenize(string)) {
    span.innerHTML += c
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
	span.innerHTML += "<br>"
	if(!debug) {
		await sleep(wait)
	}
}

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

const choice = array => new Promise(async (resolve, reject) => {
  input.classList.add("visible")
	for(i in array) {
    fprint(`[${parseInt(i) + 1}] ${array[i]}`,  "cyan", 0, 0)
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

async function d_oldMan(queue) {
	await fprint("A visibly old male crab approaches you out of the shadows.\n", "dim", 1)
  await fprint("Ey, you, kid.", "yellow", 0.5, 0.06)
  await fprint("You new here or somethin?\n", "yellow", 0.5, 0.06)
	answer = await choice(["Yes", "No"])
  if(answer == 1) {
    await fprint("Uh yeah, actually. I was reincarnated here 1 day ago.\n", "cyan")
    await fprint("Oh, dip. Well I hope I see ya around, kid. Good luck out there.\n", "yellow", 0.5, 0.06)
    await fprint("Honesty be kinda quirky tho. Lowkey cool ig.\n", "green")
    await fprint("Coolness + 1", "rainbow", 1)
    await fprint("Goodness + 1", "rainbow", 1)
  } else {
    await fprint("Nah, I've been here a while now.\n", "cyan")
    await fprint("Oh, word. Well I hope I see ya around, kid. Good luck out there.\n", "yellow", 0.5, 0.06)
    await fprint("Woah, lies and deciet? That's pretty cool.\n", "green")
    await fprint("Coolness + 1000", "rainbow", 1)
    await fprint("Badness + 1", "rainbow", 1)
  }
  await fprint("Experience + 1\n", "rainbow", 2)
  alert(1)
}

window.onload = () => {
	output = document.getElementById("output")
	input = document.getElementById("input")
	d_oldMan(1)
}
