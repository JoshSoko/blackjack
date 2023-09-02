const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits: { [key: string]: string[] } = {"spades": [...cards], "hearts": [...cards],"clubs": [...cards], "diamonds": [...cards]};

for (let suit in suits) {
    for (let i=0; i < suits[suit].length; i++){
        console.log(suits[suit][i] + " of " + suit);
    }
}