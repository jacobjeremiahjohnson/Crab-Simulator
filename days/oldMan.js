import { fprint, choice, clear, pause } from "../../waterWorks.js"

export async function execute(queue) {
	await fprint("A visibly old male crab approaches you out of the shadows.\n", "dim", 1)
  await fprint("Ey, you, kid.", "yellow", 0.5, 0.06)
	await pause()
  await fprint("You new here or somethin?\n", "yellow", 0.5, 0.06)
	let answer = await choice(["Yes", "No"])
  if(answer == 1) {
    await fprint("Uh yeah, actually. I was reincarnated here 1 day ago.\n", "cyan")
    await fprint("Oh, dip. Well I hope I see ya around, kid. Good luck out there.\n", "yellow", 0.5, 0.06)
    await fprint("Honesty be kinda quirky tho. Lowkey cool ig.\n", "green")
    await fprint("Coolness + 1", "rainbow", 1)
    await fprint("Goodness + 1", "rainbow", 1)
		window.personality++
  } else {
    await fprint("Nah, I've been here a while now.\n", "cyan")
    await fprint("Oh, word. Well I hope I see ya around, kid. Good luck out there.\n", "yellow", 0.5, 0.06)
    await fprint("Woah, lies and deciet? That's pretty cool.\n", "green")
    await fprint("Coolness + 1000", "rainbow", 1)
		clear()
    await fprint("Badness + 1", "rainbow", 1)
		window.personality--
  }
  await fprint("Experience + 1\n", "rainbow", 2)
	window.experience++
	return
}
