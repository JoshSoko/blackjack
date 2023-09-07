const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits: { [key: string]: string[] } = {"spades": [...cards], "hearts": [...cards],"clubs": [...cards], "diamonds": [...cards]};
let mainMenu = document.getElementById("main-menu");
let dealer = document.getElementById("dealer");
let player = document.getElementById("player");

function startGame() {
    mainMenu!.style.display = 'none';
    player!.style.display = 'grid';
    dealer!.style.display = 'grid';
    console.log('Function test');
}

/* for (let suit in suits) {
    for (let i=0; i < suits[suit].length; i++){
        console.log(suits[suit][i] + " of " + suit);
    }
} */