import { fprint, choice, clear, pause } from "../../../waterWorks.js"
import * as config from "../../../waterWorks.js"

export async function execute(queue) {

  await fprint("You're staked outside a local fast food location in an effort to analyze the inner workings of a successful restaurant.\n", "dim", 1)
  await fprint("The manager talks to the cashier, who then signals for the line cook to come talk to him.", "dim")
  await fprint("The line cook glances outside the glass window and starts walking towards the door.\n", "dim", 1)
  await fprint("He comes out of the restaurant headed straight for the bush you're hiding in and says", "dim", 0)
  await fprint("Hey, dude, fuck off, you've been hiding in these bushes since 5 in the morning. I'm calling the police.\n", "yellow")

  let answer = await choice(["You've got a misunderstanding", "Do it", "Wanna work for my restaurant?"])

	if(answer == 1) {
		await fprint("No no no you've got some kind of misunderstanding, you see, I'm starting a restaurant and need to figure out what to do, so I'm stalking yours.\n", "cyan")
		await fprint("Huh. Good luck with that.\n", "yellow")
		await fprint("Thanks.\n", "cyan")
		await fprint("You spend the rest of the day writing in your journal about waiter rotations, cashier timing, and how to operate the coffee machine.\n", "dim", 1)

		await fprint("Strange looks from pedestrians + 7", "rainbow", 1)
		await fprint("Awkward explanations + 3", "rainbow", 1)
		await fprint("Experience + 1\n", "rainbow", 2)
		window.experience++
		queue.unshift("./days/multiDays/restaurant/restaurant_3.js")
	} else if(answer == 2){
		await fprint("Do it. No balls.\n", "cyan", 2)
		window.state = "The police were called and you were charged with stalking, disturbing the peace, perjury, and crabslaughter. Were you framed? You'll never know because you choked on the slushie you brought into the police car.15"
	} else {
		await fprint("You wanna work at my restaurant?\n", "cyan", 1)
		await fprint("How much does it pay?\n", "yellow", 1)
		await fprint("The station chef finishes his shift and spends the rest of the day helping you set up your restaurant.\n", "dim", 1)

		window.message = "chef_agree"

		await fprint("Experience running a restaurant + 1", "rainbow", 1)
		await fprint("Regular experience + 1\n", "rainbow", 2)
	  window.experience++
	  queue.unshift("./days/multiDays/restaurant/restaurant_3.js")
	}
  return queue
}
