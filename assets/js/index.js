// Word list
var words = [
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
var wordNumber = Math.floor(Math.random() * words.length);
var word = words[wordNumber];
guesses = [""];

// Activate keyboard
var buttons = document.getElementsByTagName("button");
document.addEventListener("DOMContentLoaded", function(event) {
    for (button of buttons) {
        button.onclick = buttonEvent;
    };

    // Show current number
    document.getElementsByTagName("h2")[0].textContent = "#" + wordNumber.toString();

    // Get browser height;
    resize()
});
var input = true;

// Letter enterer
function buttonEvent(key) {
    if (!input) return; // do nothing if game is done

    if (typeof key !== 'string') key = this.textContent; // Get key pressed
    let guess = guesses[guesses.length-1]; // Get current guess
    switch (key) {
        // Backspace
        case "⌫":
            guesses[guesses.length-1] = guess.slice(0, -1);
            break;
        // Enter
        case "enter":
            if (guess.length == 3) checkGuess();
            else popUp("Not enough letters");
            break;
        // All other letters
        default:
            if (guess.length < 3) guesses[guesses.length-1] += key;
            break;
    }
    updateBoard();
}

// Update tile letters
var tiles = document.getElementsByClassName("tile");
function updateBoard() {
    for (tile of tiles) tile.textContent = "";

    for (let i = 0; i < guesses.length; i++) {
        let guess = guesses[i];
        for (let j = 0; j < guess.length; j++) {
            tiles[i*3+j].textContent = guess[j];
        }
    }
}

function checkGuess() {
    // Get guess
    let guessCount = guesses.length-1;
    let guess = guesses[guessCount];

    // Check if word exists
    if (!words.includes(guess)) {
        popUp("Word not in list");
        return;
    }

    for (let i = 0; i < 3; i++) {
        // Get letters of word and guess
        var keyWord = word[i];
        var keyGuess = guess[i];

        tiles[guessCount*3+i].classList.remove("empty");
        var tag = "incorrect"; // default is incorrect 
        if (keyWord == keyGuess) tag = "correct"; // correct letter
        else {
            // find if letter in word, but in wrong place
            for (j = 0; j < 3; j++) {
                if (word[j] == keyGuess && word[j] != guess[j]) tag = "wrong-place";
            }
        }

        // Update keyboard and tile colors
        for (button of buttons) { if (button.textContent == keyGuess) button.classList.add(tag); }
        tiles[guessCount*3+i].classList.add(tag);
    }

    if (word == guess) {
        popUp("You did it!");
        input = false;
        return;
    }

    if (guesses.length == 6) {
        // game lost
        popUp(word.toUpperCase());
        input = false;
    }
    // new guess
    guesses.push("");
}

function popUp(text) {
    let div = document.getElementById("popup");
    if (div) div.remove();
    div = document.createElement("div");
    div.id = "popup";
    div.textContent = text;
    div.style.animation = "popup 2s ease";
    document.body.appendChild(div);
}

// Keyboard support
function type(e) {
    if (!input) return;

    let key;
    if (e.keyCode == 8) key = "⌫";
    else if (e.keyCode == 13) key = "enter";
    else if (e.keyCode >= 65 && e.keyCode < 91) key = e.key.toLowerCase();
    
    if (key !== undefined) buttonEvent(key);
}

window.addEventListener("keydown", type);

window.onresize = resize;
function resize() {
    let height = document.documentElement.clientHeight;
    let width = document.documentElement.clientWidth;
    console.log(height);
    document.documentElement.style.setProperty("font-size", Math.min(height*0.01, width*0.02).toString() + "px");
};