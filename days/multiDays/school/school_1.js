import { fprint, choice, sleep } from "../../../waterWorks.js"
import * as config from "../../../waterWorks.js"

export async function execute(queue) {

	await fprint("The engine rumbles as the school bus drives away.\n", "dim")
	await fprint("Your first day at school! I'm so proud of you!\n", "green", 1)

	await fprint("You look down at a hastily scribbled schedule, realizing calculus is first period.\n", "dim", 2)

	await fprint("Hello class! We have a new student today. Would you please introduce yourself?\n", "yellow")

	let answer = await choice(["Crab", "Dude", "Don't have one"])

	if(answer != 3) await fprint("Don't lie, it looks bad on you.\n", "green", 1)
	await fprint("I don't actually have a name. I'm " + window.days + " " + config.dayPlural() + " old tho.\n", "cyan")
	await fprint("Ok bet\n", "yellow")
	await fprint("Unenthusiastic applause radiates through the classroom.\n", "dim", 1)
	await fprint("I hope you all studied for the calculus exam today!\n", "yellow")
	await fprint("...\n", "cyan", 1)

	let correct = 0

	await fprint("QUESTION 1. If dy/dx = x^4 - 2x^3 + 3x - 1, then d^3y/dx^3 evaluated at x = 2 is\n", "white", 5, 0)
	answer = await choice(["11", "24", "26", "Ask the narrator for help"])

	if(answer == 4) {
		await fprint("no\n", "green", 1)
		await fprint("QUESTION 1. If dy/dx = x^4 - 2x^3 + 3x - 1, then d^3y/dx^3 evaluated at x = 2 is\n", "white", 5, 0)
		answer = await choice(["11", "24", "26"])
	}
	if(answer == 2) correct++

	await fprint("QUESTION 2. The first derivate of the function f is defined by f'(x) = (x^2 + 1)sin(3x - 1) for -1.5 < x < 1.5. On which of the following intervals is the graph of f concave up?\n", "white", 5, 0)
	answer = await choice(["(-1.5, -1.341) and (-0.240, 0.964)", "(-1.341, -0.240) and (0.964, 1.5)", "(-0.714, 0.333) and (1.381, 1.5)", "(-1.5, -0.714) and (0.333, 1.381)"])
	if(answer == 1) correct++

	await fprint("QUESTION 3. Let R be the region bounded by the graphs of y = 2x and y = 4x - x^2. What is the area of R?\n", "white", 5, 0)
	answer = await choice(["2/3", "4/3", "16/3", "28/3"])
	if(answer == 2) correct++

	await fprint("Time!\n", "yellow", 1)
	if(correct == 3) {
		await fprint("The teach collects all of your papers. You get yours back with a big A+ on the front.\n", "dim")
		await fprint("Hang on I have a gif for this.\n", "green", 2)
		let img = document.createElement("img")
		img.src = "../../../assets/nerd.gif"
		config.output.appendChild(img)
		await sleep(0.5)
		await fprint("", "white", 2.5)
	} else if(correct == 2) {
		await fprint("The teach collects all of your papers. You get yours back with a C+ on the front.\n", "dim")
		await fprint("Wow you're actually bad. Like actual garbage fr.\n", "green", 1)
	} else if(correct == 1) {
		await fprint("The teach collects all of your papers. You get yours back with a D- on the front.\n", "dim")
		await fprint("Damn it's like you didn't even study.\n", "green", 1)
	} else {
		await fprint("The teach collects all of your papers. You get yours back with an F on the front.\n", "dim")
		await fprint("lmao look at this guy. YO LOOK AT THIS GUY HE'S BAD\n", "green", 1)
		await fprint("A couple of your classmates glance over, shocked at the disembodied voice emanating from above your shoulder.\n", "dim", 1)
	}

	await fprint("Grades + " + correct, "rainbow", 1)
	await fprint("Experience + 1\n", "rainbow", 2)

	window.experience++
	queue.unshift("./days/multiDays/school/school_2.js")
	return queue
}
