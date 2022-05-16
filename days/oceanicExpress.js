import { fprint, choice } from "../waterWorks.js"

export async function execute(queue) {

	await fprint("You made it onto the train with just a few minutes to spare before departure.\n", "dim")
	await fprint("Cuba seems like a great vacation spot. I hope nothing wacky or uncharacteristic happens during this train ride.\n", "green")
	await fprint("You go to bed after making pleasant conversation with some of your passengers.\n", "dim", 2)
	await fprint("...\n", "dim", 3)
	await fprint("OW! SHIT!\n", "white", 2)
	await fprint("shut the fuck up you woke me up\n", "cyan", 1)
	await fprint("sorry\n", "white", 2)
	await fprint("...\n", "dim", 3)
	await fprint("bang bang bang bang\n", "red", 1)
	await fprint("who's making that noise at 4 in the fucking morning\n", "cyan", 2)
	await fprint("...\n", "dim", 3)
	await fprint("We apologize for the inconvenience. The train has been suck in a whirlpool and will not be able to continue for up to eight hours. Thank you for your cooperation.\n", "white", 2)
	await fprint("Ugh. I guess I should wake up now.\n", "cyan", 1)

	await fprint("You step outside of your cabin to a grisly scene. Before you lays the body of a crab you had met the day previous. A crowd has gathered around, discussing the matters circling her death.\n", "dim", 1)
	await fprint("It's obviously Redd! How could it be anyone else??\n", "orange")
	await fprint("Preposterous! I could never kill Shelly!\n", "blue")
	await fprint("Hey hey hey calm down, let's wait until some kind of detective or something shows up.\n", "purple")
	await fprint("What about you? You a detective?\n", "yellow")
	let answer = await choice(["I'm Shellock Holmes", "I'm Hercule Porpoise", "I'm Dungeness Gumshoe"])
	await fprint("I'm the famous detective " + (answer == 1 ? "Shellock Holmes" : answer == 2 ? "Hercule Porpoise" : "Dungeness Gumshoe") + ", obviously.\n", "cyan")
	await fprint("Who?\n", "yellow")
	await fprint("Uhh, doesn't matter. I'm here to help though.\n", "cyan")
	await fprint("Bet. Who do you wanna interview first?\n", "yellow")

	var people = ["Yellow", "Blue", "Purple", "Orange"]

	while(true) {
		answer = await choice(people) - 1
		if(people[answer] == "Yellow") await yellow()
		else if(people[answer] == "Blue") await blue()
		else if(people[answer] == "Purple") await purple()
		else await orange()
		people.splice(answer, 1)
		if(people.length == 0) break
	}

	await fprint("I will be in my cabin sorting through these notes. Please excuse me.\n", "cyan", 1)
	await fprint("You look at your final notes on the case.\n", "dim", 1)
	await fprint(" [ Top door ] _______________ \n" +
							 " |           |   Your own    |\n" +
							 " |           |     room      |\n" +
							 " |           |_______________|\n" +
							 " |           | Swim Shady's  |\n" +
							 " |           |     room      |\n" +
							 " |           |_______________|\n" +
							 " |           | Redd Herring's|\n" +
							 " |           |     room      |\n" +
							 " |           |_______________|\n" +
							 " |           |   Clawdia's   |\n" +
							 " |           |     room      |\n" +
							 " |           |_______________|\n" +
							 " |           |  Seabastian's |\n" +
							 " |           |     room      |\n" +
							 " |           |_______________|\n" +
							 " [Bottom door]                \n", "preWhite", 3, 0)
	await fprint("There were several dents on the top door.\n" +
							 " A pen labelled \"C\" was found in Shelly's cabin.\n" +
							 " A match different from the brand Shelly normally buys was also found there.\n.", "white", 3, 0)

	await fprint("What is your verdict?\n", "green")
	await choice(["Yellow", "Blue", "Purple", "Orange"])

	await fprint("You step outside of your cabin.\n", "dim", 1)
	await fprint("Ladies, gentlemen. I would like to present to you some key facts.", "cyan")
	await fprint("The top door is dented and also has been locked since Shelly was confirmed to be alive until now. The murderer is among us right now.\n", "cyan")
	await fprint("A stifled laugh comes from the group of crabs before you.\n", "dim")
	await fprint("Additionally, I would like to announce that a pen labelled \"C\" was located in Shelly's room.", "cyan")
	await fprint("Now, how do these link Shelly's murder to any particular suspect?\n", "cyan")
	await fprint("How do we know you didn't do it?\n", "blue", 1)
	await fprint("I'm sorry, what?\n", "cyan")
	await fprint("You've presented no evidence as to why you didn't kill Shelly.\n", "blue")
	await fprint("Why would I d-\n", "cyan", 0)
	await fprint("Hey, wait! Yeah!\n", "purple")
	await fprint("I can assure that I didn't! Stop! No!\n", "cyan", 2)

	await fprint("You break a window and escape the train. The whirlpool makes you go shshwhwhshshwhs for a while, until you slowly float down in front of your apartment complex.\n", "dim", 1)
	await fprint("Cool.\n", "green", 1)

	await fprint("Mystery + 3", "rainbow", 1)
	await fprint("Experience + 1\n", "rainbow", 2)
	window.experience += 1

	return queue
}

