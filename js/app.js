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

function cleanCards() {
    let cardBack = $(".back");

    $(".card").removeClass("open");
    $(".card").removeClass("match");

    for (let i = 0; i < cards.length; i++) {
        console.log(cardBack[i]);
        cardBack.empty();
    }
}

function restartGame() {
    cleanCards();
    startGame();
    $(".stars").children().find("i").removeClass("fa-star-o").addClass("fa-star");
}

// All the logic done after document is ready
function startGame() {
    cards = shuffle(cards);
    setTimeout(function () {
        fillCards(cards);
    }, 500);
    moves = 0;
    $(".moves").text(moves);
    startTime = Date.now();
}

//Practicing ES6 Destructuring Assignement
let [firstPick, secondPick, moves, matches, stars, startTime] = [null, null, 0, 0, $(".stars").children(), Date.now()];

$(document).ready( function () {

    startGame();
    let card = $(".card");

    card.on("click", function ( event ) {

        //If is match, stop execution
        if($(this).hasClass("match")) {
            return;
        }
        //Open card
        $(this).toggleClass("open");

        //Check if there is two open cards except those that match
        let open = $(".open").not(".match");

        if (open.length === 2) {
            $(".moves").text(++moves);

            if (moves === 13) {
                $(stars[2]).find('i').removeClass("fa-star").addClass("fa-star-o");
            }
            if (moves === 19) {
                $(stars[1]).find('i').removeClass("fa-star").addClass("fa-star-o");
            }

            firstPick = open.first();
            secondPick = open.last();

            console.log("first pick class = " + firstPick.find("i").first().prop("class"));
            console.log("second pick class = " + secondPick.find("i").first().prop("class"));

            //If cards match
            if (firstPick.find("i").first().prop("class") == secondPick.find("i").first().prop("class")) {
                matches++;
                firstPick.addClass("match");
                secondPick.addClass("match");
                if (matches === 8) {
                    let winner = $(".winner");
                    winner.css("background-color", "#fff");
                    winner.css("z-index", "1");
                    $(".time-counter").text(Math.floor(( Date.now()- startTime ) / 1000 ));
                    $(".moves-counter").text(moves);
                    $(".stars-count").text($(".fa-star").length);
                }
            } else {
                //Wait a moment until close cards
                setTimeout(function () {
                    firstPick.toggleClass("open");
                    secondPick.toggleClass("open");
                }, 1000);

            }
        }
    });

    $(".restart").on("click", function () {
        restartGame();
    });

    $("#play-again-btn").on("click", function () {
        let winner = $(".winner");
        winner.css("background-color", "");
        winner.css("z-index", "-1");
        $(".moves-counter").text(0);
        $(".stars-count").text(0);
        restartGame();
    });
});