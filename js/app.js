// Create a list that holds all of your cards
const cardsList = ["diamond", "heart", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb", "diamond", "heart", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];

const deck = document.querySelector(".deck");
//const card = document.querySelector(".card");

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
let matchCards = [];
let moves = 0;
let timerNotRunning =  true;

// set up the event listener for a card. If a card is clicked:
deck.addEventListener("click", function(e) {
    // start timer on first click
    startTimer();

    // display the card's symbol
	e.target.classList.add("open");

    // add the card to a *list* of "open" cards
    openCards.push(e.target);
    let cardPick1 = openCards[0];
    let cardPick2 = openCards[1];

    //  if the list already has another card, check to see if the two cards match
    if (openCards.length === 2) {
        // if the cards do match, lock the cards in the open position
        if (cardPick1.innerHTML === cardPick2.innerHTML) {
            cardPick1.classList.add("match");
            cardPick2.classList.add("match");
            cardPick1.classList.remove("open");
            cardPick2.classList.remove("open");
            matchCards.push(cardPick1);
            matchCards.push(cardPick2);
            openCards = [];
        } else {
        // if the cards do not match, remove the cards from the list and hide the card's symbol
            setTimeout( function() {
                cardPick1.classList.remove("open");
                cardPick2.classList.remove("open");
                openCards = [];
            }, 500);
        }
        
        // counting moves and display on screen
        moves++;
        document.getElementById("moves").innerHTML = moves; 
    }

    // function star rating: removing stars
    removeStar();

    // if all cards have matched, display a message with the final score and stop timer
    if (matchCards.length === 16) {
        //end of game + stop timer + show pop-up message
        showModal();
        //in progress... stop timer and display results on modal
    }
});

// restart button
const restartButton = document.querySelector("#restart");
restartButton.addEventListener("click", function(re) {
    document.location.reload();
});

//start timer
function startTimer() {
    if (timerNotRunning === true) {
        timer();
        timerNotRunning = false;
    }
}

// star rating
function removeStar() {
    if (moves == 14) {
        // remove 1 star
        document.querySelector(".fa-star:last-of-type").classList.remove("fa-star");
        // there is some bug!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    } else if (moves == 19) {
        // remove one more star
        document.querySelector(".fa-star:last-of-type").classList.remove("fa-star");
    } else if (moves == 24) {
       // 0 stars
       document.querySelector(".fa-star:last-of-type").classList.remove("fa-star");
    }
}

// modal, help: https://www.w3schools.com/howto/howto_css_modals.asp
function showModal() {
    var modal = document.getElementById("modal");
    modal.classList.remove("hide");
    var exit = document.getElementsByClassName("close")[0];
    var playAgain = document.getElementById("play-again");

    // when click on x, close the modal
    exit.onclick = function() {
        modal.classList.add("hide");
    }

    // when click on button play again, start new game
    playAgain.onclick = function() {
        document.location.reload();
    }

    // still missing display results on modal!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}