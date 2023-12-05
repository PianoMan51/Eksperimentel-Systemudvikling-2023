let nameInput = document.getElementById("nameInput")
let phoneInput = document.getElementById("phoneInput")
let mailInput = document.getElementById("mailInput")
let houseNrInput = document.getElementById("houseNrInput")
let list = document.getElementById("venteliste")
let createMailContainer = document.getElementById("createMailContainer")
let moveKolonistContainer = document.getElementById("moveKolonist")
let addButton = document.getElementById("addButton")
let showInputsBtn = document.getElementById("showInputsBtn")
let inputs = document.getElementById("inputs")
let showSearchBtn = document.getElementById("showSearchBtn")
let søgDiv = document.getElementById("søgDiv")
let tilfojKolonist = document.getElementById("tilfojKolonist")

let readyToEdit = false;
let readyToCheck = false;
let readyToMove = false;

fetchIntern()

addButton.onclick = addNewIntern;

addButton.style.backgroundColor = "var(--red)";
addButton.style.transform = "rotate(-45deg)";

let addKolonistActive = false;

function updateIndexLi(el) {
    let deletedIndex = el.childNodes[0].innerHTML;
    let liElements = document.querySelectorAll("#venteliste li");
    for (let i = 0; i < liElements.length; i++) {
        let indexSpan = liElements[i].childNodes[0];
        if (indexSpan.tagName === "SPAN") {
            let currentLiIndex = parseInt(indexSpan.innerHTML);
            if (currentLiIndex > deletedIndex) {
                indexSpan.innerHTML = currentLiIndex - 1;
            }
        }
    }
}

document.body.addEventListener('click', function(event) {
    if (inputs.contains(event.target) || !addKolonistActive) {
        if (inputs.style.display == "flex") {
            addKolonistActive = true;
        }
    } else {
        tilfojKolonist.style.display = "block";
        addButton.style.backgroundColor = "var(--red)";
        addButton.style.transform = "rotate(-45deg)";
        addKolonistActive = false;
        inputs.style.display = "none";

        showInputsBtn.style.backgroundColor = "var(--green)";
        showInputsBtn.style.transform = "rotate(0deg)";
        list.style.opacity = "1"
        nameInput.value = "";
        phoneInput.value = "";
        mailInput.value = "";
        houseNrInput.value = "";
    }
});

[nameInput, phoneInput, mailInput, houseNrInput].forEach(inputField => {
    inputField.addEventListener("input", () => {
        var regex = /^[0-9]+$/;
        if (nameInput.value !== "" && phoneInput.value !== "" && mailInput.value !== "" && houseNrInput.value !== "" &&
            phoneInput.value.match(regex) !== null && (phoneInput.value.length == 8 || phoneInput.value.length == 10) && houseNrInput.value.match(regex)) {
            addButton.style.backgroundColor = "var(--green)";
            addButton.style.transform = "rotate(0deg)"
        } else {
            addButton.style.backgroundColor = "var(--red)";
            addButton.style.transform = "rotate(-45deg)"
        }
    });
});

addButton.addEventListener("mouseover", function() {
    if (addButton.style.backgroundColor === "var(--red)") {
        addButton.style.transform = "rotate(-45deg) scale(1.3)";
    }
    if (addButton.style.backgroundColor === "var(--green)") {
        addButton.style.transform = "rotate(0deg) scale(1.3)";
        addButton.style.backgroundColor = "var(--darkgreen)"
    }
})

addButton.addEventListener("mouseout", function() {
    if (addButton.style.backgroundColor === "var(--red)") {
        addButton.style.transform = "rotate(-45deg) scale(1)";
        addButton.style.backgroundColor = "var(--red)"
    }
    if (addButton.style.backgroundColor === "var(--darkgreen)") {
        addButton.style.transform = "rotate(0deg) scale(1)";
        addButton.style.backgroundColor = "var(--green)"
    }
})

