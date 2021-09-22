import { fprint, choice, clear, pause } from "../waterWorks.js"
import * as config from "../waterWorks.js"

export async function execute(queue) {

	await fprint("The McDolphin's PlayPlace peers out behind a glass window, its tantilizing plastic pillars glistening in the afternoon light.", "dim", 1)
	await fprint("*Crab Simulator is a work of fiction. Any resemblance to actual fast food restaurants, living or dead, is intentional, believe it or not.\n", "dim", 0.5, 0.02)

	await fprint("It would be pretty funny.\n", "green", 1)
	await fprint("yeah\n", "cyan", 2)

	await fprint("You enter the PlayPlace. The smell of socks is overwhelming.", "dim")
	await fprint("As you approach some discolored, plastic tubes, two crabs scuttle forth.\n", "dim", 1)

	await fprint("You there! I've been ordered by the imperial guards guild to prevent any traveler from entering our castle.\n", "yellow")
	await fprint("You're in a McDolph-\n", "cyan", 0)
	await fprint("Silence, lest I ring the alarm!\n", "blue")
	await fprint("You sure I can't, like, answer a riddle to get by?\n", "cyan")
	await fprint("Oh wait that would be really cool.\n", "blue", 1)

	await fprint("The two crabs huddle together with a hushed whisper.", "dim")
	await fprint("Returning to their posts, the crab to your right hands you a card.\n", "dim", 1)

	await fprint("ALERT!\n One guard tells the truth, the other tells lies.\n You may ask one question, then proceed through either the left or right tube,\n one of which leads to certain death.\n", "yellow", 1)

	await fprint("What's the deal with the card?\n", "cyan")
	await fprint("The crab to your left taps the bottom of the paper.\n", "dim")
	await fprint("If one of the guards said it out loud, then they'd be telling a truth or lie off the rip.\n", "yellow")
	await fprint("Right, right.\n", "cyan", 1)

	await choice(["Which tube leads to death?", "If I asked the other guard which tube leads to death, what would they say?", "What is the name of this restaurant?"])

	await config.sleep(1)
	await fprint("idk\n", "blue", 2)

	await choice(["Take the left tube", "Take the right tube"])

	await fprint("You climb the tube and reach the second floor of the PlayPlace, thankfully. Several crabs mill about a large hallway. At the end, a singular crab sits upon a throne made of other, smaller crabs.\n", "dim", 1)

	await fprint("What purpose do you have in my kingdom?", "yellow", 0)
	await fprint("The King Crab booms.\n", "dim", 1)

	let answer = await choice(["I'm here to slay you", "I'd like to become your vassal", "I'll protect the kingdom"])

	if(answer == 1) {
		await fprint("I think not. Executioners!\n", "yellow", 1)
	} else if(answer == 2) {
		await fprint("Hah. And what wealth can you provide to the kingdom?\n", "yellow", 1)
		await choice(["Love", "Friendship"])
		await fprint("Don't kid with me. Executioners!\n", "yellow", 1)
	} else {
		await fprint("Bro you're scrawny as fuck. Executioners!\n", "yellow", 1)
	}

	await fprint("The King Crab calls forth three crabs wearing black hoods. They corale you to the top of a long slide and push you over.\n", "dim", 1)
	await fprint("THUD THUD THUD. KSHHHHHHhhhhhh...\n", "red", 1)
	await fprint("You land in a ball pit. Around you are several other crabs, one of whom is crying. One crab approaches you, holding a thick paper book.\n", "dim", 1)

	await fprint("The Lord has called upon me to stage a revolution! No longer does the King serve the People!\n", "blue", 1)
	await fprint("You notice his book is titled \"McGraw-Hill Education Math Grade 4: Second Edition\".\n", "dim", 1)
	await fprint("Hey, opportunity. What do you want to do here?\n", "green", 1)

	answer = await choice(["I'll heed your cause", "I do not condone violence"])

	if(answer == 1) {
		await fprint("You spend the next few minutes convincing the other members of the pit to join you. After a while, you've amassed an army.\n", "dim", 1)
		await fprint("King Crab! Under your rule, the mold crop has failed, vomit has been twice as prevalent, and countless foam pads have ripped. Our Lord has called out to us, and you have lost the Mandate of Heaven. Prepare for death!\n", "cyan", 1)

		await fprint("Your army lets out a cry and charges forth.", "dim", 3)
		await fprint("After the dust settles, the King Crab is lying facedown on the ground.\n", "dim", 1)

		await fprint("Men! Let us enact our four-stage economic rebuilding plan at once!", "blue")
		await fprint("You quietly slip out of the PlayPlace and order some nuggets.\n", "dim", 1)
		await fprint("Nuggets + 6", "rainbow", 1)
	} else {
		await fprint("You are an enemy of the cause! Heed my warning!\n", "blue", 1)
		await fprint("You awkwardly shuffle out and continue down the maze of plastic walls and thread nets, chancing upon a small village of crabs.\n", "dim", 1)
		await fprint("Help us! Oh, traveler help us! Our village is dying. The mold crop has failed and we lack the food necessary to stave off winter starvation.\n", "purple")
		await fprint("Where have all your people gone?", "cyan", 0)
		await fprint("You ask, noticing the many empty buildings.\n", "dim")
		await fprint("They were sent to fight the war. Very few have returned. We don't have the manpower to function.\n", "purple")
		answer = await choice(["Volunteer", "Ravage their village and steal their riches"])
		if(answer == 1) {
			await fprint("I will aid you in these times.\n", "cyan")
			await fprint("Oh, our many thanks!\n", "purple", 1)
			await fprint("For a laborious two hours you help the villagers restore their community.\n", "dim", 2)
			await fprint("Phew, hard work.\n", "cyan", 1)
			await fprint("A crab approaches you, saying", "dim", 0)
			await fprint("We have no money to pay you, but I believe this may be of greater value. This jewel has protected our village for centuries. Its powers may be fully realized if wielded by a worthy crab.\n", "orange")
			await fprint("She drops an orange jewel threaded along a beaded necklace into your outstretched claw. You bid farewell and continue your journey forth to protect this land...\n", "dim")
			await fprint("Oh wait, my food.\n", "cyan", 1)
			await fprint("You leave the PlayPlace and order some nuggets.\n", "dim", 1)
			await fprint("Nuggets + 6", "rainbow", 1)
			await fprint("Goodness + 1", "rainbow", 1)
			window.personality++
		} else {
			await fprint("I will ravage your village and steal your riches!\n", "cyan", 1)
			await fprint("Dude... What the hell...\n", "green", 1)
			await fprint("The villagers look upon you, shocked that you would say that aloud.\n", "dim", 1)
			await fprint("Ayleth!", "purple", 0)
			await fprint("The crab calls out.\n", "dim", 1)
			await fprint("A crab wearing a vibrant robe steps forth. Holding a sword.\n", "dim", 2)
			window.state = "There's literally no reason why you would do that. You don't even have a weapon.17"
			return queue
		}
	}

  await fprint("Experience + 1\n", "rainbow", 2)
  window.experience += 1
	return queue
}
