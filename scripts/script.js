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
    cards.forEach(function(elem) {
        elem.lastElementChild.style.background = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
    });
}

let cards = document.querySelectorAll(".card");
cards.forEach(function (elem) {
    elem.addEventListener("click", function () {
        elem.classList.toggle('is-flipped');
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