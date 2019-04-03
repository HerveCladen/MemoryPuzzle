window.onload = generation(6,8);

function generation(rowsInsert, columnsInsert) {
    let board = document.getElementById("board");
    for(i = 0; i < rowsInsert; i++) {
        board.innerHTML += '<div class="row"></div>';
    }
    let rows = document.querySelectorAll(".row");
    rows.forEach(function(row) {
        for(i = 0; i < columnsInsert; i++) {
            row.innerHTML += '<div class="scene"><div class="card"><div class="card-face front"></div><div class="card-face back"></div></div></div>'
        }
    });

    let cards = document.querySelectorAll(".card");
    var cardNumbers = [];
    for(i = 0; i < cards.length; i++) {
        cardNumbers.push(i+1);
    } 

    cardNumbers = shuffle(cardNumbers);
    console.log(cards);
    console.log(cardNumbers);

    var pairs = cards.length / 2;
    for(i = 0; i < cards.length; i++) {
        cards[i].lastElementChild.innerHTML = cardNumbers[i] > pairs ? cardNumbers[i] - pairs : cardNumbers[i]; 
    }
}

function colorCode(code){

}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

let cards = document.querySelectorAll(".card");
cards.forEach(function (elem) {
    elem.addEventListener("click", function () {
        elem.classList.add('is-flipped');
        checkFlipped();
    });    
});

function checkFlipped() {
    var r = true;
    cards.forEach(function (elem) {
        if(!elem.classList.contains('is-flipped')) {
            r = false;
        }
    })
    if(r) {
        alert("All cards are flipped");
    }
}