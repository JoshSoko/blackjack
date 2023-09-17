// Establish a deck of cards (Would this be a better case for a class?)
const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = ["spades", "hearts", "clubs", "diamonds"]
const deck: string[] = [];

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

// Set global variables
let roundDeck: string[] = [];
let playerAces = 0;
let dealerAces = 0;
let dealerScore = 0;
let playerScore = 0;
let cardNum = 2;

// Hides menu, displays game, starts a round
function startGame() {
    mainMenu!.style.display = 'none';
    player!.style.display = 'flex';
    dealer!.style.display = 'flex';
    singleRound();
}

// A new round
function singleRound() {
    label!.innerHTML = "";
    dealerAces = 0;
    playerAces = 0;
    dealerScore = 0;
    playerScore = 0;

    // A new deck is created
    roundDeck = [...deck];

    // Deal out dealer and player
    for (let i = 0; i <= 3; i++) {
        cardLabel(i, cardMath(roundDeck));
    }

    // Tally up scores between cards
    dealerScore += blackjackCheck(dealer!.getElementsByClassName('card'), "dealer");
    playerScore += blackjackCheck(player!.getElementsByClassName('card'), "player");

    // Check for blackjack
    if (dealerScore == playerScore && dealerScore == 21) {
        dealerReveal();
        label!.innerText = "Push!";
        menuSwap();
        return;
    } else if (dealerScore == 21) {
        dealerReveal();
        label!.innerText = "Dealer BlackJack! You Lose!";
        menuSwap();
        return;
    } else if (playerScore == 21) {
        label!.innerText = "BlackJack! You Win!";
        menuSwap();
        return;
    }

}

// Repeatable function to randomize a card
function cardMath(arr: string[]) {
    let ran = (Math.floor(Math.random() * Number(arr.length)));
    let card = arr.splice((ran), 1)[0];
    return card;
}

// Repeatable function to label cards
function cardLabel(num: number, str: string) {
    let newStr = str.split(' ');
    let cardName = "card-" + num.toString();
    let card = document.getElementById(cardName);

    let letter = card!.getElementsByClassName('letter');
    let suit = card!.getElementsByClassName('suit')[0];
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
function blackjackCheck(cards: HTMLCollectionOf<Element>, team: string) {
    let total: number = 0;

    for (let i = 0; i < 2; i++) {
        let card = cards[i].children[0].innerHTML;

        if (card == 'J' || card == 'Q' || card == 'K') {
            total += 10;
        }
        else if (card == 'A') {
            total += 11;
            if (team == 'dealer')
                dealerAces += 1;
            else
                playerAces += 1;
        }
        else {
            total += parseInt(card);
        }
    }

    return total;
}

// Player hits
function playerHit() {

    // Player gets another card,
    // by cloning an existing card,
    let card = document.getElementById("card-3");
    let newCard = card!.cloneNode(true) as HTMLElement;

    // incrementing the global variable to name it,
    cardNum += 1;
    newCard.id = "card-" + cardNum;
    document.getElementById("player-cards")?.appendChild(newCard);

    // calling the functions for a new label
    cardLabel(cardNum, cardMath(roundDeck));

    // and adding up their current score
    playerScore += totalMath(document.getElementById("card-" + cardNum)!.children[0].innerHTML, "player");

    // If player goes over 21, they lose automatically
    while (playerScore > 21 && playerAces > 0) {
        aceCheck("player");
    }
    if (playerScore > 21) {
        label!.innerText = "Bust! You Lose!";
        menuSwap();
        return;
    }

    // If player hits 21, they pass automatically
    if (playerScore == 21) {
        pass();
    }
}

// Player passes, starting dealer turn
function pass() {

    // Dealer reveals cards
    dealerReveal();

    while (dealerScore <= 15) {
        dealerHit();
    }

    // Game checks who has the higher score and declares a winner
    if (dealerScore > 21) {
        label!.innerText = "Dealer Busts! You Win!";
        menuSwap();
        return;
    }

    if (dealerScore == playerScore) {
        label!.innerText = "Push!";
    } else if (dealerScore > playerScore) {
        label!.innerText = "Higher Dealer Hand! You Lose!";
    } else {
        label!.innerText = "Higher Player Hand! You Win!";
    }

    menuSwap();
}

// Reveal dealer's hidden card
function dealerReveal() {

    Array.from(document.querySelectorAll('.hidden')).forEach(function (item) {
        item.classList.remove('hidden');
    })

    document.getElementById('hidden-back')!.style.display = "none";
}

// Dealer gets their cards
function dealerHit() {
    // Dealer gets another card,
    // by cloning an existing card,
    let card = document.getElementById("card-1");
    let newCard = card!.cloneNode(true) as HTMLElement;

    // incrementing the global variable to name it,
    cardNum += 1;
    newCard.id = "card-" + cardNum;
    document.getElementById("dealer-cards")?.appendChild(newCard);

    // calling the functions for a new label
    cardLabel(cardNum, cardMath(roundDeck));

    // and adding up their current score
    dealerScore += totalMath(document.getElementById("card-" + cardNum)!.children[0].innerHTML, "dealer");

    // If dealer goes over 21, they lose automatically
    while (dealerScore > 21 && dealerAces > 0) {
        aceCheck("dealer");
    }
}

// Actual card total math
function totalMath(card: string, team: string) {
    let total = 0;

    if (card == 'J' || card == 'Q' || card == 'K') {
        total += 10;
    }
    else if (card == 'A') {
        total += 11;
        if (team == "dealer")
            dealerAces += 1;
        else
            playerAces += 1;
    }
    else {
        total += parseInt(card);
    }

    return total;
}

// If the score is over 21 but the player has aces that are being counted for 11 points, just subtract 10
function aceCheck(team: string) {
    if (team == "player") {
        if (playerAces > 0) {
            playerScore -= 10;
            playerAces -= 1;
        }
    }
    else {
        if (dealerAces > 0) {
            dealerScore -= 10;
            dealerAces -= 1;
        }
    }

}

// Change menu options when the game ends
function menuSwap() {
    document.getElementById('next')!.style.display = "block";

    document.getElementById('hit')!.style.display = "none";
    document.getElementById('pass')!.style.display = "none";
    document.getElementById('quit')!.style.display = "none";
}

// Stuff to do before a new round is started
function cleanup() {
    // Switch menu options back
    document.getElementById('next')!.style.display = "none";

    document.getElementById('hit')!.style.display = "block";
    document.getElementById('pass')!.style.display = "block";
    document.getElementById('quit')!.style.display = "block";

    // Here's where we'll delete extraneous cards
    for (cardNum; cardNum > 2; cardNum--) {
        document.getElementById("card-" + cardNum)?.remove();
    }

    // Hide the dealer card again
    for (let i = 0; i < 3; i++){
        document.getElementById("card-0")!.children[i].classList.add("hidden");
    }
    document.getElementById('hidden-back')!.style.display = "block";

    // And start a new round
    singleRound();
}