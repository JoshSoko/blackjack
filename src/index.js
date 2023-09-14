"use strict";
// Establish a deck of cards (Would this be a better case for a class?)
const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = ["spades", "hearts", "clubs", "diamonds"];
const deck = [];
for (let suit in suits) {
    for (let card in cards) {
        deck.push(cards[card] + " of " + suits[suit]);
    }
}
// Assign variables for commonly used elements
let mainMenu = document.getElementById("main-menu");
let dealer = document.getElementById("dealer");
let player = document.getElementById("player");
let label = document.getElementById("announce");
// Hides menu, displays game, starts a round
function startGame() {
    mainMenu.style.display = 'none';
    player.style.display = 'flex';
    dealer.style.display = 'flex';
    singleRound();
}
// A new round
function singleRound() {
    label.innerHTML = "";
    let dealerScore = 0;
    let playerScore = 0;
    // A new deck is created
    let roundDeck = [...deck];
    // Deal out dealer and player
    for (let i = 0; i <= 3; i++) {
        cardLabel(i, cardMath(roundDeck));
    }
    // Tally up scores between cards
    dealerScore += blackjackCheck(dealer.getElementsByClassName('card'));
    playerScore += blackjackCheck(player.getElementsByClassName('card'));
    // Check for blackjack
    if (dealerScore == playerScore && dealerScore == 21) {
        dealerReveal();
        label.innerText = "Push!";
        menuSwap();
        return;
    }
    else if (dealerScore == 21) {
        dealerReveal();
        label.innerText = "Dealer BlackJack! You Lose!";
        menuSwap();
        return;
    }
    else if (playerScore == 21) {
        label.innerText = "BlackJack! You Win!";
        menuSwap();
        return;
    }
}
// Repeatable function to randomize a card
function cardMath(arr) {
    let ran = (Math.floor(Math.random() * Number(arr.length)));
    console.log(ran);
    let card = arr.splice((ran), 1)[0];
    return card;
}
// Repeatable function to label cards
function cardLabel(num, str) {
    let newStr = str.split(' ');
    let cardName = "card-" + num.toString();
    let card = document.getElementById(cardName);
    let letter = card.getElementsByClassName('letter');
    let suit = card.getElementsByClassName('suit')[0];
    letter[0].innerHTML = newStr[0];
    letter[1].innerHTML = newStr[0];
    if (newStr[2] == 'hearts') {
        suit.innerHTML = '♥';
        suit.classList.add('red-suit');
    }
    else if (newStr[2] == 'spades') {
        suit.innerHTML = '♠';
        suit.classList.add('black-suit');
    }
    else if (newStr[2] == 'clubs') {
        suit.innerHTML = '♣';
        suit.classList.add('black-suit');
    }
    else {
        suit.innerHTML = '◆';
        suit.classList.add('red-suit');
    }
}
// Adds up cards for blackjack
function blackjackCheck(cards) {
    let total = 0;
    for (let i = 0; i < 2; i++) {
        let card = cards[i].children[0].innerHTML;
        if (card == 'J' || card == 'Q' || card == 'K') {
            total += 10;
        }
        else if (card == 'A') {
            total += 11;
        }
        else {
            total += parseInt(card);
        }
    }
    return total;
}
// Reveal dealer's hidden card
function dealerReveal() {
    Array.from(document.querySelectorAll('.hidden')).forEach(function (item) {
        item.classList.remove('hidden');
    });
    document.getElementById('hidden-back').style.display = "none";
}
// Change menu options when the game ends
function menuSwap() {
    document.getElementById('next').style.display = "block";
    document.getElementById('hit').style.display = "none";
    document.getElementById('pass').style.display = "none";
    document.getElementById('quit').style.display = "none";
}
// Stuff to do before a new round is started
function cleanup() {
    // Switch menu options back
    document.getElementById('next').style.display = "none";
    document.getElementById('hit').style.display = "block";
    document.getElementById('pass').style.display = "block";
    document.getElementById('quit').style.display = "block";
    // Here's where we'll delete extraneous cards
    // And start a new round
    singleRound();
}
// Player hits
function hit() {
    // Player gets another card
    // If player goes over 21, they lose automatically
    // If player hits 21, they pass automatically
}
// Player passes, starting dealer turn
function pass() {
    dealerReveal();
    // Dealer deals self cards, stopping when he hits 15
    // Game checks who has the higher score and declares a winner
}
