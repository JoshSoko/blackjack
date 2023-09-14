// Establish a deck of cards (Would this be a better case for a class?)
const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = ["spades", "hearts", "clubs", "diamonds"]
const deck: string[] = [];

for (let suit in suits) {
    for (let card in cards) {
        deck.push(cards[card] + " of " + suits[suit]) ;
    }
}

// Assign variables for commonly used elements
let mainMenu = document.getElementById("main-menu");
let dealer = document.getElementById("dealer");
let player = document.getElementById("player");
let label = document.getElementById("announce");

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
    let dealerScore = 0;
    let playerScore = 0;

    // A new deck is created
    let roundDeck = [...deck];

    // Deal out dealer and player
    for (let i = 0; i <= 3; i++) {
        cardLabel(i, cardMath(roundDeck));
    }

    // Tally up scores between cards
    dealerScore += blackjackCheck(dealer!.getElementsByClassName('card'));
    playerScore += blackjackCheck(player!.getElementsByClassName('card'));

    if (dealerScore == playerScore && dealerScore == 21) {
        dealerReveal();
        label!.innerText = "Push!";
        return;
    } else if (dealerScore == 21) {
        dealerReveal();
        label!.innerText = "Dealer BlackJack! You Lose!";
        return;
    } else if (playerScore == 21) {
        label!.innerText = "BlackJack! You Win!";
        return;
    }
}
    

// Repeatable function to randomize a card
function cardMath(arr: string[]) {
    let ran = (Math.floor(Math.random() * Number(arr.length)));
    console.log(ran);
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
        
    else if (newStr[2] == 'spades'){
        suit.innerHTML = '♠';
        suit.classList.add('black-suit');
    }
    else if (newStr[2] == 'clubs'){
        suit.innerHTML = '♣';
        suit.classList.add('black-suit');
    }
    else {
        suit.innerHTML = '◆';
        suit.classList.add('red-suit');
    }
        
        
}

function blackjackCheck(cards: HTMLCollectionOf<Element>) {
    let total: number = 0;
    
    for (let i=0; i<2; i++){
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

function dealerReveal() {
    
    Array.from(document.querySelectorAll('.hidden')).forEach(function(item) {
        item.classList.remove('hidden');
    })

    document.getElementById('hidden-back')!.style.display = "none";
}