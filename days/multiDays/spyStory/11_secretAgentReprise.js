import { fprint, choice, clear, pause } from "/waterWorks.js"
import * as config from "/waterWorks.js"

export async function execute(queue){
    await fprint("You're chilling at your house watching Squid Games on Netflix when your phone rings.\n", "dim", 1)
    await fprint("RIIiiiiING. ring. rninrginririgng.\n", "red", 1)
    await fprint("You pick up the phone.\n", "dim")
    await fprint("Yeah whadya w-\n", "cyan", 0)
    await fprint("Hey, uh. I just wanted to apologize.\n", "yellow", 1)
    await fprint("...", "cyan", 1)
    await fprint("Who's this?\n", "cyan", 1)
		await fprint("That secret agent you beat up a while ago. Twice.\n", "yellow")
		await fprint("Ah, right.\n", "cyan")
		await fprint("You turned my life around. After I left the Organization I got a real job at the sanitation facility. I met the love of my life who I'm getting ready to marry, and we have kids around the corner. I owe everything to you.\n", "yellow", 1.5)
		await fprint("I.. I don't know what to say.\n", "cyan", 1)
		await fprint("Let this take care of your worries. Good luck out there.\n", "yellow")
		await fprint("Click.\n", "red", 1)
		await fprint("You get a new Cash App notification: Secret Agent payed you $10.\n", "dim")
		await fprint("Cheap ass mf\n", "cyan", 1)

    await fprint("Experience + 1\n", "rainbow", 2)
    window.experience++
		window.rpg.money += 10
		queue.unshift("./days/multiDays/spyStory/12_bakeSale.js")
		queue = config.shuffleArray(queue)
    return queue
}
