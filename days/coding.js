import { fprint, choice } from "../waterWorks.js"
import * as config from "../waterWorks.js"

export async function execute(queue) {

	alert(`Uncaught (in promise) ReferenceError: depression.js:0
at Module.execute (depression.js:0)
at game (script.js:24)`)

	await config.sleep(1.5)

	/*
	await fprint(`Uncaught (in promise) ReferenceError: depression.js:0
    at Module.execute (depression.js:0)
    at game (script.js:24)`, "red", 1)
	*/

	/*
	alert(`Uncaught (in promise) ReferenceError: depression.js:0
    at Module.execute (depression.js:0)
    at game (script.js:24)`)
	*/

	const span = document.createElement("span")
	//const span = createSpan("white")
	span.classList.add("choice")
	span.classList.add("white")
	span.innerHTML = `&nbsp;1: import { fprint, choice, clear, pause } from "../waterWorks.js"<br>
&nbsp;2: import * as config from "../waterWorks.js"<br>
&nbsp;3:<br>
&nbsp;4: export async function execute(queue) {<br>
&nbsp;5: &emsp;await fprint("Fuck. Being a crab sucks. Everything is made out of sand, the only thing to eat is seafood, and everything smells like ocean water.", "cyan", 1)<br>
&nbsp;6: &emsp;await fprint("If I got here by dying, then maybe that's how I can get out!\\n", "cyan")<br>
&nbsp;7:<br>
&nbsp;8: &emsp;await print("I mean, sure. Crab suicide?\\n", "green")<br>
&nbsp;9:<br>
10: &emsp;let answer = await choice(['Yeah', 'Nah'])<br>
11:<br>
12: &emsp;if(answer == 1) {<br>
13: &emsp;&emsp;await fprint(("Let's do this thing.\\n", "cyan", 2))<br>
14: &emsp;&emsp;window.state = "I mean, you died. You committed suicide after you couldn't deal with your new crab life. Good job?01"<br>
15: &emsp;} else {<br>
16: &emsp;&emsp;await fprint("Actually nevermind. I don't feel like it.\\n", "cyan")<br>
17: &emsp;&emsp;await fprint("Cool cool. Glad you didn't?\\n", "green")<br>
18: &emsp;&emsp;await fprint("Depression - 5", "rainbow", 1)<br>
19: &emsp;&emsp;await fprint("Goodness + 1", "rainbow", 1)<br>
20: &emsp;&emsp;await fprint("Experience + 1\\n", "rainbow", 2)<br>
21: &emsp;&emsp;window.experience += 1;<br>
22: &emsp;&emsp;window.personality += 1;<br>
23: &emsp;}<br>
24: &emsp;return queue<br>
25: }<br>`

	output.appendChild(span)
	await config.sleep(1.5)
	await fprint("", "white", 0)
	await fprint("Minigame! How do you fix this error?\n", "green", 1)
	let answer = await choice(["Line 2: replace * with #", "Line 8: replace print with fprint", "Line 13: remove second set of parentheses", "Line 21, 22: remove semicolons"])

	await fprint("Is that your final answer?\n", "green", 1)
	await choice(["Yes", "Yes"])
	await fprint("Alright, lemme just press F5 and...\n", "green", 2)

	if(answer != 2) {
		window.state = "You just made it worse, dummy. You're for sure failing your computer science final.16"
	} else {
		await config.pause()
  	await config.sleep(1.5)
		await fprint("", "white", 0)
		await fprint("...", "green")
		await fprint("Nice.\n", "green", 1)

		await fprint("Computer knowledge + 1", "rainbow", 1)
  	await fprint("Experience + 1\n", "rainbow", 2)
  	window.experience++

	}
	return queue
}
