const fs = require("fs");
const readline = require("readline");

// Alias 'console.log' to 'log', because we'll be calling it often
// const log = console.log;
const { log } = console;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let [, , filePath] = process.argv;

// Begin with an empty array that represents the list of todo items
let list = [];

// display menu
function displayMenu() {
    const menu = `(v) View • (n) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit`.trim();

    rl.question(menu + "\n>", (answer) => {
        const command = answer[0];
        const index = parseInt(answer.slice(1), 10);

        switch (command) {
            case "q":
                log("See you soon! 😄");
                rl.close();
                return;
            case "v":
                // we will show the list of todos
                viewList();
                return;
            case "n":
                // ask the user for their new task and push it to the list above
                newItem();
                return;
            case "c":
                // we are setting a task to be completed
                completeItem(index);
                return;
            case "s":
                saveFile();
                return;
            case "d":
                // deleting a task from the list
                deleteItem(index);
                return;
            default:
                displayMenu();
                return;
        }
    });
}

// Viewing the list
function viewList() {
    if (list.length < 1) {
        log(`
        List is empty... 
     `);
    } else {
        log(
            `\n` +
            list
            .map(
                (item, i) => `${i} [${item.completed ? "✓" : " "}] ${item.title}`
            )
            .join(`\n`) +
            `\n`
        );
    }
    displayMenu();
}

// Adding a new item to the list
function newItem() {
    rl.question(`\nWhat?\n>`, (answer) => {
        list.push({ completed: false, title: answer });
        displayMenu();
    });
}

// setting an item to complete
function completeItem(index) {
    list[index].completed = true;
    log(`Completed "${list[index].title}"`);
    displayMenu();
}

// Deleting an item from the list
function deleteItem(index) {
    const deletedItemTitle = list[index].title;
    list = list.filter((item, i) => i !== index);
    log(`Deleted "${deletedItemTitle}"`);
    displayMenu();
}

// Stretch Edit
function saveFile() {
    rl.question(`\nWhere?${filePath ? `(${filePath})` : ``}\n>`, (answer) => {
    if (answer.slice(-4).toLowerCase() === "json") {
      filePath = answer;
    }

    // Use the method `JSON.stringify` to take a JavaScript data
    // structure and convert to a string in JSON format
    fs.writeFile(filePath, JSON.stringify(list), () => {
      log(`
            List saved to "${filePath}"
        `);
      displayMenu();
    });
  });
}

function loadFile(filePath, cb) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) throw err;

    // Use the `JSON.parse` method to transform a string formatted
    // JSON into a JavaScript data structure.
    list = JSON.parse(data);

    // To do something only after the file is loaded, we have to
    // use a callback.
    if (typeof cb === "function") {
      cb();
    }
  });
}

// Only load file if file path is given
if (filePath) {
  loadFile(filePath, () => {
    log(`
        Welcome to Todo CLI!
        --------------------
    `);
    displayMenu();
  });
} else {
  log(`
    Welcome to Todo CLI!
    --------------------
    `);

  displayMenu();
}