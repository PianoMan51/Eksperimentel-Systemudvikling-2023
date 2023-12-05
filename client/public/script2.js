let bottomMail = document.getElementById("createMail")
let bottomCheck = document.getElementById("check")
let bottomEdit = document.getElementById("bottomEdit")
let bottomMove = document.getElementById("bottomMove")
let active = false;
let createMailContainerActive = false
let bottomBtn = document.querySelectorAll(".bottomBtn");
let moveButton = document.getElementById("moveButton")
let createMailContainer = document.getElementById("createMailContainer")

let movePrompt = document.getElementById("prompt")

bottomMail.addEventListener("click", function () {
    active = !active;
    if (active) {
        createMailContainer.style.display = "flex";
        list.style.opacity = "0.3"
    }
})

document.body.addEventListener('click', function (event) {
    if (createMailContainer.contains(event.target) || !createMailContainerActive) {
        if (createMailContainer.style.display == "flex") {
            createMailContainerActive = true;
            bottomMail.style.backgroundColor = "var(--darkblue)"
            bottomCheck.style.display = "none";
            bottomEdit.style.display = "none";
        }
    } else {
        createMailContainerActive = false;
        createMailContainer.style.display = "none";
        bottomMail.style.backgroundColor = "var(--background)"
        active = false;
        bottomCheck.style.display = "block";
        bottomEdit.style.display = "block";
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

if (bottomMove) { bottomMove.style.display = "none" }
if (checksAmounts) { checksAmounts.style.display = "none" }
bottomCheck.addEventListener('click', function () {
    readyToCheck = !readyToCheck;
    updateCounts();
    loadCheck();
    if (readyToCheck) {
        bottomCheck.style.backgroundColor = 'var(--green)';
        checksAmounts.style.display = "block";
        for (let i = 0; i < list.children.length; i++) {
            list.children[i].style.cursor = "pointer"
        }
        bottomMail.style.display = "none";
        bottomEdit.style.display = "none";
        bottomMove.style.display = "block";
    } else {
        bottomCheck.style.backgroundColor = 'var(--background)';
        checksAmounts.style.display = "none";
        for (let i = 0; i < list.children.length; i++) {
            list.children[i].style.cursor = "default"
        }
        bottomMail.style.display = "block";
        bottomEdit.style.display = "block";
        bottomMove.style.display = "none";
    }
});

bottomEdit.addEventListener('click', function () {
    readyToEdit = !readyToEdit;
    if (readyToEdit) {
        venteliste.style.border = "2px var(--yellow) solid";
        bottomEdit.style.backgroundColor = "var(--yellow)";
        for (let i = 0; i < list.children.length; i++) {
            list.children[i].style.cursor = "pointer";
        }
        bottomMail.style.display = "none";
        bottomCheck.style.display = "none";
        bottomMove.style.display = "none";
    } else {
        venteliste.style.border = "2px var(--lightgray) solid";
        bottomEdit.style.backgroundColor = "var(--background)";
        for (let i = 0; i < list.children.length; i++) {
            list.children[i].style.cursor = "default";
        }
        bottomMail.style.display = "block";
        bottomCheck.style.display = "block";
    }
});

bottomMove.addEventListener('click', function () {
    readyToMove = !readyToMove;
    if (readyToMove) {
        movePrompt.style.display = "flex"
        readyToCheck = false;
        list.style.opacity = "0.3"
    } else {
        movePrompt.style.display = "none"
        readyToCheck = true;
        list.style.opacity = "1"
    }
});


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

moveButton.addEventListener("mouseover", function () {
    if (moveButton.style.backgroundColor === "var(--red)") {
        moveButton.style.transform = "rotate(-45deg) scale(1.3)";
        moveButton.style.backgroundColor = "var(--red)";
    }
    if (moveButton.style.backgroundColor === "var(--green)") {
        moveButton.style.transform = "rotate(0deg) scale(1.3)";
        moveButton.style.backgroundColor = "var(--darkgreen)"
    }
})

moveButton.addEventListener("mouseout", function () {
    if (moveButton.style.backgroundColor === "var(--red)") {
        moveButton.style.transform = "rotate(-45deg) scale(1)";
        moveButton.style.backgroundColor = "var(--red)"
    }
    if (moveButton.style.backgroundColor === "var(--darkgreen)") {
        moveButton.style.transform = "rotate(0deg) scale(1)";
        moveButton.style.backgroundColor = "var(--green)"
    }
})

let promptDone = document.getElementById("promptDone")
promptDone.addEventListener("click", function () {
    movePrompt.style.display = "none"
    list.style.opacity = "1"
    readyToMove = false;
    bottomMail.style.display = "block";
    bottomCheck.style.backgroundColor = "var(--darkbackground)"
    bottomEdit.style.display = "block";
    bottomMove.style.display = "none";
    checksAmounts.style.display = "none";
    loadCheck();
})

promptDone.previousElementSibling.style.display = "none"
promptDone.addEventListener("mouseover", function () {
    promptDone.previousElementSibling.style.display = "block";
})
promptDone.addEventListener("mouseout", function () {
    promptDone.previousElementSibling.style.display = "none";
})



let rememberMail = document.getElementById("rememberMail")
let moveAndDelete = document.getElementById("moveAndDelete")
let rememberYes = "rememberYes"
let rememberNo = "rememberNo"
moveAndDelete.style.display = "none";

function rememberMailAnswer(event) {
    movePrompt.style.top = "90px"
    movePrompt.style.transition = "0.3s"
    if (event.target.parentNode.id == rememberYes) {
        rememberMail.style.display = "none"
        moveAndDelete.style.display = "flex";
    } else {
        loadCheck();
        movePrompt.style.display = "none"
        readyToCheck = false;
        readyToMove = false;
        list.style.opacity = "1"
        bottomCheck.style.backgroundColor = 'var(--background)';
        checksAmounts.style.display = "none";
        for (let i = 0; i < list.children.length; i++) {
            list.children[i].style.cursor = "default"
        }
        bottomMail.style.display = "block";
        bottomEdit.style.display = "block";
        bottomMove.style.display = "none";

        active = true;
        createMailContainer.style.display = "flex";
        list.style.opacity = "0.3"
    }
}