showInputsBtn.addEventListener("click", function() {
    if (inputs.style.display !== "flex") {
        inputs.style.display = "flex";
        list.style.opacity = "0.3"
        tilfojKolonist.style.display = "none";
        addButton.style.backgroundColor = "var(--red)";
        addButton.style.transform = "rotate(-45deg)";

        showInputsBtn.style.backgroundColor = "var(--red)";
        showInputsBtn.style.transform = "rotate(45deg)";

        showInputsBtn.addEventListener("mouseover", function() {
            if (inputs.style.display !== "flex") {
                showInputsBtn.style.backgroundColor = "var(--darkgreen)";
            }
        })

        showInputsBtn.addEventListener("mouseout", function() {
            if (inputs.style.display !== "flex") {
                showInputsBtn.style.backgroundColor = "var(--green)";
            }
        })


    } else {
        addButton.style.backgroundColor = "var(--red)";
        addButton.style.transform = "rotate(-45deg)";
        inputs.style.display = "none";
        list.style.opacity = "1"
        tilfojKolonist.style.display = "block";
        showInputsBtn.style.backgroundColor = "var(--green)";
        showInputsBtn.style.transform = "rotate(0deg)";

        showInputsBtn.addEventListener("mouseover", function() {
            if (inputs.style.display == "flex") {
                showInputsBtn.style.backgroundColor = "var(--darkred)";
            }
        })

        showInputsBtn.addEventListener("mouseout", function() {
            if (inputs.style.display == "flex") {
                showInputsBtn.style.backgroundColor = "var(--red)";
            }
        })
    }
})

showSearchBtn.addEventListener("click", function() {
    if (søgDiv.style.display !== "flex") {
        søgDiv.style.display = "flex";
        searchPopUpText.style.display = "none";
    } else {
        søgDiv.style.display = "none";
        searchPopUpText.style.display = "block";
    }
})





let editEl = null;

