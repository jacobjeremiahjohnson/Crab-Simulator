import { fprint, choice, clear, pause } from "./waterWorks.js"
import * as config from "./waterWorks.js"
const { ipcRenderer } = require("electron")


window.debug = false
window.days = 0 // number of days
window.experience = 0 // exp level
window.personality = 0 // positive = good, negative = bad
window.state = 0 // 0 = alive, -1 = win, string = death message
window.message = 0 // used to communicate short term between days, typically used in multidays

async function game(flag) {
  var queue = config.generateQueue(flag)
  while(true) {
    await pause()
    window.days++
    ipcRenderer.send("updatePresence", "On day " + window.days)
    clear()
    await fprint("DAY " + window.days + "\n", "white", 1, 0)
    var dayString = queue.shift()
    if(window.debug) fprint(dayString)
    var day = await import(dayString)
    queue = await day.execute(queue)
    if(queue.length == 0 && window.state == 0) { // if queue is empty and not dead on the last day
      window.state = -1 // set state to win
    }
    if(window.state != 0) { // if state isn't default, break out of game loop (dead or win)
      await pause()
      break
    }
  }
  if(window.state == -1) {
    // win game
    clear()
    window.days++
    await fprint("DAY " + window.days + "\n", "white", 1, 0)
    await fprint("Damn, you actually made it.\n", "green", 2)
    await fprint("Huh? Where am I?\n", "cyan")
    await fprint("You're at the end of the game. You finished all of the trials I put you through.", "green")
    await fprint("You may rest now.\n", "green", 2)
    await fprint("...", "cyan", 1)
    await fprint("I don't want to. I still have so much to do as a crab.\n", "cyan", 1)
    await fprint("Really? I've never had this happen to me before... I'll tell you what, kid. You wanna become a narrator?\n", "green")
    let answer = await choice(["Yes", "No"])
    if(answer == 1) {
      await fprint("I accept.\n", "green")
      await fprint("Thank you. I can move on now. I shall see you again soon.\n", "white", 1)
      await fprint("Where are you going?", "green", 2)
      await fprint("...", "green", 3)
      await fprint("Oh, and thanks for playing through this whole thing as me. You saved me a whole lot back there.", "green", 2)
      await fprint("I guess I should be going as well. See ya.\n", "green", 4)
    } else {
      await fprint("Thanks for the offer, but I refuse.\n", "cyan")
      await fprint("I can't blame you.", "green", 1)
      await fprint("Goodbye for now. I shall see you again soon.\n", "green", 1)
      await fprint("Where are you going?", "cyan", 2)
      await fprint("...", "cyan", 3)
      await fprint("Oh, and thanks for playing through this whole thing as me. You saved me a whole lot back there.", "cyan", 2)
      await fprint("I guess I should be going as well. See ya.\n", "cyan", 4)
    }
    await pause()
    clear()
    config.sleep(2)
    await fprint("Thanks for playing Crab Simulator (2020)!\n", "yellow", 3)
    await fprint("STATS:", "white", 1)
    await fprint("Total days : " + window.days, "white", 1)
    await fprint("Experience : " + window.experience, "white", 1)
    await fprint("Overall Kindness : " + window.personality + "\n", "white", 1)
    if(window.personality > 0) {
      await fprint("Those were some pretty nice choices back there. Good job.\n", "rainbow", 3)
    } else {
      await fprint("Those weren't some pretty nice choices back there. Not cool, dude.\n", "rainbow", 3)
    }
    await fprint("Hope you liked our game. Gotta run now, bye.\n", "yellow", 1)
  } else {
    // lose game
    clear()

    await fprint("You died.\n", "red", 2, 0)
    await fprint("Ending " + window.state.slice(-2) + "\n", "green", 1, 0)
    await fprint(window.state.slice(0, -2) + "\n", "green", 1)
    await fprint("Congrats, you made it " + window.days + " " + config.dayPlural() + ".\n", "green", 2)
    await fprint("Restart day?\n", "dim")

    let answer = await choice(["Yes", "No"])

    if(answer == 1) {
      window.state = 0
      window.days--
      if(dayString == "./days/chainDays/presidentStay.js") {
        window.days--
        dayString = "./days/multiDays/presidentialCampaign/presidentialCampaign_3.js"
      } else if(dayString == "./days/chainDays/crabExamDeath.js") {
        window.days--
        dayString = "./days/crabExam.js"
      }
      queue.unshift(dayString)
      game(queue)
    } else {
      await pause()
      titleScreen()
    }
  }
}

async function intro() {
  clear()
  await fprint("Welcome!\n", "green", 1)
  await fprint("You've died tragically " + config.randomDeath() + ".\n", "red", 1.5)
  if(Math.floor(Math.random() * 4) == 0) {
    await fprint("LucKRILLy...", "green", 1)
		await fprint("haha did you get it", "dim", 0, 0.02)
  } else {
    await fprint("Luckily...", "green", 1)
  }
  await fprint("You've been reincarnated as a crab!", "green", 1)
  await fprint("There's a lot to do as a crab these days, so strap in and enjoy the ride!\n", "green", 2)
  window.days = 0
  window.experience = 0
  window.personality = 0
  window.state = 0
  game(false)
}

async function credits() {
  clear()
  await fprint("Made by Jacob Johnson and Roger Cronin\n", "green", 1)
	await fprint("Shoutout to RomeroShwarz and their 1300s Peasant Simulator for insipration\n", "green", 1)
  const span = config.createSpan("green")
  config.output.appendChild(span)
  for(let c of "Shoutout ") {
    span.innerHTML += c
    await config.sleep(0.04)
  }
  const link = document.createElement("span")
  link.classList.add("link")
  link.onclick = () => config.openLink("https://en.wikipedia.org/wiki/Crab")
  span.appendChild(link)
  for(let c of "https://en.wikipedia.org/wiki/Crab") {
    link.innerHTML += c
    await config.sleep(0.04)
  }
  await fprint("", "green", 1, 0)
	await fprint("Crab art by tre\n", "green", 1)
  await fprint("Ib and Alex for feedback and ideas\n", "green", 1)
	await fprint("A bunch of people who tested and probably don't want their names on this\n", "green", 1)
	await fprint("And you, gamer.\n", "green", 2)
  const emoji = document.createElement("img")
  emoji.draggable = false
  emoji.classList.add("emoji")
  emoji.alt = "😘"
  emoji.src = "../assets/kiss_emoji.png"
  config.output.appendChild(emoji)
  await config.sleep(3)
	titleScreen()
}

async function titleScreen() {
  ipcRenderer.send("updatePresence", "In menus")
  clear()
  const span = config.createSpan("red")
  const pre = document.createElement("pre")
  pre.innerHTML = `
/\\
( /   @ @    ()
 \\  __| |__  /
  -/   "   \\-
 /-|       |-\\
/ /-\\     /-\\ \\
 / /-\`---'-\\ \\
  /         \\

`
  span.appendChild(pre)
  config.output.appendChild(span)
  await config.sleep(2)

  await config.playAudio("./audio/movie_1.mp3")
  await config.playAudio("./audio/movie_1.mp3")

  await fprint("Welcome to Crab Simulator (2020)!\n", "yellow", 1.5)

  await fprint(config.randomGreeting(), "green")
  await fprint("Select an option pleeeaase\n", "green")

  let answer = await choice(["New Game", "Credits"])

  await fprint(config.randomAgree() + "\n", "green", 2)

  if(answer == 1) {
    intro()
  } else {
    credits()
  }
}

window.addEventListener("load", () => {
  if(window.debug) {
    game(false)
  } else {
    titleScreen()
    //game(false)
  }
})
