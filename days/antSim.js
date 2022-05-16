import { fprint, choice, output, createSpan, clear } from "../waterWorks.js"

export async function execute(queue) {
	const span = createSpan("red")
	output.appendChild(span)
	span.innerHTML += "<pre>      _,-'\\   /|   .    .    /`.                                  <br>  _,-'     \\_/_|_  |\   |`. /   `._,--===--.__                    <br> ^       _/\"/  \" \\ : \\__|_ /.   ,'    :.  :. .`-._             <br>        // ^   /7 t'\"\"    \"`-._/ ,'\\   :   :  :  .`.           <br>        Y      L/ )\\         ]],'   \\  :   :  :   : `.           <br>        |        /  `.n_n_n,','\\_    \\ ;   ;  ;   ;  _>          <br>        |__    ,'     |  \\`-'    `-.__\\_______.==---'            <br>       //  `\"\"\\       |   \\            \\                      <br>       \\|     |/      /    \\            \\                       <br>                     /     |             `.                        <br>                    /      |               ^                       <br>                   ^       |                                       <br>                           ^                                       <br><pre>"

	await fprint("WELCOME TO ANT SIMULATOR (2020) \n", "red", 3)
	await fprint("..what? \n", "cyan")
	await fprint("Welcome! \n", "green")

	const deathList = [" in an automobile accident", " due to a freak defibrillator accident", " as a Kurdish freedom fighter", " due to gluten overdose", " of cancer", " trying to pursue the American Dream", ", caught up in grimy criminal underworld of urban Wyoming", " as an ant"," in the war of 1812", " in a 'suicide'"," in the Boston Massacre", " in an electric chair", " due to the failure of your iron lung", " due to a series of miscommunincations", " in a game of Russian Roulette", " from a vodka overdose", " while playing SimAnt for the Super Nintendo", " trying to degest cellulose", " in a duel of wits", " while testing a new type of pepper spray"]
	const death = deathList[Math.floor(Math.random() * deathList.length)]

	await fprint("You've died tragically" + death+"\n", "red")
	await fprint("Luckily... \n", "red")
	await fprint("You've been reincarnated as an ant! \n", "green")
	await fprint("Wait, I thought I was a crab? What's going on? \n", "cyan")
	await fprint("So, strap in an enjoy the ride.\n", "white")
	await fprint("There's a lot to do as an ant these days! \n", "white")
	clear()
	await fprint("DAY 1\n", "white", 1, 0)
	await fprint("A visibly old male crab approaches you out of the shadows.\n", "dim", 1)
	await fprint("Ey, you, kid.", "yellow", 0.5, 0.06)
	await fprint("You new here or somethin?\n", "yellow", 0.5, 0.06)

	await fprint("Hey! We've met before, I'm pretty sure.\n", "cyan")

	await fprint("I don't know what you mean me boy, I've never seen you around here before.\n", "yellow")

	await fprint("Yeah, I'm not sure, but I think you were a crab? I was a crab too, it was this whole crab society thing.\n", "cyan")

	await fprint("I've been a proud ant for the last 3 years, what do you mean I was a crab?!\n", "yellow")

	await fprint("I'm not sure, I've recently reincarnated as a crab, but apparently I died and came back as an ant?", "cyan")
	await fprint("What's Ant Simulator?\n", "cyan")

	await fprint("...  ... Ant Simulator?\n", "yellow")

	await fprint("Yeah, when I woke up I saw this weird title sequence for something called \"Ant Simulator.\"", "cyan")
	await fprint("Is that what this place is called or something?\n", "cyan")

	await fprint("Ant... ..Simulator? I-I've gotta go see my kids, I'll catch you l-later I guess.", "yellow")

	await fprint("Huh, wonder what's wrong with him.", "green")

	await fprint("Inflict existential crisis + 1", "rainbow")
	await fprint("New life + 1", "rainbow")
	await fprint("Experience + 1", "rainbow")


	return queue
}