async function editKolonist(el) {
    if (readyToEdit) {
        if (editEl != null && editEl != el) {
            makeElNonEditable(editEl);
        }
        if (editEl != el) {
            makeElEditable(el)
        }

        doneEdit.style.display = "block";
        bottomEdit.style.display = "none"
        editEl = el;
    }

    doneEdit.onclick = function() {
        makeElNonEditable(el)
        list.style.border = "2px #ecf0f1 solid";
        doneEdit.style.display = "none";
        bottomEdit.style.display = "block"
        readyToEdit = false;
        bottomEdit.style.backgroundColor = "var(--background)";
        bottomMail.style.display = "block";
        bottomCheck.style.display = "block";
        bottomMove.style.display = "block"
    }

    function makeElEditable(el) {
        console.log("make editble")
        el.contentEditable = true;
        el.style.backgroundColor = "var(--yellow)";
        el.style.padding = "30px 10px 30px 10px"
        el.style.fontStyle = "italic";
        el.style.fontSize = "20px"

        for (let i = 0; i < el.children.length; i++) {
            el.children[i].style.width = "auto";
            el.children[i].style.padding = "5px 10px";
            el.children[i].style.backgroundColor = "var(--darkyellow)";
        }
    }

    function makeElNonEditable(el) {
        console.log("make non editble")
        el.style.backgroundColor = "var(--blue)";
        el.contentEditable = false;
        el.style.padding = "10px"
        el.style.fontStyle = "normal";
        el.style.fontSize = "16px"

        for (let i = 0; i < el.children.length; i++) {
            el.children[i].style.width = "auto";
            el.children[i].style.padding = "0px";
            el.children[i].style.backgroundColor = "";
        }

        let newId = el.childNodes[0].innerText
        let newName = el.childNodes[1].innerText
        let newPhone = el.childNodes[2].innerText
        let newMail = el.childNodes[3].innerText
        let newHouseNr = el.childNodes[4].innerText.substring(7)

        el.childNodes[0].style.width = "5%"
        el.childNodes[1].style.width = "20%"
        el.childNodes[2].style.width = "10%"
        el.childNodes[3].style.width = "25%"
        el.childNodes[4].style.width = "10%"

        let dataId = el.closest("li").getAttribute("data-id");

        fetch('/ventelisteIntern')
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id == dataId) {
                        let check = data[i].check;
                        fetch(`/ventelisteIntern/${dataId}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ id: newId, name: newName, phone: newPhone, mail: newMail, houseNr: newHouseNr, check: check })
                            })
                            .then(response => response.json())
                            .then(updatedData => {
                                console.log('Data updated on server:', updatedData);
                            })
                            .catch(error => {
                                console.error('Error updating data on server:', error);
                            });
                    }
                }

            })
    }
}



















async function moveKolonist(el) {
    if (readyToMove) {
        let dataId = el.closest("li").getAttribute("data-id");
        moveKolonistContainer.style.display = "flex";
        fetch('/ventelisteIntern')
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id == dataId) {
                        let id = dataId;
                        let kolonistTobeMoved = el.children;
                        moveNameInput.value = kolonistTobeMoved[1].innerHTML;
                        movePhoneInput.value = kolonistTobeMoved[2].innerHTML;
                        moveMailInput.value = kolonistTobeMoved[3].innerHTML;

                        moveButton.onclick = async function() {
                            await moveKolonistToHaveejer(el, id);
                        };


                    }
                }
            })
    } else {
        moveKolonistContainer.style.display = "none"
    }
}

async function moveKolonistToHaveejer(el, id) {
    if (movePriceInput.value !== "" && moveCurrentInput.value !== "" && moveNameInput.value !== "" &&
        movePhoneInput.value !== "" && moveMailInput.value !== "") {
        addNewHaveejer(el);
    }
    try {
        await deleteInternServer(id);
        list.removeChild(el);
        updateIndexLi(el);
    } catch {
        // console(err)
    }
    moveKolonistContainer.style.display = "none";
    readyToMove = false;
    bottomMove.style.backgroundColor = "var(--background)"
    list.style.border = "2px var(--lightgray) solid";
    bottomCheck.style.display = "block"
    bottomMail.style.display = "block"
    bottomEdit.style.display = "block"
}

async function addNewHaveejer(el) {
    let kolonistTobeMoved = el.children;

    let months = calculateYearAndMonths(kolonistTobeMoved[4].innerHTML);
    let name = moveNameInput.value;
    let phone = movePhoneInput.value;
    let mail = moveMailInput.value;
    let current = moveCurrentInput.value;
    let price = movePriceInput.value;

    if (current.trim() != '' && price.trim() != '') {
        try {
            let haveejerReturned = await postHaveejerToServer({ name: name, phone: phone, mail: mail, houseNr: current, months: months, price: price })
            appendHaveejerToList(haveejerReturned);
        } catch (err) {

        }
    }
    moveKolonistContainer.style.display = "none";
    moveCurrentInput.value = "";
    movePriceInput.value = "";
    moveNameInput.value = "";
    movePhoneInput.value = "";
    moveMailInput.value = "";
}

function calculateYearAndMonths(date) {
    let addedYear = date.slice(0, 4);
    let thisYear = new Date().getFullYear();
    let year = thisYear - addedYear;

    let addedMonth = date.slice(5, 7);
    let thisMonth = new Date().getMonth() + 1;
    if (addedMonth.slice(0, 1) == 0) {
        addedMonth = Number(addedMonth.slice(1, 2));
    }

    let res = Number(year) * 12 - addedMonth + thisMonth;

    return res;

}

async function postHaveejerToServer(data = {}) {
    const response = await fetch('/listeHaveejere', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (!response.ok) {
        throw new Error(`Connection failed with status code ${response.status}`)
    }
    return await response.json()
}

function updateCounts() {
    let checkedAmount = document.getElementById("checkedAmount")
    let noncheckedAmount = document.getElementById("noncheckedAmount")

    let checkedCount = 0;
    fetch('/ventelisteIntern')
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].check != 0) {
                    checkedCount++;
                }
            }
            checkedAmount.innerHTML = "Har betalt: " + checkedCount;
            noncheckedAmount.innerHTML = "Har ikke betalt: " + (data.length - checkedCount);
        })
}

async function addNewIntern() {
    let name = nameInput.value
    let phone = phoneInput.value
    let mail = mailInput.value
    let houseNr = houseNrInput.value;

    var regex = /^[0-9]+$/;
    if (!phone.trim().match(regex) && phone.trim() != '') {
        alert("Telefonnr. skal bestå af tal");
    } else if (!(phone.trim() == '' || phone.trim().length == 8 || phone.trim().length == 10)) {
        alert("Telefonnr. skal bestå af 8 eller 10 tal");
    } else if (!houseNr.trim().match(regex) && houseNr.trim() != '') {
        alert("Husnummer skal bestå af tal");
    } else if (name.trim() != '' && phone.trim() != '' && mail.trim() != '' && houseNr.trim() != '') {
        try {
            let internReturned = await postInternToServer({ name: name, phone: phone, mail: mail, houseNr: houseNr, check: check })
            appendInternToList(internReturned);

            //console.log(id)
        } catch (err) {
            //console.log(err)
        }
    } else {
        //addButton.style.backgroundColor = "var(--red)"
        let string = "Tilføj venlist følgende oplysninger: ";
        let list = [name.trim(), phone.trim(), mail.trim(), houseNr.trim()];
        let listNames = ["navn", "telefonnr.", "mail", "husnr."]
        let listRes = [];

        for (let i = 0; i < list.length; i++) {

            if (list[i] == '') {
                let navn = listNames[i];
                listRes.push(navn);
            }

        }

        if (listRes.length == 1) {
            string += " " + listRes[0];
        } else if (listRes.length == 2) {
            string += " " + listRes[0] + " & " + listRes[1];
        } else if (listRes.length >= 3) {
            string += " " + listRes[0];
            for (let i = 1; i < listRes.length - 1; i++) {
                string += ", " + listRes[i];
            }
            string += " & " + listRes[listRes.length - 1];
        }
    }
}

function appendInternToList(kolonistJson) {
    let el = document.createElement("LI")
    let index = document.createElement("SPAN")
    let nameEl = document.createElement("SPAN")
    let phoneEl = document.createElement("SPAN")
    let mailEl = document.createElement("SPAN")
    let houseNrEl = document.createElement("SPAN")

    index.setAttribute("id", "kolonistIndex")

    index.innerHTML = list.childNodes.length;
    nameEl.innerHTML = kolonistJson.name;
    phoneEl.innerHTML = kolonistJson.phone;
    mailEl.innerHTML = kolonistJson.mail;
    houseNrEl.innerHTML = "Husnr: " + kolonistJson.houseNr;

    index.style.width = "5%"
    nameEl.style.width = "20%"
    phoneEl.style.width = "10%"
    mailEl.style.width = "25%"
    houseNrEl.style.width = "10%"

    el.dataset.id = kolonistJson.id
    index.classList.add("index-span");
    el.classList.add("notchecked");
    el.appendChild(index)
    el.appendChild(nameEl);
    el.appendChild(phoneEl);
    el.appendChild(mailEl);
    el.appendChild(houseNrEl);
    list.appendChild(el)
    el.addEventListener("click", function() {
        if (readyToCheck) {
            checkKolonist(el);
        } else if (readyToEdit) {
            editKolonist(el);
        } else if (readyToMove) {
            moveKolonist(el);
        }
    })
    nameInput.value = '';
    phoneInput.value = '';
    mailInput.value = '';
    houseNrInput.value = '';

}

async function checkKolonist(el) {
    if (readyToCheck) {
        let dataId = el.closest("li").getAttribute("data-id");
        fetch('/ventelisteIntern')
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id == dataId) {
                        if (data[i].check != 1) {
                            el.closest("li").classList.remove("notchecked");
                            el.closest("li").classList.add("checked");
                            let oldName = data[i].name;
                            let oldPhone = data[i].phone;
                            let oldMail = data[i].mail;
                            let oldHouseNr = data[i].houseNr;

                            fetch(`/ventelisteIntern/${dataId}`, {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ name: oldName, phone: oldPhone, mail: oldMail, houseNr: oldHouseNr, check: "1" })
                                })
                                .then(response => response.json())
                                .then(updatedData => {
                                    console.log('Data updated on server:', updatedData);
                                })
                                .catch(error => {
                                    console.error('Error updating data on server:', error);
                                });
                            updateCounts();
                            updateRecieverCount()
                        } else {
                            el.closest("li").classList.add("notchecked");
                            el.closest("li").classList.remove("checked");
                            let oldName = data[i].name;
                            let oldPhone = data[i].phone;
                            let oldMail = data[i].mail;
                            let oldHouseNr = data[i].houseNr;

                            fetch(`/ventelisteIntern/${dataId}`, {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ name: oldName, phone: oldPhone, mail: oldMail, houseNr: oldHouseNr, check: "0" })
                                })
                                .then(response => response.json())
                                .then(updatedData => {
                                    console.log('Data updated on server:', updatedData);
                                })
                                .catch(error => {
                                    console.error('Error updating data on server:', error);
                                });
                            updateCounts();
                            updateRecieverCount();
                        }
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
}

async function loadCheck() {
    if (readyToCheck) {
        fetch('/ventelisteIntern')
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    let dataId = list.children[i].getAttribute("data-id");
                    if (data[i].id = dataId) {
                        if (data[i].check == 1) {
                            list.children[i].classList.remove("notchecked");
                            list.children[i].classList.add("checked");
                        } else {
                            list.children[i].classList.add("notchecked");
                            list.children[i].classList.remove("checked");
                        }
                    }
                }

            })
    } else {
        fetch('/ventelisteIntern')
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    list.children[i].classList.add("notchecked");
                    list.children[i].classList.remove("checked");
                }
            })
    }
}

async function fetchIntern() {
    try {
        let kolonister = await getInternFromServer()
        kolonister.forEach(name => { appendInternToList(name) })
    } catch (err) {
        console.log(err)
    }
}

async function getInternFromServer() {
    const response = await fetch('/ventelisteIntern', {
            method: "GET",
            headers: {
                'Accept': 'application/json'
            }
        })
        //We add this additional fail condition to capture connection issues
    if (!response.ok) {
        throw new Error(`Connection failed with status code ${response.status}`)
    }
    return await response.json()
}

async function postInternToServer(data = {}) {
    const response = await fetch('/ventelisteIntern', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (!response.ok) {
        throw new Error(`Connection failed with status code ${response.status}`)
    }
    return await response.json()
}

async function deleteInternServer(id) {
    const response = await fetch('/ventelisteIntern/' + id, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })
    return
}

searchPerson();

function searchPerson() {
    let input = document.getElementById("søgNavn");
    let filter = input.value.toUpperCase();
    let li = list.getElementsByTagName("li");
    for (let i = 0; i < li.length; i++) {
        let searchedName = li[i].getElementsByTagName("SPAN")[1];
        let searchedPhone = li[i].getElementsByTagName("SPAN")[2];
        let searchedEmail = li[i].getElementsByTagName("SPAN")[3];
        let txtValue = searchedName.textContent || searchedName.innerText;
        let txtValue2 = searchedPhone.textContent || searchedPhone.innerText;
        let txtValue3 = searchedEmail.textContent || searchedEmail.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1 || txtValue3.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

///////////////////////// MAIL-CONTAINER ///////////////////////////////////////////////////////
let sendMailBtn = document.getElementById("sendMailButton")
let buttons = document.querySelectorAll("#mailOptions button");
let typeOption = document.getElementById("mailOption")
let recieverCountSpan = document.getElementById("recieverCount")
let selectedOption;
updateRecieverCount()

sendMailBtn.addEventListener('click', async() => {
    let mailMessage;
    let subject;
    console.log(selectedOption)

    if (selectedOption == 0) {
        mailMessage = templates[0].mail;
        subject = templates[0].subject;
    }
    if (selectedOption == 1) {
        mailMessage = templates[1].mail;
        subject = templates[1].subject;
    }
    if (selectedOption == 2) {
        mailMessage = templates[2].mail;
        subject = templates[2].subject;
    }
    if (selectedOption == 3) {
        mailMessage = templates[3].mail;
        subject = templates[3].subject;
    }

    console.log("Emne: '" + subject + "' Besked: '" + mailMessage + "'")

    //loader start
    loader.style.display = "flex";
    sendMailIcon.style.display = "none";

    if (confirm("Er du sikker på du vil sende mail?")) {

        try {
            const response = await fetch("/send-email", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: emailAdresses,
                    subject: subject,
                    message: mailMessage,
                }),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        } finally {
            //loader end
            loader.style.display = 'none';
            sendMailIcon.style.display = "block";
        }
    } else {
        loader.style.display = 'none';
        sendMailIcon.style.display = "block";
    }
});

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.style.backgroundColor === "white") {
            button.style.backgroundColor = "transparent";
            button.querySelector("i").style.color = "white";
            // selectedOption = 0;
            updateRecieverCount()
        } else {
            selectedOption = parseInt(button.id.slice(-1));
            updateRecieverCount()
            buttons.forEach((button) => {
                button.style.backgroundColor = "transparent";
                button.querySelector("i").style.color = "white";
            });
            updateRecieverCount()
            button.style.backgroundColor = "rgba(255, 255, 255, 1)";
            button.querySelector("i").style.color = "var(--background)";
        }
    });
});

function updateRecieverCount() {
    emailAdresses = "";
    mailReciever = "";

    if (selectedOption == 0) {
        let checkedCount = 0;
        fetch('/ventelisteIntern')
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].check === "1") {
                        checkedCount++;
                        mailReciever = data[i].mail
                        emailAdresses = emailAdresses.concat(mailReciever, ", ");
                    }
                }
                recieverCountSpan.innerHTML = "Antal modtagere: " + checkedCount;
            })
    }

    if (selectedOption == 1) {
        let notCheckedCount = 0;
        fetch('/ventelisteIntern')
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].check === "0") {
                        notCheckedCount++;
                        mailReciever = data[i].mail
                        emailAdresses = emailAdresses.concat(mailReciever, ", ");
                    }
                }

                recieverCountSpan.innerHTML = "Antal modtagere: " + notCheckedCount;
            })
    }

    if (selectedOption == 2) {
        fetch('/ventelisteIntern')
            .then(response => response.json())
            .then(data => {
                recieverCountSpan.innerHTML = "Antal modtagere: " + data.length
                for (let i = 0; i < data.length; i++) {
                    mailRecieverVenteliste = data[i].mail
                    emailAdresses = emailAdresses.concat(mailRecieverVenteliste, ", ");
                }
            })
    }
}

let subject = document.getElementById("subjectInput");
let mail = document.getElementById("mailTextInput");
let mailOptions = document.querySelectorAll("#mailOptions button");
let templateSaveBtn = document.getElementById("templateSaveBtn");
let inputArea = document.getElementById("textArea");

let templates = [];

function updateValues() {
    let index = selectedOption;
    if (selectedOption < 5) {
        subject.value = templates[index].subject;
        mail.value = templates[index].mail;

        createMailContainer.style.top = "80px"
        createMailContainer.style.height = "500px"
        inputArea.style.height = "215px";
        inputArea.style.opacity = "1"
        inputArea.style.transition = "0.3s"
        sendMailBtn.style.opacity = "1"
        mail.style.display = "block"
    } else {
        createMailContainer.style.top = "200px"
        createMailContainer.style.height = "300px"
        inputArea.style.height = "0"
        inputArea.style.opacity = "0"
        inputArea.style.transition = "0.3s"
        sendMailBtn.style.opacity = "0"
        mail.style.display = "none"
    }
}

mailOptions.forEach((option) => {
    option.addEventListener("click", () => {
        updateValues();

    });
});

fetch("/mailTemplates")
    .then((response) => response.json())
    .then((data) => {
        templates = data;
        updateValues();
    });

templateSaveBtn.addEventListener("click", () => {
    let index = selectedOption;
    let templateData = {
        subject: subject.value,
        mail: mail.value,
    };
    fetch(`/mailTemplates/${index}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(templateData),
        })
        .then((response) => response.json())
        .then((data) => {
            templates[index] = data;
        });
    checkSave()
});

function checkSave() {
    let index = selectedOption;
    fetch("/mailTemplates")
        .then((response) => response.json())
        .then((data) => {
            let huskSpan = document.getElementsByClassName("huskSave");
            if (selectedOption < 5) {
                if (mail.value !== data[index].mail || subject.value !== data[index].subject) {
                    templateSaveBtn.style.opacity = "1";
                    templateSaveBtn.innerHTML = '<i class="fa-regular fa-floppy-disk fa-beat fa-2xl" style="color: #ffffff;"></i>'
                    for (let i = 0; i < huskSpan.length; i++) {
                        huskSpan[i].style.opacity = "1";
                    }
                } else {
                    templateSaveBtn.style.opacity = "0.3";
                    templateSaveBtn.innerHTML = '<i class="fa-regular fa-floppy-disk fa-2xl" style="color: #ffffff;"></i>'
                    for (let i = 0; i < huskSpan.length; i++) {
                        huskSpan[i].style.opacity = "0";
                    }
                }
            }
        });
}
checkSave()