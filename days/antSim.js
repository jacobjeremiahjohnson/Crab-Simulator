import { fprint, choice, output, createSpan, clear, pause } from "../waterWorks.js"

export async function execute(queue) {

	await fprint("Damn, all these leaves in the gutter, gotta clean it out.", "cyan")
	await fprint("..Oh? What's this?\n", "cyan")

	await fprint("In the midst of the leaves, you find a retro Game Koi catridge.\n", "dim")

	await fprint("Ant Simulator?? I've never heard of that.\n", "cyan")

	await fprint("Quickly, you grab your old Game Koi Color and plug it in.\n", "green")

	const antSimDiv = document.createElement("div")
	antSimDiv.setAttribute("name", "antSimDiv")
	antSimDiv.style.cssText = `
		position: absolute;
		width: 800px;
		height: 450px;
		background-color: #1c2333;
		margin: auto;
		top: 65px;
		padding-top: 55px;
		background-image: url(../assets/gamekoiborder.png);
	`

	const antSim = document.createElement("div")
	antSimDiv.appendChild(antSim)

	await pause()

	output.appendChild(antSimDiv)


	await fprint({
		string: "WELCOME TO ANT SIMULATOR (2020) \n",
		color: "red",
		wait: 3,
		destination: antSim
	})

	await fprint({
		string: "Welcome!\n",
		color: "green",
		destination: antSim
	})

	const deathList = [" in an automobile accident", " due to a freak defibrillator accident", " as a Kurdish freedom fighter", " due to gluten overdose", " of cancer", " trying to pursue the American Dream", ", caught up in grimy criminal underworld of urban Wyoming", " as an ant"," in the war of 1812", " in a 'suicide'"," in the Boston Massacre", " in an electric chair", " due to the failure of your iron lung", " due to a series of miscommunincations", " in a game of Russian Roulette", " from a vodka overdose", " while playing SimAnt for the Super Nintendo", " trying to degest cellulose", " in a duel of wits", " while testing a new type of pepper spray"]
	const death = deathList[Math.floor(Math.random() * deathList.length)]

	await fprint({
		string: "You've died tragically" + death + "\n",
		color: "red",
		destination: antSim
	})

	await fprint({
		string: "Luckily... \n",
		color: "red",
		destination: antSim
	})
	await fprint({
		string: "You've been reincarnated as an ant! \n",
		color: "red",
		destination: antSim
	})
	await fprint({
		string: "So, strap in an enjoy the ride.\n",
		color: "white",
		destination: antSim
	})
	await fprint({
		string: "There's a lot to do as an ant these days! \n",
		color: "white",
		destination: antSim
	})

	antSim.innerHTML = ""

	await fprint({
		string: "DAY 1\n",
		color: "white",
		destination: antSim
	})

	await fprint({
		string: "Two younger male ants corner you on your way out of the hill",
		color: "dim",
		destination: antSim
	})

	await fprint({
		string: "(The ant hill, that is)\n\n",
		color: "dim",
		destination: antSim
	})
	await fprint({
		string: "Hey, look what we have here...\n",
		color: "yellow",
		wait: 3,
		destination: antSim
	})
	await fprint({
		string: "Says one of the ants\n",
		color: "dim",
		destination: antSim
	})
	await fprint({
		string: "Fresh meat, heheh\n\n",
		color: "dim",
		destination: antSim
	})
	await fprint({
		string: "[1] Hey, step off [2] Ants are meat?\n\n",
		color: "yellow",
		isChoice: true,
		destination: antSim
	})
	await fprint({
		string: "YSays one of the ants\n",
		color: "dim",
		destination: antSim
	})

	document.body.style = null
}
