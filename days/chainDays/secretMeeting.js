import { fprint, choice } from "../../waterWorks.js"
import * as config from "../../waterWorks.js"

export async function execute(queue) {

  await fprint("You receive an anonymous invitation on Snapchat to a secret meeting later tonight.\n", "dim", 1)
  await fprint("Weird. Should I even go to this?\n", "cyan")

  let answer = await choice(["Yes", "No"])
  if(answer == 1) {
    window.personality++
    await meeting()
  } else {
    window.personality--
    await fprint("Why not? What else are you going to do, wait for the next day to come along?\n", "green")
    await fprint("Idk, it just seems kind of dangerous.\n", "cyan")
    await fprint("So what? You're a crab! What do you have to lose?\n", "green")

    answer = await choice(["Fine, I'll go", "No, let me be"])

    if(answer == 1) {
      await fprint("Dope.\n", "green", 1)
      await meeting()
    } else {
      await fprint("Nope, no. You don't get a say in this.\n", "green")
      await fprint("Wait, wha-", "cyan", 0)
      config.clear()
      await meeting()
    }
  }

	return queue
}

async function meeting() {
  await fprint("Later that night you go to that indiscriminate place at the indiscriminate time.\n", "dim", 1)
  await fprint("Surrounding a small fire are 10 hooded crabs.", "dim")
  await fprint("You hold up your phone.\n", "dim", 0)
  await fprint("I was told there would be a secret meeting here?\n", "cyan")
  await fprint("What does this look like dumbass.\n", "yellow")
  await fprint("Right, right. So, what is this for?\n", "cyan")
  await fprint("We have reason to believe that you, like us, had a past, non-crab life.\n", "yellow")
  let answer = await choice(["Oh shit, yeah that's me", "Yeah, no idea what you're talking about"])
  if(answer == 1) {
    await fprint("Holy shit, yes, that's me, you guys were reincarnated too??\n", "cyan")
    await fprint("So it is as we feared. \"[REDACTED]\" \"[REDACTED]\", I'm sorry for what we have to do.\n", "yellow")
    await fprint("What? What do you mean?\n", "cyan")
    await fprint("Common mental illness in Chesapeake Bay crabs. They can't cope with the work required so they conjure up memories of a fake past life. Truly, it's better this way.\n", "yellow", 2)
    window.state = "While you were contemplating your reality one of the hooded crabs pushed you into the small fire. You should really pay more atention next time.14"
  } else {
    await fprint("What? No, really don't know what you're talking about.\n", "cyan")
    await fprint("Oh, that's a relief. Uhh, make sure you don't tell anyone about this, then.\n", "yellow")
    await fprint("Wait, so some people actually think they had a past life?\n", "cyan")
    await fprint("Don't worry about it.\n", "yellow")
    await fprint("Weird.\n", "cyan")
    await fprint("Suspicion + 5", "rainbow", 1)
    await fprint("Experience + 1\n", "rainbow", 2)
    window.experience++
  }
}
