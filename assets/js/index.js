// Word list
var wordsAll = [
    "bad",
    "bag",
    "ban",
    "bar",
    "bat",
    "bay",
    "bed",
    "beg",
    "bet",
    "bib",
    "bid",
    "big",
    "bin",
    "bit",
    "bob",
    "bop",
    "bot",
    "bow",
    "box",
    "boy",
    "bud",
    "bug",
    "bum",
    "bun",
    "bus",
    "but",
    "buy",
    "cab",
    "cam",
    "can",
    "cap",
    "car",
    "cat",
    "caw",
    "cay",
    "cob",
    "cod",
    "cog",
    "con",
    "cop",
    "cot",
    "cow",
    "coy",
    "cub",
    "cup",
    "cut",
    "dab",
    "dad",
    "day",
    "den",
    "dew",
    "did",
    "dig",
    "dim",
    "dip",
    "doc",
    "dog",
    "dot",
    "dub",
    "dud",
    "dug",
    "duh",
    "fad",
    "fan",
    "far",
    "fat",
    "fed",
    "few",
    "fib",
    "fig",
    "fin",
    "fir",
    "fit",
    "fix",
    "fog",
    "for",
    "fox",
    "fug",
    "fun",
    "fur",
    "gal",
    "gap",
    "gar",
    "gas",
    "gel",
    "gem",
    "get",
    "gig",
    "god",
    "got",
    "gum",
    "gun",
    "gut",
    "guy",
    "had",
    "ham",
    "has",
    "hat",
    "hay",
    "hem",
    "hen",
    "her",
    "hew",
    "hey",
    "hid",
    "him",
    "hip",
    "his",
    "hit",
    "hog",
    "hop",
    "hot",
    "how",
    "hub",
    "hug",
    "huh",
    "hum",
    "hut",
    "jab",
    "jam",
    "jar",
    "jaw",
    "jay",
    "jet",
    "job",
    "jog",
    "jot",
    "joy",
    "jug",
    "jut",
    "key",
    "kid",
    "kit",
    "lab",
    "lad",
    "lag",
    "lap",
    "law",
    "lay",
    "leg",
    "let",
    "lid",
    "lip",
    "lit",
    "lob",
    "log",
    "lot",
    "low",
    "lug",
    "mad",
    "man",
    "map",
    "mat",
    "max",
    "may",
    "men",
    "met",
    "mic",
    "mid",
    "mix",
    "mob",
    "mom",
    "mop",
    "mow",
    "mud",
    "mug",
    "nab",
    "nag",
    "nah",
    "nap",
    "nay",
    "net",
    "new",
    "nip",
    "nod",
    "nog",
    "nor",
    "not",
    "now",
    "nut",
    "pad",
    "pal",
    "pan",
    "par",
    "pat",
    "paw",
    "pay",
    "peg",
    "pen",
    "pep",
    "per",
    "pet",
    "pic",
    "pig",
    "pin",
    "pit",
    "pod",
    "pop",
    "pot",
    "pug",
    "pun",
    "pup",
    "put",
    "rad",
    "rag",
    "ram",
    "ran",
    "rap",
    "rat",
    "raw",
    "ray",
    "red",
    "rib",
    "rid",
    "rig",
    "rim",
    "rip",
    "rob",
    "rod",
    "rot",
    "row",
    "rub",
    "rug",
    "run",
    "rut",
    "sad",
    "sag",
    "sap",
    "sat",
    "saw",
    "sax",
    "say",
    "set",
    "sew",
    "sip",
    "sir",
    "sis",
    "sit",
    "six",
    "sob",
    "son",
    "sub",
    "sud",
    "sum",
    "sun",
    "tab",
    "tad",
    "tag",
    "tan",
    "tap",
    "tar",
    "tax",
    "ten",
    "tin",
    "tip",
    "tom",
    "ton",
    "top",
    "tot",
    "tow",
    "toy",
    "tub",
    "tug",
    "tum",
    "van",
    "vet",
    "vow",
    "wag",
    "war",
    "was",
    "wax",
    "way",
    "web",
    "wed",
    "wet",
    "wig",
    "win",
    "wit",
    "won",
    "wow",
    "yak",
    "yam",
    "yap",
    "yep",
    "yes",
    "yet",
    "yum",
    "yup",
    "zap",
    "zip",
];

