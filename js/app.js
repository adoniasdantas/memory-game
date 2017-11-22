/*
 * Create a list that holds all of your cards
 */
let cards = [
    `<i class="fa fa-diamond"></i>`,
    `<i class="fa fa-paper-plane-o"></i>`,
    `<i class="fa fa-anchor"></i>`,
    `<i class="fa fa-bolt"></i>`,
    `<i class="fa fa-cube"></i>`,
    `<i class="fa fa-leaf"></i>`,
    `<i class="fa fa-bicycle"></i>`,
    `<i class="fa fa-bomb"></i>`,
    `<i class="fa fa-diamond"></i>`,
    `<i class="fa fa-paper-plane-o"></i>`,
    `<i class="fa fa-anchor"></i>`,
    `<i class="fa fa-bolt"></i>`,
    `<i class="fa fa-cube"></i>`,
    `<i class="fa fa-leaf"></i>`,
    `<i class="fa fa-bicycle"></i>`,
    `<i class="fa fa-bomb"></i>`,
];

//Number of moves
let moves = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

// Insert Symbols to card back
function fillCards(cards) {
    let cardBack = $(".back");
    // console.log(cardBack);
    for (let i = 0; i < cards.length; i++) {
        $(cards[i]).appendTo(cardBack[i]);
    }
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

// All the logic done after document is ready
$(document).ready( function () {
    cards = shuffle(cards);
    fillCards(cards);
    $(".card").on("click", function () {
        $(this).toggleClass("open");
        $(".moves").text(++moves);
    });
});