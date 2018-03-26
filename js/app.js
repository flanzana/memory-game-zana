// Create a list that holds all of your cards
const cardsList = ["diamond", "heart", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb", "diamond", "heart", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];

const deck = document.querySelector(".deck");
//const card = document.querySelectorAll(".card");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// inside deck is 16x <li class="card"><i class="fa fa-xxxxxx"></i></li>

function displayCards() {
    let cards = shuffle(cardsList);
    cards.forEach(function(card) {
        $(deck).append(`<li class="card"><i class="fa fa-${card}"></i></li>`)
    });
}
displayCards();
console.log(cardsList);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Timer from https://stackoverflow.com/questions/5517597
function timer() {
	var sec = 0;
	function pad ( val ) { return val > 9 ? val : "0" + val; }
	setInterval( function(){
		document.getElementById("seconds").innerHTML=pad(++sec%60);
		document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
	}, 1000);
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let openCards = [];
// set up the event listener for a card. If a card is clicked:
deck.addEventListener("click", function(e) {
    // display the card's symbol
	e.target.classList.add("show", "open");

    // add the card to a *list* of "open" cards
    openCards.push(e.target);

    let cardPick1 = openCards[0];
    //console.log(cardPick1);
    let cardPick2 = openCards[1];
    //console.log(cardPick2);

    console.log(openCards);

    //  if the list already has another card, check to see if the two cards match
    if (openCards.length === 2) {
        // if the cards do match, lock the cards in the open position
        if (cardPick1.innerHTML === cardPick2.innerHTML) {
            cardPick1.classList.add("match");
            cardPick2.classList.add("match");
            cardPick1.classList.remove("show", "open");
            cardPick2.classList.remove("show", "open");
            openedCards = [];
        } else {
        // if the cards do not match, remove the cards from the list and hide the card's symbol
            cardPick1.classList.remove("show", "open");
            cardPick2.classList.remove("show", "open");
            openedCards = [];
        }
    }
});