// General variables
var wordID, word;
var guesses;
var statistics;

var gameState;
const GAME_STATES = {
    ACTIVE: 0,
    MENU: 1,
    DONE: 2,
}

var tiles, buttons;

// Setup
window.onload = function() {
    // Get word
    wordID = Math.floor(Math.random() * wordsAll.length);
    word = wordsAll[wordID];
    document.querySelector("#banner h2").textContent = "#" + wordID.toString();

    // Start with an empty guess
    guesses = [""];

    // Make buttons clickable
    buttons = document.getElementsByTagName("button");
    for (button of buttons) {
        button.onclick = keyEvent;
    }
    window.onkeydown = keyboardEvent;
    document.querySelector("#share").onclick = shareResults;
    document.querySelector("#menu-close").onclick = function() { menuOpen(false); }
    document.querySelector("#menu-open").onclick = menuOpen;

    // Get window size
    windowSize();
    window.onresize = windowSize;

    // Get tiles
    tiles = document.getElementsByClassName("tile");

    // Get statistics
    statsLoad();
    statsUpdate();

    // Start game
    gameState = GAME_STATES.ACTIVE;
    
};

// Guess checker
function checkGuess() {
    // Get guess
    let guessCount = guesses.length-1;
    let guess = guesses[guessCount];

    // Check if word exists
    if (!wordsAll.includes(guess)) {
        popupAlert("Word not in list");
        return;
    }

    for (let i = 0; i < 3; i++) {
        // Get letters of word and guess
        var keyWord = word[i];
        var keyGuess = guess[i];

        tiles[guessCount*3+i].classList.remove("empty");
        var tag = "incorrect"; // Default is incorrect 
        if (keyWord == keyGuess) tag = "correct"; // Correct letter
        else {
            // Find if letter in word, but in wrong place
            for (j = 0; j < 3; j++) {
                if (word[j] == keyGuess && word[j] != guess[j]) tag = "wrong-place";
            }
        }

        // Update keyboard and tile colors
        for (button of buttons) { if (button.textContent == keyGuess) button.classList.add(tag); }
        tiles[guessCount*3+i].classList.add(tag);
    }

    // Game won
    if (word == guess) {
        popupAlert("You did it!");
        gameState |= GAME_STATES.DONE;
        statsSave();
        setTimeout(menuOpen, 3000);
        return;
    }

    // Game lost
    if (guesses.length == 6) {
        guesses.push("");
        popupAlert(word.toUpperCase());
        gameState |= GAME_STATES.DONE;
        statsSave();
        setTimeout(menuOpen, 3000);
        return;
    }

    // New guess
    guesses.push("");
}

function menuOpen(open=true) {
    let menu = document.getElementById("menu");
    if (open) { 
        menu.classList.remove("menu-closed"); 
        gameState |= GAME_STATES.MENU;
    } else { 
        menu.classList.add("menu-closed");
        gameState &= ~GAME_STATES.MENU;
    }
}

// Letter processer
function keyEvent(key) {
    if (gameState != GAME_STATES.ACTIVE) { return; }// Do nothing if game is done

    if (typeof key !== "string") key = this.textContent; // Get key pressed
    let guess = guesses[guesses.length-1]; // Get current guess
    switch (key) {
        // Backspace
        case "⌫":
            guesses[guesses.length-1] = guess.slice(0, -1);
            break;
        // Enter
        case "enter":
            if (guess.length == 3) checkGuess();
            else popupAlert("Not enough letters");
            break;
        // All other letters
        default:
            if (guess.length < 3) guesses[guesses.length-1] += key;
            break;
    }
    updateBoard();
}