async function yellow() {
	await fprint("Me? My name's Swim Shady.\n", "yellow")
	await fprint("Do you have any connection with Shelly?\n", "cyan")
	await fprint("Totally, we both studied at Cornell. It was siiiiiick.\n", "yellow")
	await fprint("He puts up a shaka sign.\n", "dim", 1)
	await fprint("That hand sign. Do you surf?\n", "cyan")
	await fprint("Yeeeaaah man, I love surfing. West coast, born and raised. I used to be a big shot a handful of years back.\n", "yellow")
	await fprint("I don't have anything more to ask of you at this time. Thank you for your cooperation.\n", "cyan")
	await fprint("For sure man.\n", "yellow", 1)
}

async function blue() {
	await fprint("What, are you suspecting me? Incredulous. Unbelievable.\n", "blue")
	await fprint("I'm simply interviewing everyone on the train. What's your name?\n", "cyan")
	await fprint("I'm Redd Herring.\n", "blue")
	await fprint("Do you have any connection with Shelly?\n", "cyan")
	await fprint("A.. connection? With Shelly?\n", "blue", 1)
	await fprint("His eyes glaze over as he starts chuckling to himself.\n", "dim", 1)
	await fprint("We went to the same high school. One day she asked to borrow some lunch money. Being the considerate person I am, I relented.", "blue")
	await fprint("Instead of eating at the cafeteria, I walked over to the Wawa to ask my acquaintance working there for some money.", "blue")
	await fprint("Do you want to know what happened? That Wawa was robbed. The robber shot my claw and took my wallet.", "blue")
	await fprint("My injury prevented me from going to the Water Polo state championships later that year. That cost me Cornell's Water Polo scholarship.", "blue")
	await fprint("Instead I studied at some shitty in-state school and got a middling job in sales that I've been slaving over for almost twenty years.", "blue")
	await fprint("My life ruined, all because of her. Oh, how I wish she is burning in hell right now.\n", "blue", 2)
	await fprint("Thank you for your cooperation.\n", "cyan", 1)
}

async function purple() {
	await fprint("Hi! My name is Clawdia!\n", "purple")
	await fprint("Do you have any connection with Shelly?\n", "cyan")
	await fprint("Oh, we've crossed paths in our professional lives a few times. See, I work for Micrabsoft while she works at Crabple.\n", "purple")
	await fprint("Could you elaborate a bit more on that?\n", "cyan")
	await fprint("You see, we're kind of rivals in our companies. Always trying to one-up eachother. Looks like I've finally won, haha!\n", "purple")
	await fprint("Her laugh appears a bit strained.\n", "dim", 1)
	await fprint("Well, thank you for your cooperation.\n", "cyan")
	await fprint("Oh no, thank YOU for solving this case!\n", "purple", 1)
}

async function orange() {
	await fprint("Hello. What's your name?\n", "cyan")
	await fprint("Haha, I'm Seabastian.\n", "orange")
	await fprint("Do you have any connection to Shelly?\n", "cyan")
	await fprint("Haha, yeeahh.\n", "orange", 1)
	await fprint("Could you.. explain a bit further?\n", "cyan")
	await fprint("Woaah! Hahaa..", "orange")
	await fprint("He lowers his sunglasses and does something cool with his eyebrows.\n", "dim", 1)
	await fprint("Right. Thank you for your cooperation.\n", "cyan")
	await fprint("Woo! Haha, yeah..\n", "orange", 1)
}
