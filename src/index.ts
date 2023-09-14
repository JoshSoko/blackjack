// Establish a deck of cards (Would this be a better case for a class?)
const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = ["spades", "hearts", "clubs", "diamonds"]
const deck: string[] = [];

for (let suit in suits) {
    for (let card in cards) {
        deck.push(card + " of " + suits[suit]) ;
    }
}

// Assign variables for commonly used elements
let mainMenu = document.getElementById("main-menu");
let dealer = document.getElementById("dealer");
let player = document.getElementById("player");

// Hides menu, displays game, starts a round
function startGame() {
    mainMenu!.style.display = 'none';
    player!.style.display = 'grid';
    dealer!.style.display = 'grid';
    singleRound();
}

// A new round
function singleRound() {

    let dealerCount = 0;
    let playerCount = 0;

    // A new deck is created
    let roundDeck = [...deck];
    
    // The dealer is dealt out
    let hidden = cardMath(roundDeck);

    cardLabel(1, cardMath(roundDeck));
}

// Repeatable function to randomize a card
function cardMath(arr: string[]) {
    return arr.splice(Math.floor(Math.random() * Number(arr.length) + 1), 1)[0];
}

// Repeatable function to label cards
function cardLabel(num: number, str: string) {
    let newStr = str.split(' ');
    let cardName = "card-" + num.toString();
    let card = document.getElementById(cardName)?.getElementsByClassName('letter');
    if (card) {
        card[0].innerHTML = newStr[0];
        card[1].innerHTML = newStr[0];
    }
}