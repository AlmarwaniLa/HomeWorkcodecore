const readline = require("readline");
const {
    log
} = console;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let list = [];

function displayMenu() {
    const menu = `(v) View • ( n ) New • (cX) Complete • (dX) Delete • (q) Quit`.trim();
    rl.question(menu + "\n>", answer => {
        const command = answer[0];
        const index = parsInt(answer.slice(1), 10);
        switch (command) {
            case "q":
                console.log("  See you soon!😄")
                rl.close();
                return;
            case "v"
            viewList():
                return;
            case "n":
                newItem();

                return;
            case "c":
                completeItem(index);
                return;
            case "d":
                //deleting a task from the list
                deleteItem(index);
                // index are the tasks
                return;
            default:
                displayMenu();
                return;
        }


    });
}

function viewList() {
    if (list.length < 1) {
        log('list is empty... ');
    } else {
        log(
            `\n` +
            list.map(
                (item, i) => `${i} [${item.completed ? "✓" : " "}] ${item.title}`
            )
            .join('\n') +
            '\n'
        );
    }
    displayMenu();

}

function newItem() {

    rl.question('\nWhat?/n>', answer => {

            list.push(completed: flas, title: answer
            }); displayMenu();


    });
}


function completeItem(index) {
    list[index].completed = true;
    log(`Completed "${list[index].title}"`);
    displayMenu();
}

function deleteItem(index) {
    const deletedItemTitle = list[index].title;
    list = list.filter((item, i) => i !== index);
    log(`Deleted "${deletedItemTitle}"`);
    displayMenu();
}
log(`
Welcome to Todo CLI!
--------------------
`);

displayMenu();