// Update tile letters
function updateBoard() {
    for (tile of tiles) tile.textContent = "";

    for (let i = 0; i < guesses.length; i++) {
        let guess = guesses[i];
        for (let j = 0; j < guess.length; j++) {
            tiles[i*3+j].textContent = guess[j];
        }
    }
}

// Get window size
function windowSize() {
    let height = document.documentElement.clientHeight;
    let width = document.documentElement.clientWidth;
    document.documentElement.style.setProperty("font-size", Math.min(height*0.01, width*0.02).toString() + "px");
}

// Creates a popup
function popupAlert(text) {
    let div = document.getElementById("popup");
    if (div) { div.remove(); }
    div = document.createElement("div");
    div.id = "popup";
    div.textContent = text;
    div.style.animation = "popup 3s ease";
    document.body.appendChild(div);
}

// Keyboard functionality
function keyboardEvent(e) {
    if (gameState != GAME_STATES.ACTIVE) { return; } // Return if game not active

    // Pass key to button handler
    let key;
    if (e.keyCode == 8) key = "⌫";
    else if (e.keyCode == 13) key = "enter";
    else if (e.keyCode >= 65 && e.keyCode < 91) key = e.key.toLowerCase();
    if (key !== undefined) keyEvent(key);
}

// Get and copy results
function shareResults() {
    if (!(gameState & GAME_STATES.DONE)) { popupAlert("Game not finished"); return; }
    if (!navigator.clipboard) { popupAlert("Sharing not supported"); return; }

    let txt = "";
    txt += "Thirdle #" + wordID.toString() + " ";
    txt += (guesses.length > 6 ? "X" : (guesses.length).toString()) + "/6\n";

    let i = 0;
    for (let tile of tiles) {
        if (tile.classList.contains("incorrect")) { txt += "⬛"; }
        else if (tile.classList.contains("wrong-place")) { txt += "🟨"; }
        else if (tile.classList.contains("correct")) { txt += "🟩"; }
        else { break; }
        if (i % 3 == 2) { txt += "\n"; }
        i ++;
    }

    txt += "https://apathyhill.github.io/Thirdle/";

    navigator.clipboard.writeText(txt).then(function() {
        popupAlert("Results copied to clipboard");
    }, function(){
        popupAlert("Error sharing results");
    });
}

function statsLoad() {
    statistics = localStorage.getItem("statistics");
    if (statistics == null) {
        statistics = {
            gamesPlayed: 0,
            gamesWon: 0,
            chart: [0, 0, 0, 0, 0, 0, 0],
            streakCurrent: 0,
            streakMax: 0,
        };
    } else {
        statistics = JSON.parse(statistics);
    }
    console.log(statistics)
}

function statsSave() {
    if (!statistics === "object") { return; }
    
    statistics.gamesPlayed += 1;
    if (guesses.length <= 6) {
        statistics.gamesWon += 1;
        statistics.streakCurrent += 1;
        statistics.chart[guesses.length] += 1;
    }

    statistics.streakMax = Math.max(statistics.streakCurrent, statistics.streakMax);
    
    if (guesses.length > 6) {
        statistics.chart[0] += 1;
        statistics.streakCurrent = 0;
    }

    localStorage.setItem("statistics", JSON.stringify(statistics));

    statsUpdate();
}

function statsUpdate() {
    document.querySelector("#stat-plays h2").innerText = statistics.gamesPlayed;
    document.querySelector("#stat-wins h2").innerText = statistics.gamesWon;

    let percentage = statistics.gamesPlayed == 0 ? 0 : Math.floor(statistics.gamesWon/statistics.gamesPlayed*100);
    document.querySelector("#stat-percent h2").innerText = percentage.toString() + "%";

    let i = 1;
    for (bar of document.getElementsByClassName("chart-bar-filled")) {
        bar.style = "width: max(4rem, calc(25rem * " + (statistics.chart[i]/statistics.gamesWon).toString() + "))";
        bar.innerText = statistics.chart[i];
        i ++;
    }
}