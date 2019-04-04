window.onload = generation(4,5);

var previouslyFlipped, cardFlipped;

function generation(rowsInsert, columnsInsert) {
    cardFlipped = false;

    let board = document.getElementById("board");
    board.innerHTML = "";
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

    var pairs = cards.length / 2, number;
    for(i = 0; i < cards.length; i++) {
        number = cardNumbers[i] > pairs ? cardNumbers[i] - pairs : cardNumbers[i];
        cards[i].lastElementChild.innerHTML = number; 
        cards[i].lastElementChild.style.background = colorCode(pairs, number);
    }

    cards.forEach(function (elem) {
        elem.addEventListener("click", function () {
            if(!elem.classList.contains('is-flipped')) {
                elem.classList.add('is-flipped');
                if (cardFlipped == false) {
                    previouslyFlipped = elem;
                    cardFlipped = true;
                } else {                    
                    if(elem.innerHTML != previouslyFlipped.innerHTML) {
                        setTimeout(function(){
                            elem.classList.remove('is-flipped');
                            previouslyFlipped.classList.remove('is-flipped');
                        }, 650);                                            
                    }
                    cardFlipped = false;
                }
                checkFlipped();
            }
        });    
    });
}

function colorCode(pairs, number){
    var code = Math.floor(765 / pairs * number);
    return `rgb(${Math.floor(code/18)},${Math.floor(code/5)},${Math.floor(code/3)})`;
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

function checkFlipped() {
    var allFlipped = true;
    document.querySelectorAll(".card").forEach(function (elem) {
        if(!elem.classList.contains('is-flipped')) {
            allFlipped = false;
        }
    })
    if(allFlipped) {
        setTimeout(() => { 
            alert("You found all pairs! Great job!");        
        }, 100);
    }
}

document.getElementById("board-generate").addEventListener("click", Generate);

function Generate() {
    var rows = document.getElementById("board-rows").options[document.getElementById("board-rows").selectedIndex].text;
    var columns = document.getElementById("board-columns").options[document.getElementById("board-columns").selectedIndex].text;

    if(!isNaN(rows) && !isNaN(columns) && ((rows * columns) % 2) == 0) {
        generation(rows, columns);
    }
}