let bottomMail = document.getElementById("createMail")
let bottomCheck = document.getElementById("check")
let bottomEdit = document.getElementById("bottomEdit")
let doneEdit = document.getElementById("doneEdit")
let bottomMove = document.getElementById("bottomMove")
let active = false;
let createMailContainerActive = false
let bottomBtn = document.querySelectorAll(".bottomBtn");
let moveButton = document.getElementById("moveButton")
let venteliste = document.getElementById("venteliste")
let smallMenu = document.getElementById("mailOptions")


bottomMail.addEventListener("click", function() {
    active = !active;
    if (active) {
        createMailContainer.style.display = "flex";
        list.style.opacity = "0.3"
    }
})

document.body.addEventListener('click', function(event) {
    if (createMailContainer.contains(event.target) || !createMailContainerActive) {
        if (createMailContainer.style.display == "flex") {
            createMailContainerActive = true;
            bottomMail.style.backgroundColor = "var(--darkblue)"
            bottomCheck.style.display = "none";
            bottomEdit.style.display = "none";
            if (bottomMove) { bottomMove.style.display = "none"; }
        }
    } else {
        createMailContainerActive = false;
        createMailContainer.style.display = "none";
        bottomMail.style.backgroundColor = "var(--background)"
        active = false;
        bottomCheck.style.display = "block";
        bottomEdit.style.display = "block";
        if (bottomMove) { bottomMove.style.display = "block"; }
        list.style.opacity = "1"
    }
});

bottomBtn.forEach(btn => {
    btn.addEventListener('mouseover', () => {
        let span = btn.querySelector('.span');
        span.style.display = 'flex';
    });

    btn.addEventListener('mouseout', () => {
        let span = btn.querySelector('.span');
        span.style.display = 'none';
    });

});

checksAmounts.style.display = "none";
bottomCheck.addEventListener('click', function() {
    readyToCheck = !readyToCheck;
    updateCounts();
    loadCheck();
    if (readyToCheck) {
        venteliste.style.border = "2px #2ecc71 solid";
        bottomCheck.style.backgroundColor = 'var(--green)';
        checksAmounts.style.display = "block";
        for (let i = 0; i < list.children.length; i++) {
            list.children[i].style.cursor = "pointer"
        }
        bottomMail.style.display = "none";
        bottomEdit.style.display = "none";
        bottomMove.style.display = "none";
        bottomDelete.style.display = "block"
    } else {
        venteliste.style.border = "2px var(--lightgray) solid";
        bottomCheck.style.backgroundColor = 'var(--background)';
        checksAmounts.style.display = "none";
        for (let i = 0; i < list.children.length; i++) {
            list.children[i].style.cursor = "default"
        }
        bottomMail.style.display = "block";
        bottomEdit.style.display = "block";
        bottomMove.style.display = "block";
        bottomDelete.style.display = "none"
    }
});

bottomEdit.addEventListener('click', function() {
    readyToEdit = !readyToEdit;
    if (readyToEdit) {
        venteliste.style.border = "2px #f1c40f solid";
        bottomEdit.style.backgroundColor = "var(--yellow)";
        for (let i = 0; i < list.children.length; i++) {
            list.children[i].style.cursor = "pointer";
        }
        bottomMail.style.display = "none";
        bottomCheck.style.display = "none";
        if (bottomMove) { bottomMove.style.display = "none"; }
    } else {
        venteliste.style.border = "2px #ecf0f1 solid";
        bottomEdit.style.backgroundColor = "var(--background)";
        for (let i = 0; i < list.children.length; i++) {
            list.children[i].style.cursor = "default";
        }
        bottomMail.style.display = "block";
        bottomCheck.style.display = "block";
        if (bottomMove) { bottomMove.style.display = "block"; }
    }
});

bottomMove.addEventListener('click', function() {
    readyToMove = !readyToMove;
    if (readyToMove) {
        venteliste.style.border = "2px #3498db solid";
        bottomMove.style.backgroundColor = "var(--darkblue)";
        for (let i = 0; i < list.children.length; i++) {
            list.children[i].style.cursor = "pointer";
        }
        bottomMail.style.display = "none";
        bottomCheck.style.display = "none";
        bottomEdit.style.display = "none"
    } else {
        venteliste.style.border = "2px #ecf0f1 solid";
        bottomMove.style.backgroundColor = "var(--background)";
        for (let i = 0; i < list.children.length; i++) {
            list.children[i].style.cursor = "default";
        }
        bottomMail.style.display = "block";
        bottomCheck.style.display = "block";
        bottomEdit.style.display = "block"
        moveKolonistContainer.style.display = "none"
        list.style.opacity = "1"
    }
});

if (moveButton) {
    moveButton.style.backgroundColor = "var(--red)";
    moveButton.style.transform = "rotate(-45deg)";
    [movePriceInput, moveCurrentInput].forEach(inputField => {
        inputField.addEventListener("input", () => {
            if (movePriceInput.value !== "" && moveCurrentInput.value !== "") {
                moveButton.style.backgroundColor = "var(--green)";
                moveButton.style.transform = "rotate(0deg)";
            } else {
                moveButton.style.backgroundColor = "var(--red)";
                moveButton.style.transform = "rotate(-45deg)";
            }
        });
    });

    moveButton.addEventListener("mouseover", function() {
        if (moveButton.style.backgroundColor === "var(--red)") {
            moveButton.style.transform = "rotate(-45deg) scale(1.3)";
            moveButton.style.backgroundColor = "var(--red)";
        }
        if (moveButton.style.backgroundColor === "var(--green)") {
            moveButton.style.transform = "rotate(0deg) scale(1.3)";
            moveButton.style.backgroundColor = "var(--darkgreen)"
        }
    })

    moveButton.addEventListener("mouseout", function() {
        if (moveButton.style.backgroundColor === "var(--red)") {
            moveButton.style.transform = "rotate(-45deg) scale(1)";
            moveButton.style.backgroundColor = "var(--red)"
        }
        if (moveButton.style.backgroundColor === "var(--darkgreen)") {
            moveButton.style.transform = "rotate(0deg) scale(1)";
            moveButton.style.backgroundColor = "var(--green)"
        }
    })
}