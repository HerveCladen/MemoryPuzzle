window.onload = generation(4, 5, 5);
var attemptsLeft, isFrozen, previouslyFlipped, cardFlipped, hasLost;

function generation(rowsInsert, columnsInsert, difficulty) {
    attemptsLeft = difficulty;
    hasLost = false;
    document.querySelector("#attempts").innerHTML = attemptsLeft + " attempts left";
    cardFlipped = false;

    let board = document.querySelector("#board");
    board.innerHTML = "";
    for (let i = 0; i < rowsInsert; i++) {
        board.innerHTML += '<div class="row"></div>';
    }

    let rows = document.querySelectorAll(".row");
    rows.forEach(row => {
        for (let i = 0; i < columnsInsert; i++) {
            row.innerHTML += '<div class="scene"><div class="card"><div class="card-face front"></div><div class="card-face back"></div></div></div>'
        }
    });

    let cards = document.querySelectorAll(".card");
    var cardNumbers = [];
    for (let i = 0; i < cards.length; i++) {
        cardNumbers.push(i + 1);
    }
    cardNumbers = shuffle(cardNumbers);

    let pairs = cards.length / 2, number;
    for (let i = 0; i < cards.length; i++) {
        number = cardNumbers[i] > pairs ? cardNumbers[i] - pairs : cardNumbers[i];
        cards[i].lastElementChild.innerHTML = number;
        cards[i].lastElementChild.style.background = colorCode(pairs, number);
    }
    isFrozen = false;
    cards.forEach(elem => {
        elem.addEventListener("click", () => {
            if (!elem.classList.contains('is-flipped') && !isFrozen && !hasLost) {
                elem.classList.add('is-flipped');
                if (cardFlipped == false) {
                    previouslyFlipped = elem;
                    cardFlipped = true;
                } else {
                    if (elem.innerHTML != previouslyFlipped.innerHTML) {
                        isFrozen = true;
                        attemptsLeft--;
                        document.querySelector("#attempts").innerHTML = attemptsLeft + " attempts left";
                        setTimeout(() => {
                            elem.classList.remove('is-flipped');
                            previouslyFlipped.classList.remove('is-flipped');
                            isFrozen = false;
                        }, 800);
                        if(attemptsLeft == 0) {
                            setTimeout(() => {
                                alert("You ran out of attempts, try again later.");
                            }, 300);                
                            hasLost = true;
                            cards.forEach((e) => {
                                elem.classList.remove('is-flipped');
                                previouslyFlipped.classList.remove('is-flipped');
                                if(!e.classList.contains("is-flipped")) {
                                    e.style.transform = "rotateY(180deg)";
                                    e.style.outline = "2px solid red";  
                                    e.style.color = "red";
                                    e.style.textShadow = "none";                                  
                                }
                            })
                        }
                    }
                    cardFlipped = false;
                }
                checkFlipped();
            }
        });
    });
}

function colorCode(pairs, number) {
    let code = Math.floor(765 / pairs * number);
    return `rgb(${Math.floor(code / 18)},${Math.floor(code / 5)},${Math.floor(code / 3)})`;
}

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
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
    let allFlipped = true;
    document.querySelectorAll(".card").forEach(function (elem) {
        if (!elem.classList.contains('is-flipped')) {
            allFlipped = false;
        }
    })
    if (allFlipped) {
        setTimeout(() => {
            alert("You found all pairs! Great job!");
        }, 100);
    }
}

document.querySelector("#board-generate").addEventListener("click", Generate);

function Generate() {
    let rows = document.querySelector("#board-rows").options[document.querySelector("#board-rows").selectedIndex].text;
    let columns = document.querySelector("#board-columns").options[document.querySelector("#board-columns").selectedIndex].text;
    let difficulty = document.querySelector("#difficulty").options[document.querySelector("#difficulty").selectedIndex].value;

    if (!isNaN(rows) && !isNaN(columns) && ((rows * columns) % 2) == 0 && difficulty != "") {
        generation(rows, columns, difficulty);
    }
}