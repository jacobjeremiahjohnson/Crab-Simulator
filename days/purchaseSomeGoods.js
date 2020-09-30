import { fprint, choice, clear, pause } from "../../waterWorks.js"
import * as config from "../../waterWorks.js"

async function execute(queue){
    await fprint("I finally made it to Walmart! Let's see what I need to buy on my list...\n", "cyan", 1)
    await fprint(" - Old bay", "dim", 1.5, 0)
    await fprint(" - Bread", "dim", 1.5, 0)
    await fprint(" - Milk\n", "dim", 1.5, 0)
    await fprint("...\n", "cyan")
    await fprint(" - Chlorine gas?\n", "dim", 1.5, 0)
    await fprint("I wonder what I should get first?\n", "cyan")

    var shoppingItems = ["Old bay", "Bread", "Milk", "Chlorine gas"]

    while (true){
        answer = choice(shoppingItems)
        if (shoppingItems[answer - 1] == "Old bay") purchaseSomeGoods_oldBay()
        else if (shoppingItems[answer - 1] == "Bread") purchaseSomeGoods_bread()
        else if (shoppingItems[answer - 1] == "Milk") purchaseSomeGoods_milk()
        else if (shoppingItems[answer - 1] == "Chlorine gas") purchaseSomeGoods_chlorineGas()
        shoppingItems.splice(answer - 1, 1)
        if (shoppingItems.length() == 0) break;
    }
    await fprint("You stare at your now empty shopping list.\n", "dim")
    await fprint("Oh, radical. I'm outta here.\n", "cyan")

    await fprint("Old Bay + 4", "rainbow", 1)
    await fprint("Bread + 1", "rainbow", 1)
    await fprint("Milk + 1", "rainbow", 1)
    await fprint("Chlorine gas + 1", "yellow", 1)
    await fprint("Wait, no, get out of the stats screen Shia LeBarnacle. Shoo.", "rainbow", 1)
    await fprint("Uhh, also experience + 1\n", "rainbow", 2)

    return queue
}
