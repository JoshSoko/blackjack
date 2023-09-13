"use strict";
const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = ["spades", "hearts", "clubs", "diamonds"];
const deck = [];
for (let suit in suits) {
    for (let card in cards) {
        deck.push(card + " of " + suits[suit]);
    }
}
let mainMenu = document.getElementById("main-menu");
let dealer = document.getElementById("dealer");
let player = document.getElementById("player");
// Hides menu, displays game, starts a round
function startGame() {
    mainMenu.style.display = 'none';
    player.style.display = 'grid';
    dealer.style.display = 'grid';
    singleRound();
}
// A new round
function singleRound() {
    // A new deck is created
    let roundDeck = [...deck];
    // The dealer and player are dealt out
    dealerDeal(roundDeck);
}
// Deal the dealer out
function dealerDeal(arr) {
    // Right now, a card is just generated as a proof of concept
    let card = cardMath(arr);
    console.log(card);
}
// Repeatable function to randomize a card
function cardMath(arr) {
    return arr[Math.floor(Math.random() * Number(arr.length) + 1)];
}
