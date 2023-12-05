let main = document.getElementById("main")
let nameInput = document.getElementById("nameInput")
let phoneInput = document.getElementById("phoneInput")
let mailInput = document.getElementById("mailInput")
let dateInput = document.getElementById("dateInput")
let addButton = document.getElementById("addButton")
let showInputsBtn = document.getElementById("showInputsBtn")
let sendMailBtn = document.getElementById("sendMailButton")
let inputs = document.getElementById("inputs")
let showSearchBtn = document.getElementById("showSearchBtn")
let søgDiv = document.getElementById("søgDiv")
let list = document.getElementById("venteliste")

let checksAmounts = document.getElementById("checksAmounts")
let checkLabel = document.getElementById("checkLabel")
let editLabel = document.getElementById("editLabel")
let loader = document.getElementById('mailLoader');
let sendMailIcon = document.getElementById("sendMailIcon")
let moveKolonistContainer = document.getElementById("moveKolonist")
let moveNameInput = document.getElementById("moveNameInput")
let movePhoneInput = document.getElementById("movePhoneInput")
let moveMailInput = document.getElementById("moveMailInput")
let moveCurrentInput = document.getElementById("moveCurrentInput")
let movePriceInput = document.getElementById("movePriceInput")
let tilfojKolonist = document.getElementById("tilfojKolonist")
let readyToCheck = false;
let readyToEdit = false;
let editEl = null;
let readyToMove;
let emailAdresses = "";
let addKolonistActive = false;

let typeOption = document.getElementById("mailOption")
let kolonistOption = document.getElementById("kolonistOption")
let recieverCountSpan = document.getElementById("recieverCount")
let recievers = document.getElementById("recievers")
fetchKolonister()
updateCounts();
addButton.onclick = addNewAnsøger

