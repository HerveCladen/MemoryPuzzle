let cards = document.querySelectorAll(".card");
cards.forEach(function (elem) {
    elem.addEventListener("click", function () {
        elem.classList.toggle('is-flipped');
    });
});