function updateIndexLi(evt) {
    let deletedIndex = evt.target.parentNode.parentNode.childNodes[0].innerHTML;
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

showInputsBtn.addEventListener("click", function() {
    if (inputs.style.display !== "flex") {
        tilfojKolonist.style.display = "none";
        inputs.style.display = "flex";
        list.style.opacity = "0.3"
        addinputsVisible = true;
        addButton.style.transform = "rotate(-45deg)";
        addButton.style.backgroundColor = "var(--red)";
        showInputsBtn.style.backgroundColor = "var(--red)";
        showInputsBtn.style.transform = "rotate(-45deg)";

        showInputsBtn.addEventListener("mouseover", function() {
            if (inputs.style.display !== "flex") {
                showInputsBtn.style.backgroundColor = "var(--darkgreen)";
                showInputsBtn.style.transform = "rotate(-0deg)"
            }
        })

        showInputsBtn.addEventListener("mouseout", function() {
            showInputsBtn.style.backgroundColor = "var(--red)";
        })


    } else {
        addinputsVisible = false;
        tilfojKolonist.style.display = "block";
        addButton.style.transform = "rotate(-45deg)";
        addButton.style.backgroundColor = "var(--red)";
        showInputsBtn.style.backgroundColor = "var(--green)";
        showInputsBtn.style.transform = "rotate(-0deg)"

        showInputsBtn.addEventListener("mouseover", function() {
            showInputsBtn.style.backgroundColor = "var(--green)";
        })

        showInputsBtn.addEventListener("mouseout", function() {
            showInputsBtn.style.backgroundColor = "var(--green)";
        })
        inputs.style.display = "none";
        list.style.opacity = "1"

    }
})

async function addNewAnsøger() {
    let name = nameInput.value
    let phone = phoneInput.value
    let mail = mailInput.value
    let date = dateInput.value
    if (date.trim() == '') {
        let today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        date = yyyy + "-" + mm + "-" + dd;
    }

    var regex = /^[0-9]+$/;

    if (!phone.trim().match(regex) && phone.trim() != '') {
        alert("Telefonnr. skal bestå af tal");
    } else if (!(phone.trim() == '' || phone.trim().length == 8 || phone.trim().length == 10)) {
        alert("Telefonnr. skal bestå af 8 eller 10 tal");
    } else if (name.trim() != '' && phone.trim() != '' && mail.trim() != '') {
        try {
            let KolonistReturned = await postKolonisterToServer({ name: name, phone: phone, mail: mail, date: date, check: "0" })
            appendKolonistToList(KolonistReturned);
        } catch (err) {
            console.log(err)
        }
    } else {
        let string = "Tilføj venlist følgende oplysninger: ";
        let list = [name.trim(), phone.trim(), mail.trim()];
        let listNames = ["navn", "telefonnr.", "mail"]
        let listRes = [];

        for (let i = 0; i < list.length; i++) {

            if (list[i] == '') {
                let navn = listNames[i];
                listRes.push(navn);
            }

        }

        if (listRes.length == 1) {
            string += " " + listRes[0];
        }
        if (listRes.length == 2) {
            string += " " + listRes[0] + " & " + listRes[1];
        }
        if (listRes.length == 3) {
            string += " " + listRes[0] + ", " + listRes[1] + " & " + listRes[2];
        }
    }
}

document.body.addEventListener('click', function(event) {
    if (inputs.contains(event.target) || !addKolonistActive) {
        if (inputs.style.display == "flex") {
            addKolonistActive = true;
        }
    } else {
        addKolonistActive = false;
        inputs.style.display = "none";
        tilfojKolonist.style.display = "block";
        addButton.style.transform = "rotate(-45deg)";
        addButton.style.backgroundColor = "var(--red)";
        showInputsBtn.style.backgroundColor = "var(--green)";
        showInputsBtn.style.transform = "rotate(0deg)";
        list.style.opacity = "1"

        nameInput.value = "";
        phoneInput.value = "";
        mailInput.value = "";
        dateInput.value = "";
    }
});

async function checkIfAllInfoAdded() {
    var regex = /^[0-9]+$/;
    if (nameInput.value !== "" && phoneInput.value !== "" && mailInput.value !== "" && phoneInput.value.match(regex) !== null && (phoneInput.value.length == 8 || phoneInput.value.length == 10)) {
        addButton.style.backgroundColor = "var(--green)";
        addButton.style.transform = "rotate(0deg)"
    } else {
        addButton.style.backgroundColor = "var(--red)";
        addButton.style.transform = "rotate(-45deg)"
    }
}

addButton.addEventListener("mouseover", function() {
    if (addButton.style.backgroundColor === "var(--red)") {
        addButton.style.transform = "rotate(-45deg) scale(1.3)";
        addButton.style.backgroundColor = "var(--red)";
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


async function checkKolonist(el) {
    if (readyToCheck) {
        let dataId = el.closest("li").getAttribute("data-id");

        fetch('/ansogereListe')
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    let checks = list.children[i].querySelectorAll("#checkLabel");
                    if (data[i].id == dataId) {
                        if (data[i].check != 1) {
                            el.closest("li").classList.remove("notchecked");
                            el.closest("li").classList.add("checked");
                            for (let j = 0; j < checks.length; j++) {
                                checks[j].style.opacity = "1";
                            }
                            let oldName = data[i].name;
                            let oldPhone = data[i].phone;
                            let oldMail = data[i].mail;
                            let oldDate = data[i].date;

                            fetch(`/ansogereListe/${dataId}`, {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ name: oldName, phone: oldPhone, mail: oldMail, date: oldDate, check: "1" })
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
                            for (let j = 0; j < checks.length; j++) {
                                checks[j].style.opacity = "0.3";
                            }
                            let oldName = data[i].name;
                            let oldPhone = data[i].phone;
                            let oldMail = data[i].mail;
                            let oldDate = data[i].date;

                            fetch(`/ansogereListe/${dataId}`, {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ name: oldName, phone: oldPhone, mail: oldMail, date: oldDate, check: "0" })
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
        fetch('/ansogereListe')
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
        fetch('/ansogereListe')
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    list.children[i].classList.add("notchecked");
                    list.children[i].classList.remove("checked");
                }
            })
    }
}

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
        let newDate = el.childNodes[4].innerText

        el.childNodes[0].style.width = "5%"
        el.childNodes[1].style.width = "20%"
        el.childNodes[2].style.width = "10%"
        el.childNodes[3].style.width = "25%"
        el.childNodes[4].style.width = "10%"

        let dataId = el.closest("li").getAttribute("data-id");

        fetch('/ansogereListe')
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id == dataId) {
                        let check = data[i].check
                        fetch(`/ansogereListe/${dataId}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ id: newId, name: newName, phone: newPhone, mail: newMail, date: newDate, check: check })
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

function updateCounts() {
    let checkedAmount = document.getElementById("checkedAmount")
    let noncheckedAmount = document.getElementById("noncheckedAmount")

    let moveAnsoger = document.getElementById("moveAnsoger")
    let removeAnsoger = document.getElementById("removeAnsoger")


    let checkedCount = 0;
    let notCheckedCount = 0;
    moveAnsoger.innerHTML = "";
    removeAnsoger.innerHTML = "";
    fetch('/ansogereListe')
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].check == 1) {
                    checkedCount++;
                    let li = document.createElement("LI")
                    li.innerHTML = data[i].name;
                    moveAnsoger.appendChild(li)
                } else {
                    notCheckedCount++;
                    let li = document.createElement("LI")
                    li.innerHTML = data[i].name;
                    removeAnsoger.appendChild(li)
                }
            }
            checkedAmount.innerHTML = "Har betalt: " + checkedCount;
            noncheckedAmount.innerHTML = "Har ikke betalt: " + notCheckedCount;
        })

}

function appendKolonistToList(kolonistJson) {
    let el = document.createElement("LI")
    let index = document.createElement("SPAN")
    let nameEl = document.createElement("SPAN")
    let phoneEl = document.createElement("SPAN")
    let mailEl = document.createElement("SPAN")
    let dateEl = document.createElement("SPAN")

    index.setAttribute("id", "kolonistIndex")

    index.style.width = "5%"
    nameEl.style.width = "20%"
    phoneEl.style.width = "10%"
    mailEl.style.width = "25%"
    dateEl.style.width = "10%"

    index.innerHTML = list.childNodes.length;
    nameEl.innerHTML = kolonistJson.name;
    phoneEl.innerHTML = kolonistJson.phone;
    mailEl.innerHTML = kolonistJson.mail;
    dateEl.innerHTML = kolonistJson.date;

    el.dataset.id = kolonistJson.id
    index.classList.add("index-span");
    el.classList.add("notchecked");
    el.appendChild(index);
    el.appendChild(nameEl);
    el.appendChild(phoneEl);
    el.appendChild(mailEl);
    el.appendChild(dateEl);
    list.appendChild(el)

    nameInput.value = '';
    phoneInput.value = '';
    mailInput.value = '';
    dateInput.value = '';

    el.addEventListener("click", function() {
        if (readyToCheck) {
            checkKolonist(el);
        } else if (readyToEdit) {
            editKolonist(el);
        }

    })
}

async function fetchKolonister() {
    try {
        let kolonister = await getKolonisterFromServer()
        kolonister.forEach(name => { appendKolonistToList(name) })
    } catch (err) {
        console.log(err)
    }
}

async function getKolonisterFromServer() {
    const response = await fetch('/ansogereListe', {
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

async function postKolonisterToServer(data = {}) {
    const response = await fetch('/ansogereListe', {
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

async function deleteKolonisterServer(id) {
    const response = await fetch('/ansogereListe/' + id, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })
    return
}

async function moveAnsoger() {
    fetch('/ansogereListe')
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].check === "1") {
                    let id = data[i].id;
                    deleteKolonisterServer(id);
                    let name = data[i].name;
                    let phone = data[i].phone;
                    let mail = data[i].mail;
                    let date = data[i].date;
                    addNewAcceptedAnsoger(name, phone, mail, date);
                    let ansoger = document.querySelector('#venteliste li[data-id="' + id + '"]');
                    list.removeChild(ansoger)
                }
            }
            updateCounts();
        });
}

async function removeAnsoger() {
    fetch('/ansogereListe')
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                let id = data[i].id
                if (data[i].check === "0") {
                    deleteKolonisterServer(id)
                    let ansoger = document.querySelector('#venteliste li[data-id="' + id + '"]');
                    list.removeChild(ansoger)
                }
            }
            updateCounts()
        })
}

async function addNewAcceptedAnsoger(name, phone, mail, date) {
    try {
        let ansogerToVentelist = await postAnsogereToServer({ name: name, phone: phone, mail: mail, date: date, check: "0" })
        postAnsogereToServer(ansogerToVentelist);
    } catch (err) {
        console.log(err)
    }
}

async function postAnsogereToServer(data = {}) {
    const response = await fetch('/venteliste', {
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

showSearchBtn.addEventListener("click", function() {
    if (søgDiv.style.display !== "flex") {
        searchPopUpText.style.display = "none";
        søgDiv.style.display = "flex";
    } else {
        søgDiv.style.display = "none";
        searchPopUpText.style.display = "block";
    }
})

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
let buttons = document.querySelectorAll("#mailOptions button");
let selectedOption;

sendMailBtn.addEventListener('click', async() => {
    let mailMessage;
    let subject;
    console.log(selectedOption)

    if (selectedOption == 4) {
        mailMessage = templates[4].mail;
        subject = templates[4].subject;
    }
    if (selectedOption == 5) {
        mailMessage = templates[5].mail;
        subject = templates[5].subject;
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

updateRecieverCount()

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.style.backgroundColor === "white") {
            button.style.backgroundColor = "transparent";
            button.querySelector("i").style.color = "white";
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

    if (selectedOption == 4) {
        let checkedCount = 0;
        fetch('/ansogereListe')
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

    if (selectedOption == 5) {
        let notCheckedCount = 0;
        fetch('/ansogereListe')
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
        fetch('/ansogereListe')
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    mailReciever = data[i].mail
                    emailAdresses = emailAdresses.concat(mailReciever, ", ");
                }
                recieverCountSpan.innerHTML = "Antal modtagere: " + data.length;
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
    if (selectedOption < 10) {
        subject.value = templates[index].subject;
        mail.value = templates[index].mail;

        createMailContainer.style.top = "90px"
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